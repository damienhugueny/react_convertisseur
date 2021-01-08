// == Import npm
import React from 'react';

// == Import
import Header from '../Header/Header';
import Currencies from '../Currencies/Currencies';
import Amount from '../Amount/Amount';
import CustomButton from '../CustomButton/CustomButton';

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
      // whether the currencies block is open
      open : true,
      // amount in source currency (displayed in the header)
      baseAmount : 1,
      // target currency
      currency : 'United States Dollar',
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
    // rendu de chacun des composants (Header, CustomButton...),mais si pour un
    // composant le rendu ne change rien, alors le DOM réel ne sera pas modifié
  };

  // calcule du montant (conversion du montant de base vers la devise cible)
  computeAmount = () => {
    // TODO faire le calcul

    // récupérer les informations nécessaire dans le state
    const { baseAmount, currency } = this.state;

    // récupérer le taux de change dans currencies
    // find retourne le premier élément du tableau qui correspond à la condition,
    // donc ici il retourne un objet
    const foundCurrency = currenciesList.find((MachinBidule) => MachinBidule.name === currency)
    console.log(foundCurrency);
    // multiplier baseAmount par le taux de change
    // desctructuring - const rate = foundCurrency.rate
    const { rate } = foundCurrency;
    const result = baseAmount * rate;

    // on arrondit en ne gardant que deux décimales;
    return Number(result.toFixed(2));
  };

  setCurrency = (name) => {
    
    console.log(`changement de devise :  ${name}`);


  };

  render() {
    // strictement équivalent à :
    // const open = this.state.open
    const{ open, baseAmount, currency } = this.state;

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

    const resultAmount = this.computeAmount();

    return (
      <div className="converter">

        <Header amount={baseAmount}/>
        <CustomButton open={open}  manageClick={this.handleClick} />
        {open &&<Currencies currencies={currenciesList} setCurrency={this.setCurrency}/>}
        <Amount currency={currency} amount={resultAmount}/>

      </div>

    );
  }
};


// == Export
export default App;
