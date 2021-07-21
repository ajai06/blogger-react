import React from 'react';
import { Link, useHistory } from 'react-router-dom';

import { useAuthState, useAuthDispatch } from '../../context/context';

// import { ReactComponent as Logo } from 'https://www.freeiconspng.com/thumbs/blogger-logo-icon-png/blogger-logo-icon-png-20.png';
import './header.styles.scss'

const Header = (props) => {

    const state = useAuthState();
    const dispatch = useAuthDispatch();

    console.log(props);

    const history = useHistory();

    const route = () => {
        history.push('/');
    }

    const logout = () => {
        localStorage.removeItem("currentUser");
        // route();
        dispatch({type:"LOGOUT"})
    }



    console.log(state);

    return (
        <div className="header">                    
            {/* <Link className="option"> */}
                <img onClick={route} src={"https://www.freeiconspng.com/thumbs/blogger-logo-icon-png/blogger-logo-icon-png-20.png"} alt="" />
            {/* </Link> */}
            <div className="options">
                <Link className="option" to="/">HOME</Link>
                {
                    state.isLoggedIn 
                    ? <Link className="option" onClick={logout}>SIGN OUT</Link>
                    : <Link className="option" to="/signin">SIGN IN</Link>

                }
                {/* <Link className="option" to="/signup">SIGN UP</Link> */}
            </div>
        </div>
    )
}

export default Header
