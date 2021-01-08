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
// ou si on a besoin d'utiliser le cycle de vie

// composant sous forme de class : render retourne le JSX

// Objectif : pouvoir filtrer les devises en fonction d'un champ
// x ajouter un input
// x stocker dans le state
// x appeller setState => nouveau rendu automatique
// x array.filter


// == Composant
//! container component, le seul de l'application => gère les données (state) et
//! fournir les données au autres composants (presentational/dumb components), qui
//! se contentent d'afficher

class App extends React.Component {

  constructor(props) {
    super(props);

    console.log('--- Constructor ---')
  }

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
      currency : currenciesList[30].name,
      // value for the input filter for currencies
      search: '',
  };

  // fonction de cycle de vie de React
  componentDidMount() {
    // Endroit ou on met l'appel à une API
    console.log('--- componentDidMount ---');
    this.setPageTitle();
  }

  // version simple on met à jour le titre à chaque changementy du state
  /*
  componentDidUpdate() {
    console.log('--- ComponentDidUpdate ---');
    // changer le titre de ma page
    this.setPageTitle();
  }
  */

  // version avancée : comparer avec le state précédent
  componentDidUpdate(prevProps, prevState) {
    console.log('--- ComponentDidUpdate ---');
    console.log(`avant currency valait ${prevState.currency}, maintenant c'est ${this.state.currency}`);

    // on peut faire une action seulement dans certain cas
    if (prevState.currency !== this.state.currency){
      this.setPageTitle();
      console.log('mise à jour du titre');
    }
    
  }

  // factoriser pour faciliter les changements futurs
  setPageTitle() {
    document.title = `Euro to ${this.state.currency} `;
  }

  // !!! grâce au plugin babel "@babel/plugin-proposal-class-properties"
  // au lieu de définir une méthode, je définis une propriété
  handleClick = () => {
    // j'ai accès à this sans avoir besoin de "bind"
    // console.log("click");
    // changer quelque chose dans le state : envoi de la nouvelle valeur avec setState
    // on fournit un objet qui décrit les changements à appliquer au state
    // (je n'indique pas les propriétés qui gardent la même valeur)
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

    //console.log(`changement de devise :  ${name}`);

    this.setState({
      currency : name,
    });

    // !!! INTERDIT de modifier directement le state, il faut utiliser setState, sinon
    // !!! React ne détecte pas qu'il faut refaire le rendu
    // !!! => this.state.currency = name; (NO)

  };

  setSearch = (newValue) => {
    this.setState({
      search : newValue,
    });

  };

  getCurrencies = () => {
    
    const { search } = this.state;

    let filteredCurrencies;
    // trim() retire les espaces
    if (search.trim().length === 0) {
      filteredCurrencies = currenciesList;
    }
    else{
      // on prépare search (variable intermédiaire pour pas refaire à chaque boucle)
      // enlève les espace et transforme en minuscule
      const searchOptimized = search.trim().toLowerCase();

      // filtrer la liste des devises en fonction de search
      filteredCurrencies = currenciesList.filter((currency) => {
        // je retourne vrai si je veux conserver l'élément, faux sinon
        return currency.name.toLowerCase().includes(searchOptimized);
      });
    }

    // retourner la liste (ou la stocker dans le state)
    return filteredCurrencies;
  };

  handleAmountChange = (amount) => {
    console.log(amount);
    this.setState({
      baseAmount : Number(amount),
    });
  }

  /*
  input est un champ contolé : quand on saisi un caractère, au lieu de stocker la
  nouvelle valeur dans le DOM, il informe son parent que la valeur a changer => mise
  à jour du state, nouveau rendu, et donc la valeur est mise à jour dans le DOM.
  Pour cela on ajoute une information dans le state, et on a deux props :
  - une qui permet de récupérer la valeur stockée dans state (search)
  - une qui permet de déclencher une mise à jour de la valeur stocké dans le state
  (setSearch)
  */

  render() {

    console.log('--- Render ---')

    // strictement équivalent à :
    // const open = this.state.open
    const{ open,
           baseAmount, 
           currency, 
           search, 
           setSearch } = this.state;

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
    const filterCurrencies = this.getCurrencies();

    return (
      <div className="converter">

        <Header amount={baseAmount} setAmount={this.handleAmountChange}/>
        <CustomButton open={open}  manageClick={this.handleClick} />
        {open &&(
          <Currencies 
            currencies={filterCurrencies} 
            setCurrency={this.setCurrency}
            search={search}
            setSearch={this.setSearch}
          />
          )}
        <Amount currency={currency} amount={resultAmount}/>

      </div>

    );
  }
};


// == Export
export default App;
