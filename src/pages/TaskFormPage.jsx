import { useMemo } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import TaskForm from '../components/TaskForm'

export default function TaskFormPage({ tasks, onAddTask, onUpdateTask }) {
  const navigate = useNavigate()
  const { taskId } = useParams()

  const isEditing = Boolean(taskId)
  const task = useMemo(() => tasks.find((item) => item.id === taskId), [taskId, tasks])

  const handleSubmit = (values) => {
    if (isEditing) {
      onUpdateTask(taskId, values)
    } else {
      onAddTask({ id: crypto.randomUUID(), ...values })
    }

    navigate('/')
  }

  return (
    <div className="page form-page">
      <header className="page-header compact-header">
        <div>
          <p className="eyebrow">{isEditing ? 'Edit task' : 'Create task'}</p>
          <h1>{isEditing ? 'Update the selected task' : 'Add a new task to your board'}</h1>
        </div>
      </header>

      <TaskForm
        initialValues={task || undefined}
        onSubmit={handleSubmit}
        submitLabel={isEditing ? 'Update Task' : 'Create Task'}
        onCancel={() => navigate('/')}
      />
    </div>
  )
}
