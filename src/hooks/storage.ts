
const useStorage = () => {
  const setItem = (key: string, value: string) => {
    if(value == null || value == undefined) return false;
    localStorage.setItem(key, JSON.stringify(value))
  }
  const getItem = (key: string): any => {
    const data = localStorage.getItem(key)
    if(data === null) return null;
    return JSON.parse(data)
  }
  const removeItem = (key: string): any => {
    localStorage.removeItem(key)
  }

  return {getItem, setItem, removeItem}
}

export default useStorage