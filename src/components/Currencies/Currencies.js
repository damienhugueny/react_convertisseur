// == Import npm
import React from 'react';

// librairie pour valider les type de chaques props;
import PropTypes from 'prop-types';

import './currencies.scss'

const Currencies = ({ currencies }) => (
  <main className="currencies">
    <h2 className="currencies-title">Currencies</h2>
    <ul className="currencies-list">

      {currencies.map((currency) => (
        <li key={currency.name} className="currency">{currency.name}</li>
      ))}

    </ul>
  </main>
);

Currencies.propTypes = {
  // Ok, mais on peut faire plus précis
  // currencies: PropTypes.arrayOf(propTypes.object).isRequired,
  currencies: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      rate: PropTypes.number.isRequired,
    }).isRequired,
  ).isRequired,
};

export default Currencies;
