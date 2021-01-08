import React from 'react';
import PropTypes from 'prop-types';

import './header.scss'

const Header = ({ amount, setAmount }) => (
  <header className="header">
    <h1 className="header-title">Converter</h1>
    <input 
      type="text"
      className="input-amount"
      laceholder="Montant"
      value={amount}
      onChange={ (event) => setAmount(event.target.value)}
    /> Euro
  </header>
);

Header.propTypes = {
  amount: PropTypes.number.isRequired,
  setAmount: PropTypes.func.isRequired,
};

export default Header;
