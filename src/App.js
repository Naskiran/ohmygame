import React, { Component } from 'react';
import Navbar from './components/navbar/Navbar';
import GlobalStyle from './styles/Global';
import './App.css'
import Footer from 'rc-footer';
import 'rc-footer/assets/index.css';

class App extends Component {
  state = {
    navbarOpen: false
  }

  handleNavbar = () => {
    this.setState({ navbarOpen: !this.state.navbarOpen});
  }

  render() {

    fetch("https://rawg-video-games-database.p.rapidapi.com/games", {
      "method": "GET",
      "headers": {
        "x-rapidapi-host": "rawg-video-games-database.p.rapidapi.com",
        "x-rapidapi-key": "d10259b06emsh37efa4897e75a6ap1a6aa6jsn152f224f582e"
      }
    })
    .then(response => {
      console.log(response);
    })
    .catch(err => {
      console.log(err);
    });

  return (
   <>
     <Navbar
       navbarState={this.state.navbarOpen}
       handleNavbar={this.handleNavbar}
       />
       <GlobalStyle />
       <Footer
    bottom="Made with ❤️ by Naskiran"
      />
   </>
  );
}

}

export default App;
