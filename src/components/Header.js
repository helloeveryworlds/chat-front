import React, {Component} from 'react';
import GPT  from '../asset/Chatlogo.svg';

class Header extends Component {
    render() {
      return (
        <header className="App-header">
          <img src={GPT} className="logo-image" alt="logo" id="logo-image" />
          <p className="title" id="main-title">
            Job Seeker Chatbot
          </p>
        </header>
      );
    }
  }
  
  export default Header;