import ChatBox from "./ChatBox";
import '../style/App.css';
import Header from './Header';
import Footer from './Footer';
import Nav from './Nav';
import Mock from './Mock';
import React, { useState } from 'react';

function App() {
  const [activeComponent, setActiveComponent] = useState('ChatBox');
  return (
    <div className="App" >
      <Header/>
      <div className="content">
        
      <Nav  onNavigate={setActiveComponent}/>
      {activeComponent === 'ChatBox' ? <ChatBox /> : <Mock />}
      </div>
      <Footer />
    </div>
  );
}

export default App;
