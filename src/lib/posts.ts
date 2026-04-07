import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const postsDir = path.join(process.cwd(), 'src/posts')

export interface PostMeta {
  slug: string
  title: string
  date: string
  category: string
  tags: string[]
  summary: string
  author?: string
  readingTime?: string
}

export interface Post extends PostMeta {
  content: string
}

function toDateString(val: unknown): string {
  if (!val) return ''
  if (val instanceof Date) return val.toISOString().slice(0, 10)
  return String(val)
}

export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(postsDir)) return []
  const files = fs.readdirSync(postsDir).filter(f => f.endsWith('.md'))

  const posts = files.map(filename => {
    const slug = filename.replace(/\.md$/, '')
    const filePath = path.join(postsDir, filename)
    const fileContent = fs.readFileSync(filePath, 'utf-8')
    const { data } = matter(fileContent)

    return {
      slug,
      title: toDateString(data.title) || '无标题',
      date: toDateString(data.date),
      category: toDateString(data.category) || '未分类',
      tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
      summary: toDateString(data.summary) || '',
      author: toDateString(data.author) || '博主',
      readingTime: toDateString(data.readingTime) || estimateReadingTime(fileContent),
    } as PostMeta
  })

  return posts.sort((a, b) => {
    const ta = new Date(a.date).getTime()
    const tb = new Date(b.date).getTime()
    return isNaN(ta) || isNaN(tb) ? 0 : tb - ta
  })
}

export function getPostBySlug(slug: string): Post | null {
  const filePath = path.join(postsDir, `${slug}.md`)
  if (!fs.existsSync(filePath)) return null

  const fileContent = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(fileContent)

  return {
    slug,
    title: toDateString(data.title) || '无标题',
    date: toDateString(data.date),
    category: toDateString(data.category) || '未分类',
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    summary: toDateString(data.summary) || '',
    author: toDateString(data.author) || '博主',
    readingTime: toDateString(data.readingTime) || estimateReadingTime(content),
    content,
  }
}

export function getPostsByCategory(category: string): PostMeta[] {
  return getAllPosts().filter(p => p.category === category)
}

export function getPostsByTag(tag: string): PostMeta[] {
  return getAllPosts().filter(p => p.tags.includes(tag))
}

export function getAllCategories(): { name: string; count: number }[] {
  const posts = getAllPosts()
  const map = new Map<string, number>()
  posts.forEach(p => map.set(p.category, (map.get(p.category) || 0) + 1))
  return Array.from(map.entries()).map(([name, count]) => ({ name, count }))
}

export function getAllTags(): { name: string; count: number }[] {
  const posts = getAllPosts()
  const map = new Map<string, number>()
  posts.forEach(p => p.tags.forEach(t => map.set(t, (map.get(t) || 0) + 1)))
  return Array.from(map.entries()).map(([name, count]) => ({ name, count })).sort((a, b) => b.count - a.count)
}

function estimateReadingTime(content: string): string {
  const words = content.replace(/[#*`\[\]()]/g, '').length
  const minutes = Math.ceil(words / 500)
  return `${minutes} 分钟阅读`
}
