import { useMutation, useQueryClient } from '@tanstack/react-query'
import { todoApi } from '../../api/todoApi'
import { handleApiError } from '../../utils/errorHandler'

export const useDeleteTodoItem = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ listId, itemId }) => todoApi.deleteTodoItem(listId, itemId),
    onSuccess: () => {
      queryClient.invalidateQueries(['todoLists'])
    },
    onError: (error) => {
      handleApiError(error)
    },
  })
}
