import { playListReducer } from './playListSlice';
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
  reducer: {
    playList: playListReducer,
  },
});

export default store;
export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
