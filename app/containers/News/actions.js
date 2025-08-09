/*
 *
 * News actions
 *
 */

import { DEFAULT_ACTION, FETCH_NEWS, FETCH_NEWS_DETAIL, FETCH_NEWS_DETAIL_FAILURE, FETCH_NEWS_DETAIL_SUCCESS, FETCH_NEWS_FAILURE, FETCH_NEWS_SUCCESS, FETCH_PRODUCTS, FETCH_PRODUCTS_FAILURE, FETCH_PRODUCTS_SUCCESS } from './constants';

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

export const fetchProducts = () => ({
  type: FETCH_PRODUCTS,
});

export const fetchProductsSuccess = productLst => ({
  type: FETCH_PRODUCTS_SUCCESS,
  productLst,
});

export const fetchProductsFailure = error => ({
  type: FETCH_PRODUCTS_FAILURE,
  error,
});

export const fetchNewsDetail = slug => ({
  type: FETCH_NEWS_DETAIL,
  slug,
});

export const fetchNewsDetailSuccess = news => ({
  type: FETCH_NEWS_DETAIL_SUCCESS,
  news,
});

export const fetchNewsDetailFailure = error => ({
  type: FETCH_NEWS_DETAIL_FAILURE,
  error,
});