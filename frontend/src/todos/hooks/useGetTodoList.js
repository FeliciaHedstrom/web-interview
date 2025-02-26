import { useQuery } from '@tanstack/react-query'
import { todoApi } from '../../api/todoApi'
import { handleApiError } from '../../utils/errorHandler'

export const useGetTodoList = (id) => {
  return useQuery({
    queryKey: ['todoList', id],
    queryFn: () => todoApi.getTodoList(id).then((res) => res.data),
    enabled: !!id,
    onError: (error) => {
      handleApiError(error)
    },
  })
}
