import { configureStore, combineReducers } from '@reduxjs/toolkit';
import formReducer from './formSlice';

export const store = configureStore({
  reducer: {
    form: formReducer,
  },
});

export const rootReducer = combineReducers({
  form: formReducer
});

export type RootState = ReturnType<typeof rootReducer>