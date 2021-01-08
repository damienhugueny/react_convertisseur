// == Import npm
import React from 'react';

// librairie pour valider les type de chaques props;
import PropTypes from 'prop-types';

import Currency from './Currency'

import './currencies.scss'

// responsabilité : creer le bloc des devises, boucler sur les devises
const Currencies = ({ currencies, setCurrency, search, setSearch }) => {

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
      <input
        className="currencies-search"
        type="text"
        placeholder="recherche"
        value={search}
        onChange={ (event) => setSearch(event.target.value)}
      />
      <ul className="currencies-list">
        {currencies.map((currency) => (
          <Currency  
            key={currency.name} 
            name={currency.name} 
            setCurrency={setCurrency}
          />
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
    }).isRequired,
  ).isRequired,
  setCurrency: PropTypes.func.isRequired,
  search: PropTypes.string.isRequired,
  setSearch: PropTypes.func.isRequired,
};

export default Currencies;
