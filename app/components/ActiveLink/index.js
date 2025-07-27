/**
 *
 * ActiveLink
 *
 */

import React, { memo } from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import { NavLink } from 'react-router-dom';
import messages from './messages';

function ActiveLink({ to, children }) {
  return (
    <NavLink
      to={to}
      style={({ isActive }) => ({
        color: isActive ? '#F44336' : '#6E6565',
        fontWeight: isActive ? 'bold' : 'normal',
        textDecoration: 'none',
        padding: '8px 12px',
        display: 'inline-block',
        textTransform: 'uppercase',
      })}
    >
      {children}
    </NavLink>
  );
}

ActiveLink.propTypes = {};

export default memo(ActiveLink);
