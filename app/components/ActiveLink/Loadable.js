/**
 *
 * Asynchronously loads the component for ActiveLink
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
