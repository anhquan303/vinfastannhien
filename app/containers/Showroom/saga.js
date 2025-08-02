import { take, call, put, select, takeLatest } from 'redux-saga/effects';
import { db } from '../../firebaseConfig'; 

import {
  FETCH_SHOWROOM,
} from './constants';
import { fetchShowroomsFailure, fetchShowroomsSuccess } from './actions';


export function* fetchShowroomsSaga() {
  try {
    const snapshot = yield call([db.collection('showrooms'), 'get']);
    const showrooms = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    yield put(fetchShowroomsSuccess(showrooms));
  } catch (error) {
    yield put(fetchShowroomsFailure(error.message));
  }
}

// Individual exports for testing
export default function* showroomSaga() {
  // See example in containers/HomePage/saga.js
   yield takeLatest(FETCH_SHOWROOM, fetchShowroomsSaga);
}
