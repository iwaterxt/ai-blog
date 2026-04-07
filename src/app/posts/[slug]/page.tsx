import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getPostBySlug, getAllPosts } from '@/lib/posts'
import { renderMarkdown } from '@/lib/markdown'

interface Props {
  params: { slug: string }
}

export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map(p => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props) {
  const post = getPostBySlug(params.slug)
  if (!post) return {}
  return {
    title: post.title,
    description: post.summary,
  }
}

export default function PostPage({ params }: Props) {
  const post = getPostBySlug(params.slug)
  if (!post) notFound()

  const htmlContent = renderMarkdown(post.content)

  return (
    <article className="max-w-3xl mx-auto">
      {/* Back */}
      <Link href="/" className="text-sm text-blue-500 hover:underline mb-6 inline-block">← 返回首页</Link>

      {/* Header */}
      <header className="mb-8">
        <div className="flex flex-wrap gap-2 mb-3">
          <span className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 px-2 py-0.5 rounded">
            {post.category}
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold leading-snug mb-3">{post.title}</h1>
        <div className="flex items-center gap-3 text-sm text-[var(--text-secondary)]">
          <span>👤 {post.author}</span>
          <span>📅 {post.date}</span>
          <span>⏱ {post.readingTime}</span>
        </div>
        <div className="flex flex-wrap gap-1.5 mt-3">
          {post.tags.map(tag => (
            <Link key={tag} href={`/tags/${tag}`}
              className="text-xs px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-blue-100 dark:hover:bg-blue-900 hover:text-blue-600 dark:hover:text-blue-300 transition">
              #{tag}
            </Link>
          ))}
        </div>
      </header>

      {/* Content */}
      <div
        className="prose-content"
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />

      {/* Footer nav */}
      <div className="mt-10 pt-6 border-t border-[var(--border)]">
        <Link href="/" className="text-sm text-blue-500 hover:underline">← 返回首页</Link>
      </div>
    </article>
  )
}
