import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sun, Moon, CheckCircle, Zap, Shield, Calendar, User, Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';

const LandingPage = () => {
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  // Load theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('landingPageTheme');
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
    }
  }, []);

  // Save theme to localStorage
  useEffect(() => {
    localStorage.setItem('landingPageTheme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const toggleAuthMode = () => {
    setIsSignUp(!isSignUp);
    setFormData({ name: '', email: '', password: '', confirmPassword: '' });
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    navigate('/app');
  };

  const handleDemoLogin = () => {
    navigate('/app');
  };

  const features = [
    {
      icon: CheckCircle,
      title: "Smart Organization",
      description: "Organize your tasks with intelligent categories and priority levels"
    },
    {
      icon: Calendar,
      title: "Calendar Integration",
      description: "Visualize your tasks with built-in calendar highlighting"
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Instant search, real-time updates, and smooth interactions"
    },
    {
      icon: Shield,
      title: "Secure & Private",
      description: "Your data is encrypted and stored securely"
    }
  ];

  const themeClasses = {
    background: isDarkMode 
      ? 'min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900'
      : 'min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50',
    
    container: isDarkMode
      ? 'bg-gray-800/30 backdrop-blur-xl border border-gray-700/50'
      : 'bg-white/30 backdrop-blur-xl border border-gray-200/50',
    
    card: isDarkMode
      ? 'bg-gray-800/70 backdrop-blur-sm border border-gray-700/50'
      : 'bg-white/70 backdrop-blur-sm border border-gray-200/50',
    
    text: {
      primary: isDarkMode ? 'text-white' : 'text-gray-900',
      secondary: isDarkMode ? 'text-gray-300' : 'text-gray-600',
      accent: isDarkMode ? 'text-indigo-400' : 'text-indigo-600'
    },
    
    input: isDarkMode
      ? 'w-full px-4 py-3 rounded-xl border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-gray-700/50 text-white placeholder-gray-400'
      : 'w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white/50 text-gray-900 placeholder-gray-500',
    
    button: {
      primary: 'px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 flex items-center gap-2 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5',
      secondary: isDarkMode
        ? 'px-6 py-3 border border-gray-600 text-gray-300 rounded-xl hover:bg-gray-700/50 transition-all duration-300'
        : 'px-6 py-3 border border-gray-300 text-gray-600 rounded-xl hover:bg-gray-50 transition-all duration-300',
      demo: 'px-6 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg hover:from-green-600 hover:to-emerald-600 transition-all duration-200 font-medium'
    },
    
    themeToggle: isDarkMode
      ? 'p-3 bg-gray-700 text-yellow-400 hover:bg-gray-600 rounded-full transition-all duration-200 shadow-lg hover:shadow-xl'
      : 'p-3 bg-white text-gray-600 hover:bg-gray-50 rounded-full transition-all duration-200 shadow-lg hover:shadow-xl border border-gray-200'
  };

  return (
    <div className={themeClasses.background}>
      {/* Theme Toggle */}
      <div className="fixed top-6 right-6 z-50">
        <button
          onClick={toggleTheme}
          className={themeClasses.themeToggle}
          title={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
        >
          {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>

      <div className="flex flex-col lg:flex-row min-h-screen">
        {/* Left Side - Hero Section */}
        <div className="flex-1 flex items-center justify-center p-6 sm:p-8 lg:p-12 order-2 lg:order-1">
          <div className="max-w-2xl text-center lg:text-left">
            {/* Logo/Brand */}
            <div className="mb-8 flex justify-center lg:justify-start">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center">
                  <CheckCircle className="w-7 h-7 text-white" />
                </div>
                <h1 className={`text-3xl font-bold ${themeClasses.text.primary}`}>
                  TaskFlow
                </h1>
              </div>
            </div>

            {/* Hero Content */}
            <div className="space-y-6">
              <h2 className={`text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight ${themeClasses.text.primary}`}>
                Organize Your Life,
                <span className="block bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  One Task at a Time
                </span>
              </h2>
              
              <p className={`text-base sm:text-lg lg:text-xl leading-relaxed ${themeClasses.text.secondary}`}>
                The most intuitive todo app designed for productivity enthusiasts. 
                Beautiful interface, powerful features, and seamless synchronization 
                across all your devices.
              </p>

              {/* Demo Button */}
              <div className="pt-4">
                <button
                  onClick={handleDemoLogin}
                  className={themeClasses.button.demo}
                >
                  Try Demo Version
                </button>
              </div>

              {/* Features Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
                {features.map((feature, index) => (
                  <div
                    key={index}
                    className={`${themeClasses.card} rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1`}
                  >
                    <feature.icon className={`w-8 h-8 ${themeClasses.text.accent} mb-3`} />
                    <h3 className={`font-semibold mb-2 ${themeClasses.text.primary}`}>
                      {feature.title}
                    </h3>
                    <p className={`text-sm ${themeClasses.text.secondary}`}>
                      {feature.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Auth Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-8 lg:p-12 order-1 lg:order-2">
          <div className={`${themeClasses.container} rounded-3xl shadow-2xl p-6 sm:p-8 w-full max-w-md`}>
            {/* Form Header */}
            <div className="text-center mb-8">
              <h3 className={`text-xl sm:text-2xl font-bold mb-2 ${themeClasses.text.primary}`}>
                {isSignUp ? 'Create Account' : 'Welcome Back'}
              </h3>
              <p className={themeClasses.text.secondary}>
                {isSignUp 
                  ? 'Start your productivity journey today' 
                  : 'Sign in to continue to TaskFlow'
                }
              </p>
            </div>

            {/* Toggle Buttons */}
            <div className="flex mb-6 p-1 bg-gray-200/50 dark:bg-gray-700/50 rounded-xl">
              <button
                onClick={() => setIsSignUp(false)}  
                className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all duration-200 ${
                  !isSignUp
                    ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
                }`}
              >
                Sign In
              </button>
              <button
                onClick={() => setIsSignUp(true)}   
                className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isSignUp
                    ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
                }`}
              >
                Sign Up
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {isSignUp && (
                <div className="relative">
                  <User className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${themeClasses.text.secondary}`} />
                  <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`${themeClasses.input} pl-12`}
                    required={isSignUp}
                  />
                </div>
              )}

              <div className="relative">
                <Mail className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${themeClasses.text.secondary}`} />
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`${themeClasses.input} pl-12`}
                  required
                />
              </div>

              <div className="relative">
                <Lock className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${themeClasses.text.secondary}`} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`${themeClasses.input} pl-12 pr-12`}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${themeClasses.text.secondary}`}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              {isSignUp && (
                <div className="relative">
                  <Lock className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${themeClasses.text.secondary}`} />
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className={`${themeClasses.input} pl-12`}
                    required={isSignUp}
                  />
                </div>
              )}

              <button
                type="submit"
                className={`w-full ${themeClasses.button.primary} justify-center`}
              >
                {isSignUp ? 'Create Account' : 'Sign In'}
                <ArrowRight size={20} />
              </button>

              <div className="text-center pt-4">
                <p className={themeClasses.text.secondary}>
                  {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
                  <button
                    type="button"
                    onClick={toggleAuthMode}
                    className={`${themeClasses.text.accent} font-medium hover:underline`}
                  >
                    {isSignUp ? 'Sign In' : 'Sign Up'}
                  </button>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
