'use client';

import React, { useState, useEffect } from 'react';

export const CountdownBanner = () => {
  const [countdowns, setCountdowns] = useState([]);

  // 计算倒计时
  const calculateCountdown = (targetDate) => {
    const now = new Date();
    const diff = targetDate - now;

    if (diff <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds };
  };

  // 获取今天下班时间
  const getOffWorkTime = () => {
    const now = new Date();
    const offWork = new Date();
    offWork.setHours(18, 0, 0, 0); // 18:00 下班
    
    // 如果当前时间已经过了下班时间，则计算明天的0点开始计时
    if (now > offWork) {
      offWork.setDate(offWork.getDate() + 1);
      offWork.setHours(0, 0, 0, 0); // 次日0点
    }
    
    return offWork;
  };

  // 获取本周末时间
  const getWeekendTime = () => {
    const now = new Date();
    const weekend = new Date();
    
    // 计算到本周末的时间（周六 18:00）
    const daysUntilWeekend = 6 - now.getDay(); // 0是周日，6是周六
    weekend.setDate(now.getDate() + daysUntilWeekend);
    weekend.setHours(18, 0, 0, 0);
    
    // 如果当前时间已经过了周五18点，则计算下周一0点开始计时
    if (now.getDay() === 5 && now.getHours() >= 18) { // 周五18点后
      weekend.setDate(now.getDate() + 3); // 跳到下周一
      weekend.setHours(0, 0, 0, 0); // 下周一0点
    } else if (now.getDay() > 5 || (now.getDay() === 5 && now.getHours() >= 18)) { // 周六、周日或周五18点后
      weekend.setDate(now.getDate() + (8 - now.getDay())); // 下周一
      weekend.setHours(0, 0, 0, 0); // 下周一0点
    }
    
    return weekend;
  };

  // 获取下次发薪日时间（每月1号）
  const getPaydayTime = () => {
    const now = new Date();
    let payday = new Date();
    
    // 设置为当月1号
    payday.setDate(1);
    payday.setHours(0, 0, 0, 0);
    
    // 如果当前日期已经过了当月1号，则计算下个月的1号
    if (now > payday || now.getDate() > 1) {
      // 移动到下个月
      payday.setMonth(now.getMonth() + 1);
      payday.setDate(1);
    }
    
    return payday;
  };

  // 初始化倒计时
  useEffect(() => {
    const updateCountdowns = () => {
      const now = new Date();
      
      // 检查是否为每月1号
      const isPayday = now.getDate() === 1;
      
      // 检查是否处于下班时间（18:00之后）
      const isAfterWork = now.getHours() >= 18;
      
      // 检查是否处于周末时间（周五18点后到周日）
      const isWeekendPeriod = (now.getDay() === 5 && now.getHours() >= 18) || now.getDay() > 5;
      
      // 检查是否处于发薪日（每月1号）
      const isPaydayPeriod = isPayday;
      
      setCountdowns([
        {
          id: 'offWork',
          title: isAfterWork ? '下班啦！' : '下班啦',
          icon: 'fa-business-time',
          time: getOffWorkTime(),
          ...(isAfterWork ? { days: 0, hours: 0, minutes: 0, seconds: 0 } : calculateCountdown(getOffWorkTime()))
        },
        {
          id: 'weekend',
          title: isWeekendPeriod ? '周末啦！' : '周末啦',
          icon: 'fa-couch',
          time: getWeekendTime(),
          ...(isWeekendPeriod ? { days: 0, hours: 0, minutes: 0, seconds: 0 } : calculateCountdown(getWeekendTime()))
        },
        {
          id: 'payday',
          title: isPaydayPeriod ? '发薪啦！' : '发薪日',
          icon: 'fa-money-bill-trend-up',
          time: getPaydayTime(),
          ...(isPaydayPeriod ? { days: 0, hours: 0, minutes: 0, seconds: 0 } : calculateCountdown(getPaydayTime()))
        }
      ]);
    };

    updateCountdowns();
    const interval = setInterval(updateCountdowns, 1000);

    return () => clearInterval(interval);
  }, []);

  // 格式化时间显示
  const formatTime = (value) => {
    return value.toString().padStart(2, '0');
  };

  return (
    <div className="countdown-banner">
      <div className="countdown-container">
        <div className="countdown-content">
          <div className="countdown-items">
            {countdowns.map((countdown) => (
              <div key={countdown.id} className="countdown-item">
                <div className="countdown-icon-container">
                  <i className={`fas ${countdown.icon} countdown-icon`}></i>
                </div>
                <div className="countdown-text">
                  <span className="countdown-label">{countdown.title}</span>
                  <span className="countdown-number">
                    {countdown.days > 0 && `${formatTime(countdown.days)}天`}
                    {countdown.days > 0 && ' '}
                    {formatTime(countdown.hours)}:
                    {formatTime(countdown.minutes)}:
                    {formatTime(countdown.seconds)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};