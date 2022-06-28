import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosPromise, AxiosResponse } from "axios";
import toast from "react-hot-toast";
import useStorage from "../../hooks/storage";
import { IUser, IUserAdmin } from "../../models/IUser";
import {adminApi, api} from "../../utils/api";


const {getItem, setItem, removeItem} = useStorage()

export enum statusEnum {
  loading = 'loading',
  completed = 'completed',
}
export interface adminProps {
  data?: IUserAdmin | null;
  token: null | string;
  isAuth: boolean;
  status: statusEnum;
  error: null | string;
}

const initialState = {
  data: null,
  token: getItem('adminToken') || null,
  isAuth: false,
  status: statusEnum.loading,
  error: null
}


export const loginAdmin = createAsyncThunk('admin/login',async (data: IUserAdmin, thunkAPI) => {
  try {
    const res = await adminApi.post('admin', data)
    console.log(res)

    if(res.status === 200){
      return res.data  /* token */
    }
  } catch (err: any) {
    console.warn(err.response.data.message)
    return thunkAPI.rejectWithValue(err.response.data.message)
  }
})

export const authAdmin = createAsyncThunk('admin/auth',async (_, thunkAPI) => {
  try {
    const res = await adminApi.get('admin')

    if(res.status === 200){
      return res.data  /* userData */
    }
  } catch (err: any) {
    console.warn(err.response.data.message)
    return thunkAPI.rejectWithValue(err.response.data.message)
  }
})
export const getUsers = createAsyncThunk('admin/getUsers',async (_, thunkAPI) => {
  try {
    const res = await adminApi.get('users')

    if(res.status === 200){
      return res.data  /* userData */
    }
  } catch (err: any) {
    console.warn(err.response.data.message)
    return thunkAPI.rejectWithValue(err.response.data.message)
  }
})




export const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    setUser(state: adminProps, action: PayloadAction<IUserAdmin>) {
      state.data = action.payload
    },
    setToken(state: adminProps, action: PayloadAction<AxiosResponse>){
      setItem('adminToken', action.payload.data)
      state.token = action.payload.data
    },
    logoutAdmin(state: adminProps){
      removeItem('adminToken')
      state.isAuth = false
      state.token = null
      state.data = null

    }
    
  },
  extraReducers: {
    [authAdmin.fulfilled.type]: (state, action) => {
      // console.log(action)
      state.data = action.payload
      state.isAuth = true
      state.status = statusEnum.completed
    },
    [authAdmin.pending.type]: (state, action) => {
      state.status = statusEnum.loading
    },
    [authAdmin.rejected.type]: (state, action) => {
      // console.log(action)
      state.data = null
      state.error = action.payload
      state.isAuth = false
      state.status = statusEnum.completed
    },

    [loginAdmin.fulfilled.type]: (state, action) => {
      // console.log(action)
      setItem('adminToken', action.payload)
      state.token = action.payload
    },
    [loginAdmin.rejected.type]: (state, action) => {
      // console.log(action)
      state.error = action.payload
      state.isAuth = false
    },


  }
})

export const adminReducer = adminSlice.reducer

export const {logoutAdmin} = adminSlice.actions