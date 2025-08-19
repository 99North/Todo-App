import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';

const Calendar = ({ todos, isDarkMode, onDateSelect }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Get todos for a specific date
  const getTodosForDate = (date) => {
    const dateStr = date.toDateString();
    return todos.filter(todo => todo.createdAt.toDateString() === dateStr);
  };

  // Check if a date has any todos
  const haseTodos = (date) => {
    return getTodosForDate(date).length > 0;
  };

  // Get the number of completed vs total todos for a date
  const getDateStats = (date) => {
    const dateTodos = getTodosForDate(date);
    const completed = dateTodos.filter(todo => todo.completed).length;
    const total = dateTodos.length;
    return { completed, total };
  };

  // Generate calendar days
  const generateCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());
    
    const days = [];
    const currentDateObj = new Date(startDate);
    
    for (let i = 0; i < 42; i++) {
      days.push(new Date(currentDateObj));
      currentDateObj.setDate(currentDateObj.getDate() + 1);
    }
    
    return days;
  };

  const navigateMonth = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + direction);
    setCurrentDate(newDate);
  };

  const handleDateClick = (date) => {
    setSelectedDate(date);
    if (onDateSelect) {
      onDateSelect(date, getTodosForDate(date));
    }
  };

  const isToday = (date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isSameMonth = (date) => {
    return date.getMonth() === currentDate.getMonth();
  };

  const isSelected = (date) => {
    return selectedDate && date.toDateString() === selectedDate.toDateString();
  };

  // Theme classes
  const themeClasses = {
    container: isDarkMode
      ? 'bg-gray-800/70 backdrop-blur-sm border border-gray-700/50'
      : 'bg-white/70 backdrop-blur-sm border border-gray-200/50',
    
    header: isDarkMode ? 'text-gray-200' : 'text-gray-800',
    
    navButton: isDarkMode
      ? 'p-2 hover:bg-gray-700 rounded-lg transition-colors text-gray-300 hover:text-white'
      : 'p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-600 hover:text-gray-800',
    
    dayHeader: isDarkMode ? 'text-gray-400' : 'text-gray-600',
    
    dayButton: (date) => {
      const stats = getDateStats(date);
      const hasTodos = haseTodos(date);
      const today = isToday(date);
      const selected = isSelected(date);
      const sameMonth = isSameMonth(date);
      
      let baseClasses = 'w-10 h-10 flex items-center justify-center text-sm rounded-lg transition-all duration-200 relative';
      
      if (!sameMonth) {
        return `${baseClasses} ${isDarkMode ? 'text-gray-600' : 'text-gray-400'}`;
      }
      
      if (selected) {
        return `${baseClasses} bg-indigo-600 text-white shadow-lg`;
      }
      
      if (today) {
        return `${baseClasses} ${isDarkMode ? 'bg-indigo-900/50 text-indigo-300 border border-indigo-600' : 'bg-indigo-100 text-indigo-700 border border-indigo-300'}`;
      }
      
      if (hasTodos) {
        if (stats.completed === stats.total) {
          // All todos completed - green
          return `${baseClasses} ${isDarkMode ? 'bg-green-900/30 text-green-300 hover:bg-green-900/50' : 'bg-green-100 text-green-700 hover:bg-green-200'}`;
        } else if (stats.completed > 0) {
          // Some todos completed - orange
          return `${baseClasses} ${isDarkMode ? 'bg-orange-900/30 text-orange-300 hover:bg-orange-900/50' : 'bg-orange-100 text-orange-700 hover:bg-orange-200'}`;
        } else {
          // No todos completed - red
          return `${baseClasses} ${isDarkMode ? 'bg-red-900/30 text-red-300 hover:bg-red-900/50' : 'bg-red-100 text-red-700 hover:bg-red-200'}`;
        }
      }
      
      return `${baseClasses} ${isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'}`;
    }
  };

  const calendarDays = generateCalendarDays();

  return (
    <div className={`${themeClasses.container} rounded-2xl p-6 shadow-sm`}>
      {/* Calendar Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <CalendarIcon className={`w-5 h-5 ${isDarkMode ? 'text-indigo-400' : 'text-indigo-600'}`} />
          <h3 className={`text-lg font-semibold ${themeClasses.header}`}>Calendar</h3>
        </div>
      </div>

      {/* Month Navigation */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => navigateMonth(-1)}
          className={themeClasses.navButton}
        >
          <ChevronLeft size={20} />
        </button>
        
        <h4 className={`text-xl font-bold ${themeClasses.header}`}>
          {months[currentDate.getMonth()]} {currentDate.getFullYear()}
        </h4>
        
        <button
          onClick={() => navigateMonth(1)}
          className={themeClasses.navButton}
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Days of Week Header */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {daysOfWeek.map(day => (
          <div key={day} className={`text-center text-xs font-medium p-2 ${themeClasses.dayHeader}`}>
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1">
        {calendarDays.map((date, index) => {
          const stats = getDateStats(date);
          return (
            <button
              key={index}
              onClick={() => handleDateClick(date)}
              className={themeClasses.dayButton(date)}
            >
              {date.getDate()}
              {haseTodos(date) && (
                <div className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-current opacity-60"></div>
              )}
            </button>
          );
        })}
      </div>

      {/* Legend */}
      <div className="mt-6 space-y-2">
        <div className={`text-xs font-medium ${themeClasses.dayHeader} mb-2`}>Legend:</div>
        <div className="flex flex-wrap gap-4 text-xs">
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded ${isDarkMode ? 'bg-green-900/30' : 'bg-green-100'}`}></div>
            <span className={themeClasses.dayHeader}>All Done</span>
          </div>
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded ${isDarkMode ? 'bg-orange-900/30' : 'bg-orange-100'}`}></div>
            <span className={themeClasses.dayHeader}>In Progress</span>
          </div>
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded ${isDarkMode ? 'bg-red-900/30' : 'bg-red-100'}`}></div>
            <span className={themeClasses.dayHeader}>Pending</span>
          </div>
        </div>
      </div>

      {/* Selected Date Info */}
      {selectedDate && (
        <div className="mt-4 pt-4 border-t border-gray-300/20">
          <div className={`text-sm font-medium ${themeClasses.header} mb-2`}>
            {selectedDate.toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </div>
          <div className={`text-xs ${themeClasses.dayHeader}`}>
            {getTodosForDate(selectedDate).length} task(s) on this date
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendar;
