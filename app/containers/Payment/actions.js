/*
 *
 * Payment actions
 *
 */

import { DEFAULT_ACTION, FETCH_DISTRICTS, FETCH_DISTRICTS_SUCCESS, FETCH_PROVINCES, FETCH_PROVINCES_SUCCESS, FETCH_WARDS, FETCH_WARDS_SUCCESS } from './constants';

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
