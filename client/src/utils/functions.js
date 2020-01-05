export const isRequired = name => {
  throw new Error(`${name} is required`)
}

export const err = {
  400: 'bad request',
  401: 'rejected',
  404: 'not found',
  500: 'server error'
}

export const handleResponse = res => {
  if (err[res.status]) {
    throw new Error(err[res.status])
  }
  return res.json()
}

export const handleError = err => {
  // eslint-disable-next-line
  console.log(err)
  throw err
}
