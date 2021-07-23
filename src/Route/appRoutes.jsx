import React from 'react';
import {Route} from 'react-router-dom'

const AppRoutes = ({ component:Component, path, ...toast}) => {
    console.log(path);
    return (
        <Route key={path} path={path} exact={true} render={props => <Component {...props } {...toast}/> } />
    )
}

export default AppRoutes
