'use client';

import React, { useState, useEffect } from 'react';

export const DraggableCountdown = () => {
  const [time, setTime] = useState({ hours: 0, minutes: 0, seconds: 0 });
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [showTooltip, setShowTooltip] = useState(false);

  // 设置初始位置在右下角
  useEffect(() => {
    setPosition({ 
      x: window.innerWidth - 100, 
      y: window.innerHeight - 100 
    });
  }, []);

  // 计算下班倒计时
  const calculateOffWorkCountdown = () => {
    const now = new Date();
    const offWork = new Date();
    offWork.setHours(18, 0, 0, 0); // 18:00 下班
    
    // 如果当前时间已经过了下班时间，则计算明天的下班时间
    if (now > offWork) {
      offWork.setDate(offWork.getDate() + 1);
    }
    
    const diff = offWork - now;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    
    return { hours, minutes, seconds };
  };

  // 更新时间
  useEffect(() => {
    const updateTime = () => {
      setTime(calculateOffWorkCountdown());
    };
    
    updateTime();
    const interval = setInterval(updateTime, 1000);
    
    return () => clearInterval(interval);
  }, []);

  // 格式化时间显示
  const formatTime = (value) => {
    return value.toString().padStart(2, '0');
  };

  // 拖拽事件处理
  const handleMouseDown = (e) => {
    // 防止在点击时触发拖拽
    if (e.target.classList.contains('draggable-countdown') || e.target.parentElement.classList.contains('countdown-display')) {
      setIsDragging(false);
      return;
    }
    
    setIsDragging(true);
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    });
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Touch 事件处理
  const handleTouchStart = (e) => {
    const touch = e.touches[0];
    setIsDragging(true);
    setDragStart({
      x: touch.clientX - position.x,
      y: touch.clientY - position.y
    });
  };

  const handleTouchMove = (e) => {
    if (isDragging) {
      const touch = e.touches[0];
      setPosition({
        x: touch.clientX - dragStart.x,
        y: touch.clientY - dragStart.y
      });
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  // 点击事件处理
  const handleClick = () => {
    // 如果没有拖拽，则视为点击
    if (!isDragging) {
      // 这里可以添加点击事件的处理逻辑
      console.log("倒计时球被点击了");
    }
  };

  // 鼠标悬停事件处理
  const handleMouseEnter = () => {
    setShowTooltip(true);
  };

  const handleMouseLeave = () => {
    setShowTooltip(false);
  };

  useEffect(() => {
    const handleMove = (e) => {
      if (isDragging) {
        handleMouseMove(e);
      }
    };
    
    const handleUp = () => {
      handleMouseUp();
    };
    
    const handleTouchMoveEvent = (e) => {
      if (isDragging) {
        handleTouchMove(e);
      }
    };
    
    const handleTouchEndEvent = () => {
      handleTouchEnd();
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMove);
      document.addEventListener('mouseup', handleUp);
      document.addEventListener('touchmove', handleTouchMoveEvent);
      document.addEventListener('touchend', handleTouchEndEvent);
    } else {
      document.removeEventListener('mousemove', handleMove);
      document.removeEventListener('mouseup', handleUp);
      document.removeEventListener('touchmove', handleTouchMoveEvent);
      document.removeEventListener('touchend', handleTouchEndEvent);
    }

    return () => {
      document.removeEventListener('mousemove', handleMove);
      document.removeEventListener('mouseup', handleUp);
      document.removeEventListener('touchmove', handleTouchMoveEvent);
      document.removeEventListener('touchend', handleTouchEndEvent);
    };
  }, [isDragging, dragStart]);


  return (
    <div
      className="draggable-countdown"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        cursor: isDragging ? 'grabbing' : 'grab'
      }}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {showTooltip && (
        <div className="countdown-tooltip">
          下班倒计时: {formatTime(time.hours)}小时{formatTime(time.minutes)}分钟{formatTime(time.seconds)}秒
        </div>
      )}
      <div className="countdown-display">
        <i className="fas fa-business-time"></i>
        <span>{formatTime(time.hours)}:{formatTime(time.minutes)}:{formatTime(time.seconds)}</span>
      </div>
    </div>
  );
};