import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Hajimi's Docs",
  description: "技术文档与问题解决指南",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/' },
      { text: 'Linux 指南', link: '/linux-backlight-guide' }
    ],

    sidebar: [
      {
        text: 'Linux 笔记本配置',
        items: [
          {
            text: '双显卡背光控制避坑指南',
            link: '/linux-backlight-guide'
          },
          {
            text: '显卡混合模式配置',
            link: '/gpu-hybrid-setup'
          }
        ]
      },
      {
        text: 'VitePress 示例',
        items: [
          { text: 'Markdown 示例', link: '/markdown-examples' },
          { text: 'API 示例', link: '/api-examples' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ],

    footer: {
      message: '基于 MIT 许可发布',
      copyright: 'Copyright © 2025-present Hajimi'
    }
  }
})
