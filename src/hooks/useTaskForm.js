import { useEffect, useState } from 'react'

export function useTaskForm(initialValues) {
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})

  useEffect(() => {
    setValues(initialValues)
    setErrors({})
  }, [initialValues])

  const handleChange = (event) => {
    const { name, value } = event.target
    setValues((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: '' }))
  }

  const validate = () => {
    const nextErrors = {}

    if (!values.title.trim() || values.title.trim().length < 3) {
      nextErrors.title = 'Title must be at least 3 characters.'
    }

    if (!values.description.trim() || values.description.trim().length < 8) {
      nextErrors.description = 'Description must be at least 8 characters.'
    }

    if (!values.priority) {
      nextErrors.priority = 'Choose a priority.'
    }

    if (!values.status) {
      nextErrors.status = 'Choose a status.'
    }

    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const reset = () => {
    setValues(initialValues)
    setErrors({})
  }

  return { values, errors, handleChange, validate, reset, setValues, setErrors }
}
