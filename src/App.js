import React, { Suspense } from 'react';

import { Router, Switch, Route, Redirect } from 'react-router-dom';

import ReactNotification from 'react-notifications-component';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-notifications-component/dist/theme.css';
import 'react-confirm-alert/src/react-confirm-alert.css';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

import routes from './Route/routes';
import history from './Route/history';
import AppRoutes from './Route/appRoutes';

import Header from './components/header/header.component';
import PageNotFound from './pages/pageNotFound/pageNotFound.component';

import { RootContext } from './context/rootContext';

function App() {

  return (

    <RootContext >

      <Router history={history} >
        <Suspense fallback={<div>Loading....</div>}>
          <ReactNotification />
          <Header />

          <Switch>
            {
              routes.map(route => (
                <AppRoutes key={route.path} component={route.component} path={route.path} />
                // <Route a={'sss'} key={route.path} exact path={route.path} component={route.component}/>

              ))
            }
            <Redirect exact from="/" to="/home" push />
            <Route path='*' component={PageNotFound} />

          </Switch>
        </Suspense>

      </Router>

    </RootContext>

  );
}

export default App;
