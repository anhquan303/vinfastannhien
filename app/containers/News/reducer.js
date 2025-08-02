/*
 *
 * News reducer
 *
 */
import produce from 'immer';
import {
  DEFAULT_ACTION,
  FETCH_NEWS,
  FETCH_NEWS_FAILURE,
  FETCH_NEWS_SUCCESS,
} from './constants';

export const initialState = {
  loading: false,
  news: [],
  error: null,
};

/* eslint-disable default-case, no-param-reassign */
const newsReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
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
      case DEFAULT_ACTION:
        break;
    }
  });

export default newsReducer;
