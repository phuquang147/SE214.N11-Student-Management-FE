import { createSlice } from '@reduxjs/toolkit';
const _ = require('lodash');

const initialState = {
  status: 'idle',
  role: '',
  subjects: [],
  classes: [],
  groupedClasses: {},
  schoolYears: [],
  semesters: [],
};

const inforSlice = createSlice({
  name: 'infor',
  initialState,
  reducers: {
    setCommonInforStarted(state) {
      state.status = 'loading';
    },
    setCommonInforSuccess(state, action) {
      const { subjects, classes, role, semesters } = action.payload;
      state.role = role;
      state.status = 'idle';
      state.semesters = _.map(semesters, (semester) => ({ label: semester.name, value: semester._id }));
      state.subjects = _.map(subjects, (subject) => ({ label: subject.name, value: subject._id }));
      state.classes = _.map(classes, (_class) => ({ label: _class.name, value: _class._id }));
      state.groupedClasses = _.mapValues(_.groupBy(classes, 'schoolYear'));
      state.schoolYears = _.map(_.keys(state.groupedClasses), (schoolYear) => ({
        label: schoolYear,
        value: schoolYear,
      }));
    },
    setCommonInforFailed(state) {
      state.status = 'failed';
    },
  },
});

export const inforActions = inforSlice.actions;

export const selectStatus = (state) => state.infor.status;
export const selectRole = (state) => state.infor.role;
export const selectSubjects = (state) => state.infor.subjects;
export const selectSemesters = (state) => state.infor.semesters;
export const selectClasses = (state) => state.infor.classes;
export const selectGroupedClasses = (state) => state.infor.groupedClasses;
export const selectSchoolYears = (state) => state.infor.schoolYears;

export default inforSlice.reducer;
