import React, { Component } from 'react';
import './style.scss';
import Header from './Components/Header/Header.js'
import Footer from './Components/Footer/Footer.js'
import LoanComponent from './Components/LoanComponent/LoanComponent.js'

class App extends Component {
  render() {
    return (
      <div>
        <Header></Header>
        <div className="wrapper">
          <LoanComponent></LoanComponent>
        </div>
        <Footer></Footer>
      </div>
    );
  }
}

export default App;
