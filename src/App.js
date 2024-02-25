import React from "react";
import './App.css';
import Navbar from './navbar';
import Home from './pages/Home';
import Host from './pages/Host';
import Profile from './pages/Profile';
import Upload from './pages/Upload';
import GitHubOAuth from './GitHubOAuth';

// const express = require('express');
// const session = require('express-session');
// const { initialize, session: sessionMiddleware } = require('./auth');
// const routes = require('./routes');

// const app = express();


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
    case "/Login":
      console.log(window.location.pathname)
      component = <GitHubOAuth />
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
