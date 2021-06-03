import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import { Counter } from "features/counter/Counter";
import Todos from "features/todos/Todos";
import Home from "features/home/Home";
import "App.css";

function App() {
  return (
    <Router>
      <nav className="custom-nav">
        <Link to="/">Home</Link>
        <Link to="/counter">Counter</Link>
        <Link to="/todos">Todos</Link>
      </nav>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/counter">
          <Counter />
        </Route>
        <Route path="/todos">
          <Todos />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
