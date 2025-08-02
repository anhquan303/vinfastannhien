/*
 *
 * Showroom reducer
 *
 */
import produce from 'immer';
import { DEFAULT_ACTION } from './constants';
import {
  FETCH_SHOWROOM,
  FETCH_SHOWROOM_SUCCESS,
  FETCH_SHOWROOM_FAILURE,
} from './constants';

export const initialState = {
  loading: false,
  showrooms: [],
  error: null,
};

/* eslint-disable default-case, no-param-reassign */
const showroomReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case FETCH_SHOWROOM:
        draft.loading = true;
        draft.error = null;
        break;
      case FETCH_SHOWROOM_SUCCESS:
        draft.loading = false;
        draft.showrooms = action.products;
        break;
      case FETCH_SHOWROOM_FAILURE:
        draft.loading = false;
        draft.error = action.error;
        break;
      case DEFAULT_ACTION:
        break;
    }
  });

export default showroomReducer;
