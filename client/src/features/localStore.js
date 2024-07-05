export const getLocal = (item) => {
  return JSON.parse(localStorage.getItem(item))
}

export const setLocal = (item) => {
  const [key, value] = Object.entries(item)[0]
  localStorage.setItem(key, JSON.stringify(value))
}