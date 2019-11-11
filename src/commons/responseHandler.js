export const responseHandler = (response) => {
  if(response.status === 404 || !response.data) {
    return []
  }

  if(response.status >= 300) {
    const err = new Error(response.data.error || 'Internal')
    err.response = response
    return err
  }

  return response.data
}
