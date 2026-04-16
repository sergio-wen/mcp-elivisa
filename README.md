# @glory/mcp-elivisa

Glory eLivisa MCP Server — 签证/移民项目库查询服务。

## 安装

```bash
npm install -g @glory/mcp-elivisa
```

## 使用

### 作为 Claude Code Skill

在 Claude Code 中运行：

```bash
npx skills add gloryfham/mcp-elivisa
```

### 作为独立 MCP Server

```bash
npx @glory/mcp-elivisa
```

## 可用工具

| 工具 | 描述 |
|------|------|
| `listVisaProjectTypes` | 获取所有项目类型分类 |
| `listAllVisaProjects` | 获取所有签证/移民项目列表 |
| `searchVisaProjects` | 根据关键词、国家、类型搜索项目 |
| `getVisaProjectDetail` | 根据项目编号获取项目详情 |

## 项目类型

- 传统国家（美国、加拿大等）
- 欧洲居留权（希腊、西班牙、马耳他等）
- 公民权（土耳其、多米尼克、圣基茨等）
- 亚洲（香港、新加坡、日本、泰国、迪拜等）

## License

MIT
