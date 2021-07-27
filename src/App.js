import React, { Suspense } from 'react';

import { Router, Switch, Route, Redirect } from 'react-router-dom';

import ReactNotification from 'react-notifications-component'
import { store } from 'react-notifications-component';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-notifications-component/dist/theme.css';
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

import routes from './Route/routes';
import history from './Route/history';
import AppRoutes from './Route/appRoutes';

import { UserContextApi } from './context/context';

import Header from './components/header/header.component';
import PageNotFound from './pages/pageNotFound/pageNotFound.component';




function App() {

  const showToast = (type, title, message, timeout) => {

    store.addNotification({
      title: title,
      message: message,
      type: type,
      showIcon:true,
      container: "top-right",
      animationIn: ["animate__animated", "animate__fadesIn"],
      animationOut: ["animate__animated", "animate__fadeOut"],
      dismiss: {
        duration: 3000,
        onScreen: false
      },
    })
  };

  return (

    <UserContextApi>

      <Router history={history} >
        <Suspense fallback={<div>Loading....</div>}>
          <ReactNotification />
          <Header />

          <Switch>
            {
              routes.map(route => (
                <AppRoutes key={route.path} component={route.component} path={route.path} toast={showToast} />
                // <Route a={'sss'} key={route.path} exact path={route.path} component={route.component}/>

              ))
            }
            <Redirect exact from="/" to="/home" push />
            <Route path='*' component={PageNotFound} />

          </Switch>
        </Suspense>

      </Router>

    </UserContextApi>
  );
}

export default App;
