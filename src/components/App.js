import React, { useState } from 'react';
// Routing
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// Components
import NavBar from './NavBar';
import Menu from './Menu'
import Main from './Main';
import Movie from './Movie';
import NotFound from './NotFound';

// Styling
import '../sass/index.scss';

const App = () => (
  <Router> 
      <NavBar />
      <Menu />
    <Switch>
      <Route exact path="/" component={Main} />
      <Route path="/movie/:title" component={Movie} /> 
      <Route path="/*" component={NotFound} /> 
    </Switch>
  </Router> 
)

export default App
