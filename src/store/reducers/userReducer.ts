import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosPromise, AxiosResponse } from "axios";
import toast from "react-hot-toast";
import useStorage from "../../hooks/storage";
import { IUser } from "../../models/IUser";
import {api} from "../../utils/api";


const {getItem, setItem, removeItem} = useStorage()

export enum statusEnum {
  loading = 'loading',
  completed = 'completed',
}
export interface userProps {
  data?: IUser | null;
  token: null | string;
  isAuth: boolean;
  status: statusEnum;
  error: null | string;
}

const initialState = {
  data: null,
  token: getItem('token') || null,
  isAuth: false,
  status: statusEnum.loading,
  error: null
}

export const regUser = createAsyncThunk('auth/register',async (data: IUser, thunkAPI) => { 
  try {
    const fetch = await api.post('register', data)

    console.log(fetch)

    if(fetch.status === 200){
      return fetch.data  /* token */
    }
  } catch (err: any) {
    console.warn(err.response.data.message)
    return thunkAPI.rejectWithValue(err.response.data.message)
  }
})

export const loginUser = createAsyncThunk('auth/login',async (data: IUser, thunkAPI) => {
  try {
    const res = await api.post('login', data)
    console.log(res)

    if(res.status === 200){
      return res.data  /* token */
    }
  } catch (err: any) {
    console.warn(err.response.data.message)
    return thunkAPI.rejectWithValue(err.response.data.message)
  }
})

export const authUser = createAsyncThunk('auth/me',async (_, thunkAPI) => {
  try {
    const res = await api.get('me')

    if(res.status === 200){
      return res.data  /* userData */
    }
  } catch (err: any) {
    console.warn(err.response.data.message)
    return thunkAPI.rejectWithValue(err.response.data.message)
  }
})




export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state: userProps, action: PayloadAction<IUser>) {
      state.data = action.payload
    },
    setToken(state: userProps, action: PayloadAction<AxiosResponse>){
      setItem('token', action.payload.data)
      state.token = action.payload.data
    },
    logoutUser(state: userProps){
      removeItem('token')
      state.isAuth = false
      state.token = null
      state.data = null

    }
    
  },
  extraReducers: {
    [regUser.fulfilled.type]: (state, action) => {
      // console.log('reg/full')
      // console.log(action)
      setItem('token', action.payload)
      state.token = action.payload
    },
    [regUser.rejected.type]: (state, action) => {
      // console.log(action)
      state.error = action.payload
    },

    [authUser.fulfilled.type]: (state, action) => {
      // console.log(action)
      state.data = action.payload
      state.isAuth = true
      state.status = statusEnum.completed
    },
    [authUser.pending.type]: (state, action) => {
      state.status = statusEnum.loading
    },
    [authUser.rejected.type]: (state, action) => {
      // console.log(action)
      state.data = null
      state.error = action.payload
      state.isAuth = false
      state.status = statusEnum.completed
    },

    [loginUser.fulfilled.type]: (state, action) => {
      // console.log(action)
      setItem('token', action.payload)
      state.token = action.payload
    },
    [loginUser.rejected.type]: (state, action) => {
      // console.log(action)
      state.error = action.payload
      state.isAuth = false
    },

  }
})

export const userReducer = userSlice.reducer

export const {logoutUser} = userSlice.actions