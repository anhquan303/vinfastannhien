/*
 *
 * Payment reducer
 *
 */
import produce from 'immer';
import {
  CONFIRM_PAID_FAILURE,
  CONFIRM_PAID_REQUEST,
  CONFIRM_PAID_SUCCESS,
  DEFAULT_ACTION,
  FETCH_DISTRICTS_SUCCESS,
  FETCH_PROVINCES_SUCCESS,
  FETCH_WARDS_SUCCESS,
  PLACE_ORDER_FAILURE,
  PLACE_ORDER_REQUEST,
  PLACE_ORDER_SUCCESS,
} from './constants';

export const initialState = {
  provinces: [],
  districts: [],
  wards: [],
  placing: false,
  lastOrder: null,
  confirming: false,
  error: null,
};

/* eslint-disable default-case, no-param-reassign */
const paymentReducer = (state = initialState, action) =>
  produce(state, draft => {
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
      case PLACE_ORDER_REQUEST:
        draft.placing = true;
        draft.error = null;
        break;
      case PLACE_ORDER_SUCCESS:
        draft.placing = false;
        draft.lastOrder = action.payload;
        break;
      case PLACE_ORDER_FAILURE:
        draft.placing = false;
        draft.error = action.error;
        break;
      case CONFIRM_PAID_REQUEST:
        draft.confirming = true;
        draft.error = null;
        return;
      case CONFIRM_PAID_SUCCESS:
        draft.confirming = false;
        if (draft.lastOrder) draft.lastOrder.status = 'paid_manual';
        return;
      case CONFIRM_PAID_FAILURE:
        draft.confirming = false;
        draft.error = action.error;
        return;
      case DEFAULT_ACTION:
        break;
    }
  });

export default paymentReducer;
