import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AppState {
  platform: string;
  prefersDarkMode?: boolean;
}

const initialState: AppState = {
  platform: '',
  prefersDarkMode: false,
};

export const slice = createSlice({
  name: 'app',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setPlatform: (state, action: PayloadAction<string>) => {
      state.platform =  action.payload;
    },
    setPrefersDarkMode: (state, action: PayloadAction<boolean>) => {
      state.prefersDarkMode =  action.payload;
    },
  },
});

export const {
  setPlatform,
  setPrefersDarkMode,
} = slice.actions;

export default slice.reducer;
