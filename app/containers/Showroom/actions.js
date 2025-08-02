/*
 *
 * Showroom actions
 *
 */

import { DEFAULT_ACTION } from './constants';
import { FETCH_SHOWROOM, FETCH_SHOWROOM_SUCCESS, FETCH_SHOWROOM_FAILURE } from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export const fetchShowrooms = () => ({
  type: FETCH_SHOWROOM,
});

export const fetchShowroomsSuccess = products => ({
  type: FETCH_SHOWROOM_SUCCESS,
  products,
});

export const fetchShowroomsFailure = error => ({
  type: FETCH_SHOWROOM_FAILURE,
  error,
});