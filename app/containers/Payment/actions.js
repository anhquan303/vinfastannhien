/*
 *
 * Payment actions
 *
 */

import { CLEAR_CONFIRM_STATUS, CONFIRM_PAID_FAILURE, CONFIRM_PAID_REQUEST, CONFIRM_PAID_SUCCESS, DEFAULT_ACTION, FETCH_DISTRICTS, FETCH_DISTRICTS_SUCCESS, FETCH_PROVINCES, FETCH_PROVINCES_SUCCESS, FETCH_WARDS, FETCH_WARDS_SUCCESS, PLACE_ORDER_FAILURE, PLACE_ORDER_REQUEST, PLACE_ORDER_SUCCESS } from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export const fetchProvinces = () => ({ type: FETCH_PROVINCES });

export const fetchProvincesSuccess = provinces => ({
  type: FETCH_PROVINCES_SUCCESS,
  provinces,
});

export const fetchDistricts = provinceCode => ({
  type: FETCH_DISTRICTS,
  provinceCode,
});
export const fetchDistrictsSuccess = districts => ({
  type: FETCH_DISTRICTS_SUCCESS,
  districts,
});

export const fetchWards = districtCode => ({ type: FETCH_WARDS, districtCode });
export const fetchWardsSuccess = wards => ({
  type: FETCH_WARDS_SUCCESS,
  wards,
});

export const placeOrderRequest = payload => ({ type: PLACE_ORDER_REQUEST, payload });
export const placeOrderSuccess = payload => ({ type: PLACE_ORDER_SUCCESS, payload });
export const placeOrderFailure = error => ({ type: PLACE_ORDER_FAILURE, error });

export const confirmPaidRequest = (payload) => ({ type: CONFIRM_PAID_REQUEST, payload });
export const confirmPaidSuccess = (payload) => ({ type: CONFIRM_PAID_SUCCESS, payload });
export const confirmPaidFailure = (error) => ({ type: CONFIRM_PAID_FAILURE, error });

export const clearConfirmStatus = () => ({ type: CLEAR_CONFIRM_STATUS });
