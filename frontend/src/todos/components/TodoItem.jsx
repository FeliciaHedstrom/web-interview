import React, { useState, useEffect } from 'react'
import { TextField, Checkbox, Typography, Button } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import { useDebounce } from '../../hooks/useDebounce'

export const TodoItem = ({ todo, index, onUpdate, onDelete, onToggleCompleted }) => {
  const [inputValue, setInputValue] = useState(todo.text)
  const debouncedText = useDebounce(inputValue, 1000)

  useEffect(() => {
    if (debouncedText.trim() && debouncedText !== todo.text) {
      onUpdate(todo.id, debouncedText)
    }
  }, [debouncedText, todo.text, todo.id, onUpdate])

  const handleChange = (e) => {
    setInputValue(e.target.value)
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <Checkbox checked={todo.completed} onChange={() => onToggleCompleted(todo)} />
      <Typography sx={{ margin: '8px' }} variant='h6'>
        {index + 1}
      </Typography>
      <TextField
        sx={{ flexGrow: 1, marginTop: '1rem' }}
        label='What to do?'
        value={inputValue}
        onChange={handleChange}
      />
      <Button
        sx={{ margin: '8px' }}
        size='small'
        color='secondary'
        onClick={() => onDelete(todo.id)}
      >
        <DeleteIcon />
      </Button>
    </div>
  )
}
