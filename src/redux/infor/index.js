import { createSlice } from '@reduxjs/toolkit';
const _ = require('lodash');

const initialState = {
  status: 'idle',
  role: '',
  user: {},
  roles: [],
  subjects: [],
  classes: [],
  grades: [],
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
      const { subjects, classes, roles, role, semesters, grades, user } = action.payload;
      // console.log(classes);
      state.user = user;
      state.status = 'idle';
      state.semesters = _.map(semesters, (semester) => ({ label: semester.name, value: semester._id }));
      state.roles = _.map(roles, (role) => ({ label: role.name, value: role._id }));
      state.role = role;
      state.subjects = _.map(subjects, (subject) => ({ label: subject.name, value: subject._id }));
      state.classes = _.map(classes, (_class) => ({
        label: `${_class.name} - ${_class.schoolYear}`,
        value: _class._id,
        name: _class.name,
        schoolYear: _class.schoolYear,
      }));
      state.groupedClasses = _.mapValues(_.groupBy(classes, 'schoolYear'.toString()), (classes) => {
        return _.map(classes, (_class) => ({ label: _class.name, value: _class._id, name: _class.name }));
      });
      state.schoolYears = _.map(_.keys(state.groupedClasses), (schoolYear) => ({
        label: schoolYear,
        value: schoolYear,
      }));
      state.grades = _.map(grades, (grade) => ({ label: grade.name.toString(), value: grade._id }));
    },
    setCommonInforFailed(state) {
      state.status = 'failed';
    },
    addClass(state, action) {
      const { name, schoolYear, _id } = action.payload;
      state.classes.push({
        label: `${name} - ${schoolYear}`,
        value: _id,
        name: name,
        schoolYear: schoolYear,
      });
    },
  },
});

export const inforActions = inforSlice.actions;

export const selectStatus = (state) => state.infor.status;
export const selectSubjects = (state) => state.infor.subjects;
export const selectSemesters = (state) => state.infor.semesters;
export const selectClasses = (state) => state.infor.classes;
export const selectGroupedClasses = (state) => state.infor.groupedClasses;
export const selectSchoolYears = (state) => state.infor.schoolYears;
export const selectGrades = (state) => state.infor.grades;
export const selectRoles = (state) => state.infor.roles;
export const selectUserRole = (state) => state.infor.role;
export const selectUser = (state) => state.infor.user;

export default inforSlice.reducer;
