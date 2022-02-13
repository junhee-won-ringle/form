import { configureStore, combineReducers } from '@reduxjs/toolkit';
import formReducer from './formSlice';

export const store = configureStore({
  reducer: {
    form: formReducer,
  },
});

// useSelector에서 state의 type설정을 위해
export const rootReducer = combineReducers({
  form: formReducer
});

export type RootState = ReturnType<typeof rootReducer>