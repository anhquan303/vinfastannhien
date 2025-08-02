/*
 *
 * News actions
 *
 */

import { DEFAULT_ACTION, FETCH_NEWS, FETCH_NEWS_FAILURE, FETCH_NEWS_SUCCESS } from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export const fetchNews = () => ({
  type: FETCH_NEWS,
});

export const fetchNewsSuccess = news => ({
  type: FETCH_NEWS_SUCCESS,
  news,
});

export const fetchNewsFailure = error => ({
  type: FETCH_NEWS_FAILURE,
  error,
});