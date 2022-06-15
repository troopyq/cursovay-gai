
const useStorage = () => {
  const setItem = (key: string, value: string) => {
    localStorage.setItem(key, JSON.stringify(value))
  }
  const getItem = (key: string): any => {
    const data = localStorage.getItem(key)
    if(data === null) return null
    return JSON.parse(data) as any
  }

  return {getItem, setItem}
}

export default useStorage