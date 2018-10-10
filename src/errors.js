export const ValidationError = () => {
  const error = new Error('Validation Error')
  error.status = 422
  return error
}

export const ForbiddenError = () => {
  const error = new Error('Forbidden Error')
  error.status = 403
  return error
}

export const AuthenticationRequiredError = () => {
  const error = new Error('Authentication is required')
  error.status = 401
  return error
}

export const NotFound = () => {
  const error = new Error('Not Found')
  error.status = 404
  return error
}

export const UnknownError = () => {
  const error = new Error('Unknown Error')
  error.status = 500
  return error
}
