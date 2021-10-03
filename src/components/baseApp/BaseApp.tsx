import {
    BrowserRouter,
    Switch,
    Route,
    Redirect,
  } from "react-router-dom";
import routes from "../../configuration/routes";
import "./BaseApp.css";

import * as React from 'react';
import Header from "../header/Header";

interface IBaseAppProps {
}

const BaseApp: React.FunctionComponent<IBaseAppProps> = (props) => {
  return (
    <>
      <BrowserRouter>
        <Header />
          <Switch>
              {
                  routes.map(route => {
                      return (<Route key={route.path} path={route.path} exact={route.exact} component={route.component} />)
                  })
              }
              <Redirect from="/signup" to="/" />
              <Redirect from="/login" to="/" />
              <Route>
                  <div>NOT FOUND</div>
              </Route>
          </Switch>
      </BrowserRouter>
    </>
  );
};

export default BaseApp;

