export default function TaskTable({ tasks, sortConfig, onSort, onEdit, onDelete }) {
  const renderSortIcon = (key) => {
    if (sortConfig.key !== key) return '↕'
    return sortConfig.direction === 'asc' ? '↑' : '↓'
  }

  return (
    <div className="table-card">
      <table>
        <thead>
          <tr>
            <th>
              <button type="button" className="sort-button" onClick={() => onSort('title')}>
                Title {renderSortIcon('title')}
              </button>
            </th>
            <th>Status</th>
            <th>
              <button type="button" className="sort-button" onClick={() => onSort('priority')}>
                Priority {renderSortIcon('priority')}
              </button>
            </th>
            <th>Due Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id}>
              <td>
                <strong>{task.title}</strong>
                <div className="task-description">{task.description}</div>
              </td>
              <td>
                <span className={`status-pill ${task.status.toLowerCase().replace(/\s+/g, '-')}`}>
                  {task.status}
                </span>
              </td>
              <td>{task.priority}</td>
              <td>{task.dueDate ? new Date(task.dueDate).toLocaleDateString() : '—'}</td>
              <td>
                <div className="action-group">
                  <button type="button" className="secondary-btn" onClick={() => onEdit(task)}>
                    Edit
                  </button>
                  <button type="button" className="danger-btn" onClick={() => onDelete(task.id)}>
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
