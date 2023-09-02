import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Beat, currentBeat } from '@/vite-env';

const currentBeatSlice = createSlice({
  name: "currentBeat",
  initialState: null as currentBeat,
  reducers: {
    updateCurrentBeat: (_state, action: PayloadAction<Beat>) => {
      const beat = action.payload;
      return beat;
    }
  }
});

export const { updateCurrentBeat } = currentBeatSlice.actions
export const currentBeatReducer = currentBeatSlice.reducer
