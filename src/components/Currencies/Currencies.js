// == Import npm
import React from 'react';

// librairie pour valider les type de chaques props;
import PropTypes from 'prop-types';

import './currencies.scss'

const Currencies = ({ currencies, setCurrency  }) => {

  // utiliser la valeur de l'élément dans map => meilleur façon
  // s'appuie sur les données plutôt que sur le DOM
  const handleClick = (name) => {
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
          <li
           key={currency.name}
           className="currency"
           onClick={() => {
             handleClick(currency.name)
           }}
          >{currency.name} </li>
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
