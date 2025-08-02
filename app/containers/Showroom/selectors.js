import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the showroom state domain
 */

const selectShowroomDomain = state => state.showroom || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Showroom
 */

const makeSelectShowroom = () =>
  createSelector(
    selectShowroomDomain,
    substate => substate,
  );

export default makeSelectShowroom;
export { selectShowroomDomain };
