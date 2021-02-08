import { createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import appReducer from './appReducer'

const composeEnhancers = compose

export default function configureStore() {
  // create store
  const store = createStore(
    appReducer,
    composeEnhancers(applyMiddleware(thunkMiddleware))
  )
  return store
}
