/*
 *
 * Payment reducer
 *
 */
import produce from 'immer';
import { DEFAULT_ACTION, FETCH_DISTRICTS_SUCCESS, FETCH_PROVINCES_SUCCESS, FETCH_WARDS_SUCCESS } from './constants';

export const initialState = {
  provinces: [],
  districts: [],
  wards: [],
};

/* eslint-disable default-case, no-param-reassign */
const paymentReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case FETCH_PROVINCES_SUCCESS:
        draft.provinces = action.provinces;
        break;

      case FETCH_DISTRICTS_SUCCESS:
        draft.districts = action.districts;
        break;

      case FETCH_WARDS_SUCCESS:
        draft.wards = action.wards;
        break;
      case DEFAULT_ACTION:
        break;
    }
  });

export default paymentReducer;
