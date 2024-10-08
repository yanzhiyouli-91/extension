import { defineConfig } from 'vitepress';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  lang: 'zh-CN',
  title: "Codewave 扩展开发",
  base: '/extension/',
  description: "Codewave extension develop platform",
  head: [
    ['link', { ref: 'icon', href: '/extension/images/logo.png' }],
  ],
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
      { text: '前端扩展开发', link: '/frontend/introduction.md' },
      // { text: '服务端端扩展开发', link: '/backend/introduction.md' }
    ],

    sidebar: {
      '/frontend/': [{
        text: '简介',
        items: [
          { text: '概述', link: '/frontend/introduction.md' },
          {
            text: '快速开始',
            link: '/frontend/get-started/environment.md',
            collapsed: true,
            items: [{
              text: '环境准备',
              link: '/frontend/get-started/environment.md',
            },
            {
              text: '创建依赖库',
              link: '/frontend/get-started/init.md',
            },
            {
              text: '发布与使用',
              link: '/frontend/get-started/usage.md'
            }],
          },
        ],
      }, {
        text: '组件接入',
        items: [
          { text: '概述', link: '/frontend/component/index.md' },
          { text: '组件配置（api.ts）描述编写', link: '/frontend/component/api.md' },
          { text: '页面编辑适配说明', link: '/frontend/component/ide.md' },
          { text: '区块示例', link: '/frontend/component/block.md' },
          { text: '平台能力适配', link: '/frontend/component/platform.md' },
          {
            text: 'IDE 能力适配',
            items: [
              { text: '主题编辑', link: '/frontend/component/theme.md' },
              { text: '国际化', link: '/frontend/component/i18n.md' },
              { text: '图标库扩展', link: '/frontend/component/icon.md' },
              { text: '实体自动化行为', link: '/frontend/component/nasl-generate.md' },
            ],
          },
          { text: 'View Component API 书写指南和规范', link: '/frontend/component/nasl-view-component.md' },
        ],
      }, {
        text: '基础组件二次开发',
        items: [
          { text: '开发指南', link: '/frontend/extend/index.md' },
          { text: 'FAQ', link: '/frontend/extend/faq.md' },
        ]
      }, {
        text: '前端逻辑扩展',
        items: [
          { text: '开发指南', link: '/frontend/logic/index.md' }
        ],
      }],
      '/backend/': [{
        text: '简介',
        items: [
          { text: '概述', link: '/backend/introduction.md' },
          { text: '快速开始', link: '/backend/get-started.md' },
        ],
      }],
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/netease-lcap/extension' }
    ],
    footer: {
      message: '',
      copyright: '版权所有 © 2024-present Codewave develop team'
    },
    docFooter: {
      prev: '上一页',
      next: '下一页'
    },

    outline: {
      label: '页面导航'
    },
    editLink: {
      pattern: 'https://github.com/netease-lcap/extension/edit/main/docs/:path',
      text: '在 GitHub 上编辑此页面'
    },

    lastUpdated: {
      text: '最后更新于',
      formatOptions: {
        dateStyle: 'short',
        timeStyle: 'medium'
      }
    },
    langMenuLabel: '多语言',
    returnToTopLabel: '回到顶部',
    sidebarMenuLabel: '菜单',
    darkModeSwitchLabel: '主题',
    lightModeSwitchTitle: '切换到浅色模式',
    darkModeSwitchTitle: '切换到深色模式'
  },
  lastUpdated: true,
})
