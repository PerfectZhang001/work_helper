'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';

const TopBar = ({ darkMode, toggleDarkMode }) => {
  const [encouragement, setEncouragement] = useState('');
  const [animationClass, setAnimationClass] = useState('');

  // 鼓励语句列表（关心打工人且不超过15个字）
  const encouragementMessages = [
    '工作顺利，心情美丽',
    '努力工作，好好生活',
    '你的付出终有回报',
    '今天也要元气满满',
    '工作虽忙，注意休息',
    '每一份努力都值得',
    '保持热爱，奔赴山海',
    '辛苦了，加油打工人',
    '你的努力我都看见',
    '愿你被世界温柔以待',
    '工作开心，生活舒心',
    '所有的努力都不会白费',
    '你很棒，继续加油',
    '今天的你也很耀眼',
    '愿你成为自己的光',
    '努力生活，快乐工作',
    '你的坚持终将美好',
    '相信自己，你可以的',
    '愿你前程似锦',
    '保持初心，砥砺前行'
  ];

  // 获取随机鼓励语句
  const getRandomEncouragement = useCallback(() => {
    const randomIndex = Math.floor(Math.random() * encouragementMessages.length);
    return encouragementMessages[randomIndex];
  }, []);

  // 初始化鼓励语句
  useEffect(() => {
    // 设置初始鼓励语
    setEncouragement(getRandomEncouragement());
    
    // 设置定时器，每5秒刷新一次鼓励语句
    const interval = setInterval(() => {
      setAnimationClass('slide-out');
      setTimeout(() => {
        setEncouragement(getRandomEncouragement());
        setAnimationClass('slide-in');
        setTimeout(() => {
          setAnimationClass('');
        }, 300);
      }, 300);
    }, 5000);
    
    // 清理函数
    return () => clearInterval(interval);
  }, [getRandomEncouragement]);

  return (
    <header className="top-bar">
      <div className="top-bar-container">
        <div className="top-bar-content">
          <div className="top-bar-logo">
            <Link href="/" className="top-bar-title-link no-underline">
              <h1 className="top-bar-title">
                <i className="fas fa-hard-hat top-bar-icon"></i>加油打工人
              </h1>
            </Link>
          </div>
          <div className="top-bar-encouragement">
            <p className={`encouragement-text ${animationClass}`}>{encouragement}</p>
          </div>
          <div className="top-bar-controls">
            <div className="search-wrapper">
              <input 
                type="text" 
                placeholder="搜索工具..." 
                className="search-input"
              />
              <i className="fas fa-search search-icon"></i>
            </div>
            <div className="top-bar-actions">
              <button 
                className="dark-mode-toggle" 
                onClick={typeof toggleDarkMode === 'function' ? toggleDarkMode : undefined}
                disabled={typeof toggleDarkMode !== 'function'}
              >
                <i className={`fas ${darkMode ? 'fa-sun' : 'fa-moon'} moon-icon`}></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopBar;