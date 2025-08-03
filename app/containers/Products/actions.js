/*
 *
 * Products actions
 *
 */

import {
  ADD_TO_CART,
  DEFAULT_ACTION,
  FETCH_PRODUCT_DETAIL,
  FETCH_PRODUCT_DETAIL_FAILURE,
  FETCH_PRODUCT_DETAIL_SUCCESS,
  FETCH_PRODUCTS,
  FETCH_PRODUCTS_FAILURE,
  FETCH_PRODUCTS_SUCCESS,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

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

export const fetchProductDetail = slug => ({
  type: FETCH_PRODUCT_DETAIL,
  slug,
});

export const fetchProductDetailSuccess = product => ({
  type: FETCH_PRODUCT_DETAIL_SUCCESS,
  product,
});

export const fetchProductDetailFailure = error => ({
  type: FETCH_PRODUCT_DETAIL_FAILURE,
  error,
});

export function addToCart(product) {
  return {
    type: ADD_TO_CART,
    product,
  };
}
