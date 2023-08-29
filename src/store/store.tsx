import { configureStore } from '@reduxjs/toolkit';
import { playListReducer } from './playListSlice';
import { currentBeatReducer } from './currentBeatSlice';

const store = configureStore({
  reducer: {
    playList: playListReducer,
    currentBeat: currentBeatReducer
  },
});

export default store;

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
