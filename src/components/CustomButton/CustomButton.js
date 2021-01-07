import React from 'react';
import PropTypes from 'prop-types';

import './customButton.scss';

const CustomButton = ({ open, manageClick }) => {

  const handleClick = () => {
    console.log('click');

    // je voudrais mettre à jour open dans le state
    // on peut maintenant utiliser la function passer dans la props manageClick
    manageClick();
  };

  //  appliquer la classe custom-button--open seulement si state.open vaut true
  let className = "custom-button";
  if (open) {
    className += ' custom-button--open';
  }

  return (
    <button className={className} type="button" onClick={handleClick}>=</button>
  );

};

CustomButton.propTypes = {
  open: PropTypes.bool.isRequired,
  // traitement qu'il faudra éxécuter si un click se produit
  // manageClick est une fonction
  manageClick: PropTypes.func.isRequired,
};

export default CustomButton;
