# 🚀 Elegant Todo App

A beautiful, modern todo application built with React and Tailwind CSS. Designed for daily productivity with an elegant glassmorphism UI.

## ✨ Features

- **Beautiful Design**: Modern glassmorphism UI with smooth animations
- **Full CRUD Operations**: Add, edit, delete, and complete tasks
- **Smart Filtering**: View all, active, completed, or important tasks
- **Task Priorities**: Mark tasks as important with star icons
- **Live Statistics**: Real-time task counters
- **Responsive Design**: Works perfectly on all devices
- **Smooth Animations**: Delightful hover effects and transitions

## 🛠️ Tech Stack

- **React 18** - Modern React with hooks
- **Tailwind CSS** - For beautiful styling
- **Lucide React** - Beautiful icons
- **Modern JavaScript** - ES6+ features

## 📁 Project Structure

```
todo-app/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   └── TodoApp.js          # Main todo component
│   ├── App.js                  # Main app component
│   ├── index.js               # React entry point
│   └── index.css              # Global styles & Tailwind imports
├── package.json               # Dependencies
├── tailwind.config.js         # Tailwind configuration
├── postcss.config.js          # PostCSS configuration
└── README.md                  # This file
```

## 🚀 Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. **Create a new React app:**
   ```bash
   npx create-react-app elegant-todo-app
   cd elegant-todo-app
   ```

2. **Replace the default files with the provided files:**
   - Copy all the files I've created above into their respective locations
   - Make sure to create the `src/components/` folder

3. **Install dependencies:**
   ```bash
   npm install lucide-react tailwindcss postcss autoprefixer
   ```

4. **Start the development server:**
   ```bash
   npm start
   ```

5. **Open your browser:**
   Visit `http://localhost:3000` to see your beautiful todo app!

## 🎨 Customization

### Colors
Edit `tailwind.config.js` to change the color scheme:

```javascript
theme: {
  extend: {
    colors: {
      primary: {
        // Your custom colors here
      }
    }
  }
}
```

### Styling
Modify `src/index.css` for global styles and `src/components/TodoApp.js` for component-specific styling.

### Features
The main component is in `src/components/TodoApp.js` - you can easily add new features like:
- Due dates
- Categories
- Dark mode
- Drag and drop
- Local storage persistence

## 🎯 Usage

1. **Add Tasks**: Type in the input field and click "Add" or press Enter
2. **Complete Tasks**: Click the circle checkbox to mark tasks as done
3. **Edit Tasks**: Click the edit icon to modify task text
4. **Delete Tasks**: Click the trash icon to remove tasks
5. **Mark Important**: Click the star icon to prioritize tasks
6. **Filter Tasks**: Use the filter buttons to view specific task types

## 🤝 Contributing

Feel free to fork this project and make improvements! Some ideas:
- Add due dates functionality
- Implement categories/tags
- Add dark mode toggle
- Integrate with backend API
- Add task notes/descriptions

## 📱 Screenshots

The app features:
- Clean, modern interface with glassmorphism effects
- Beautiful gradient backgrounds
- Smooth hover animations
- Intuitive icons and interactions
- Responsive design for all devices

## 📄 License

This project is open source and available under the MIT License.

---

Built with ❤️ for productivity enthusiasts!