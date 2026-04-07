import Link from 'next/link'
import { getAllCategories } from '@/lib/posts'

export const metadata = { title: '分类' }

export default function CategoriesPage() {
  const categories = getAllCategories()

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">📂 分类</h1>
      {categories.length === 0 ? (
        <p className="text-[var(--text-secondary)]">暂无分类</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {categories.map(cat => (
            <Link key={cat.name} href={`/categories/${cat.name}`}
              className="border border-[var(--border)] rounded-lg p-4 hover:border-blue-400 transition bg-[var(--card)]">
              <div className="font-bold text-lg">{cat.name}</div>
              <div className="text-sm text-[var(--text-secondary)] mt-1">{cat.count} 篇文章</div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
