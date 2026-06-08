# FigBoard Diagram Skill

English | [中文](#figboard-图板-skill)

This repository contains one agent skill:

- `generating-figboard-diagrams`: Generates FigBoard-compatible JSON for React Flow diagrams, flowcharts, network diagrams, and multi-panel scientific figures.

The skill is designed for agents that support `SKILL.md`-based skill folders, including Codex, Claude Code, and other tools compatible with the open agent skills format.

## Install

Install from GitHub with `npx skills add`:

```bash
npx skills add https://github.com/<owner>/<repo> --skill generating-figboard-diagrams
```

You can also use the GitHub shorthand:

```bash
npx skills add <owner>/<repo> --skill generating-figboard-diagrams
```

Install globally:

```bash
npx skills add <owner>/<repo> --skill generating-figboard-diagrams -g
```

Install for a specific agent:

```bash
npx skills add <owner>/<repo> --skill generating-figboard-diagrams -a codex
npx skills add <owner>/<repo> --skill generating-figboard-diagrams -a claude-code
```

List available skills before installing:

```bash
npx skills add <owner>/<repo> --list
```

If this repository is not published yet, install from a local path:

```bash
npx skills add /path/to/skills --skill generating-figboard-diagrams
```

## Repository Layout

```text
.
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

## What It Does

This skill helps an agent produce FigBoard import JSON with:

- Flowchart and workflow diagrams
- Network and architecture diagrams
- Multi-panel scientific figures
- Dataset schemas for chart-oriented figures
- Validation guidance for FigBoard `FileContentDto` output

Before generation or import, the skill instructs the agent to ensure the latest `@figboard/cli` is installed and available.

## FigBoard CLI Requirement

The skill expects agents to check and update the FigBoard CLI first:

```bash
npm view @figboard/cli version
figboard --version
npm install -g @figboard/cli@latest
figboard --version
```

If global installation is not appropriate, agents may use:

```bash
npx -y @figboard/cli@latest ...
```

## Usage Example

After installation, ask your agent:

```text
Use the generating-figboard-diagrams skill to create a FigBoard workflow diagram for a manuscript review process.
```

The agent should generate a FigBoard-compatible `.json` file that can be imported with:

```bash
figboard files create --from-file <path>
```

---

# FigBoard 图板 Skill

[English](#figboard-diagram-skill) | 中文

这个仓库包含一个 agent skill：

- `generating-figboard-diagrams`：生成可导入 FigBoard（飞格图板）的 JSON，适用于 React Flow 图、流程图、网络图、架构图和多面板科研图。

这个 skill 适用于支持 `SKILL.md` skill 目录格式的 agent，例如 Codex、Claude Code，以及兼容开放 agent skills 格式的其他工具。

## 安装

通过 `npx skills add` 从 GitHub 安装：

```bash
npx skills add https://github.com/<owner>/<repo> --skill generating-figboard-diagrams
```

也可以使用 GitHub 简写：

```bash
npx skills add <owner>/<repo> --skill generating-figboard-diagrams
```

全局安装：

```bash
npx skills add <owner>/<repo> --skill generating-figboard-diagrams -g
```

安装到指定 agent：

```bash
npx skills add <owner>/<repo> --skill generating-figboard-diagrams -a codex
npx skills add <owner>/<repo> --skill generating-figboard-diagrams -a claude-code
```

安装前查看仓库中可识别的 skills：

```bash
npx skills add <owner>/<repo> --list
```

如果仓库还没有发布到 GitHub，也可以从本地路径安装：

```bash
npx skills add /path/to/skills --skill generating-figboard-diagrams
```

## 目录结构

```text
.
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

## 功能

这个 skill 会帮助 agent 生成 FigBoard 可导入的 JSON，包括：

- 流程图和工作流图
- 网络图和架构图
- 多面板科研图
- 面向图表的 dataset schema
- FigBoard `FileContentDto` 输出校验说明

在生成或导入前，skill 会要求 agent 先确保已安装并可使用最新版 `@figboard/cli`。

## FigBoard CLI 要求

skill 会要求 agent 先检查并更新 FigBoard CLI：

```bash
npm view @figboard/cli version
figboard --version
npm install -g @figboard/cli@latest
figboard --version
```

如果当前环境不适合全局安装，可以使用：

```bash
npx -y @figboard/cli@latest ...
```

## 使用示例

安装后，可以这样要求 agent：

```text
使用 generating-figboard-diagrams skill，创建一个论文审稿流程的 FigBoard 工作流图。
```

agent 应生成一个 FigBoard 兼容的 `.json` 文件，并可通过下面命令导入：

```bash
figboard files create --from-file <path>
```
