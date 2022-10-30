import { put, call, takeLatest } from 'redux-saga/effects';
import { inforActions } from '../infor';
import request from '~/services/request';

function* getCommonData(action) {
  try {
    const infor = yield call((url) => {
      return request.get(url);
    }, '/data');

    const { classes, subjects, role } = infor.data;
    console.log(classes);
    const subjectsName = subjects.map((subject) => subject.name);
    const classesName = classes.map((_class) => _class.name);

    yield put(inforActions.setCommonInforSuccess({ classes: classesName, subjects: subjectsName, role }));
  } catch (err) {
    yield put(inforActions.setCommonInforFailed());
  }
}

export default function* dataSaga() {
  yield takeLatest(inforActions.setCommonInforStarted.type, getCommonData);
}
