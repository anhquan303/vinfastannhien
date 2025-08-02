import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the news state domain
 */

const selectNewsDomain = state => state.news || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by News
 */

const makeSelectNews = () =>
  createSelector(
    selectNewsDomain,
    substate => substate,
  );

export default makeSelectNews;
export { selectNewsDomain };
