import Link from 'next/link'
import { getAllPosts, getAllCategories } from '@/lib/posts'

export default function HomePage() {
  const posts = getAllPosts()
  const categories = getAllCategories()

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Main Content */}
      <div className="flex-1 min-w-0">
        {/* Hero */}
        <section className="mb-10 text-center py-8">
          <h1 className="text-3xl sm:text-4xl font-bold mb-3">🤖 AI算法空间</h1>
          <p className="text-[var(--text-secondary)] text-base">
            深入探讨 AI 算法、机器学习、深度学习与优化器的技术博客
          </p>
        </section>

        {/* Posts */}
        <section>
          <h2 className="text-xl font-bold mb-6 pb-2 border-b border-[var(--border)]">📝 最新文章</h2>
          {posts.length === 0 ? (
            <p className="text-[var(--text-secondary)] py-8 text-center">
              暂无文章，欢迎提交第一篇！
            </p>
          ) : (
            <div className="space-y-6">
              {posts.map(post => (
                <article key={post.slug} className="border border-[var(--border)] rounded-lg p-5 hover:border-blue-400 transition bg-[var(--card)]">
                  <div className="flex items-center gap-2 text-xs text-[var(--text-secondary)] mb-2">
                    <span>{post.date}</span>
                    <span className="text-[var(--border)]">·</span>
                    <span>{post.readingTime}</span>
                    <span className="text-[var(--border)]">·</span>
                    <span>{post.category}</span>
                  </div>
                  <h3 className="text-lg font-bold mb-2">
                    <Link href={`/posts/${post.slug}`} className="hover:text-blue-500 transition">
                      {post.title}
                    </Link>
                  </h3>
                  <p className="text-sm text-[var(--text-secondary)] line-clamp-2">{post.summary}</p>
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {post.tags.map(tag => (
                      <Link key={tag} href={`/tags/${tag}`}
                        className="text-xs px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-800 transition">
                        {tag}
                      </Link>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>

      {/* Sidebar */}
      <aside className="lg:w-64 shrink-0">
        <div className="sticky top-20 space-y-6">
          {/* Categories */}
          <div className="border border-[var(--border)] rounded-lg p-4 bg-[var(--card)]">
            <h3 className="font-bold mb-3 text-sm">📂 分类</h3>
            {categories.length === 0 ? (
              <p className="text-xs text-[var(--text-secondary)]">暂无分类</p>
            ) : (
              <ul className="space-y-2">
                {categories.map(cat => (
                  <li key={cat.name}>
                    <Link href={`/categories/${cat.name}`} className="text-sm hover:text-blue-500 flex justify-between">
                      <span>{cat.name}</span>
                      <span className="text-xs bg-gray-200 dark:bg-gray-700 px-1.5 rounded">{cat.count}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* About snippet */}
          <div className="border border-[var(--border)] rounded-lg p-4 bg-[var(--card)]">
            <h3 className="font-bold mb-2 text-sm">👋 关于</h3>
            <p className="text-xs text-[var(--text-secondary)]">
              专注 AI 算法与机器学习，分享前沿研究与工程实践。
            </p>
            <Link href="/about" className="text-xs text-blue-500 hover:underline mt-2 inline-block">
              了解更多 →
            </Link>
          </div>
        </div>
      </aside>
    </div>
  )
}
