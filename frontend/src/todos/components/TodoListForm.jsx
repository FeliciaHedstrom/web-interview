import React, { useCallback } from 'react'
import { Card, CardContent, CardActions, Button, Typography } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import { useAddTodoItem } from '../hooks/useAddTodoItem'
import { useDeleteTodoItem } from '../hooks/useDeleteTodoItem'
import { useUpdateTodoItem } from '../hooks/useUpdateTodoItem'
import { TodoItem } from './TodoItem'

export const TodoListForm = ({ todoList }) => {
  const { mutate: addTodoItem } = useAddTodoItem()
  const { mutate: updateTodoItem } = useUpdateTodoItem()
  const { mutate: deleteTodoItem } = useDeleteTodoItem()

  const handleAddTodo = () => {
    addTodoItem({ listId: todoList.id, text: '' })
  }

  const handleUpdateTodo = useCallback(
    (todoId, newText) => {
      updateTodoItem({
        listId: todoList.id,
        itemId: todoId,
        updatedItem: { text: newText },
      })
    },
    [todoList.id, updateTodoItem]
  )

  const handleDeleteTodo = (todoId) => {
    deleteTodoItem({ listId: todoList.id, itemId: todoId })
  }

  const handleToggleCompleted = (todo) => {
    const updatedTodo = { ...todo, completed: !todo.completed }

    updateTodoItem({
      listId: todoList.id,
      itemId: todo.id,
      updatedItem: { completed: updatedTodo.completed },
    })
  }

  return (
    <Card sx={{ margin: '0 1rem' }}>
      <CardContent>
        <Typography component='h2'>{todoList.title}</Typography>
        <form style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
          {todoList.items &&
            todoList.items.map((todo, index) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                index={index}
                onUpdate={handleUpdateTodo}
                onDelete={handleDeleteTodo}
                onToggleCompleted={handleToggleCompleted}
              />
            ))}
          <CardActions>
            <Button type='button' color='primary' onClick={handleAddTodo}>
              Add Todo <AddIcon />
            </Button>
          </CardActions>
        </form>
      </CardContent>
    </Card>
  )
}
