import { take, call, put, select, takeLatest } from 'redux-saga/effects';
import { db } from '../../firebaseConfig';
import {
  fetchNewsDetailFailure,
  fetchNewsDetailSuccess,
  fetchNewsFailure,
  fetchNewsSuccess,
  fetchProductsFailure,
  fetchProductsSuccess,
} from './actions';
import { FETCH_NEWS, FETCH_NEWS_DETAIL, FETCH_PRODUCTS } from './constants';

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

export function* fetchProductsSaga() {
  try {
    const snapshot = yield call([db.collection('products'), 'get']);
    const products = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    yield put(fetchProductsSuccess(products));
  } catch (error) {
    yield put(fetchProductsFailure(error.message));
  }
}

function* fetchNewsDetailSaga(action) {
  try {
    const newsRef = db.collection('news');
    const q = newsRef.where('slug', '==', action.slug);
    const querySnapshot = yield call([q, q.get]);
    console.log('querySnapshot', querySnapshot);
    if (querySnapshot.empty) {
      throw new Error('Không tìm thấy tin tức');
    }
    const docData = querySnapshot.docs[0].data();
    yield put(fetchNewsDetailSuccess(docData));
  } catch (err) {
    yield put(fetchNewsDetailFailure(err.message));
  }
}

// Individual exports for testing
export default function* newsSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(FETCH_NEWS, fetchNewsSaga);
  yield takeLatest(FETCH_PRODUCTS, fetchProductsSaga);
  yield takeLatest(FETCH_NEWS_DETAIL, fetchNewsDetailSaga);
}
