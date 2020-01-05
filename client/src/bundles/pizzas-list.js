import { createAsyncResourceBundle, createSelector } from 'redux-bundler'

const bundle = createAsyncResourceBundle({
  name: 'pizzas',
  getPromise: ({ apiFetch }) => apiFetch('pizzas'),
  persist: false
})

bundle.selectTotalPizzas = createSelector(
  'selectPizzas',
  data => {
    if (!data) return 0
    return data.length
  }
)

bundle.selectPizzasData = createSelector(
  'selectPizzas',
  data => {
    let pizzas = data
    let emptyArray = []
    if (!pizzas) return emptyArray
    return pizzas
  }
)
bundle.selectToErrorType = createSelector(
  'selectPizzasRaw',
  raw => raw.errorType
)

export default bundle
