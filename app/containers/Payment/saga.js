import { take, call, put, select, takeLatest } from 'redux-saga/effects';
import { FETCH_DISTRICTS, FETCH_PROVINCES, FETCH_WARDS } from './constants';
import { fetchDistrictsSuccess, fetchProvincesSuccess, fetchWardsSuccess } from './actions';
import axios from 'axios';

function* fetchProvincesSaga() {
  const response = yield call(() =>
    axios.get('https://provinces.open-api.vn/api/p/'),
  );
  yield put(fetchProvincesSuccess(response.data));
}

function* fetchDistrictsSaga(action) {
  const response = yield call(() =>
    axios.get(
      `https://provinces.open-api.vn/api/p/${action.provinceCode}?depth=2`,
    ),
  );
  yield put(fetchDistrictsSuccess(response.data.districts));
}

function* fetchWardsSaga(action) {
  const response = yield call(() =>
    axios.get(
      `https://provinces.open-api.vn/api/d/${action.districtCode}?depth=2`,
    ),
  );
  yield put(fetchWardsSuccess(response.data.wards));
}

// Individual exports for testing
export default function* paymentSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(FETCH_PROVINCES, fetchProvincesSaga);
  yield takeLatest(FETCH_DISTRICTS, fetchDistrictsSaga);
  yield takeLatest(FETCH_WARDS, fetchWardsSaga);
}
