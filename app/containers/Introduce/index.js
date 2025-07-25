/**
 *
 * Introduce
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectIntroduce from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

export function Introduce() {
  useInjectReducer({ key: 'introduce', reducer });
  useInjectSaga({ key: 'introduce', saga });

  return (
    <div>
      <Helmet>
        <title>Introduce</title>
        <meta name="description" content="Description of Introduce" />
      </Helmet>
      <FormattedMessage {...messages.header} />
    </div>
  );
}

Introduce.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  introduce: makeSelectIntroduce(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(Introduce);
