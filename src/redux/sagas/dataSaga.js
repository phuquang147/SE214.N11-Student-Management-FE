import { put, call, takeLatest } from 'redux-saga/effects';
import { inforActions } from '../infor';
import request from '~/services/request';

function* getCommonData(action) {
  try {
    const infor = yield call((url) => {
      return request.get(url);
    }, '/data');

    const { classes, subjects, role } = infor.data;

    yield put(inforActions.setCommonInforSuccess({ classes, subjects, role }));
  } catch (err) {
    console.log(err.message);
    yield put(inforActions.setCommonInforFailed());
  }
}

export default function* dataSaga() {
  yield takeLatest(inforActions.setCommonInforStarted.type, getCommonData);
}
