import React, { useState, useEffect } from 'react';
import { Plus, Check, Trash2, Edit3, Save, X, Calendar, Star } from 'lucide-react';

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState('');
  const [filter, setFilter] = useState('all');

  // Load todos from memory on component mount
  useEffect(() => {
    const sampleTodos = [
      { id: 1, text: 'Complete React todo app', completed: false, important: true, createdAt: new Date() },
      { id: 2, text: 'Review project documentation', completed: false, important: false, createdAt: new Date() },
      { id: 3, text: 'Plan weekend activities', completed: true, important: false, createdAt: new Date() }
    ];
    setTodos(sampleTodos);
  }, []);

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

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    if (filter === 'important') return todo.important;
    return true;
  });

  const completedCount = todos.filter(todo => todo.completed).length;
  const activeCount = todos.filter(todo => !todo.completed).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200/50 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-6 py-6">
          <div className="text-center">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              My Tasks
            </h1>
            <p className="text-gray-600 mt-2">Stay organized, stay productive</p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 shadow-sm">
            <div className="text-2xl font-bold text-indigo-600">{todos.length}</div>
            <div className="text-sm text-gray-600">Total Tasks</div>
          </div>
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 shadow-sm">
            <div className="text-2xl font-bold text-amber-600">{activeCount}</div>
            <div className="text-sm text-gray-600">Active</div>
          </div>
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 shadow-sm">
            <div className="text-2xl font-bold text-green-600">{completedCount}</div>
            <div className="text-sm text-gray-600">Completed</div>
          </div>
        </div>

        {/* Add Todo */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 mb-8 border border-gray-200/50 shadow-sm">
          <div className="flex gap-3">
            <input
              type="text"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addTodo()}
              placeholder="Add a new task..."
              className="flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white/80"
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
              className={`px-4 py-2 rounded-xl font-medium transition-all duration-200 ${
                filter === key
                  ? 'bg-indigo-600 text-white shadow-lg'
                  : 'bg-white/70 text-gray-700 hover:bg-white hover:shadow-md border border-gray-200/50'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Todo List */}
        <div className="space-y-3">
          {filteredTodos.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-gray-400 mb-4">
                <Calendar size={64} className="mx-auto" />
              </div>
              <p className="text-gray-500 text-lg">
                {filter === 'all' ? 'No tasks yet. Add one above!' : `No ${filter} tasks found.`}
              </p>
            </div>
          ) : (
            filteredTodos.map(todo => (
              <div
                key={todo.id}
                className={`group bg-white/70 backdrop-blur-sm rounded-2xl p-5 border border-gray-200/50 shadow-sm hover:shadow-md transition-all duration-200 ${
                  todo.completed ? 'opacity-75' : ''
                }`}
              >
                <div className="flex items-center gap-4">
                  {/* Checkbox */}
                  <button
                    onClick={() => toggleTodo(todo.id)}
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                      todo.completed
                        ? 'bg-green-500 border-green-500 text-white'
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
                          className="flex-1 px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
                          <span className={`text-lg ${todo.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
                            {todo.text}
                          </span>
                          {todo.important && (
                            <Star className="w-4 h-4 text-amber-500 fill-current" />
                          )}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
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
                            : 'text-gray-400 hover:text-amber-500 hover:bg-amber-50'
                        }`}
                      >
                        <Star size={16} className={todo.important ? 'fill-current' : ''} />
                      </button>
                      <button
                        onClick={() => startEditing(todo.id, todo.text)}
                        className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                      >
                        <Edit3 size={16} />
                      </button>
                      <button
                        onClick={() => deleteTodo(todo.id)}
                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
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

        {/* Footer */}
        {todos.length > 0 && (
          <div className="text-center mt-12 text-gray-500">
            <p>You've got this! 💪</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TodoApp;