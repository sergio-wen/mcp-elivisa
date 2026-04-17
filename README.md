# @gloryfham/mcp-elivisa

Glory eLivisa MCP Server — 签证/移民项目库查询服务。

## 安装

```bash
npm install -g @gloryfham/mcp-elivisa
```

## 使用

### 作为 Claude Code Skill

```bash
npx skills add gloryfham/agent-skills
```

### 作为独立 MCP Server

```bash
npx @gloryfham/mcp-elivisa
```

## 可用工具

| 工具 | 参数 | 描述 |
|------|------|------|
| `listVisaProjectTypes` | 无 | 获取所有项目类型分类 |
| `listAllVisaProjects` | 无 | 获取所有签证/移民项目列表 |
| `searchVisaProjects(keyword?, country?, projectType?, identityType?, minAmount?)` | 全部可选 | 搜索签证/移民项目 |
| `getVisaProjectDetail(projectCode)` | projectCode(必填) | 获取项目详情 |

## 项目类型

- `传统国家` — 美国、加拿大等传统移民国家
- `欧洲居留权` — 希腊、西班牙、马耳他等
- `公民权` — 土耳其、多米尼克、圣基茨等护照项目
- `亚洲` — 香港、新加坡、日本、泰国、迪拜等

## 身份类型

- `永久居民` — 如美国 EB5/EB1A/NIW
- `永久居留卡` — 如希腊购房、马耳他永居
- `公民` — 如土耳其、多米尼克、圣基茨等
- `长期居留签证` — 如香港优才/高才通、新加坡 EP/PIC

## License

MIT
