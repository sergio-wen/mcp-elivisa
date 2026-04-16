import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// 加载数据
const rawData = JSON.parse(readFileSync(join(__dirname, '..', 'data.json'), 'utf-8'));
const projectTypes = rawData.data || [];

// 扁平化所有项目
const allProjects = [];
const projectMap = {};

projectTypes.forEach(pt => {
  (pt.projectInfoList || []).forEach(project => {
    const enriched = {
      ...project,
      projectType: pt.projectType,
      projectTypeDesc: pt.projectTypeDesc,
    };
    allProjects.push(enriched);
    projectMap[project.projectCode] = enriched;
  });
});

const server = new McpServer({
  name: 'glory-mcp-elivisa',
  version: '1.0.0',
});

/**
 * 关键词匹配（项目名称、国家、投资类型、项目经理）
 */
function matchesKeyword(project, keyword) {
  if (!keyword) return true;
  const kw = keyword.toLowerCase();
  return (
    (project.projectName || '').toLowerCase().includes(kw) ||
    (project.country || '').toLowerCase().includes(kw) ||
    (project.investType || '').toLowerCase().includes(kw) ||
    (project.projectManager || '').toLowerCase().includes(kw) ||
    (project.projectTypeDesc || '').toLowerCase().includes(kw) ||
    (project.identityType || '').toLowerCase().includes(kw)
  );
}

// 工具 1: 列出所有项目类型
server.tool('listVisaProjectTypes', '获取所有签证/移民项目的类型分类列表', {}, async () => {
  const result = projectTypes.map(pt => ({
    projectType: pt.projectType,
    projectTypeDesc: pt.projectTypeDesc,
    projectCount: (pt.projectInfoList || []).length,
  }));

  return {
    content: [{
      type: 'text',
      text: JSON.stringify(result, null, 2),
    }],
  };
});

// 工具 2: 列出所有项目
server.tool('listAllVisaProjects', '获取所有签证/移民项目的列表概览', {}, async () => {
  return {
    content: [{
      type: 'text',
      text: JSON.stringify(allProjects, null, 2),
    }],
  };
});

// 工具 3: 搜索签证/移民项目
server.tool(
  'searchVisaProjects',
  '根据关键词、国家、项目类型、投资金额等搜索签证/移民项目',
  {
    keyword: z.string().optional().describe('搜索关键词，支持项目名称、国家、投资类型、项目经理模糊匹配'),
    country: z.string().optional().describe('国家筛选，如 美国、加拿大、希腊、新加坡、香港等'),
    projectType: z.string().optional().describe('项目类型筛选，如 传统国家、欧洲居留权、公民权、亚洲'),
    identityType: z.string().optional().describe('身份类型筛选，如 永久居民、永久居留卡、公民、长期居留签证'),
    minAmount: z.string().optional().describe('最低投资金额关键词，如 80万、25万欧'),
  },
  async ({ keyword, country, projectType, identityType, minAmount }) => {
    const result = allProjects.filter(p => {
      if (!matchesKeyword(p, keyword)) return false;
      if (country && !(p.country || '').toLowerCase().includes(country.toLowerCase())) return false;
      if (projectType && !(p.projectTypeDesc || '').toLowerCase().includes(projectType.toLowerCase())) return false;
      if (identityType && !(p.identityType || '').toLowerCase().includes(identityType.toLowerCase())) return false;
      if (minAmount && !(p.investAmountRequirement || '').toLowerCase().includes(minAmount.toLowerCase())) return false;
      return true;
    });

    return {
      content: [{
        type: 'text',
        text: JSON.stringify(result, null, 2),
      }],
    };
  }
);

// 工具 4: 获取项目详情
server.tool(
  'getVisaProjectDetail',
  '根据项目编号获取签证/移民项目的完整详细信息',
  {
    projectCode: z.string().describe('项目编号，如 sg_prj_0001'),
  },
  async ({ projectCode }) => {
    const detail = projectMap[projectCode];
    if (!detail) {
      return {
        content: [{
          type: 'text',
          text: JSON.stringify({ error: `未找到签证项目: ${projectCode}` }),
        }],
        isError: true,
      };
    }

    return {
      content: [{
        type: 'text',
        text: JSON.stringify(detail, null, 2),
      }],
    };
  }
);

// 启动服务器
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('Glory eLivisa MCP Server running on stdio');
}

main().catch(console.error);
