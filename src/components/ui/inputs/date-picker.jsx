import React, { useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Animatsiya variantlari
const variants = {
  calendar: {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        type: "spring", 
        stiffness: 300, 
        damping: 25,
        staggerChildren: 0.04,
        delayChildren: 0.1
      }
    },
    exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } }
  },
  item: {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 400, damping: 25 } }
  }
};

export default function DatePicker({ 
  onDateSelect = () => {}, 
  onRangeSelect = () => {}, 
  initialDate = new Date(),
  initialMode = 'single', // 'single' yoki 'range'
  festivalDates = [], 
  customDayClassNames = {},
  className = "",
  locale = "uz"
}) {
  const [currentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [currentView, setCurrentView] = useState('date'); // 'date', 'month', 'year'
  const [viewDate, setViewDate] = useState(initialDate);
  const [isRangeMode, setIsRangeMode] = useState(initialMode === 'range');
  const [dateRange, setDateRange] = useState({ start: null, end: null });
  
  // Tilni sozlash uchun konfiguratsiya
  const localeConfig = useMemo(() => {
    const locales = {
      uz: {
        monthNames: [
          "Yanvar", "Fevral", "Mart", "Aprel", "May", "Iyun",
          "Iyul", "Avgust", "Sentabr", "Oktabr", "Noyabr", "Dekabr"
        ],
        dayNames: ["Du", "Se", "Cho", "Pa", "Ju", "Sha", "Ya"],
        buttonLabels: {
          today: "Bugun",
          singleMode: "Bitta kunni tanlash",
          rangeMode: "Oraliq tanlash",
          selectDate: "Iltimos, sanani tanlang",
          selectRange: "Iltimos, sana oralig'ini tanlang",
          to: "—",
          legend: "Belgilar:",
          festivalDay: "Festival kuni",
          currentDay: "Bugungi kun",
          selectedDay: "Tanlangan kun"
        }
      },
      en: {
        monthNames: [
          "January", "February", "March", "April", "May", "June",
          "July", "August", "September", "October", "November", "December"
        ],
        dayNames: ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
        buttonLabels: {
          today: "Today",
          singleMode: "Single date",
          rangeMode: "Date range",
          selectDate: "Please select a date",
          selectRange: "Please select a date range",
          to: "—",
          legend: "Legend:",
          festivalDay: "Festival day",
          currentDay: "Current day",
          selectedDay: "Selected day"
        }
      }
    };
    
    return locales[locale] || locales.uz;
  }, [locale]);
  
  const { monthNames, dayNames, buttonLabels } = localeConfig;
  
  // Get days in month
  const getDaysInMonth = useCallback((year, month) => {
    return new Date(year, month + 1, 0).getDate();
  }, []);
  
  // Get first day of month (0 = Sunday)
  const getFirstDayOfMonth = useCallback((year, month) => {
    return new Date(year, month, 1).getDay();
  }, []);
  
  // Adjust day to start from Monday (0 = Monday)
  const adjustDay = useCallback((day) => {
    return day === 0 ? 6 : day - 1;
  }, []);
  
  // Check if a date is a festival date
  const isFestivalDate = useCallback((date) => {
    return festivalDates.some(festivalDate => 
      festivalDate.date.getDate() === date.getDate() && 
      festivalDate.date.getMonth() === date.getMonth() && 
      festivalDate.date.getFullYear() === date.getFullYear()
    );
  }, [festivalDates]);
  
  // Get festival title for a date
  const getFestivalTitle = useCallback((date) => {
    const festival = festivalDates.find(festivalDate => 
      festivalDate.date.getDate() === date.getDate() && 
      festivalDate.date.getMonth() === date.getMonth() && 
      festivalDate.date.getFullYear() === date.getFullYear()
    );
    return festival ? festival.title : "";
  }, [festivalDates]);
  
  // Check if date is today
  const isToday = useCallback((date) => {
    return date.getDate() === currentDate.getDate() && 
           date.getMonth() === currentDate.getMonth() && 
           date.getFullYear() === currentDate.getFullYear();
  }, [currentDate]);
  
  // Check if date is selected
  const isSelectedDate = useCallback((date) => {
    if (!selectedDate) return false;
    return date.getDate() === selectedDate.getDate() && 
           date.getMonth() === selectedDate.getMonth() && 
           date.getFullYear() === selectedDate.getFullYear();
  }, [selectedDate]);
  
  // Check if date is in range
  const isInRange = useCallback((date) => {
    if (!isRangeMode || !dateRange.start || !dateRange.end) return false;
    
    const time = date.getTime();
    return time >= dateRange.start.getTime() && time <= dateRange.end.getTime();
  }, [isRangeMode, dateRange]);
  
  // Check if date is start of range
  const isRangeStart = useCallback((date) => {
    if (!isRangeMode || !dateRange.start) return false;
    
    return date.getDate() === dateRange.start.getDate() && 
           date.getMonth() === dateRange.start.getMonth() && 
           date.getFullYear() === dateRange.start.getFullYear();
  }, [isRangeMode, dateRange]);
  
  // Check if date is end of range
  const isRangeEnd = useCallback((date) => {
    if (!isRangeMode || !dateRange.end) return false;
    
    return date.getDate() === dateRange.end.getDate() && 
           date.getMonth() === dateRange.end.getMonth() && 
           date.getFullYear() === dateRange.end.getFullYear();
  }, [isRangeMode, dateRange]);
  
  // Navigate to previous month/year
  const navigatePrev = useCallback(() => {
    if (currentView === 'date') {
      setViewDate(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
    } else if (currentView === 'month') {
      setViewDate(prev => new Date(prev.getFullYear() - 1, 0, 1));
    } else if (currentView === 'year') {
      const decade = Math.floor(viewDate.getFullYear() / 10) * 10;
      setViewDate(new Date(decade - 10, 0, 1));
    }
  }, [currentView, viewDate]);
  
  // Navigate to next month/year
  const navigateNext = useCallback(() => {
    if (currentView === 'date') {
      setViewDate(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
    } else if (currentView === 'month') {
      setViewDate(prev => new Date(prev.getFullYear() + 1, 0, 1));
    } else if (currentView === 'year') {
      const decade = Math.floor(viewDate.getFullYear() / 10) * 10;
      setViewDate(new Date(decade + 10, 0, 1));
    }
  }, [currentView, viewDate]);
  
  // Handle date click
  const handleDateClick = useCallback((date) => {
    if (isRangeMode) {
      if (!dateRange.start || (dateRange.start && dateRange.end)) {
        const newRange = { start: date, end: null };
        setDateRange(newRange);
      } else {
        // Ensure start is before end
        let newRange;
        if (date < dateRange.start) {
          newRange = { start: date, end: dateRange.start };
        } else {
          newRange = { ...dateRange, end: date };
        }
        setDateRange(newRange);
        onRangeSelect(newRange);
      }
    } else {
      setSelectedDate(date);
      onDateSelect(date);
    }
  }, [isRangeMode, dateRange, onDateSelect, onRangeSelect]);
  
  // Handle month click
  const handleMonthClick = useCallback((month) => {
    setViewDate(prev => new Date(prev.getFullYear(), month, 1));
    setCurrentView('date');
  }, []);
  
  // Handle year click
  const handleYearClick = useCallback((year) => {
    setViewDate(prev => new Date(year, prev.getMonth(), 1));
    setCurrentView('month');
  }, []);
  
  // Show current view title
  const viewTitle = useMemo(() => {
    if (currentView === 'date') {
      return `${monthNames[viewDate.getMonth()]} ${viewDate.getFullYear()}`;
    } else if (currentView === 'month') {
      return viewDate.getFullYear().toString();
    } else {
      const decade = Math.floor(viewDate.getFullYear() / 10) * 10;
      return `${decade} - ${decade + 9}`;
    }
  }, [currentView, viewDate, monthNames]);
  
  // Toggle between date/month/year views
  const toggleView = useCallback(() => {
    setCurrentView(prev => {
      if (prev === 'date') return 'month';
      if (prev === 'month') return 'year';
      return 'date';
    });
  }, []);
  
  // Reset to today
  const goToToday = useCallback(() => {
    const today = new Date();
    setViewDate(today);
    if (!isRangeMode) {
      setSelectedDate(today);
      onDateSelect(today);
    }
    setCurrentView('date');
  }, [isRangeMode, onDateSelect]);
  
  // Toggle range selection mode
  const toggleRangeMode = useCallback(() => {
    setIsRangeMode(prev => {
      const newMode = !prev;
      if (newMode) {
        setSelectedDate(null);
        return true;
      } else {
        setDateRange({ start: null, end: null });
        return false;
      }
    });
  }, []);
  
  // Format date for display
  const formatDate = useCallback((date) => {
    if (!date) return "";
    return `${date.getDate()} ${monthNames[date.getMonth()]} ${date.getFullYear()}`;
  }, [monthNames]);
  
  // Get custom day class name
  const getCustomDayClass = useCallback((date) => {
    if (!customDayClassNames) return "";
    
    const dateString = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    return customDayClassNames[dateString] || "";
  }, [customDayClassNames]);
  
  // Render calendar days
  const renderDays = useCallback(() => {
    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = adjustDay(getFirstDayOfMonth(year, month));
    
    const days = [];
    
    // Add previous month's days
    const prevMonthDays = getDaysInMonth(year, month - 1);
    for (let i = 0; i < firstDay; i++) {
      const date = new Date(year, month - 1, prevMonthDays - firstDay + i + 1);
      days.push(
        <motion.div key={`prev-${i}`} className="opacity-30" variants={variants.item}>
          <button
            onClick={() => handleDateClick(date)}
            className={`w-8 h-8 rounded-full text-sm hover:bg-amber-100 ${getCustomDayClass(date)}`}
            aria-label={formatDate(date)}
          >
            {prevMonthDays - firstDay + i + 1}
          </button>
        </motion.div>
      );
    }
    
    // Add current month's days
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(year, month, i);
      const isCurrentDate = isToday(date);
      const isSelected = isSelectedDate(date);
      const isFestival = isFestivalDate(date);
      const isStart = isRangeStart(date);
      const isEnd = isRangeEnd(date);
      const inRange = isInRange(date);
      const customClass = getCustomDayClass(date);
      
      days.push(
        <motion.div 
          key={`current-${i}`} 
          className={`relative ${inRange && !isStart && !isEnd ? 'bg-amber-100' : ''} ${customClass}`}
          variants={variants.item}
        >
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => handleDateClick(date)}
            className={`
              w-8 h-8 rounded-full text-sm relative z-10
              ${isCurrentDate ? 'ring-2 ring-amber-500' : ''}
              ${isSelected || isStart || isEnd ? 'bg-amber-500 text-white' : isFestival ? 'bg-amber-200' : 'hover:bg-amber-100'}
            `}
            aria-label={formatDate(date)}
            aria-selected={isSelected || isStart || isEnd}
          >
            {i}
          </motion.button>
          {isFestival && (
            <motion.span 
              initial={{ scale: 0 }} 
              animate={{ scale: 1 }}
              className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-amber-500 rounded-full"
            />
          )}
        </motion.div>
      );
    }
    
    // Add next month's days
    const totalDaysShown = Math.ceil((firstDay + daysInMonth) / 7) * 7;
    const nextMonthDays = totalDaysShown - daysInMonth - firstDay;
    
    for (let i = 1; i <= nextMonthDays; i++) {
      const date = new Date(year, month + 1, i);
      days.push(
        <motion.div key={`next-${i}`} className="opacity-30" variants={variants.item}>
          <button
            onClick={() => handleDateClick(date)}
            className={`w-8 h-8 rounded-full text-sm hover:bg-amber-100 ${getCustomDayClass(date)}`}
            aria-label={formatDate(date)}
          >
            {i}
          </button>
        </motion.div>
      );
    }
    
    return days;
  }, [
    viewDate, getDaysInMonth, adjustDay, getFirstDayOfMonth, handleDateClick, 
    isToday, isSelectedDate, isFestivalDate, isRangeStart, isRangeEnd, isInRange,
    getCustomDayClass, formatDate
  ]);
  
  // Render months
  const renderMonths = useCallback(() => {
    return monthNames.map((month, index) => (
      <motion.button
        key={month}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => handleMonthClick(index)}
        className={`
          p-2 rounded-lg text-center
          ${viewDate.getMonth() === index && viewDate.getFullYear() === currentDate.getFullYear() ? 'bg-amber-500 text-white' : 'hover:bg-amber-100'}
        `}
        variants={variants.item}
      >
        {month}
      </motion.button>
    ));
  }, [monthNames, handleMonthClick, viewDate, currentDate]);
  
  // Render years
  const renderYears = useCallback(() => {
    const decade = Math.floor(viewDate.getFullYear() / 10) * 10;
    return Array.from({ length: 12 }, (_, i) => {
      const year = decade + i - 1;
      return (
        <motion.button
          key={year}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => handleYearClick(year)}
          className={`
            p-2 rounded-lg text-center
            ${i === 0 || i === 11 ? 'text-gray-400' : ''}
            ${year === currentDate.getFullYear() ? 'bg-amber-500 text-white' : 'hover:bg-amber-100'}
          `}
          variants={variants.item}
        >
          {year}
        </motion.button>
      );
    });
  }, [viewDate, handleYearClick, currentDate]);
  
  return (
    <div className={`bg-white rounded-xl shadow-lg overflow-hidden ${className}`}>
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-amber-700">Qovun Sayli</h2>
          <div className="flex space-x-2">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleRangeMode}
              className={`px-3 py-1 rounded-full text-sm ${isRangeMode ? 'bg-amber-500 text-white' : 'bg-gray-100 hover:bg-amber-100'}`}
            >
              {isRangeMode ? buttonLabels.rangeMode : buttonLabels.singleMode}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={goToToday}
              className="px-3 py-1 rounded-full text-sm bg-gray-100 hover:bg-amber-100"
            >
              {buttonLabels.today}
            </motion.button>
          </div>
        </div>
        
        {/* Selected date or range display */}
        <motion.div 
          className="mb-4 px-3 py-2 bg-amber-50 rounded-lg"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
        >
          {isRangeMode ? (
            <p className="text-amber-800">
              {dateRange.start && dateRange.end ? 
                `${formatDate(dateRange.start)} ${buttonLabels.to} ${formatDate(dateRange.end)}` : 
                dateRange.start ? 
                  `${formatDate(dateRange.start)} ${buttonLabels.to} ...` : 
                  buttonLabels.selectRange}
            </p>
          ) : (
            <p className="text-amber-800">
              {selectedDate ? formatDate(selectedDate) : buttonLabels.selectDate}
            </p>
          )}
          {selectedDate && isFestivalDate(selectedDate) && !isRangeMode && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-1 text-sm text-amber-600"
            >
              {getFestivalTitle(selectedDate)}
            </motion.div>
          )}
        </motion.div>
        
        {/* Calendar header */}
        <div className="flex justify-between items-center mb-4">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={navigatePrev}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-amber-100"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={toggleView}
            className="text-lg font-medium text-amber-800 px-2 py-1 rounded hover:bg-amber-100"
          >
            {viewTitle}
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={navigateNext}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-amber-100"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </motion.button>
        </div>
        
        {/* Calendar body */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentView}
            variants={variants.calendar}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="overflow-hidden"
          >
            {currentView === 'date' && (
              <div>
                <div className="grid grid-cols-7 gap-1 mb-2">
                  {dayNames.map(day => (
                    <motion.div 
                      key={day} 
                      variants={variants.item}
                      className="text-center text-sm font-medium text-amber-800"
                    >
                      {day}
                    </motion.div>
                  ))}
                </div>
                <div className="grid grid-cols-7 gap-1">
                  {renderDays()}
                </div>
              </div>
            )}
            
            {currentView === 'month' && (
              <div className="grid grid-cols-3 gap-2">
                {renderMonths()}
              </div>
            )}
            
            {currentView === 'year' && (
              <div className="grid grid-cols-3 gap-2">
                {renderYears()}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
        
        {/* Legend */}
        <motion.div 
          className="mt-4 pt-4 border-t border-gray-200"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <h3 className="text-sm font-medium text-amber-800 mb-2">{buttonLabels.legend}</h3>
          <div className="flex flex-wrap gap-4">
            <motion.div 
              className="flex items-center"
              initial={{ x: -10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.3 }}
            >
              <div className="w-4 h-4 rounded-full bg-amber-200 mr-2"></div>
              <span className="text-sm">{buttonLabels.festivalDay}</span>
            </motion.div>
            <motion.div 
              className="flex items-center"
              initial={{ x: -10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.3 }}
            >
              <div className="w-4 h-4 rounded-full ring-2 ring-amber-500 mr-2"></div>
              <span className="text-sm">{buttonLabels.currentDay}</span>
            </motion.div>
            <motion.div 
              className="flex items-center"
              initial={{ x: -10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.3 }}
            >
              <div className="w-4 h-4 rounded-full bg-amber-500 mr-2"></div>
              <span className="text-sm">{buttonLabels.selectedDay}</span>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}