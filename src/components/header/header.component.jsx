import React from 'react';
import { Link, useHistory } from 'react-router-dom';

import { useAuthState, useAuthDispatch } from '../../context/context';

import './header.styles.scss'

const Header = (props) => {

    const state = useAuthState();
    const dispatch = useAuthDispatch();

    const history = useHistory();

    const route = () => {
        history.push('/home');
    }

    const logout = () => {
        localStorage.removeItem("currentUser");
        dispatch({type:"LOGOUT"})
    }

    return (
        <div className="header"> 

            <img onClick={route} src={"https://www.freeiconspng.com/thumbs/blogger-logo-icon-png/blogger-logo-icon-png-20.png"} alt="" />
            
            <div className="options">
                <Link className="option" to="/home">HOME</Link>
                {
                    state.isLoggedIn 
                    ? <span className="option" onClick={logout}>SIGN OUT</span>
                    : <Link className="option" to="/signin">SIGN IN</Link>

                }
            </div>

        </div>
    )
}

export default Header
