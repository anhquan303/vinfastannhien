import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the introduce state domain
 */

const selectIntroduceDomain = state => state.introduce || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Introduce
 */

const makeSelectIntroduce = () =>
  createSelector(
    selectIntroduceDomain,
    substate => substate,
  );

export default makeSelectIntroduce;
export { selectIntroduceDomain };
