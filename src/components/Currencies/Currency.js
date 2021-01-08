// == Import npm
import React from 'react';

// librairie pour valider les type de chaques props;
import PropTypes from 'prop-types';
// responsabilité : afficher une devise
const Currency = ({ name, setCurrency }) => (
    <li
        className="currency"
        onClick={() => {
            setCurrency(name)
        }}
    >
        {name}
   </li>
);

Currency.propTypes = {
    name: PropTypes.string.isRequired,
    setCurrency: PropTypes.func.isRequired,
};

export default Currency;