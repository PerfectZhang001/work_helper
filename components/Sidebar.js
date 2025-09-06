'use client';

import React, { memo } from 'react';
import PropTypes from 'prop-types';

/**
 * 侧边栏组件，显示工具分类和工具列表
 * @param {Object} props - 组件属性
 * @param {Function} props.setCurrentPage - 设置当前页面的回调函数
 * @param {Function} props.toggleSidebar - 切换侧边栏的回调函数
 */
const Sidebar = ({ setCurrentPage, toggleSidebar }) => {
  // 工具分类数据
  const toolCategories = [
    {
      id: 'dev-tools',
      title: '开发工具',
      icon: 'fa-code',
      tools: [
        { id: 'json', title: 'JSON工具', icon: 'fa-brackets-curly' },
        { id: 'code-format', title: '代码格式化', icon: 'fa-text-width' },
        { id: 'regex', title: '正则表达式', icon: 'fa-hashtag' },
      ]
    },
    {
      id: 'productivity',
      title: '效率工具',
      icon: 'fa-bolt',
      tools: [
        { id: 'timer', title: '番茄钟', icon: 'fa-business-time' },
        { id: 'todo', title: '待办事项', icon: 'fa-tasks' },
        { id: 'notes', title: '快速笔记', icon: 'fa-note-sticky' },
      ]
    },
    {
      id: 'converters',
      title: '转换工具',
      icon: 'fa-arrow-right-arrow-left',
      tools: [
        { id: 'time', title: '时间转换', icon: 'fa-clock' },
        { id: 'number', title: '数字进制', icon: 'fa-calculator' },
        { id: 'unit', title: '单位换算', icon: 'fa-ruler' },
      ]
    },
    {
      id: 'text-tools',
      title: '文本工具',
      icon: 'fa-font',
      tools: [
        { id: 'case', title: '大小写转换', icon: 'fa-text-height' },
        { id: 'replace', title: '文本替换', icon: 'fa-spell-check' },
        { id: 'count', title: '字数统计', icon: 'fa-calculator' },
      ]
    }
  ];

  const handleToolClick = (toolId) => {
    if (toolId === 'json') {
      // 获取基础路径，考虑部署在子目录的情况
      const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
      window.location.href = `${basePath}/JsonTool`;
    }
    // 其他工具可以类似处理
    // TODO: 添加其他工具的处理逻辑
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-content">
        <div className="sidebar-header">
          <h2 className="sidebar-title">
            <i className="fas fa-toolbox sidebar-icon"></i>
            实用工具箱
          </h2>
          <button className="sidebar-close" onClick={toggleSidebar}>
            <i className="fas fa-times"></i>
          </button>
        </div>
        
        <div className="tool-categories">
          {toolCategories.map((category) => (
            <details key={category.id} className="category-group" open>
              <summary className="category-summary">
                <span className="category-text">
                  <i className={`fas ${category.icon} category-icon`}></i>
                  {category.title}
                </span>
                <i className="fas fa-chevron-down category-arrow"></i>
              </summary>
              <div className="category-items">
                {category.tools.map((tool) => (
                  <div
                    key={tool.id}
                    className="category-item"
                    onClick={() => handleToolClick(tool.id)}
                  >
                    <i className={`fas ${tool.icon}`}></i>
                    {tool.title}
                  </div>
                ))}
              </div>
            </details>
          ))}
        </div>
      </div>
    </aside>
  );
};

// 添加组件属性类型检查
Sidebar.propTypes = {
  setCurrentPage: PropTypes.func.isRequired,
  toggleSidebar: PropTypes.func.isRequired
};

// 使用React.memo优化组件渲染
export default memo(Sidebar);