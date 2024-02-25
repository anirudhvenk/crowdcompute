import './App.css';
import React from "react";
import Navbar from './navbar';
import Home from './pages/Home'
import Host from './pages/Host'
import Profile from './pages/Profile'
import Upload from './pages/Upload'


function App() {
  let component
  switch (window.location.pathname) {
    case "/Home":
      component = <Home />
      console.log(window.location.pathname)
      break
    case "/Host":
      component = <Host />
      console.log(window.location.pathname)
      break
    case "/Profile":
      component = <Profile />
      console.log(window.location.pathname)
      break
    case "/Upload":
      component = <Upload />
      console.log(window.location.pathname)
      break
  }
  return (
    <>
      <Navbar />
      <div className="container">
        {component}
      </div>
    </>
  );
}

export default App;
