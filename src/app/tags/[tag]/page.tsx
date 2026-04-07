import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getPostsByTag, getAllTags } from '@/lib/posts'

interface Props { params: { tag: string } }

export async function generateStaticParams() {
  return getAllTags().map(t => ({ tag: t.name }))
}

export function generateMetadata({ params }: Props) {
  return { title: `标签: #${decodeURIComponent(params.tag)}` }
}

export default function TagPage({ params }: Props) {
  const name = decodeURIComponent(params.tag)
  const posts = getPostsByTag(name)
  if (posts.length === 0 && !getAllTags().find(t => t.name === name)) notFound()

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6">
        <Link href="/tags" className="text-sm text-blue-500 hover:underline mb-4 inline-block">← 标签列表</Link>
        <h1 className="text-2xl font-bold mt-2">🏷️ #{name}</h1>
        <p className="text-sm text-[var(--text-secondary)] mt-1">{posts.length} 篇文章</p>
      </div>
      <div className="space-y-4">
        {posts.map(post => (
          <article key={post.slug} className="border border-[var(--border)] rounded-lg p-4 hover:border-blue-400 transition bg-[var(--card)]">
            <div className="text-xs text-[var(--text-secondary)] mb-1">{post.date} · {post.readingTime}</div>
            <h3 className="font-bold">
              <Link href={`/posts/${post.slug}`} className="hover:text-blue-500">{post.title}</Link>
            </h3>
            <p className="text-sm text-[var(--text-secondary)] mt-1 line-clamp-2">{post.summary}</p>
          </article>
        ))}
      </div>
    </div>
  )
}
