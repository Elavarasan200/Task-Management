import { useEffect, useMemo, useState } from 'react'
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import { initialTasks } from './data/mockTasks'
import HomePage from './pages/HomePage'
import TaskFormPage from './pages/TaskFormPage'

function AppContent() {
  const [tasks, setTasks] = useState(() => {
    const storedTasks = window.localStorage.getItem('task-management-app-tasks')
    return storedTasks ? JSON.parse(storedTasks) : initialTasks
  })

  useEffect(() => {
    window.localStorage.setItem('task-management-app-tasks', JSON.stringify(tasks))
  }, [tasks])

  const addTask = (task) => {
    setTasks((current) => [task, ...current])
  }

  const updateTask = (taskId, updatedTask) => {
    setTasks((current) => current.map((task) => (task.id === taskId ? { ...task, ...updatedTask } : task)))
  }

  const deleteTask = (taskId) => {
    setTasks((current) => current.filter((task) => task.id !== taskId))
  }

  const stats = useMemo(
    () => ({
      total: tasks.length,
      pending: tasks.filter((task) => task.status === 'Pending').length,
      completed: tasks.filter((task) => task.status === 'Completed').length,
    }),
    [tasks],
  )

  return (
    <div className="app-shell">
      <nav className="top-nav">
        <div className="brand">TaskFlow</div>
        <div className="nav-links">
          <a href="#/">Dashboard</a>
          <a href="#/tasks/new">Create task</a>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<HomePage tasks={tasks} onDeleteTask={deleteTask} />} />
        <Route path="/tasks/new" element={<TaskFormPage tasks={tasks} onAddTask={addTask} onUpdateTask={updateTask} />} />
        <Route path="/tasks/:taskId/edit" element={<TaskFormPage tasks={tasks} onAddTask={addTask} onUpdateTask={updateTask} />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      <footer className="footer">
        <span>Tasks overview</span>
        <span>{stats.total} total • {stats.pending} pending • {stats.completed} completed</span>
      </footer>
    </div>
  )
}

export default function App() {
  return (
    <HashRouter>
      <AppContent />
    </HashRouter>
  )
}
