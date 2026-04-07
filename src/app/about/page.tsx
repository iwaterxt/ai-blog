export const metadata = { title: '关于' }

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">👤 关于</h1>
      <div className="border border-[var(--border)] rounded-lg p-6 bg-[var(--card)] space-y-4">
        <p>
          欢迎来到 <strong>AI算法空间</strong>！这是一个专注于人工智能算法、机器学习、深度学习与优化器研究的技术博客。
        </p>
        <h2 className="text-lg font-bold mt-6 mb-2">📋 主要内容</h2>
        <ul className="list-disc list-inside space-y-1 text-[var(--text-secondary)]">
          <li>机器学习算法原理与实现</li>
          <li>深度学习架构与训练技巧</li>
          <li>优化器设计与分析</li>
          <li>大模型（LLM/MoE）核心机制</li>
          <li>数学基础（概率、统计、线性代数）</li>
        </ul>
        <h2 className="text-lg font-bold mt-6 mb-2">✍️ 投稿</h2>
        <p className="text-[var(--text-secondary)]">
          欢迎分享 AI 算法相关的研究与实践！可以在 <code>src/posts</code> 目录下以 Markdown 格式提交文章。
        </p>
        <h2 className="text-lg font-bold mt-6 mb-2">🔧 技术栈</h2>
        <ul className="list-disc list-inside space-y-1 text-[var(--text-secondary)]">
          <li>Next.js 14 (App Router)</li>
          <li>TypeScript</li>
          <li>Tailwind CSS</li>
          <li>KaTeX 数学公式</li>
          <li>highlight.js 代码高亮</li>
        </ul>
      </div>
    </div>
  )
}
