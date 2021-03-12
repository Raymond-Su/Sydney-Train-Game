import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import Landing from './views/Landing';
import './App.css';

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Landing} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
