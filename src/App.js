import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import "App.css";
import { Counter } from "features/counter/Counter";
import Todos from "features/todos/Todos";
import Home from "features/home/Home";
import TodoDetail from "features/todos/TodoDetail";

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
        <Route exact path="/todos">
          <Todos />
        </Route>
        <Route path="/todos/:id">
          <TodoDetail />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
