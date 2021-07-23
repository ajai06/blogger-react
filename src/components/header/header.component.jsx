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
        dispatch({ type: "LOGOUT" })
        history.push("/home")
    }

    return (
        <div className="header">

            <img onClick={route} src={"https://www.freeiconspng.com/thumbs/blogger-logo-icon-png/blogger-logo-icon-png-20.png"} alt="" />

            <div className="options">
                <Link className="option" to="/home">HOME</Link>
                {
                    state.isLoggedIn
                        ? <>
                            <Link className="option" to="/myArticles">MY BLOGS</Link> 
                            <Link className="option" to="/createArticle">NEW BLOG</Link>

                            <ul className="navbar-nav">
                                <li className="nav-item dropdown">
                                    <span className="option dropdown-toggle" id="navDropDownLink" data-toggle="dropdown" 
                                        aria-haspopup="true" aria-expanded="false" >
                                        {(state.user.username).toUpperCase()}
                                    </span>
                                    <div className="dropdown-menu" aria-labelledby="navDropDownLink">
                                        <Link className="option" to="/profile">PROFILE</Link>
                                        <div className="dropdown-divider"></div>
                                        <span className="option" onClick={logout}>SIGN OUT</span>

                                    </div>
                                </li>
                            </ul>
                        </>
                        : <Link className="option" to="/signin">SIGN IN</Link>

                }
            </div>

        </div>
    )
}

export default Header
