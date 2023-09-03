import { createSlice } from '@reduxjs/toolkit';

const filterInitialState = '';

const filterSlice = createSlice({
  name: 'filter',
  initialState: filterInitialState,
  reducers: {
    setNameFilterAction(state, action) {
      return (state = action.payload);
    },
  },
});

export const { setNameFilterAction } = filterSlice.actions;
export const filterReducer = filterSlice.reducer;
