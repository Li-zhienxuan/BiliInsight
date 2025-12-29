# Hajimi's Docs

基于 VitePress 构建的个人技术文档站点，托管于 Cloudflare Pages。

## 📚 文档内容

- **[双显卡背光控制避坑指南](docs/linux-backlight-guide.md)** - 华硕笔记本 Linux 双显卡背光调节问题完整解决方案
- **[显卡混合模式配置](docs/gpu-hybrid-setup.md)** - AMD + NVIDIA 双显卡系统配置指南

## 🚀 本地开发

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run docs:dev
```

访问: http://localhost:5173

### 构建生产版本

```bash
npm run docs:build
```

输出目录: `docs/.vitepress/dist/`

### 预览构建结果

```bash
npm run docs:preview
```

## 🌐 部署

### Cloudflare Pages (推荐)

#### 方式一: GitHub 集成 (自动部署)

1. 将代码推送到 GitHub
2. 登录 [Cloudflare Dashboard](https://dash.cloudflare.com/)
3. 创建新的 Pages 项目
4. 连接 GitHub 仓库
5. 配置构建设置:
   - **构建命令**: `npm run docs:build`
   - **构建输出目录**: `docs/.vitepress/dist`
   - **Node.js 版本**: 18 或更高

每次推送代码到 main 分支会自动触发部署。

#### 方式二: Wrangler CLI (手动部署)

```bash
# 安装 wrangler
npm install -g wrangler

# 登录 Cloudflare
wrangler login

# 构建并部署
npm run docs:build
wrangler pages publish docs/.vitepress/dist
```

#### 方式三: Direct Upload (通过脚本)

```bash
# 使用构建脚本
chmod +x .cloudflare/pages-build.sh
./.cloudflare/pages-build.sh

# 手动上传
wrangler pages publish docs/.vitepress/dist --project-name=my-docs
```

### GitHub Pages

```bash
# 构建文档
npm run docs:build

# 推送到 gh-pages 分支
git checkout -b gh-pages
cp -r docs/.vitepress/dist/* .
git add .
git commit -m "Deploy to GitHub Pages"
git push origin gh-pages
```

## 📁 项目结构

```
my-docs/
├── docs/                      # 文档源文件
│   ├── .vitepress/           # VitePress 配置
│   │   └── config.mts        # 站点配置
│   ├── index.md              # 首页
│   ├── linux-backlight-guide.md
│   ├── gpu-hybrid-setup.md
│   └── ...
├── .cloudflare/              # Cloudflare 相关配置
│   └── pages-build.sh        # 构建脚本
├── _headers                  # Cloudflare Pages HTTP 头部
├── _redirects                # Cloudflare Pages 重定向规则
├── wrangler.toml             # Wrangler 配置
├── package.json
└── README.md
```

## ⚙️ 配置说明

### VitePress 配置

编辑 `docs/.vitepress/config.mts`:

```typescript
export default defineConfig({
  title: "Hajimi's Docs",
  description: "技术文档与问题解决指南",
  themeConfig: {
    nav: [...],
    sidebar: [...]
  }
})
```

### Cloudflare Pages 配置

- **_headers**: 自定义 HTTP 响应头 (缓存、安全等)
- **_redirects**: URL 重定向规则
- **wrangler.toml**: Wrangler CLI 部署配置

## 🔧 常用命令

```bash
# 开发
npm run docs:dev

# 构建
npm run docs:build

# 预览构建结果
npm run docs:preview

# Cloudflare Pages 部署 (需要先登录)
wrangler pages publish docs/.vitepress/dist --project-name=my-docs

# 本地测试 Cloudflare Pages 配置
npx wrangler pages dev docs/.vitepress/dist
```

## 📊 性能优化

- ✅ 自动代码分割
- ✅ 静态资源压缩
- ✅ 智能缓存策略
- ✅ CDN 全球分发 (Cloudflare)
- ✅ 零配置自动 HTTPS

## 🌐 环境变量

创建 `.env` 文件 (本地开发):

```bash
NODE_ENV=development
```

在 Cloudflare Pages 中设置 (生产环境):
1. 进入项目 Settings
2. Environment variables
3. 添加变量

## 📝 更新日志

### 2025-12-29
- ✅ 添加双显卡背光控制指南
- ✅ 添加显卡混合模式配置
- ✅ 配置 Cloudflare Pages 部署

## 📄 许可证

MIT License

## 🔗 相关链接

- [VitePress 官方文档](https://vitepress.dev/)
- [Cloudflare Pages 文档](https://developers.cloudflare.com/pages/)
- [Wrangler CLI 文档](https://developers.cloudflare.com/pages/functions/wrangler-cli/)

---

**部署状态**: [![Cloudflare Pages](https://img.shields.io/badge/Cloudflare-Pages-orange)](https://pages.cloudflare.com/)
**构建状态**: [![Build](https://img.shields.io/badge/build-passing-brightgreen)]()
