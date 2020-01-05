import { createAsyncResourceBundle, createSelector } from 'redux-bundler'

const promise = ({ store, apiFetch }, params) => {
  const routeParams = store.selectRouteParams()
  let { id } = routeParams
  return apiFetch(`pizzas/${id || params.id}`)
}
const bundle = createAsyncResourceBundle({
  name: 'pizzaDetail',
  getPromise: promise,
  persist: false
})
const reducer = bundle.reducer

bundle.reducer = (state, action) => reducer(state, action)

bundle.doFetchPizzaDetail = (params = {}) => args => {
  const { dispatch } = args
  const { merge = false } = params
  dispatch({ type: 'PIZZADETAIL_FETCH_STARTED' })
  return promise(args, { ...params }).then(
    payload => {
      dispatch({
        type: 'PIZZADETAIL_FETCH_FINISHED',
        payload,
        merge
      })
    },
    error => {
      dispatch({ type: 'PIZZADETAIL_FETCH_FAILED', error })
    }
  )
}

bundle.selectPizzasErrorType = createSelector(
  'selectPizzaDetailRaw',
  raw => raw.errorType
)

export default bundle
