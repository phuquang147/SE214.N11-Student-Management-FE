import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  status: 'idle',
  role: '',
  subjects: [],
  classes: [],
};

const inforSlice = createSlice({
  name: 'infor',
  initialState,
  reducers: {
    setCommonInforStarted(state) {
      state.status = 'loading';
    },
    setCommonInforSuccess(state, action) {
      const { role, subjects, classes } = action.payload;
      state.role = role;
      state.subjects = subjects;
      state.classes = classes;
      state.status = 'idle';
    },
    setCommonInforFailed(state) {
      state.status = 'failed';
    },
  },
});

export const inforActions = inforSlice.actions;

export const selectRole = (state) => state.infor.role;
export const selectSubjects = (state) => state.infor.subjects;
export const selectClasses = (state) => state.infor.classes;

export default inforSlice.reducer;
