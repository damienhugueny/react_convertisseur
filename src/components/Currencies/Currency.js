import React from 'react';

import PropTypes from 'prop-types';


const Currency = ({ name }) => (
  <li
      onClick={() => {
        //handleClick(name);
      }}
      className="currency">{currency.name}
  </li>
);

Currency.propTypes = {
  name: PropTypes.string.isRequired,
};

export default Currency;
