import { take, call, put, select, takeLatest } from 'redux-saga/effects';
import { db } from '../../firebaseConfig';
import { collection, query, where, getDocs } from 'firebase/firestore';
import {
  fetchProductDetailFailure,
  fetchProductDetailSuccess,
  fetchProductsFailure,
  fetchProductsSuccess,
} from './actions';
import { ADD_TO_CART, ADD_TO_CART_SUCCESS, FETCH_PRODUCT_DETAIL, FETCH_PRODUCTS } from './constants';

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

function* fetchProductDetailSaga(action) {
  try {
    const productsRef = db.collection('products');
    const q = productsRef.where('slug', '==', action.slug);
    const querySnapshot = yield call([q, q.get]);

    if (querySnapshot.empty) {
      throw new Error('Không tìm thấy sản phẩm');
    }

    const docData = querySnapshot.docs[0].data();
    yield put(fetchProductDetailSuccess(docData));
  } catch (err) {
    yield put(fetchProductDetailFailure(err.message));
  }
}

function* handleAddToCart(action) {
  // Nếu sau này cần lưu vào Firestore thì xử lý tại đây
  yield put({ type: ADD_TO_CART_SUCCESS, product: action.product });
}

// Individual exports for testing
export default function* productsSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(FETCH_PRODUCTS, fetchProductsSaga);
  yield takeLatest(FETCH_PRODUCT_DETAIL, fetchProductDetailSaga);
   yield takeLatest(ADD_TO_CART, handleAddToCart);
}
