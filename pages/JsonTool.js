import Head from 'next/head';
import { NextSeo } from 'next-seo';
import { useState, useRef, useEffect } from 'react';
import TopBar from '../components/TopBar';
import Sidebar from '../components/Sidebar';
import { DraggableCountdown } from '../components/DraggableCountdown';
import { useDarkMode } from '../contexts/DarkModeContext';

const JsonTool = ({ setCurrentPage: initialSetCurrentPage, sidebarVisible: initialSidebarVisible, toggleSidebar: initialToggleSidebar }) => {
  const { darkMode, toggleDarkMode } = useDarkMode();
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [formatType, setFormatType] = useState('beautify'); // beautify, minify, validate
  const [copied, setCopied] = useState(false);
  const [sidebarVisible, setSidebarVisible] = useState(initialSidebarVisible || true);
  const textareaRef = useRef(null);
  const toggleSidebar = initialToggleSidebar || (() => setSidebarVisible(!sidebarVisible));
  
  // 设置当前页面的本地实现
  const setCurrentPage = initialSetCurrentPage || ((page) => {
    // 在独立页面中，我们需要使用路由来切换页面
    if (typeof window !== 'undefined') {
      if (page === 'home') {
        window.location.href = '/';
      }
    }
  });

  // 格式化JSON
  const beautifyJson = (jsonString) => {
    try {
      const parsed = JSON.parse(jsonString);
      return JSON.stringify(parsed, null, 2);
    } catch (err) {
      throw new Error(`JSON格式错误: ${err.message}`);
    }
  };

  // 压缩JSON
  const minifyJson = (jsonString) => {
    try {
      const parsed = JSON.parse(jsonString);
      return JSON.stringify(parsed);
    } catch (err) {
      throw new Error(`JSON格式错误: ${err.message}`);
    }
  };

  // 校验JSON
  const validateJson = (jsonString) => {
    try {
      JSON.parse(jsonString);
      return { valid: true, message: 'JSON格式正确' };
    } catch (err) {
      return { valid: false, message: `JSON格式错误: ${err.message}` };
    }
  };

  // 处理输入变化
  const handleInputChange = (e) => {
    const value = e.target.value;
    setInput(value);
    setError('');
    
    try {
      if (formatType === 'beautify') {
        setOutput(beautifyJson(value));
      } else if (formatType === 'minify') {
        setOutput(minifyJson(value));
      } else if (formatType === 'validate') {
        const result = validateJson(value);
        if (result.valid) {
          setOutput('JSON格式正确');
        } else {
          throw new Error(result.message);
        }
      }
    } catch (err) {
      setError(err.message);
      setOutput('');
    }
  };

  // 切换格式化类型
  const handleFormatTypeChange = (type) => {
    setFormatType(type);
    setError('');
    
    try {
      if (type === 'beautify') {
        setOutput(beautifyJson(input));
      } else if (type === 'minify') {
        setOutput(minifyJson(input));
      } else if (type === 'validate') {
        const result = validateJson(input);
        if (result.valid) {
          setOutput('JSON格式正确');
        } else {
          setError(result.message);
          setOutput('');
        }
      }
    } catch (err) {
      setError(err.message);
      setOutput('');
    }
  };

  // 复制到剪贴板
  const copyToClipboard = () => {
    if (output) {
      navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // 清空内容
  const clearContent = () => {
    setInput('');
    setOutput('');
    setError('');
  };

  // 修复setCurrentPage函数，确保可以返回首页
  const handleSetCurrentPage = (page) => {
    if (page === 'home') {
      if (typeof window !== 'undefined') {
        // 获取基础路径，考虑部署在子目录的情况
        const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
        window.location.href = `${basePath}/`;
      }
    }
  };

  return (
    <div className={`app ${darkMode ? 'dark-mode' : ''}`}>
      <NextSeo
        title="JSON工具 - 加油打工人"
        description="在线JSON格式化、压缩、校验工具，帮助开发者提高工作效率"
        canonical="https://workhelper.example.com/json"
      />
      
      {/* 顶部导航栏 */}
      <TopBar 
        darkMode={darkMode} 
        toggleDarkMode={toggleDarkMode} 
      />

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
            <div className="json-tool">
              <div className="tool-header">
                <h1 className="tool-title">JSON工具</h1>
                <p className="tool-description">格式化、压缩和校验JSON数据</p>
              </div>
              
              <div className="tool-content">
                <div className="tool-controls">
                  <div className="format-buttons">
                    <button 
                      className={`format-button ${formatType === 'beautify' ? 'active' : ''}`}
                      onClick={() => handleFormatTypeChange('beautify')}
                    >
                      格式化
                    </button>
                    <button 
                      className={`format-button ${formatType === 'minify' ? 'active' : ''}`}
                      onClick={() => handleFormatTypeChange('minify')}
                    >
                      压缩
                    </button>
                    <button 
                      className={`format-button ${formatType === 'validate' ? 'active' : ''}`}
                      onClick={() => handleFormatTypeChange('validate')}
                    >
                      校验
                    </button>
                  </div>
                  
                  <div className="action-buttons">
                    <button 
                      className="action-button"
                      onClick={copyToClipboard}
                      disabled={!output}
                    >
                      {copied ? '已复制' : '复制'}
                    </button>
                    <button 
                      className="action-button"
                      onClick={clearContent}
                    >
                      清空
                    </button>
                  </div>
                </div>
                
                <div className="editor-container">
                  <div className="input-section">
                    <h3 className="section-title">输入</h3>
                    <textarea
                      ref={textareaRef}
                      className="json-editor"
                      value={input}
                      onChange={handleInputChange}
                      placeholder="在此输入JSON数据..."
                    />
                  </div>
                  
                  <div className="output-section">
                    <h3 className="section-title">处理结果</h3>
                    {error ? (
                      <div className="error-message">
                        <i className="fas fa-exclamation-circle error-icon"></i>
                        <span>{error}</span>
                      </div>
                    ) : (
                      <textarea
                        className="json-editor"
                        value={output}
                        readOnly
                        placeholder="处理结果将显示在这里..."
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>

      {/* 可拖拽倒计时小球 */}
      <DraggableCountdown />
    </div>
  );
};

export default JsonTool;