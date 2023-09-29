import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const namesSlice = createSlice({
  name: 'names',
  initialState: {
    names: ['John', 'Jane', 'Joe'],
  },
  reducers: {
    addName: (state, action: PayloadAction<string>) => {
      state.names.push(action.payload);
    },
    removeName: (state, action: PayloadAction<string>) => {
      state.names = state.names.filter((name) => name !== action.payload);
    },
    clearList: (state) => {
      state.names = [];
    },
  },
});

export const { addName, removeName, clearList } = namesSlice.actions;

export default namesSlice.reducer;
