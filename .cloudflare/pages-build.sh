#!/bin/bash

# Cloudflare Pages 构建脚本
# 用于自动构建和部署 VitePress 文档

set -e

echo "🚀 开始构建 VitePress 文档..."

# 检查 node_modules
if [ ! -d "node_modules" ]; then
    echo "📦 安装依赖..."
    npm install
fi

# 构建文档
echo "🔨 构建文档..."
npm run docs:build

echo "✅ 构建完成!"
echo "📁 构建输出目录: docs/.vitepress/dist/"
