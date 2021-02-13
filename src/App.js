import React from "react";
import "./App.css";
import { Route, NavLink, BrowserRouter, Switch } from "react-router-dom";

import NewOrderPage from "./pages/NewOrderPage";
import OrderPage from "./pages/OrderPage";
import ManagerPage from "./pages/ManagerPage";

function App() {
  return (
    <BrowserRouter>
      <NavLink to="/">Home</NavLink>

      <Switch>
        <Route exact path="/" component={ManagerPage} />
        <Route exact path="/new" component={NewOrderPage} />
        <Route exact path="/order/:orderId" component={OrderPage} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
