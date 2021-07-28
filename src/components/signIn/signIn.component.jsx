import React from 'react';

import { useForm } from "react-hook-form";

import { useAuthDispatch } from '../../context/context';
import { useToastDispatch } from '../../context/toastContext';

import { userLogin } from '../../Services/apiServices';

import './signIn.styles.scss';

const SignIn = (props) => {

    const authDispatch = useAuthDispatch();
    const toastDispatch = useToastDispatch();

    const { register, handleSubmit, formState: { errors }} = useForm();

    const submitForm = (data) => {

        userLogin(data)
        .then(res=>{
            authDispatch({type:"LOGIN", payload:res.data.user});
            localStorage.setItem("currentUser", JSON.stringify(res.data.user));
            props.history.goBack();
        })
        .catch(err=>{
            console.log(err.response)
            toastDispatch("danger", "Invalid", "Check your email or password")

        })
    }

    return (
        <div className="sign-in">

                <h2>I already have an acccount</h2>
                <span>Sign in with your email and password</span>

                <form onSubmit={handleSubmit(submitForm)}>

                    <div className="form-group my-4">
                        <label htmlFor="exampleInputEmail1">Email address</label>
                        <input type="email" {...register("email", {required:true})} className="form-control"
                          id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
                        {errors.email ? <small classNameName="error-msg">Email required</small> : ''}

                    </div>

                    <div className="form-group mb-4">
                        <label htmlFor="exampleInputPassword1">Password</label>
                        <input type="password" { ...register("password", { required:true }) } className="form-control" 
                          id="exampleInputPassword1" placeholder="Password"/>
                          { errors.password ?<small className="error-msg mt-5">Password required</small> : '' }
                    </div>

                    <button type="submit" className="btn btn-color">SIGN IN</button>

                </form>

        </div>
    )
}

export default SignIn
