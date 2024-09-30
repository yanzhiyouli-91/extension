import { defineConfig } from 'vitepress';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Codewave 扩展开发",
  base: '/extension/',
  description: "Codewave extension develop platform",
  themeConfig: {
    search: {
      provider: 'local',
      options: {
        _render(src, env, md) {
          const html = md.render(src, env)
          if (env.frontmatter?.title)
            return md.render(`# ${env.frontmatter.title}`) + html
          return html
        }
      },
    },
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '前端扩展开发', link: '/' },
      { text: '服务端端扩展开发', link: '/markdown-examples' }
    ],

    sidebar: [
      {
        text: 'Examples',
        items: [
          { text: '前端依赖库开发', link: '/markdown-examples' },
          { text: '后端依赖库', link: '/api-examples' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/netease-lcap/extension' }
    ],
    footer: {
      message: 'Codewave',
      copyright: 'Copyright © 2024-present'
    }
  },
  lastUpdated: true,
})
