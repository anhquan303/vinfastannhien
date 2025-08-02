import { take, call, put, select, takeLatest } from 'redux-saga/effects';
import { db } from '../../firebaseConfig'; 
import { fetchNewsFailure, fetchNewsSuccess } from './actions';
import { FETCH_NEWS } from './constants';

export function* fetchNewsSaga() {
  try {
    const snapshot = yield call([db.collection('news'), 'get']);
    const news = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    yield put(fetchNewsSuccess(news));
  } catch (error) {
    yield put(fetchNewsFailure(error.message));
  }
}

// Individual exports for testing
export default function* newsSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(FETCH_NEWS, fetchNewsSaga);
}
