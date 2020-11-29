import React from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import Landing from "./views/Landing";
import Leaderboard from "./views/Leaderboard";

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route path="/leaderboard" component={Leaderboard} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
