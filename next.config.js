/** @type {import('next').NextConfig} */
const nextConfig = {
  // GitHub Pages 部署需要的配置
  output: 'export',
  distDir: 'out',
  basePath: process.env.GITHUB_PAGES ? '/work_helper' : '',
  assetPrefix: process.env.GITHUB_PAGES ? '/work_helper/' : '',
  
  reactStrictMode: true,
  swcMinify: true,
  // 配置页面路径
  pageExtensions: ['js', 'jsx', 'ts', 'tsx'],
  
  // 配置webpack
  webpack: (config, { isServer }) => {
    // 针对服务器端渲染的配置
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      };
    }
    
    return config;
  },
  
  // 环境变量
  env: {
    BASE_URL: process.env.BASE_URL || 'http://localhost:3000',
  },
  
  // 图片优化配置
  images: {
    domains: ['localhost'],
  },
};

module.exports = nextConfig;