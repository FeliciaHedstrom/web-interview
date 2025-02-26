export const handleApiError = (error) => {
  console.error('API error:', error)
  let errorMessage = 'Something went wrong'

  //Log error

  if (error.response && error.response.data && error.response.data.message) {
    errorMessage = error.response.data.message
  }

  window.alert(errorMessage)
}
