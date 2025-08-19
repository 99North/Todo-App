import React, { useState, useEffect } from 'react';
import { Plus, Check, Trash2, Edit3, Save, X, Calendar as CalendarIcon, Star, Moon, Sun, Search } from 'lucide-react';
import Calendar from './Calendar';

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState('');
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDateTodos, setSelectedDateTodos] = useState([]);

  // Load todos and theme from localStorage on component mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('todoAppTheme');
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
    }

    const sampleTodos = [
      { id: 1, text: 'Complete React todo app', completed: false, important: true, createdAt: new Date() },
      { id: 2, text: 'Review project documentation', completed: false, important: false, createdAt: new Date('2025-08-18') },
      { id: 3, text: 'Plan weekend activities', completed: true, important: false, createdAt: new Date('2025-08-17') },
      { id: 4, text: 'Grocery shopping', completed: false, important: false, createdAt: new Date('2025-08-16') },
      { id: 5, text: 'Call dentist appointment', completed: true, important: true, createdAt: new Date('2025-08-15') },
      { id: 6, text: 'Update portfolio website', completed: false, important: false, createdAt: new Date('2025-08-14') }
    ];
    setTodos(sampleTodos);
  }, []);

  // Save theme to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('todoAppTheme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const toggleCalendar = () => {
    setShowCalendar(!showCalendar);
  };

  const handleDateSelect = (date, todosForDate) => {
    setSelectedDateTodos(todosForDate);
  };

  // Close calendar when clicking outside
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      setShowCalendar(false);
    }
  };

  // Clear search
  const clearSearch = () => {
    setSearchQuery('');
  };

  // Handle search button click
  const handleSearch = () => {
    document.querySelector('input[placeholder="Search tasks..."]')?.focus();
  };

  // Handle search on Enter key
  const handleSearchKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const addTodo = () => {
    if (newTodo.trim()) {
      const todo = {
        id: Date.now(),
        text: newTodo.trim(),
        completed: false,
        important: false,
        createdAt: new Date()
      };
      setTodos([todo, ...todos]);
      setNewTodo('');
    }
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const toggleImportant = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, important: !todo.important } : todo
    ));
  };

  const startEditing = (id, text) => {
    setEditingId(id);
    setEditingText(text);
  };

  const saveEdit = () => {
    if (editingText.trim()) {
      setTodos(todos.map(todo =>
        todo.id === editingId ? { ...todo, text: editingText.trim() } : todo
      ));
    }
    setEditingId(null);
    setEditingText('');
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditingText('');
  };

  // Updated filtering logic to include search
  const filteredTodos = todos.filter(todo => {
    // First apply the status filter
    let matchesFilter = true;
    if (filter === 'active') matchesFilter = !todo.completed;
    else if (filter === 'completed') matchesFilter = todo.completed;
    else if (filter === 'important') matchesFilter = todo.important;

    // Then apply the search filter
    let matchesSearch = true;
    if (searchQuery.trim()) {
      matchesSearch = todo.text.toLowerCase().includes(searchQuery.toLowerCase());
    }

    return matchesFilter && matchesSearch;
  });

  const completedCount = todos.filter(todo => todo.completed).length;
  const activeCount = todos.filter(todo => !todo.completed).length;

  // Theme classes
  const themeClasses = {
    background: isDarkMode 
      ? 'h-screen overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900'
      : 'h-screen overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-purple-50',
    
    header: isDarkMode
      ? 'bg-gray-800/80 backdrop-blur-sm border-b border-gray-700/50'
      : 'bg-white/80 backdrop-blur-sm border-b border-gray-200/50',
    
    headerText: isDarkMode ? 'text-white' : 'text-gray-600',
    
    card: isDarkMode
      ? 'bg-gray-800/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 shadow-sm'
      : 'bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 shadow-sm',
    
    input: isDarkMode
      ? 'flex-1 px-4 py-3 rounded-xl border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-gray-700/80 text-white placeholder-gray-400'
      : 'flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white/80',
    
    searchInput: isDarkMode
      ? 'w-[500px] pl-12 pr-10 py-3 rounded-xl border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-gray-700/80 text-white placeholder-gray-400'
      : 'flex-1 pl-12 pr-10 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white/80',
    
    filterButton: (isActive) => isDarkMode
      ? `px-4 py-2 rounded-xl font-medium transition-all duration-200 ${
          isActive
            ? 'bg-indigo-600 text-white shadow-lg'
            : 'bg-gray-700/70 text-gray-300 hover:bg-gray-700 hover:shadow-md border border-gray-600/50'
        }`
      : `px-4 py-2 rounded-xl font-medium transition-all duration-200 ${
          isActive
            ? 'bg-indigo-600 text-white shadow-lg'
            : 'bg-white/70 text-gray-700 hover:bg-white hover:shadow-md border border-gray-200/50'
        }`,
    
    todoItem: isDarkMode
      ? 'group bg-gray-800/70 backdrop-blur-sm rounded-2xl p-5 border border-gray-700/50 shadow-sm hover:shadow-md transition-all duration-200'
      : 'group bg-white/70 backdrop-blur-sm rounded-2xl p-5 border border-gray-200/50 shadow-sm hover:shadow-md transition-all duration-200',
    
    todoText: (completed) => isDarkMode
      ? `text-lg ${completed ? 'line-through text-gray-500' : 'text-gray-200'}`
      : `text-lg ${completed ? 'line-through text-gray-500' : 'text-gray-800'}`,
    
    todoDate: isDarkMode ? 'text-xs text-gray-400 mt-1' : 'text-xs text-gray-500 mt-1',
    
    editInput: isDarkMode
      ? 'flex-1 px-3 py-2 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-700 text-white'
      : 'flex-1 px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500',
    
    emptyState: isDarkMode ? 'text-gray-500' : 'text-gray-500',
    emptyIcon: isDarkMode ? 'text-gray-600' : 'text-gray-400',
    
    footer: isDarkMode ? 'text-gray-400' : 'text-gray-500',
    
    themeButton: isDarkMode
      ? 'p-3 bg-gray-700 text-yellow-400 hover:bg-gray-600 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl'
      : 'p-3 bg-white text-gray-600 hover:bg-gray-50 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl border border-gray-200',

    calendarButton: (isActive) => isDarkMode
      ? `p-3 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl ${
          isActive 
            ? 'bg-indigo-600 text-white' 
            : 'bg-gray-700 text-indigo-400 hover:bg-gray-600'
        }`
      : `p-3 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl border ${
          isActive
            ? 'bg-indigo-600 text-white border-indigo-600'
            : 'bg-white text-indigo-600 hover:bg-gray-50 border-gray-200'
        }`,

    overlay: isDarkMode
      ? 'fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4'
      : 'fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center p-4',

    clearButton: isDarkMode
      ? 'absolute right-3 top-1/2 transform -translate-y-1/2 p-1 text-gray-400 hover:text-gray-300 transition-colors'
      : 'absolute right-3 top-1/2 transform -translate-y-1/2 p-1 text-gray-500 hover:text-gray-700 transition-colors',

    searchButton: isDarkMode
      ? 'px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-200 flex items-center gap-2 font-medium shadow-lg hover:shadow-xl'
      : 'px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-200 flex items-center gap-2 font-medium shadow-lg hover:shadow-xl'
  };

  return (
    <div className={themeClasses.background}>
      {/* Header - Fixed at top */}
      <div className={`${themeClasses.header} sticky top-0 z-10`}>
        <div className="max-w-4xl mx-auto px-6 py-6">
          <div className="flex justify-between items-center">
            <div className="text-center flex-1">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                TaskFlow
              </h1>
              <p className={`${themeClasses.headerText} mt-2`}>Stay organized, stay productive</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={toggleCalendar}
                className={themeClasses.calendarButton(showCalendar)}
                title="Toggle calendar"
              >
                <CalendarIcon size={20} />
              </button>
              <button
                onClick={toggleTheme}
                className={themeClasses.themeButton}
                title={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
              >
                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Scrollable Content Area */}
      <div className="flex-1 overflow-y-auto scrollbar-hide" style={{ height: 'calc(100vh - 140px - 60px)' }}>
        <div className="max-w-4xl mx-auto px-6 py-8">
          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className={themeClasses.card}>
              <div className="text-2xl font-bold text-indigo-600">{todos.length}</div>
              <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Total Tasks</div>
            </div>
            <div className={themeClasses.card}>
              <div className="text-2xl font-bold text-amber-600">{activeCount}</div>
              <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Active</div>
            </div>
            <div className={themeClasses.card}>
              <div className="text-2xl font-bold text-green-600">{completedCount}</div>
              <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Completed</div>
            </div>
          </div>

          {/* Search Bar */}
          <div className={`${themeClasses.card} mb-3 mx-auto`}>
            <div className="flex gap-3">
              <div className="relative flex-1">
                <Search 
                  className={`absolute left-4 top-1/2 transform -translate-y-1/2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} 
                  size={20} 
                />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={handleSearchKeyPress}
                  placeholder="Search tasks..."
                  className={themeClasses.searchInput}
                />
                {searchQuery && (
                  <button
                    onClick={clearSearch}
                    className={themeClasses.clearButton}
                    title="Clear search"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>
              <button
                onClick={handleSearch}
                className={themeClasses.searchButton}
                title="Focus search"
              >
                <Search size={13} />
                Search
              </button>
            </div>
            {searchQuery && (
              <div className={`mt-3 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Found {filteredTodos.length} task(s) matching "{searchQuery}"
              </div>
            )}
          </div>

          {/* Add Todo */}
          <div className={`${themeClasses.card} mb-8`}>
            <div className="flex gap-3">
              <input
                type="text"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addTodo()}
                placeholder="Add a new task..."
                className={themeClasses.input}
              />
              <button
                onClick={addTodo}
                className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 flex items-center gap-2 font-medium shadow-lg hover:shadow-xl"
              >
                <Plus size={20} />
                Add
              </button>
            </div>
          </div>

          {/* Filters */}
          <div className="flex gap-2 mb-8 flex-wrap">
            {[
              { key: 'all', label: 'All Tasks' },
              { key: 'active', label: 'Active' },
              { key: 'completed', label: 'Completed' },
              { key: 'important', label: 'Important' }
            ].map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setFilter(key)}
                className={themeClasses.filterButton(filter === key)}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Todo List */}
          <div className="space-y-3 pb-8">
            {filteredTodos.length === 0 ? (
              <div className="text-center py-16">
                <div className={`${themeClasses.emptyIcon} mb-4`}>
                  {searchQuery ? (
                    <Search size={64} className="mx-auto" />
                  ) : (
                    <CalendarIcon size={64} className="mx-auto" />
                  )}
                </div>
                <p className={`${themeClasses.emptyState} text-lg`}>
                  {searchQuery 
                    ? `No tasks found matching "${searchQuery}"`
                    : filter === 'all' 
                      ? 'No tasks yet. Add one above!' 
                      : `No ${filter} tasks found.`
                  }
                </p>
                {searchQuery && (
                  <button
                    onClick={clearSearch}
                    className="mt-4 px-4 py-2 text-indigo-600 hover:text-indigo-700 underline"
                  >
                    Clear search
                  </button>
                )}
              </div>
            ) : (
              filteredTodos.map(todo => (
                <div
                  key={todo.id}
                  className={`${themeClasses.todoItem} ${todo.completed ? 'opacity-75' : ''}`}
                >
                  <div className="flex items-center gap-4">
                    {/* Checkbox */}
                    <button
                      onClick={() => toggleTodo(todo.id)}
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                        todo.completed
                          ? 'bg-green-500 border-green-500 text-white'
                          : isDarkMode
                            ? 'border-gray-500 hover:border-indigo-500'
                            : 'border-gray-300 hover:border-indigo-500'
                      }`}
                    >
                      {todo.completed && <Check size={14} />}
                    </button>

                    {/* Task Content */}
                    <div className="flex-1 min-w-0">
                      {editingId === todo.id ? (
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={editingText}
                            onChange={(e) => setEditingText(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && saveEdit()}
                            className={themeClasses.editInput}
                            autoFocus
                          />
                          <button
                            onClick={saveEdit}
                            className="px-3 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                          >
                            <Save size={16} />
                          </button>
                          <button
                            onClick={cancelEdit}
                            className="px-3 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                          >
                            <X size={16} />
                          </button>
                        </div>
                      ) : (
                        <div>
                          <div className="flex items-center gap-2">
                            <span className={themeClasses.todoText(todo.completed)}>
                              {todo.text}
                            </span>
                            {todo.important && (
                              <Star className="w-4 h-4 text-amber-500 fill-current" />
                            )}
                          </div>
                          <div className={themeClasses.todoDate}>
                            Added {todo.createdAt.toLocaleDateString()}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Actions */}
                    {editingId !== todo.id && (
                      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <button
                          onClick={() => toggleImportant(todo.id)}
                          className={`p-2 rounded-lg transition-colors ${
                            todo.important
                              ? 'text-amber-500 hover:bg-amber-50'
                              : isDarkMode
                                ? 'text-gray-400 hover:text-amber-500 hover:bg-amber-900/20'
                                : 'text-gray-400 hover:text-amber-500 hover:bg-amber-50'
                          }`}
                        >
                          <Star size={16} className={todo.important ? 'fill-current' : ''} />
                        </button>
                        <button
                          onClick={() => startEditing(todo.id, todo.text)}
                          className={`p-2 rounded-lg transition-colors ${
                            isDarkMode
                              ? 'text-gray-400 hover:text-indigo-400 hover:bg-indigo-900/20'
                              : 'text-gray-400 hover:text-indigo-600 hover:bg-indigo-50'
                          }`}
                        >
                          <Edit3 size={16} />
                        </button>
                        <button
                          onClick={() => deleteTodo(todo.id)}
                          className={`p-2 rounded-lg transition-colors ${
                            isDarkMode
                              ? 'text-gray-400 hover:text-red-400 hover:bg-red-900/20'
                              : 'text-gray-400 hover:text-red-600 hover:bg-red-50'
                          }`}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Fixed Footer */}
      <div className={`${isDarkMode ? 'bg-gray-800/80' : 'bg-white/80'} backdrop-blur-sm border-t ${isDarkMode ? 'border-gray-700/50' : 'border-gray-200/50'} fixed bottom-0 left-0 right-0 z-10`}>
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className={`text-center ${themeClasses.footer}`}>
            {/* <p>Made by Debi Prasad</p> */}
          </div>
        </div>
      </div>

      {/* Calendar Popup */}
      {showCalendar && (
        <div 
          className={themeClasses.overlay}
          onClick={handleOverlayClick}
        >
          <div className="w-full max-w-md max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-200">
            <Calendar 
              todos={todos}
              isDarkMode={isDarkMode}
              onDateSelect={handleDateSelect}
            />
          </div>
        </div>
      )}

      {/* Custom scrollbar hiding styles */}
      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default TodoApp;
