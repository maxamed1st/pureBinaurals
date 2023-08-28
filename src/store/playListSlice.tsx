import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Beat } from '../vite-env';

const playListSlice = createSlice({
  name: 'playList',
  initialState: [] as Beat[],
  reducers: {
    addBeat: (state, action: PayloadAction<Beat>) => {
      state.push(action.payload);
    },
    updateBeat: (state, action: PayloadAction<Beat>) => {
      const { id, title, frequency, duration } = action.payload;
      const existingBeat = state.find(beat => beat.id === id);
      if (existingBeat) {
        Object.assign(existingBeat, {id, title, frequency, duration});
      }
    },
    deleteBeat: (state, action: PayloadAction<string>) => {
      const beatId = action.payload;
      return state.filter(beat => beat.id !== beatId);
    },
  },
});

export const { addBeat, updateBeat, deleteBeat } = playListSlice.actions;
export const playListReducer = playListSlice.reducer
