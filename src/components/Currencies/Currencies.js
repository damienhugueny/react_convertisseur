// == Import npm
import React from 'react';

// librairie pour valider les type de chaques props;
import PropTypes from 'prop-types';
import Currency from './Currency';

import './currencies.scss'

const Currencies = ({ currencies, setCurrency,  }) => {

  const handleClick = (name) => {
    console.log(name);
    // je veux fournir en argument la devise qui a reçu le clic
    // première façon : m'appuyer sur l'élément du DOM => ça fonctionne , mais on
    // n'aurait pas mieux ?
    setCurrency(name);

    // event.target.textContent
    // event.target.innerText

  };

  return (
    <main className="currencies">
      <h2 className="currencies-title">Currencies</h2>
      <ul className="currencies-list">

        {currencies.map((currency) => (
          <Currency key={currency.name} name={currency.name} />
        ))}

      </ul>
    </main>
  );

};

Currencies.propTypes = {
  // Ok, mais on peut faire plus précis
  // currencies: PropTypes.arrayOf(propTypes.object).isRequired,
  currencies: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      rate: PropTypes.number.isRequired,
    }).isRequired,
  ).isRequired,
  setCurrency: PropTypes.func.isRequired,
};

export default Currencies;
