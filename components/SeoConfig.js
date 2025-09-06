import React from 'react';
import { DefaultSeo } from 'next-seo';

const SeoConfig = {
  defaultTitle: '加油打工人 - 实用工具平台',
  titleTemplate: '%s | 加油打工人',
  description: '为打工人提供各种实用工具，包括JSON格式化、时间管理、效率提升等工具，帮助提高工作效率和生活质量',
  canonical: 'https://workhelper.example.com',
  mobileAlternate: {
    media: 'only screen and (max-width: 640px)',
  },
  languageAlternates: [
    {
      hrefLang: 'zh-CN',
      href: 'https://workhelper.example.com/zh-cn',
    },
  ],
  openGraph: {
    type: 'website',
    locale: 'zh_CN',
    url: 'https://workhelper.example.com',
    title: '加油打工人 - 实用工具平台',
    description: '为打工人提供各种实用工具，包括JSON格式化、时间管理、效率提升等工具，帮助提高工作效率和生活质量',
    images: [
      {
        url: 'https://workhelper.example.com/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: '加油打工人',
      },
    ],
  },
  twitter: {
    handle: '@workhelper',
    site: '@workhelper',
    cardType: 'summary_large_image',
  },
};

export const SeoDefault = () => (
  <DefaultSeo {...SeoConfig} />
);

export default SeoConfig;