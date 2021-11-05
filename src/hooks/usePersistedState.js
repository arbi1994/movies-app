import { useState, useEffect } from 'react';

const usePersistedState = (key, defaultValue) => {
  const [state, setSate] = useState(
    () => JSON.parse(localStorage.getItem(key)) || defaultValue
  )

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state))
  }, [key, state])

  return [state, setSate]
}

export default usePersistedState
