# Work Helper (加油打工人工具平台)

这是一个为打工人提供各种实用工具的平台，包括JSON格式化、时间管理、效率提升等工具，帮助提高工作效率和生活质量。

## 项目介绍

本项目已经从 Create React App 迁移至 Next.js，以提供更好的 SEO 支持和服务器端渲染能力。

### 主要特性

1. **SEO 优化**：
   - 使用 next-seo 进行页面 SEO 优化
   - 支持 Open Graph 和 Twitter Cards
   - 每个页面都有独立的 meta 信息

2. **现代化技术栈**：
   - Next.js 14 作为主要框架
   - React 18
   - Font Awesome 图标库
   - 响应式设计

3. **工具集合**：
   - JSON 格式化工具（美化、压缩、校验）
   - 倒计时工具（下班时间、周末、发薪日）
   - 更多工具持续添加中...

4. **用户体验**：
   - 暗黑/明亮主题切换
   - 拖拽式倒计时组件
   - 响应式布局适配各种设备

## 项目结构

```
.
├── components/           # React 组件
├── pages/               # Next.js 页面路由
├── public/              # 静态资源
└── styles/              # 全局样式
```

## 技术栈

- [Next.js](https://nextjs.org/) - React 框架
- [React](https://reactjs.org/) - UI 库
- [Font Awesome](https://fontawesome.com/) - 图标库
- [next-seo](https://github.com/garmeeh/next-seo) - SEO 优化

## 开发指南

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

访问 http://localhost:3000 查看应用。

### 构建生产版本

```bash
npm run build
```

### 启动生产服务器

```bash
npm start
```

## SEO 优化

本项目使用 next-seo 进行 SEO 优化，每个页面都配置了独立的：

- Title 和 Description
- Open Graph 信息
- Twitter Cards 信息
- Canonical URLs

## 部署

可以部署到以下平台：

- Vercel (推荐)
- Netlify
- 自定义 Node.js 服务器

## 许可证

MIT
