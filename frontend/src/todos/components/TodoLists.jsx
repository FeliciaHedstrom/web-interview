import React, { Fragment, useState } from 'react'
import {
  Card,
  CardContent,
  List,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Typography,
} from '@mui/material'
import ReceiptIcon from '@mui/icons-material/Receipt'
import DoneAllIcon from '@mui/icons-material/DoneAll'

import { TodoListForm } from './TodoListForm'
import { useGetTodoLists } from '../hooks/useGetTodoLists'
import { useGetTodoList } from '../hooks/useGetTodoList'

export const TodoLists = ({ style }) => {
  const [activeList, setActiveList] = useState()
  const { data: todoLists, error } = useGetTodoLists()
  const { data: activeTodoList } = useGetTodoList(activeList)

  if (error) return null
  return (
    <Fragment>
      <Card style={style}>
        <CardContent>
          <Typography component='h2'>My Todo Lists</Typography>
          <List>
            {todoLists &&
              todoLists.map((list) => (
                <ListItemButton key={list.id} onClick={() => setActiveList(list.id)}>
                  <ListItemIcon>
                    <ReceiptIcon />
                  </ListItemIcon>
                  <ListItemText primary={list.title} />
                  {list.completed && <DoneAllIcon color='success' />}
                </ListItemButton>
              ))}
          </List>
        </CardContent>
      </Card>
      {activeTodoList && <TodoListForm key={activeList} todoList={activeTodoList} />}
    </Fragment>
  )
}
