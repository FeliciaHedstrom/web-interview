import express from 'express'
import {
  createList,
  getLists,
  addItem,
  updateItem,
  getList,
  deleteItem,
  deleteList,
} from '../controllers/todoListsController.js'

const router = express.Router()

router.post('/lists', createList)
router.get('/lists', getLists)
router.get('/lists/:listId', getList)
router.post('/lists/:listId/items', addItem)
router.put('/lists/:listId/items/:itemId', updateItem)
router.delete('/lists/:listId/items/:itemId', deleteItem)
router.delete('/lists/:listId', deleteList)

export default router
