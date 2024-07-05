import { useDispatch } from 'react-redux'

export const delay = (callback, timeout = 2000) => {
  const id = setTimeout(callback, timeout)
  return () => {
    clearTimeout(id)
  }
}

export const DelayedDispatch = (action, timeout = 2000) => {
  const dispatch = useDispatch()
  const id = setTimeout(dispatch(action), timeout)
  return () => {
    clearTimeout(id)
  }
}
