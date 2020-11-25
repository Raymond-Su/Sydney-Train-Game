import React from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import Home from "./views/Home";
import List from "./views/Leaderboard";

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/list" component={List} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
