// == Import npm
import React from 'react';

import './currencies.scss'

const Currencies = () => (
  <main className="currencies">
    <h2 className="currencies-title">Currencies</h2>
    <ul className="currencies-list">
      <li className="currency">USD</li>
      <li className="currency">CAD</li>
      <li className="currency">JPY</li>
      <li className="currency">AUD</li>
    </ul>
  </main>
);

export default Currencies;
