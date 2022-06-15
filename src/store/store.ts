import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from './reducers/userReducer'

const rootReducer = combineReducers({
  userReducer,
  
})

export const setupStore = () => configureStore({
  reducer: rootReducer,
  devTools: true,
})

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];