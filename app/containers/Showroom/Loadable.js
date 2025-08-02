/**
 *
 * Asynchronously loads the component for Showroom
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
