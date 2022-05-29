import React from 'react'
import { createRoot } from 'react-dom/client'
import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './counterReducer'

const store = configureStore({ reducer: counterReducer })

const App = () => {
  const good = () => {
    store.dispatch({
      type: 'GOOD',
    })
  }

  const neutral = () => {
    store.dispatch({
      type: 'OK',
    })
  }

  const bad = () => {
    store.dispatch({
      type: 'BAD',
    })
  }

  const reset = () => {
    store.dispatch({
      type: 'RESET',
    })
  }

  return (
    <div>
      <button onClick={good}>good</button>
      <button onClick={neutral}>neutral</button>
      <button onClick={bad}>bad</button>
      <button onClick={reset}>reset stats</button>
      <div>good {store.getState().good}</div>
      <div>neutral {store.getState().ok}</div>
      <div>bad {store.getState().bad}</div>
    </div>
  )
}

const root = createRoot(document.getElementById('root'))
const renderApp = () => {
  root.render(<App />)
}

renderApp()
store.subscribe(renderApp)
