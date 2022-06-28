import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {userReducer} from './reducers/userReducer'
import {formReducer} from './reducers/formReducer'
import {adminReducer} from './reducers/adminReducer'

const rootReducer = combineReducers({
  userReducer,
  formReducer,
  adminReducer,
})

export const setupStore = () => configureStore({
  reducer: rootReducer,
  devTools: true,
})

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];