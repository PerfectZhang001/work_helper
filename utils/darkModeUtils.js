/**
 * 暗黑模式工具函数
 * 用于管理暗黑模式状态的本地存储读写
 */

// 从本地存储获取暗黑模式状态
export const getDarkModeFromStorage = () => {
  if (typeof window !== 'undefined') {
    try {
      const stored = localStorage.getItem('darkMode');
      if (stored) {
        const { value, timestamp } = JSON.parse(stored);
        // 检查是否在12小时内（12小时 = 12 * 60 * 60 * 1000 毫秒）
        const isExpired = Date.now() - timestamp > 12 * 60 * 60 * 1000;
        if (!isExpired) {
          return value;
        } else {
          // 过期则清除存储
          localStorage.removeItem('darkMode');
        }
      }
    } catch (e) {
      console.error('读取暗黑模式状态时出错:', e);
    }
  }
  return null;
};

// 将暗黑模式状态保存到本地存储
export const saveDarkModeToStorage = (value) => {
  if (typeof window !== 'undefined') {
    try {
      const data = {
        value,
        timestamp: Date.now()
      };
      localStorage.setItem('darkMode', JSON.stringify(data));
    } catch (e) {
      console.error('保存暗黑模式状态时出错:', e);
    }
  }
};