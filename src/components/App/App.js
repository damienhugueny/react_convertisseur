// == Import npm
import React from 'react';

// == Import
import Header from '../Header/Header';
import Currencies from '../Currencies/Currencies';
import Amount from '../Amount/Amount';

import data from '../../data/currencies';

import './app.scss'


// == Composant
const App = () => {

  return (
    <div className="converter">
      <Header />
      <Currencies />
      <Amount />
    </div>

  );
};

// == Export
export default App;
