import type { Metadata } from 'next'
import './globals.css'
import KaTeXLoader from '@/components/KaTeXLoader'

export const metadata: Metadata = {
  title: { default: 'AI算法空间', template: '%s | AI算法空间' },
  description: '深入探讨AI算法、机器学习、深度学习与优化器的技术博客',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <head>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" />
        <script src="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.js" defer></script>
      </head>
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 py-8">
          {children}
        </main>
        <Footer />
        <KaTeXLoader />
      </body>
    </html>
  )
}

function Header() {
  return (
    <header className="border-b border-[var(--border)] bg-[var(--bg)] sticky top-0 z-50 backdrop-blur">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <nav className="flex items-center justify-between h-14">
          <a href="/" className="text-xl font-bold tracking-tight">
            🤖 AI算法空间
          </a>
          <div className="flex items-center gap-6 text-sm">
            <a href="/" className="hover:text-blue-500 transition">首页</a>
            <a href="/categories" className="hover:text-blue-500 transition">分类</a>
            <a href="/tags" className="hover:text-blue-500 transition">标签</a>
            <a href="/about" className="hover:text-blue-500 transition">关于</a>
          </div>
        </nav>
      </div>
    </header>
  )
}

function Footer() {
  return (
    <footer className="border-t border-[var(--border)] mt-12 py-6 text-center text-sm text-[var(--text-secondary)]">
      <p>Powered by Next.js · 部署于 GitHub Pages</p>
      <p className="mt-1">© {new Date().getFullYear()} AI算法空间. 保留所有权利.</p>
    </footer>
  )
}
