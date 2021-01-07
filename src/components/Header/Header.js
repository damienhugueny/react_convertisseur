import React from 'react';
import PropTypes from 'prop-types';

import './header.scss'

const Header = ({ amount }) => (
  <header className="header">
    <h1 className="header-title">Converter</h1>
    <p className="header-amount">{amount} euro</p>
  </header>
);

Header.propTypes = {
  amount: PropTypes.number.isRequired,
};

export default Header;
