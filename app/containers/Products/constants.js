/*
 *
 * Products constants
 *
 */

export const DEFAULT_ACTION = 'app/Products/DEFAULT_ACTION';

export const products = [
  {
    name: 'Xe máy điện VinFast Motio',
    price: 12000000,
    oldPrice: 14900000,
    img: '/images/motio.png',
    isNew: false,
  },
  {
    name: 'Xe máy điện VinFast Evo Lite Neo',
    price: 14400000,
    oldPrice: 18000000,
    img: '/images/lite-neo.png',
    isNew: false,
  },
  {
    name: 'Xe máy điện VinFast Evo NEO',
    price: 17800000,
    oldPrice: 20900000,
    img: '/images/evo-neo.png',
    isNew: false,
  },
  {
    name: 'Xe máy điện VinFast Evo200 Lite',
    price: 22000000,
    oldPrice: 25000000,
    img: '/images/evo200.png',
    isNew: false,
  },
  {
    name: 'Xe máy điện VinFast Evo Grand Lite',
    price: 18000000,
    img: '/images/evo-grand-lite.png',
    isNew: true,
  },
  {
    name: 'Xe máy điện VinFast Evo Grand',
    price: 21000000,
    img: '/images/evo-grand.png',
    isNew: true,
  },
];

export const FETCH_PRODUCTS = 'app/ProductList/FETCH_PRODUCTS';
export const FETCH_PRODUCTS_SUCCESS = 'app/ProductList/FETCH_PRODUCTS_SUCCESS';
export const FETCH_PRODUCTS_FAILURE = 'app/ProductList/FETCH_PRODUCTS_FAILURE';

export const FETCH_PRODUCT_DETAIL = 'FETCH_PRODUCT_DETAIL';
export const FETCH_PRODUCT_DETAIL_SUCCESS = 'FETCH_PRODUCT_DETAIL_SUCCESS';
export const FETCH_PRODUCT_DETAIL_FAILURE = 'FETCH_PRODUCT_DETAIL_FAILURE';

export const ADD_TO_CART = 'Cart/ADD_TO_CART';
export const ADD_TO_CART_SUCCESS = 'Cart/ADD_TO_CART_SUCCESS';
