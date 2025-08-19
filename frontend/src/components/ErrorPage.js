import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, ArrowLeft, Sun, Moon, AlertCircle } from 'lucide-react';

const ErrorPage = () => {
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Load theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('todoAppTheme');
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
    }
  }, []);

  // Save theme to localStorage
  useEffect(() => {
    localStorage.setItem('todoAppTheme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleGoHome = () => {
    navigate('/');
  };

  const handleGoBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  // Theme classes
  const themeClasses = {
    background: isDarkMode 
      ? 'h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 overflow-hidden'
      : 'h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 overflow-hidden',
    
    container: isDarkMode
      ? 'bg-gray-800/30 backdrop-blur-xl border border-gray-700/50'
      : 'bg-white/30 backdrop-blur-xl border border-gray-200/50',
    
    text: {
      primary: isDarkMode ? 'text-white' : 'text-gray-900',
      secondary: isDarkMode ? 'text-gray-300' : 'text-gray-600',
      accent: isDarkMode ? 'text-indigo-400' : 'text-indigo-600',
      error: isDarkMode ? 'text-red-400' : 'text-red-600'
    },
    
    button: {
      primary: 'px-4 sm:px-6 lg:px-8 py-2 sm:py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 flex items-center justify-center gap-2 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5',
      secondary: isDarkMode
        ? 'px-4 sm:px-6 lg:px-8 py-2 sm:py-3 border border-gray-600 text-gray-300 rounded-xl hover:bg-gray-700/50 transition-all duration-300 flex items-center justify-center gap-2 font-medium'
        : 'px-4 sm:px-6 lg:px-8 py-2 sm:py-3 border border-gray-300 text-gray-600 rounded-xl hover:bg-gray-50 transition-all duration-300 flex items-center justify-center gap-2 font-medium'
    },
    
    themeToggle: isDarkMode
      ? 'p-2 sm:p-3 bg-gray-700 text-yellow-400 hover:bg-gray-600 rounded-full transition-all duration-200 shadow-lg hover:shadow-xl'
      : 'p-2 sm:p-3 bg-white text-gray-600 hover:bg-gray-50 rounded-full transition-all duration-200 shadow-lg hover:shadow-xl border border-gray-200'
  };

  return (
    <div className={themeClasses.background}>
      {/* Theme Toggle */}
      <div className="fixed top-4 right-4 sm:top-6 sm:right-6 z-50">
        <button
          onClick={toggleTheme}
          className={themeClasses.themeToggle}
          title={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
        >
          {isDarkMode ? <Sun size={18} className="sm:w-5 sm:h-5" /> : <Moon size={18} className="sm:w-5 sm:h-5" />}
        </button>
      </div>

      {/* Main Error Content */}
      <div className="flex items-center justify-center h-screen p-4 sm:p-6">
        <div className="w-full max-w-lg sm:max-w-2xl text-center">
          <div className={`${themeClasses.container} rounded-2xl sm:rounded-3xl shadow-2xl p-6 sm:p-8 lg:p-12`}>
            
            {/* Animated Error Icon */}
            <div className="mb-6 sm:mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 mb-4 sm:mb-6">
                <div className="relative">
                  <div className={`w-full h-full rounded-full bg-gradient-to-r from-red-500 to-pink-500 flex items-center justify-center animate-pulse`}>
                    <AlertCircle className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 text-white" />
                  </div>
                  {/* Floating rings animation */}
                  <div className="absolute inset-0 rounded-full border-2 border-red-400 animate-ping opacity-20"></div>
                  <div className="absolute inset-0 rounded-full border border-red-300 animate-pulse opacity-40"></div>
                </div>
              </div>
              
              {/* Large 404 Text */}
              <div className={`text-6xl sm:text-7xl lg:text-8xl xl:text-9xl font-bold ${themeClasses.text.error} mb-2 sm:mb-4`}>
                404
              </div>
            </div>

            {/* Error Message */}
            <div className="mb-6 sm:mb-8 lg:mb-10">
              <h1 className={`text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-3 sm:mb-4 lg:mb-6 ${themeClasses.text.primary}`}>
                Page Not Found
              </h1>
              <p className={`text-sm sm:text-base lg:text-lg xl:text-xl leading-relaxed ${themeClasses.text.secondary} px-2 sm:px-4`}>
                Oops! The page you're looking for seems to have wandered off into the digital wilderness. 
                <span className="block mt-2">Don't worry, we'll help you find your way back home!</span>
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <button
                onClick={handleGoHome}
                className={themeClasses.button.primary}
              >
                <Home size={16} className="sm:w-5 sm:h-5" />
                <span className="text-sm sm:text-base">Go Home</span>
              </button>
              
              {/* <button
                onClick={handleGoBack}
                className={themeClasses.button.secondary}
              >
                <ArrowLeft size={16} className="sm:w-5 sm:h-5" />
                <span className="text-sm sm:text-base">Go Back</span>
              </button> */}


            </div>

            {/* Decorative Elements */}
            <div className="mt-8 sm:mt-10 lg:mt-12">
              <div className="flex items-center justify-center space-x-2 sm:space-x-3">
                <div className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full ${isDarkMode ? 'bg-gray-600' : 'bg-gray-300'} animate-bounce`} style={{ animationDelay: '0ms' }}></div>
                <div className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full ${isDarkMode ? 'bg-gray-600' : 'bg-gray-300'} animate-bounce`} style={{ animationDelay: '150ms' }}></div>
                <div className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full ${isDarkMode ? 'bg-gray-600' : 'bg-gray-300'} animate-bounce`} style={{ animationDelay: '300ms' }}></div>
              </div>
            </div>

            {/* Footer Message */}
            <div className="mt-6 sm:mt-8">
              <p className={`text-xs sm:text-sm ${themeClasses.text.secondary}`}>
                Error Code: 404 | Page Not Found
              </p>
            </div>
          </div>

          {/* Floating Background Elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-4 -left-4 w-16 h-16 sm:w-24 sm:h-24 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float"></div>
            <div className="absolute -bottom-8 -right-4 w-20 h-20 sm:w-32 sm:h-32 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float-delayed"></div>
            <div className="absolute top-1/2 left-4 w-12 h-12 sm:w-20 sm:h-20 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float-slow"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;









////////////////////////////////////   Alternate Error Page Design   /////////////////////////////////////////


// // src/components/ErrorPage.js
// import React from 'react';
// import { XCircle } from 'lucide-react';
// import { Link } from 'react-router-dom';

// const ErrorPage = () => {
//   return (
//     <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-br from-red-50 via-white to-red-100">
//       <XCircle size={80} className="text-red-600 mb-6 animate-bounce" />
//       <h1 className="text-6xl font-bold text-red-700 mb-4">404</h1>
//       <p className="text-xl text-red-500 mb-8">Oops! Page not found.</p>
//       <Link
//         to="/"
//         className="px-6 py-3 bg-red-600 text-white rounded-xl shadow-lg hover:bg-red-700 transition-all duration-200"
//       >
//         Go to Home
//       </Link>
//     </div>
//   );
// };

// export default ErrorPage;











