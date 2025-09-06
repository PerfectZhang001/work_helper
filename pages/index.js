import Head from 'next/head';
import { NextSeo } from 'next-seo';
import { useState } from 'react';
import { CountdownBanner } from '../components/CountdownBanner';
import { DraggableCountdown } from '../components/DraggableCountdown';
import TopBar from '../components/TopBar';
import Sidebar from '../components/Sidebar';
import PopularTools from '../components/PopularTools';
import JsonTool from './JsonTool';
import { useDarkMode } from '../contexts/DarkModeContext';

export default function Home() {
  const { darkMode, toggleDarkMode } = useDarkMode();
  const [currentPage, setCurrentPage] = useState('home'); // home or json
  const [sidebarVisible, setSidebarVisible] = useState(true); // 控制侧边栏显示/隐藏

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  // 处理页面切换
  const handleSetCurrentPage = (page) => {
    console.log('切换页面到:', page);
    setCurrentPage(page);
  };

  return (
    <div className={`app ${darkMode ? 'dark-mode' : ''}`}>
      <NextSeo
        title="首页 - 加油打工人"
        description="为打工人提供各种实用工具，包括JSON格式化、时间管理、效率提升等工具，帮助提高工作效率和生活质量"
        canonical="https://workhelper.example.com/"
        openGraph={{
          url: 'https://workhelper.example.com/',
          title: '加油打工人 - 实用工具平台',
          description: '为打工人提供各种实用工具，包括JSON格式化、时间管理、效率提升等工具，帮助提高工作效率和生活质量',
          images: [
            {
              url: 'https://workhelper.example.com/images/home-og.jpg',
              width: 1200,
              height: 630,
              alt: '加油打工人工具平台',
            },
          ],
          site_name: '加油打工人',
        }}
      />
      
      {currentPage === 'home' ? (
        <>
          {/* 顶部导航栏 */}
          <TopBar 
            darkMode={darkMode} 
            toggleDarkMode={toggleDarkMode} 
          />

          {/* Banner倒计时栏 */}
          <CountdownBanner />

          <div className="main-container">
            <div className="main-content">
              {/* 左侧边栏或恢复按钮 */}
              {sidebarVisible ? (
                <Sidebar setCurrentPage={handleSetCurrentPage} toggleSidebar={toggleSidebar} />
              ) : (
                <div className="sidebar-placeholder">
                  <button className="sidebar-toggle-button" onClick={toggleSidebar}>
                    <i className="fas fa-bars"></i>
                  </button>
                </div>
              )}
              
              {/* 中间页面区 */}
              <main className="main">
                <PopularTools setCurrentPage={handleSetCurrentPage} />
              </main>
            </div>
          </div>

          {/* 可拖拽倒计时小球 */}
          <DraggableCountdown />
        </>
      ) : (
        <JsonTool 
          darkMode={darkMode}
          toggleDarkMode={toggleDarkMode}
          setCurrentPage={handleSetCurrentPage}
          sidebarVisible={sidebarVisible}
          toggleSidebar={toggleSidebar}
        />
      )}
    </div>
  );
}