import axios from "axios";
import useStorage from "../hooks/storage";

const baseURL: string = import.meta.env.VITE_API_ROOT || ''

const {getItem} = useStorage()
const api = axios.create({
  baseURL: baseURL,
}) 

api.interceptors.request.use((cfg) => {
  cfg.headers = {
    'Authorization': `Bearer ${getItem('token')}`
  }
  return cfg
})
const adminApi = axios.create({
  baseURL: baseURL,
}) 
adminApi.interceptors.request.use((cfg) => {
  cfg.headers = {
    'Authorization': `Bearer ${getItem('adminToken')}`
  }
  return cfg
})

export {api, adminApi}