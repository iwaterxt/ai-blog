// Server-side markdown renderer for static export
// Uses KaTeX CDN links injected into rendered HTML

export function renderMarkdown(content: string): string {
  let html = content

  // Escape HTML first
  html = html.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

  // Code blocks (```...```)
  html = html.replace(/```(\w*)\n([\s\S]*?)```/g, (_: string, lang: string, code: string) => {
    const langClass = lang ? ` language-${lang}` : ''
    return `<pre><code class="hljs${langClass}">${code.trim()}</code></pre>`
  })

  // Display math: $$...$$
  html = html.replace(/\$\$([^$]+?)\$\$/g, (_: string, expr: string) => {
    const encoded = encodeURIComponent(expr.trim())
    return `<span class="katex-display" data-math="${encoded}">${expr}</span>`
  })

  // Inline math: $...$
  html = html.replace(/\$([^$\n]+?)\$/g, (_: string, expr: string) => {
    const encoded = encodeURIComponent(expr.trim())
    return `<span class="katex-inline" data-math="${encoded}">${expr}</span>`
  })

  // Tables
  html = html.replace(/\|(.+)\|\n\|[-| :]+\|\n((?:\|.+\|\n?)+)/g, (_: string, header: string, body: string) => {
    const headers: string[] = header.split('|').filter((h: string) => h.trim())
    const rows: string[][] = body.trim().split('\n').map((row: string) =>
      row.split('|').filter((c: string) => c !== undefined).map((c: string) => c.trim())
    )
    let table = '<table><thead><tr>'
    headers.forEach((h: string) => { table += `<th>${h}</th>` })
    table += '</tr></thead><tbody>'
    rows.forEach((row: string[]) => {
      table += '<tr>'
      row.forEach((cell: string) => { table += `<td>${cell}</td>` })
      table += '</tr>'
    })
    table += '</tbody></table>'
    return table
  })

  // Headings
  html = html.replace(/^### (.+)$/gm, '<h3>$1</h3>')
  html = html.replace(/^## (.+)$/gm, '<h2>$1</h2>')
  html = html.replace(/^# (.+)$/gm, '<h1>$1</h1>')

  // Bold and italic
  html = html.replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>')
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
  html = html.replace(/\*(.+?)\*/g, '<em>$1</em>')

  // Inline code
  html = html.replace(/`([^`]+)`/g, '<code>$1</code>')

  // Links
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>')

  // Blockquotes
  html = html.replace(/^> (.+)$/gm, '<blockquote>$1</blockquote>')

  // Unordered lists
  html = html.replace(/^- (.+)$/gm, '<li>$1</li>')
  html = html.replace(/(<li>.*<\/li>\n?)+/g, '<ul>$&</ul>')

  // Ordered lists
  html = html.replace(/^\d+\. (.+)$/gm, '<li>$1</li>')

  // Paragraphs (lines not already wrapped)
  const lines = html.split('\n\n')
  html = lines.map((line: string) => {
    line = line.trim()
    if (!line) return ''
    if (/^<(h[1-6]|ul|ol|li|blockquote|pre|table|div)/.test(line)) return line
    if (line.startsWith('- ') || /^\d+\. /.test(line)) return line
    return `<p>${line.replace(/\n/g, '<br/>')}</p>`
  }).join('\n')

  return html
}
