import React, { Component } from 'react';
import Navbar from './components/navbar/Navbar';
import GlobalStyle from './styles/Global';
import './App.css'
import Footer from 'rc-footer';
import 'rc-footer/assets/index.css';

class App extends Component {
  state = {
    navbarOpen: false,
    game_data: [],
    // name: gameName,
    backgroundImg: "",
    // rating: rate
  }

  // getGameData = () => {

  //   fetch("https://rawg-video-games-database.p.rapidapi.com/games")
  //   .then(res => res.json())
  //   .then(res => {
  //     this.setState({backgroundImg: this.getImg(res.results.background_image)})
  //   })
  // }



  handleNavbar = () => {
    this.setState({ navbarOpen: !this.state.navbarOpen});
  }

  render() {


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
