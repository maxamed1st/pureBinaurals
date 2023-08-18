import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface Beat {
  id: number;
  title: string;
  frequency: number;
  duration: number;
}

const playListSlice = createSlice({
  name: 'playList',
  initialState: [] as Beat[],
  reducers: {
    addBeat: (state, action: PayloadAction<Beat>) => {
      state.push(action.payload);
    },
    updateBeat: (state, action: PayloadAction<{ id: number; updatedBeat: Partial<Beat> }>) => {
      const { id, updatedBeat } = action.payload;
      const existingBeat = state.find(beat => beat.id === id);
      if (existingBeat) {
        Object.assign(existingBeat, updatedBeat);
      }
    },
    deleteBeat: (state, action: PayloadAction<number>) => {
      const beatId = action.payload;
      return state.filter(beat => beat.id !== beatId);
    },
  },
});

export const { addBeat, updateBeat, deleteBeat } = playListSlice.actions;
export const playListReducer = playListSlice.reducer
