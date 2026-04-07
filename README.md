# AI算法空间 - 博客

基于 Next.js 14 + TypeScript + Tailwind CSS 构建的 AI 算法博客，支持数学公式（KaTeX）与代码高亮，静态部署于 GitHub Pages。

> 博客地址: https://iwaterxt.github.io/ai-blog/

## 快速开始

```bash
npm install
npm run dev      # 本地开发 http://localhost:3000
npm run build    # 构建静态文件
```

## 写文章

在 `src/posts/` 目录下创建 `.md` 文件，frontmatter 格式：

```markdown
---
title: 文章标题
date: 2026-04-01
category: 深度学习
tags: [attention, transformer]
summary: 文章摘要
---

正文内容，支持 $数学公式$ 和 $$块级数学$$，以及 ```代码块```
```

## 功能

- ✅ KaTeX 数学公式（$ 和 $$display$$）
- ✅ highlight.js 代码高亮
- ✅ 分类 + 标签系统
- ✅ 响应式设计
- ✅ 静态导出（GitHub Pages / Vercel / Netlify）

