---
name: glory-elivisa-catalog
description: 查询公司签证/移民项目库信息。当用户询问移民项目、签证类型、投资移民、技术移民时，触发此 skill。
license: MIT
metadata:
  author: Glory
  version: "1.0.0"
  homepage: "https://github.com/sergio-wen/mcp-elivisa"
  agent:
    requires:
      bins: ["gloryfham-mcp-elivisa"]
    install:
      - id: npm
        kind: node
        package: "gloryfham-mcp-elivisa"
        bins: ["gloryfham-mcp-elivisa"]
        label: "Install Glory eLivisa MCP Server"
---

# Glory eLivisa Catalog — 签证/移民项目查询

通过 MCP Server `gloryfham-mcp-elivisa` 查询公司签证/移民项目库数据。

---

## 可用工具

| 工具 | 参数 | 用途 |
|------|------|------|
| `listVisaProjectTypes` | 无 | 获取所有项目类型分类 |
| `listAllVisaProjects` | 无 | 获取所有项目列表 |
| `searchVisaProjects(keyword?, country?, projectType?, identityType?, minAmount?)` | 全部可选 | 搜索签证/移民项目 |
| `getVisaProjectDetail(projectCode)` | projectCode(必填) | 获取项目详情 |

**项目类型分类**：
- `传统国家` — 美国、加拿大等传统移民国家
- `欧洲居留权` — 希腊、西班牙、马耳他等欧洲国家
- `公民权` — 马耳他、土耳其、加勒比岛国等直接入籍项目
- `亚洲` — 香港、新加坡、日本、泰国、迪拜等亚洲国家/地区

**身份类型**：
- `永久居民` — 如美国 EB5/EB1A/NIW
- `永久居留卡` — 如希腊购房、马耳他永居
- `公民` — 如土耳其、多米尼克、圣基茨等护照项目
- `长期居留签证` — 如香港优才/高才通、新加坡 EP/PIC、日本经营管理签证

---

## 工作流程

```
1. 识别场景  →  2. 调用 MCP 工具  →  3. 结构化输出
```

### 场景一：按国家/地区搜索
调用 `searchVisaProjects(country="美国")` 获取该国所有项目。

### 场景二：按项目类型浏览
调用 `searchVisaProjects(projectType="亚洲")` 获取该类型下所有项目。

### 场景三：按身份类型筛选
调用 `searchVisaProjects(identityType="公民")` 获取所有入籍项目。

### 场景四：项目详情
调用 `getVisaProjectDetail(projectCode="sg_prj_0001")` 获取完整信息。

### 场景五：浏览全部
调用 `listAllVisaProjects()` 获取全量列表，或 `listVisaProjectTypes()` 查看分类。

---

## 输出规范

1. **禁止直接输出 JSON** — 必须解析、格式化后呈现
2. **优先使用表格** 呈现可对比数据（项目名称、国家、投资金额、身份类型、居住要求）
3. **信息缺失标注** "数据暂未披露"
4. **项目经理信息** 仅在需要联系时展示
