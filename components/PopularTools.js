'use client';

import React from 'react';

const PopularTools = ({ setCurrentPage }) => {
  const tools = [
    {
      id: 'json',
      title: 'JSON工具',
      description: 'JSON格式化、压缩、校验',
      icon: 'fa-code',
    },
    {
      id: 'time',
      title: '时间管理',
      description: '倒计时、提醒事项',
      icon: 'fa-clock',
    },
    {
      id: 'calc',
      title: '计算器',
      description: '科学计算、单位换算',
      icon: 'fa-calculator',
    },
    {
      id: 'text',
      title: '文本处理',
      description: '文本格式化、转换',
      icon: 'fa-file-lines',
    },
    {
      id: 'image',
      title: '图像处理',
      description: '图片压缩、格式转换',
      icon: 'fa-image',
    },
    {
      id: 'color',
      title: '颜色工具',
      description: '调色板、颜色转换',
      icon: 'fa-palette',
    },
  ];

  const handleToolClick = (toolId) => {
    if (toolId === 'json') {
      window.location.href = '/JsonTool';
    }
    // 其他工具可以类似处理
  };

  return (
    <section className="tools-section">
      <h2 className="tools-title">热门工具</h2>
      <div className="tools-grid">
        {tools.map((tool) => (
          <div 
            key={tool.id} 
            className="tool-card"
            onClick={() => handleToolClick(tool.id)}
          >
            <div className="tool-icon">
              <i className={`fas ${tool.icon}`}></i>
            </div>
            <h3 className="tool-card-title">{tool.title}</h3>
            <p className="tool-card-description">{tool.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PopularTools;