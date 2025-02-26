import { useMutation, useQueryClient } from '@tanstack/react-query'
import { todoApi } from '../../api/todoApi'
import { handleApiError } from '../../utils/errorHandler'

export const useAddTodoItem = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ listId, text }) => todoApi.addTodoItem(listId, text),
    onSuccess: () => {
      queryClient.invalidateQueries(['todoLists'])
    },
    onError: (error) => {
      handleApiError(error)
    },
  })
}
