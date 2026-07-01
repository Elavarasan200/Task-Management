import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import TaskTable from '../components/TaskTable'

const pageSize = 5

export default function HomePage({ tasks, onDeleteTask }) {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')
  const [sortConfig, setSortConfig] = useState({ key: 'title', direction: 'asc' })
  const [currentPage, setCurrentPage] = useState(1)

  const filteredTasks = useMemo(() => {
    const query = searchTerm.trim().toLowerCase()
    if (!query) return tasks

    return tasks.filter((task) =>
      [task.title, task.description, task.priority, task.status]
        .join(' ')
        .toLowerCase()
        .includes(query),
    )
  }, [searchTerm, tasks])

  const sortedTasks = useMemo(() => {
    const clone = [...filteredTasks]
    clone.sort((first, second) => {
      const firstValue = first[sortConfig.key]
      const secondValue = second[sortConfig.key]

      if (typeof firstValue === 'string' && typeof secondValue === 'string') {
        return sortConfig.direction === 'asc'
          ? firstValue.localeCompare(secondValue)
          : secondValue.localeCompare(firstValue)
      }

      return sortConfig.direction === 'asc' ? firstValue - secondValue : secondValue - firstValue
    })

    return clone
  }, [filteredTasks, sortConfig])

  const totalPages = Math.max(1, Math.ceil(sortedTasks.length / pageSize))
  const paginatedTasks = sortedTasks.slice((currentPage - 1) * pageSize, currentPage * pageSize)

  useEffect(() => {
    setCurrentPage(1)
  }, [searchTerm])

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages)
    }
  }, [currentPage, totalPages])

  const handleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc',
    }))
  }

  return (
    <div className="page">
      <header className="page-header">
        <div>
          <p className="eyebrow">Task management</p>
          <h1>Plan, track, and ship work faster</h1>
          <p className="page-subtitle">Create tasks, sort priorities, and search through the backlog in moments.</p>
        </div>
        <Link className="primary-btn" to="/tasks/new">
          + New Task
        </Link>
      </header>

      <div className="stats-grid">
        <div className="card stat-card">
          <span>Total tasks</span>
          <strong>{tasks.length}</strong>
        </div>
        <div className="card stat-card">
          <span>Pending</span>
          <strong>{tasks.filter((task) => task.status === 'Pending').length}</strong>
        </div>
        <div className="card stat-card">
          <span>Completed</span>
          <strong>{tasks.filter((task) => task.status === 'Completed').length}</strong>
        </div>
      </div>

      <div className="card toolbar-card">
        <label className="field-group search-box" htmlFor="search">
          <span>Search tasks</span>
          <input
            id="search"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Search by title, status, or priority"
          />
        </label>
      </div>

      {paginatedTasks.length > 0 ? (
        <TaskTable
          tasks={paginatedTasks}
          sortConfig={sortConfig}
          onSort={handleSort}
          onEdit={(task) => navigate(`/tasks/${task.id}/edit`)}
          onDelete={onDeleteTask}
        />
      ) : (
        <div className="card empty-card">No tasks match your search yet.</div>
      )}

      <div className="pagination-row">
        <button className="secondary-btn" type="button" onClick={() => setCurrentPage((page) => Math.max(1, page - 1))} disabled={currentPage === 1}>
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button className="secondary-btn" type="button" onClick={() => setCurrentPage((page) => Math.min(totalPages, page + 1))} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  )
}
