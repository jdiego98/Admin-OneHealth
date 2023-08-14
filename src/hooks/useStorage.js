import { useCallback, useState, useEffect } from 'react';

export const useLocalStorage = (key, defaultValue) => useStorage(key, defaultValue, window.localStorage)

export const useSessionStorage = (key, defaultValue) => useStorage(key, defaultValue, window.sessionStorage)

function useStorage(key, defaultValue, storageObject) {
  const [value, setValue] = useState(() => {
    const jsonValue = storageObject.getItem(key)
    if (jsonValue != null) return JSON.parse(jsonValue)
    return typeof initialValue === 'function' ? defaultValue() : defaultValue
  })

  useEffect(() => {
    if (value === undefined) {
      storageObject.removeItem(key)
      return
    }
    storageObject.setItem(key, store(value))
  }, [key, value, storageObject])

  const remove = useCallback(() => setValue(undefined), [])

  return [value, setValue, remove]
}

function store(value) {
  if (typeof value === 'object') return JSON.stringify(value)
  return value
}