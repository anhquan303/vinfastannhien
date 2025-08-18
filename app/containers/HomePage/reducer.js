/*
 * HomeReducer
 *
 * The reducer takes care of our data. Using actions, we can
 * update our application state. To add a new action,
 * add it to the switch statement in the reducer function
 *
 */

import produce from 'immer';
import {
  CHANGE_USERNAME,
  FETCH_NEWS,
  FETCH_NEWS_FAILURE,
  FETCH_NEWS_SUCCESS,
  FETCH_PRODUCTS,
  FETCH_PRODUCTS_FAILURE,
  FETCH_PRODUCTS_SUCCESS,
} from './constants';

// The initial state of the App
export const initialState = {
  username: '',
  productLst: [],
  loading: false,
  news: [],
};

/* eslint-disable default-case, no-param-reassign */
const homeReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case CHANGE_USERNAME:
        // Delete prefixed '@' from the github username
        draft.username = action.username.replace(/@/gi, '');
        break;
      case FETCH_PRODUCTS:
        draft.loading = true;
        draft.error = null;
        break;
      case FETCH_PRODUCTS_SUCCESS:
        draft.loading = false;
        draft.productLst = action.productLst;
        break;
      case FETCH_PRODUCTS_FAILURE:
        draft.loading = false;
        draft.error = action.error;
        break;
      case FETCH_NEWS:
        draft.loading = true;
        draft.error = null;
        break;
      case FETCH_NEWS_SUCCESS:
        draft.loading = false;
        draft.news = action.news;
        break;
      case FETCH_NEWS_FAILURE:
        draft.loading = false;
        draft.error = action.error;
        break;
    }
  });

export default homeReducer;
