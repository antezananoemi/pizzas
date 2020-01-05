import { createAsyncResourceBundle, createSelector } from 'redux-bundler'

const bundle = createAsyncResourceBundle({
  name: 'toppings',
  getPromise: ({ apiFetch }) => apiFetch('toppings'),
  persist: false
})

bundle.selectTotalToppings = createSelector(
  'selectToppings',
  data => {
    if (!data) return 0
    return data.length
  }
)

bundle.selectToppingsData = createSelector(
  'selectToppings',
  data => {
    let toppings = data
    let emptyArray = []
    if (!toppings) return emptyArray
    return toppings
  }
)
bundle.selectToErrorType = createSelector(
  'selectToppingsRaw',
  raw => raw.errorType
)

export default bundle
