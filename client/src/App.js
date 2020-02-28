import React from 'react';
import { BrowserRouter, Link, Switch, Route } from "react-router-dom";
import './App.css';
import SignupBox from './SignupBox';
import StockPortal from './StockPortal';

const App = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <h1>Simple Stock Portfolio</h1>
        <Switch>
          <Route path='/portal/:user' component={StockPortal} />
          <Route path='/' component={SignupBox} />
          <Route />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
