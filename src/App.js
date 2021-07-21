import React, { Suspense } from 'react';

import { BrowserRouter, Switch, Route, Router } from 'react-router-dom';
import Loader from "react-loader-spinner";

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import  routes  from  './Route/routes';
import history from './Route/history';
import AppRoutes from './Route/appRoutes';

import { UserContextApi } from './context/context';

import Header from './components/header/header.component';



function App() {

  return (

    <UserContextApi>

      <BrowserRouter history={history}>
      <Suspense fallback={<Loader type="Puff"  color="#00BFFF" height={100} width={100}  timeout={3000} />}>

            <Header />
            <Switch>              
                {
                  routes.map(route => (
                    <AppRoutes key={route.path}component={route.component}  path={route.path}/>
                    // <Route  key={route.path} exact path={route.path} component={route.component}/>
                     
                  ))
                }
            </Switch>
            </Suspense>                  

      </BrowserRouter>

    </UserContextApi>
  );
}

export default App;
