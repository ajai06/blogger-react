import React from 'react';

import SignIn from '../../components/signIn/signIn.component';
import SignUp from '../../components/signUp/signUp.component';


import './signInAndSignUp.styles.scss';

function SignInAndSignUp(props) {

    return (
        
        <div className="sign-in-and-sign-up">
            <SignIn {...props}/>
            <SignUp {...props}/>
        </div>
    )
}

export default SignInAndSignUp
