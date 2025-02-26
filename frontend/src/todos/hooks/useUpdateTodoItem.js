import { useMutation, useQueryClient } from '@tanstack/react-query'
import { todoApi } from '../../api/todoApi'
import { handleApiError } from '../../utils/errorHandler'

export const useUpdateTodoItem = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ listId, itemId, updatedItem }) =>
      todoApi.updateTodoItem(listId, itemId, updatedItem),
    onSuccess: () => {
      queryClient.invalidateQueries(['todoLists'])
    },
    onError: (error) => {
      handleApiError(error)
    },
  })
}
