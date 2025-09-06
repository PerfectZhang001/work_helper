import React, { createContext, useContext, useState, useEffect } from 'react';
import { getDarkModeFromStorage, saveDarkModeToStorage } from '../utils/darkModeUtils';

// 创建暗黑模式上下文
const DarkModeContext = createContext();

// 暗黑模式提供者组件
export const DarkModeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);

  // 初始化暗黑模式状态
  useEffect(() => {
    // 首先尝试从本地存储获取状态
    const storedDarkMode = getDarkModeFromStorage();
    if (storedDarkMode !== null) {
      setDarkMode(storedDarkMode);
      return;
    }
    
    // 如果本地存储没有有效的状态，则根据时间自动设置
    const hour = new Date().getHours();
    // 晚上7点到早上7点之间默认使用暗黑模式
    const isNightTime = hour >= 19 || hour < 7;
    setDarkMode(isNightTime);
  }, []);

  // 当暗黑模式状态改变时，保存到本地存储
  useEffect(() => {
    saveDarkModeToStorage(darkMode);
  }, [darkMode]);

  // 切换暗黑模式
  const toggleDarkMode = () => {
    setDarkMode(prevMode => !prevMode);
  };

  return (
    <DarkModeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};

// 自定义hook用于访问暗黑模式状态
export const useDarkMode = () => {
  const context = useContext(DarkModeContext);
  if (!context) {
    throw new Error('useDarkMode must be used within a DarkModeProvider');
  }
  return context;
};