import axios from 'axios'

const API_URL = 'http://localhost:3001'

export const todoApi = {
  getTodoLists: () => axios.get(`${API_URL}/lists`),
  getTodoList: (listId) => axios.get(`${API_URL}/lists/${listId}`),
  createTodoList: (title) => axios.post(`${API_URL}/lists`, { title }),
  addTodoItem: (listId, text) => axios.post(`${API_URL}/lists/${listId}/items`, { text }),
  updateTodoItem: (listId, itemId, updatedItem) =>
    axios.put(`${API_URL}/lists/${listId}/items/${itemId}`, updatedItem),
  deleteTodoItem: (listId, itemId) => axios.delete(`${API_URL}/lists/${listId}/items/${itemId}`),
  deleteTodoList: (listId) => axios.delete(`${API_URL}/lists/${listId}`),
}
