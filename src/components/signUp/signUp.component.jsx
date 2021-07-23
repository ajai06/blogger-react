import React, { useReducer } from 'react';

import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { userRegister } from '../../Services/apiServices';
import { useAuthDispatch, useAuthState } from '../../context/context';

import './signUp.styles.scss';

const SignUp = (props) => {

    const { register, handleSubmit, watch, formState:{ errors }} = useForm();

    const history = useHistory();

    const dispatch = useAuthDispatch();

    const submitForm = (data) => {

        userRegister(data)
        .then(res=> {
            localStorage.setItem('currentUser', JSON.stringify(res.data.user));
            dispatch({type: "REGISTER", payload: res.data.user})
            history.push('/home');
        })
        .catch(err => {
            console.log(err.response);
            if(err.response.data.errors.email) {
                props.toast("danger","Email exists", `Email has already been taken`)
            }
            if(err.response.data.errors.username) {
                props.toast("danger","Username exists", `Username has already been taken`)
            } else {
                props.toast("warning","Error", `Something went wrong !`)

            }
        })
    }

    return (
        <div className="sign-up">

                <h2 className="title">I do not have a account</h2>
                <span>Sign up with your email and password</span>

                <form onSubmit={handleSubmit(submitForm)}>

                    <div className="form-group my-4">
                        <label htmlFor="exampleInputName">User Name</label>
                        <input type="text" className="form-control" { ...register("username", {required:true})}
                            id="exampleInputName" aria-describedby="emailHelp" placeholder="Enter Name"/>
                        { errors.username ? <small className="error-msg">User name required</small> : '' }
                    </div>

                    <div className="form-group my-4">
                        <label htmlFor="exampleInputEmail">Email address</label>
                        <input type="email" className="form-control" { ...register("email", { required: true }) }
                            id="exampleInputEmail" aria-describedby="emailHelp" placeholder="Enter email"/>
                        { errors.email ? <small className="error-msg">Email required</small> : '' }

                    </div>

                    <div className="form-group mb-4">
                        <label htmlFor="exampleInputPassword">Password</label>
                        <input type="password" className="form-control" { ...register("password", { required: true, minLength:8 }) }
                             id="exampleInputPassword" placeholder="Password"/>
                        { errors.password?.type === "required" ? <small className="error-msg">Password required</small>
                          : errors.password?.type === "minLength" ? <small className="error-msg">Minimum 8 characters required</small>
                          : '' }

                    </div>

                    <div className="form-group mb-4">
                        <label htmlFor="exampleInputPassword2">Confirm Password</label>
                        <input name="confirmPassword" type="password" className="form-control" 
                            { ...register("confirmPassword",
                                {required:true, validate: value => value === watch("password") })
                            }
                             id="exampleInputPassword2" placeholder="Conrim Password"/>
                        { errors.confirmPassword?.type === 'required' ? <small className="error-msg">Confirm password required</small> 
                          : errors.confirmPassword?.type === 'validate' ?  <small className="error-msg">password not matching</small>
                          : ''
                        }
                    </div>

                    <button type="submit" className="btn btn-color">SIGN UP</button>

                </form>
                
        </div>
    )
}

export default SignUp
