import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  role: '',
  subjects: [],
  classes: [],
};

const inforSlice = createSlice({
  name: 'infor',
  initialState,
  reducers: {
    setCommonInfor(state, action) {
      const { role, subjects, classes } = action.payload;
      state.role = role;
      state.subjects = subjects;
      state.classes = classes;
    },
  },
});

export const inforActions = inforSlice.actions;

export const selectRole = (state) => state.infor.role;
export const selectSubjects = (state) => state.infor.subjects;
export const selectClasses = (state) => state.infor.classes;

export default inforSlice.reducer;
