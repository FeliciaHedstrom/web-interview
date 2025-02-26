import { useQuery } from '@tanstack/react-query'
import { todoApi } from '../../api/todoApi'
import { handleApiError } from '../../utils/errorHandler'

export const useGetTodoLists = () => {
  return useQuery({
    queryKey: ['todoLists'],
    queryFn: () => todoApi.getTodoLists().then((res) => res.data),
    onError: (error) => {
      handleApiError(error)
    },
  })
}
