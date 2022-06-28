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
export interface formProps {
  data?: [] | null;
  status: statusEnum;
  error: null | string;
}

const initialState = {
  data: null,
  status: statusEnum.loading,
  error: null
}


export const postForm = createAsyncThunk('form/post',async (data: any, thunkAPI) => {
  try {
    const res = await api.post('form', data)
    console.log(res)

    if(res.status === 200){
      return res.data  /* token */
    }
  } catch (err: any) {
    console.warn(err.response.data.message)
    return thunkAPI.rejectWithValue(err.response.data.message)
  }
})

export const getForms = createAsyncThunk('form/get', async (data, thunkAPI) => {
  try {
    const res = await api.get('form?userId=' + data)
    console.log(res)
    if(res.status === 200){
      return res.data  /* userData */
    }
  } catch (err: any) {
    console.warn(err.response.data.message)
    return thunkAPI.rejectWithValue(err.response.data.message)
  }
})



export const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {

  },
  extraReducers: {

    [getForms.fulfilled.type]: (state, action) => {
      // console.log(action)
      state.data = action.payload.data
      state.status = statusEnum.completed
    },
    [getForms.pending.type]: (state) => {
      state.status = statusEnum.loading
    },
    [getForms.rejected.type]: (state, action) => {
      // console.log(action)
      state.data = null
      state.error = action.payload
      state.status = statusEnum.completed
    },

  }
})

export const formReducer = formSlice.reducer

// export const {logoutUser} = formSlice.actions