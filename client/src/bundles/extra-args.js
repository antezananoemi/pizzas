import apiFetch from '../endpoints/api-fetch'

export default {
  name: 'extra-args',
  getExtraArgs: store => ({
    apiFetch: apiFetch(store)
  })
}
