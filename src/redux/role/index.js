import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  name: '',
};

const roleSlice = createSlice({
  name: 'role',
  initialState,
  reducers: {
    setRole(state, action) {
      state.name = action.payload;
    },
  },
});

export const roleActions = roleSlice.actions;

export const selectRole = (state) => state.role.name;

export default roleSlice.reducer;
