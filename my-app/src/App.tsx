import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Menu from './components/Menu';
import Details from './pages/Details';
import Home from './pages/Home';

function App() {
  return (
    <div className="site">
      <Menu/>
      <Router>
        <Switch>
          <Route exact path="/"> 
            <Home />
           </Route>
          <Route path="/details/:id">
            <Details />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}
export default App;
