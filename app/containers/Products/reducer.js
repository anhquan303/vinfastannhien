/*
 *
 * Products reducer
 *
 */
import produce from 'immer';
import {
  ADD_TO_CART_SUCCESS,
  DEFAULT_ACTION,
  FETCH_PRODUCT_DETAIL,
  FETCH_PRODUCT_DETAIL_FAILURE,
  FETCH_PRODUCT_DETAIL_SUCCESS,
  FETCH_PRODUCTS,
  FETCH_PRODUCTS_FAILURE,
  FETCH_PRODUCTS_SUCCESS,
} from './constants';
import { isEmpty } from 'lodash';

export const initialState = {
  loading: false,
  productLst: [],
  productDetail: null,
  error: null,
  cartItems: [],
};

/* eslint-disable default-case, no-param-reassign */
const productsReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
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
      case FETCH_PRODUCT_DETAIL:
        draft.loading = true;
        draft.error = null;
        draft.productDetail = null;
        break;
      case FETCH_PRODUCT_DETAIL_SUCCESS:
        draft.loading = false;
        draft.productDetail = action.product;
        break;
      case FETCH_PRODUCT_DETAIL_FAILURE:
        draft.loading = false;
        draft.error = action.error;
        break;
      case ADD_TO_CART_SUCCESS: {
        draft.cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        const existing = draft.cartItems.find(i => i.id === action.product.id);

        if (!isEmpty({ ...existing })) {
          existing.quantityCart += action.product.quantityCart;
        } else {
          draft.cartItems.push({ ...action.product });
        }

        localStorage.setItem('cartItems', JSON.stringify(draft.cartItems));
        break;
      }
      case DEFAULT_ACTION:
        break;
    }
  });

export default productsReducer;
