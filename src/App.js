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

  return (
   <>
     <Navbar
       navbarState={this.state.navbarOpen}
       handleNavbar={this.handleNavbar}
       />
       <GlobalStyle />
       <Footer
         columns={[{
         icon: (
         <img src="https://gw.alipayobjects.com/zos/rmsportal/XuVpGqBFxXplzvLjJBZB.svg" />),
         url: 'https://github.com/Naskiran',
         openExternal: true,
      },
    ]}
    bottom="Made with ❤️ by Naskiran"
      />
   </>
  );
}

}

export default App;
