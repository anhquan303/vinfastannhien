/*
 * Introduce Messages
 *
 * This contains all the text for the Introduce container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.Introduce';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the Introduce container!',
  },
});
