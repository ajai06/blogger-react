import React from 'react';
import {Route} from 'react-router-dom'

const AppRoutes = ({ component:Component, path}) => {
    return (
        <Route key={path} path={path} exact={true} render={props => <Component {...props } /> } />
    )
}

export default AppRoutes
