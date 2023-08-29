import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { currentBeat } from '@/vite-env';

const currentBeatSlice = createSlice({
  name: "currentBeat",
  initialState: { value: "" } as currentBeat,
  reducers: {
    updateCurrentBeat: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    }
  }
});

export const { updateCurrentBeat } = currentBeatSlice.actions
export const currentBeatReducer = currentBeatSlice.reducer
