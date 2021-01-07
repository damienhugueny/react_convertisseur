// == Import npm
import React from 'react';

// == Import
import Header from '../Header/Header';
import Currencies from '../Currencies/Currencies';
import Amount from '../Amount/Amount';

import currenciesList from '../../data/currencies';

import './app.scss'

// pour gérer un state en React (état de mon application), 2 possibilités :
// - transformer le composant en class
// - utiliser le hook useState

// un composant React c'est une fonction... sauf si on a besoin d'utiliser un state

// composant sous forme de class : render retourne le JSX

// == Composant
class App extends React.Component {
  // constructeur : on passe props en paramètre, même si on n'en a pas
  //constructor(props) {
    // on appelle le constructeur de React.Component
  //  super(props);
    // on crée le state de l'application
  //  this.state = {
  //      open : false,
  //  };
    // sur les méthodes que j'écris, il faut que j'attache ("bind") this
    // https://javascript.info/bind
    // je remplace la méthode par une version enrichie avec this
    // this.handleClick = this.handleClick.bind(this);
  //}

  // !!! grâce au plugin babel "@babel/plugin-proposal-class-properties"
  // je peux définir un state sans avoir besoin d'écrire un constructeur
  state = {
      open : false,
  };

  // !!! grâce au plugin babel "@babel/plugin-proposal-class-properties"
  // au lieu de définir une méthode, je définis une propriété
  handleClick = () => {
    // j'ai accès à this sans avoir besoin de "bind"
    // console.log("click");
    // changer quelque chose dans le state : envoi de la nouvelle valeur avec setState
    // on fournit un objet qui décrit les changements à appliquer au state
    this.setState({
      // on inverse la valeur de open avec "!"
      //
      open : !this.state.open,
    });
    // dès que le State (ou les props) change, React refait le rendu du composant
    // rendu du composant +> rappelle la méthode render
  };

  render() {
    // strictement équivalent à :
    // const open = this.state.open
    const{ open } = this.state;

    // Js sait que pour que la condition totale soit vraie, les deux
    // sous-conditions doivent être vraies. Donc si la premièrer est fausse,
    // il n'évaluera pas la deuxième
    // if ( condition1 && condition2) {
    // }

    // Affichage conditionnel
    // {open &&<Currencies currencies={currenciesList}/>}
    // => le composant Currencies est affiché seulement si open est true
    // parenthèses si JSX est sur plusieurs lignes
    // {open &&(
    //   <div>
    //     Hello
    //   </div>
    // )}

    return (
      <div className="converter">

        <Header />
        <button type="button" onClick={this.handleClick}>Open</button>
        {open &&<Currencies currencies={currenciesList}/>}
        <Amount />

      </div>

    );
  }
};


// == Export
export default App;
