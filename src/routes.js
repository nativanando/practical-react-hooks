import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { isAuthenticated } from "services/authentication";
import { publicRoutes, privateRoutes } from "services/router";

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
          <Redirect to={{ pathname: "/login", state: { from: props.location } }} />
        )
    }
  />
);

const publicRouteComponents = publicRoutes.map(({ path, component }, key) => <Route exact path={path} component={component} key={key} />);
const privateRouteComponents = privateRoutes.map(({ path, component, subPath }, key) => <PrivateRoute exact path={path} component={component} key={key} />);
const privateSubRouteComponents = privateRoutes.map(({ subPath }, key) => {
  return subPath.map(({ path, component }, index) => <PrivateRoute exact path={path} component={component} key={index} />)
});

const Routes = () => (
  <BrowserRouter>
    <Switch>
      {publicRouteComponents}
      {privateRouteComponents}
      {privateSubRouteComponents}
      <Route path="*" component={() => <h1>Page not found</h1>} />
    </Switch>
  </BrowserRouter>
);

export default Routes;