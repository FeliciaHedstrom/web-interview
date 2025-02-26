import fs from 'fs'
import path from 'path'
import crypto from 'crypto'
const filePath = path.resolve('src/data/todoLists.json')

const readData = () => {
  try {
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, JSON.stringify([]), 'utf8')
    }

    const data = fs.readFileSync(filePath, 'utf8')

    if (!data.trim()) {
      return []
    }

    return JSON.parse(data)
  } catch (error) {
    console.error('Could not read from file', error)
    return []
  }
}

const writeData = (data) => {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8')
}

const updateListCompletionStatus = (list) => {
  list.completed = list.items.length > 0 && list.items.every((item) => item.completed)
}

export const getLists = (req, res) => {
  const todoLists = readData()
  const simplifiedLists = todoLists.map((list) => ({
    id: list.id,
    title: list.title,
    completed: list.completed,
  }))
  res.json(simplifiedLists)
}

export const getList = (req, res) => {
  const todoLists = readData()
  const list = todoLists.find((l) => l.id === req.params.listId)

  if (!list) {
    return res.status(404).json({ message: 'List not found' })
  }

  res.json(list)
}

export const createList = (req, res) => {
  let todoLists = readData()
  const newList = { id: crypto.randomUUID(), title: req.body.title, items: [], completed: false }
  todoLists.push(newList)
  writeData(todoLists)
  res.status(201).json(newList)
}

export const addItem = (req, res) => {
  let todoLists = readData()
  const list = todoLists.find((l) => l.id == req.params.listId)

  if (!list) return res.status(404).json({ message: 'List not found' })

  const newItem = { id: crypto.randomUUID(), text: req.body.text, completed: false }
  list.items.push(newItem)
  updateListCompletionStatus(list)
  writeData(todoLists)
  res.status(201).json(newItem)
}

export const updateItem = (req, res) => {
  let todoLists = readData()
  const list = todoLists.find((l) => l.id == req.params.listId)

  if (!list) return res.status(404).json({ message: 'List not found' })

  const item = list.items.find((i) => i.id == req.params.itemId)
  if (!item) return res.status(404).json({ message: 'Item not found' })

  item.text = req.body.text || item.text
  if (req.body.completed !== undefined) item.completed = req.body.completed

  updateListCompletionStatus(list)
  writeData(todoLists)
  res.json(item)
}

export const deleteItem = (req, res) => {
  let todoLists = readData()
  const list = todoLists.find((l) => l.id == req.params.listId)

  if (!list) return res.status(404).json({ message: 'List not found' })

  list.items = list.items.filter((i) => i.id != req.params.itemId)
  updateListCompletionStatus(list)
  writeData(todoLists)
  res.json({ message: 'Item removed' })
}

export const deleteList = (req, res) => {
  let todoLists = readData()
  todoLists = todoLists.filter((l) => l.id != req.params.listId)
  writeData(todoLists)

  res.json({ message: 'List removed' })
}
