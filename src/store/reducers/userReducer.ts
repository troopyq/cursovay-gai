import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import useStorage from "../../hooks/storage";
import { IUser } from "../../models/IUser";


export interface userProps {
  data?: IUser;
  token: null | string;
  isAuth: boolean;
  error: null | string;
}

const {getItem} = useStorage()

const initialState = {
  data: {} as IUser,
  token: getItem('token') || null,
  isAuth: false,
  error: null
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state: userProps, action: PayloadAction<IUser>) {
      state.data = action.payload
    },
    setToken(state: userProps, action: PayloadAction<string>){
      state.token = action.payload
    },
    
  }
})

export default userSlice.reducer