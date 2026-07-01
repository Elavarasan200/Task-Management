import { useTaskForm } from '../hooks/useTaskForm'

const defaultTask = {
  title: '',
  description: '',
  priority: 'Medium',
  status: 'Pending',
  dueDate: '',
}

export default function TaskForm({ initialValues = defaultTask, onSubmit, submitLabel = 'Save Task', onCancel }) {
  const { values, errors, handleChange, validate } = useTaskForm(initialValues)

  const handleSubmit = (event) => {
    event.preventDefault()
    if (validate()) {
      onSubmit(values)
    }
  }

  return (
    <form className="card form-card" onSubmit={handleSubmit}>
      <div className="field-group">
        <label htmlFor="title">Task title</label>
        <input
          id="title"
          name="title"
          value={values.title}
          onChange={handleChange}
          placeholder="Enter task title"
        />
        {errors.title && <span className="error-text">{errors.title}</span>}
      </div>

      <div className="field-group">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          value={values.description}
          onChange={handleChange}
          rows="4"
          placeholder="Describe the task"
        />
        {errors.description && <span className="error-text">{errors.description}</span>}
      </div>

      <div className="field-row">
        <div className="field-group">
          <label htmlFor="priority">Priority</label>
          <select id="priority" name="priority" value={values.priority} onChange={handleChange}>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
          {errors.priority && <span className="error-text">{errors.priority}</span>}
        </div>

        <div className="field-group">
          <label htmlFor="status">Status</label>
          <select id="status" name="status" value={values.status} onChange={handleChange}>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
          {errors.status && <span className="error-text">{errors.status}</span>}
        </div>
      </div>

      <div className="field-group">
        <label htmlFor="dueDate">Due date</label>
        <input id="dueDate" name="dueDate" type="date" value={values.dueDate} onChange={handleChange} />
      </div>

      <div className="button-row">
        <button className="primary-btn" type="submit">
          {submitLabel}
        </button>
        <button className="secondary-btn" type="button" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  )
}
