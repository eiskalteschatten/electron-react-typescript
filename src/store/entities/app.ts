import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface State {
  platform: string;
  prefersDarkMode?: boolean;
}

const initialState: State = {
  platform: '',
  prefersDarkMode: false,
};

export const slice = createSlice({
  name: 'app',
  initialState,
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
