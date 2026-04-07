import Link from 'next/link'
import { getAllTags } from '@/lib/posts'

export const metadata = { title: '标签' }

export default function TagsPage() {
  const tags = getAllTags()

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">🏷️ 标签</h1>
      {tags.length === 0 ? (
        <p className="text-[var(--text-secondary)]">暂无标签</p>
      ) : (
        <div className="flex flex-wrap gap-2">
          {tags.map(tag => (
            <Link key={tag.name} href={`/tags/${tag.name}`}
              className="text-sm px-3 py-1 rounded-full border border-[var(--border)] hover:border-blue-400 hover:text-blue-500 transition bg-[var(--card)]">
              #{tag.name} <span className="text-xs text-[var(--text-secondary)]">({tag.count})</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
