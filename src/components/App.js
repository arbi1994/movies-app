import React, { useState } from 'react';
// Routing
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
// Utils
import ScrollToTop from '../utils/ScrollToTop';
// Components
import NavBar from './Navbar/index';
import Menu from './Menu';
import Home from './Home/index';
import Cards from './Cards/index';
import Discover from './Discover';
import Movie from './MovieDetails/index';
import About from './About/index';
import ScrollUpButton from './ScrollUpButton';
import Footer from './Footer';
import NotFound from './NotFound';
// Styling
import '../sass/index.scss';

function App () {
  const [active, setActive] = useState(false)
  const [videoPlayerEl, setVideoPlayerEl] = useState(null) // get video player ref

  return(
    <Router>
      <NavBar active={active} setActive={setActive} videoPlayerEl={videoPlayerEl} />
      <Menu active={active} setActive={setActive} />

      <ScrollToTop>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/discover/:path" component={Discover} />
          <Route exact path="/movie/:title/:id">
            <Movie setVideoPlayerEl={setVideoPlayerEl} />  
          </Route> 
          <Route exact path="/about" component={About} />
          <Route path="/page-not-found" component={NotFound} />
          <Route path="*">
            <Redirect to="/page-not-found"/>
          </Route> 
        </Switch>
      </ScrollToTop>
      
      <ScrollUpButton />

      <Footer />
    </Router> 
  )
}

export default App
