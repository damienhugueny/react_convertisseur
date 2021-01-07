import React from 'react';

import PropTypes from 'prop-types';

import './amount.scss'

// composant de présentation : n'a pas d'intelligence, se content d'afficher
// quelque chose en fonction des props qu'il reçoit (on place l'intelligence dans
// le composant de plus haut niveau)
const Amount = ({ currency, amount }) => (
  <div className="amount">
    <p className="amount-value">{amount}</p>
    <p className="amount-currency">{currency}</p>
  </div>
);

Amount.propTypes = {
  currency: PropTypes.string.isRequired,
  amount: PropTypes.number.isRequired,
};

export default Amount;
