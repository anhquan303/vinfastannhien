/**
 *
 * Asynchronously loads the component for News
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
