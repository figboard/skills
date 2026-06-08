# FigBoard Skills

[![Repository](https://img.shields.io/badge/GitHub-figboard%2Fskills-24292f)](https://github.com/figboard/skills)
[![Skill](https://img.shields.io/badge/skill-generating--figboard--diagrams-2563eb)](generating-figboard-diagrams/SKILL.md)

English | [中文](#figboard-skills-中文)

> Agent skills for FigBoard（飞格图板）. These skills help AI agents generate FigBoard-compatible JSON for diagrams, workflows, network graphs, and multi-panel scientific figures, then import the result with the official FigBoard CLI.

## Skills

| Skill | Description |
| --- | --- |
| `generating-figboard-diagrams` | Generates FigBoard-compatible JSON for React Flow diagrams, flowcharts, network diagrams, architecture diagrams, and multi-panel scientific figures. |

## Features

- **FigBoard import JSON**: Generates `FileContentDto` JSON that can be imported into FigBoard.
- **Flow diagrams**: Supports workflows, process diagrams, architecture diagrams, and network graphs.
- **Scientific figures**: Supports multi-panel figure layouts such as `1x2`, `2x2`, `1x3`, and `2x3`.
- **Dataset guidance**: Includes schemas for bar, line, volcano, box, and heatmap datasets.
- **CLI-first workflow**: Requires the latest `@figboard/cli` and checks token configuration before import commands.
- **Validation helper**: Includes `scripts/validate.mjs` for checking generated FigBoard JSON.

## Requirements

- Node.js >= 20
- A FigBoard Personal Access Token for commands that access the FigBoard backend
- An agent that supports `SKILL.md`-based skills, such as Codex, Claude Code, or another compatible skills runtime

## Install The Skill

Install from GitHub:

```bash
npx skills add https://github.com/figboard/skills --skill generating-figboard-diagrams
```

GitHub shorthand:

```bash
npx skills add figboard/skills --skill generating-figboard-diagrams
```

Install directly from the skill folder URL:

```bash
npx skills add https://github.com/figboard/skills/tree/main/generating-figboard-diagrams
```

Install globally:

```bash
npx skills add figboard/skills --skill generating-figboard-diagrams -g
```

Install for a specific agent:

```bash
npx skills add figboard/skills --skill generating-figboard-diagrams -a codex
npx skills add figboard/skills --skill generating-figboard-diagrams -a claude-code
```

List available skills before installing:

```bash
npx skills add figboard/skills --list
```

For local development, install from a local path:

```bash
npx skills add /path/to/skills --skill generating-figboard-diagrams
```

Restart your agent after installation so it can load the new skill.

## FigBoard CLI And Token Setup

The skill instructs agents to check and install the latest FigBoard CLI before generating or importing files:

```bash
npm view @figboard/cli version
figboard --version
npm install -g @figboard/cli@latest
figboard --version
```

If global installation is not appropriate, use:

```bash
npx -y @figboard/cli@latest --help
```

After the CLI is available, check whether a token is configured:

```bash
figboard whoami
```

If no token is configured, create a Personal Access Token in FigBoard Web under **Personal Settings -> Access Tokens**, then configure it with one of these methods:

```bash
figboard login --token fbp_xxxxxxxxxxxx
```

or:

```bash
export FIGBOARD_TOKEN=fbp_xxxxxxxxxxxx
```

The CLI reads credentials in this order:

1. Command option: `--token`
2. Environment variable: `FIGBOARD_TOKEN`
3. Local CLI config saved by `figboard login`

Recommended scopes depend on the workflow:

| Scope | Needed for |
| --- | --- |
| `me:read` | `figboard whoami` |
| `files:read` | Listing files |
| `files:write` | Creating/importing files |
| `assets:read` | Listing assets |
| `assets:write` | Uploading assets or datasets |
| `exports:read` | Listing export jobs |

## Quick Start

After installing the skill, ask your agent:

```text
Use the generating-figboard-diagrams skill to create a FigBoard workflow diagram for a manuscript review process.
```

The agent should:

1. Ensure the latest `@figboard/cli` is installed.
2. Check `figboard whoami` and guide token setup if needed.
3. Generate a FigBoard-compatible `.json` file.
4. Validate the JSON when appropriate.
5. Import it with:

```bash
figboard files create --from-file <path>
```

## Repository Layout

```text
.
├── README.md
└── generating-figboard-diagrams/
    ├── SKILL.md
    ├── references/
    │   ├── datasets.md
    │   ├── figure-format.md
    │   ├── flow-format.md
    │   └── styling.md
    └── scripts/
        └── validate.mjs
```

## Validate Generated JSON

The skill includes a local validation helper:

```bash
node generating-figboard-diagrams/scripts/validate.mjs path/to/filecontent.json
```

This checks the top-level `FileContentDto` shape, node and edge structure, figure metadata, and stats counts.

## Development

Clone the repository:

```bash
git clone https://github.com/figboard/skills.git
cd skills
```

Install the local skill into an agent:

```bash
npx skills add "$(pwd)" --skill generating-figboard-diagrams
```

When editing the skill, keep the folder self-contained:

```text
generating-figboard-diagrams/
├── SKILL.md
├── references/
└── scripts/
```

## License

MIT

---

# FigBoard Skills 中文

[English](#figboard-skills) | 中文

> FigBoard（飞格图板）的 Agent Skills。这个仓库帮助 AI agent 生成 FigBoard 兼容的流程图、网络图、架构图和多面板科研图 JSON，并通过官方 FigBoard CLI 导入。

## Skills

| Skill | 说明 |
| --- | --- |
| `generating-figboard-diagrams` | 生成可导入 FigBoard 的 React Flow 图、流程图、网络图、架构图和多面板科研图 JSON。 |

## 特性

- **FigBoard 导入 JSON**：生成可导入 FigBoard 的 `FileContentDto` JSON。
- **流程图与网络图**：支持工作流、流程图、架构图和网络图。
- **科研多面板图**：支持 `1x2`、`2x2`、`1x3`、`2x3` 等布局。
- **数据集说明**：包含 bar、line、volcano、box、heatmap 等数据 schema。
- **CLI 优先工作流**：要求先安装最新版 `@figboard/cli`，并在导入前检查 token 配置。
- **校验脚本**：内置 `scripts/validate.mjs`，用于检查生成的 FigBoard JSON。

## 环境要求

- Node.js >= 20
- 访问 FigBoard 后端命令需要 FigBoard Personal Access Token
- 支持 `SKILL.md` skill 目录格式的 agent，例如 Codex、Claude Code 或其他兼容运行时

## 安装 Skill

从 GitHub 安装：

```bash
npx skills add https://github.com/figboard/skills --skill generating-figboard-diagrams
```

GitHub 简写：

```bash
npx skills add figboard/skills --skill generating-figboard-diagrams
```

直接指向 skill 目录 URL：

```bash
npx skills add https://github.com/figboard/skills/tree/main/generating-figboard-diagrams
```

全局安装：

```bash
npx skills add figboard/skills --skill generating-figboard-diagrams -g
```

安装到指定 agent：

```bash
npx skills add figboard/skills --skill generating-figboard-diagrams -a codex
npx skills add figboard/skills --skill generating-figboard-diagrams -a claude-code
```

安装前查看仓库中可识别的 skills：

```bash
npx skills add figboard/skills --list
```

本地开发时，从本地路径安装：

```bash
npx skills add /path/to/skills --skill generating-figboard-diagrams
```

安装后请重启 agent，让它重新加载新 skill。

## FigBoard CLI 与 Token 配置

skill 会要求 agent 在生成或导入前检查并安装最新版 FigBoard CLI：

```bash
npm view @figboard/cli version
figboard --version
npm install -g @figboard/cli@latest
figboard --version
```

如果当前环境不适合全局安装，可以使用：

```bash
npx -y @figboard/cli@latest --help
```

CLI 可用后，检查是否已经配置 token：

```bash
figboard whoami
```

如果没有配置 token，请在 FigBoard Web 的 **个人设置 -> 访问令牌** 创建 Personal Access Token，然后用以下任一方式配置：

```bash
figboard login --token fbp_xxxxxxxxxxxx
```

或：

```bash
export FIGBOARD_TOKEN=fbp_xxxxxxxxxxxx
```

CLI 按以下优先级读取 token：

1. 命令行参数：`--token`
2. 环境变量：`FIGBOARD_TOKEN`
3. `figboard login` 保存的本地配置

推荐按实际工作流勾选 scope：

| Scope | 用途 |
| --- | --- |
| `me:read` | `figboard whoami` |
| `files:read` | 查看文件列表 |
| `files:write` | 创建或导入文件 |
| `assets:read` | 查看资产 |
| `assets:write` | 上传资产或数据集 |
| `exports:read` | 查看导出任务 |

## 快速开始

安装后，可以这样要求 agent：

```text
使用 generating-figboard-diagrams skill，创建一个论文审稿流程的 FigBoard 工作流图。
```

agent 应该：

1. 确保已安装最新版 `@figboard/cli`。
2. 执行 `figboard whoami` 检查 token，未配置时提示如何配置。
3. 生成 FigBoard 兼容的 `.json` 文件。
4. 需要时校验 JSON。
5. 用以下命令导入：

```bash
figboard files create --from-file <path>
```

## 仓库结构

```text
.
├── README.md
└── generating-figboard-diagrams/
    ├── SKILL.md
    ├── references/
    │   ├── datasets.md
    │   ├── figure-format.md
    │   ├── flow-format.md
    │   └── styling.md
    └── scripts/
        └── validate.mjs
```

## 校验生成的 JSON

skill 内置本地校验脚本：

```bash
node generating-figboard-diagrams/scripts/validate.mjs path/to/filecontent.json
```

它会检查顶层 `FileContentDto` 结构、节点、连线、figure metadata 和 stats 计数。

## 开发

克隆仓库：

```bash
git clone https://github.com/figboard/skills.git
cd skills
```

把本地 skill 安装到 agent：

```bash
npx skills add "$(pwd)" --skill generating-figboard-diagrams
```

编辑 skill 时保持目录自包含：

```text
generating-figboard-diagrams/
├── SKILL.md
├── references/
└── scripts/
```

## License

MIT
