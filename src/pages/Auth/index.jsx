import React from 'react';
import { LoginForm, RegisterForm } from "modules"
import { Route } from "react-router-dom"

import "./Auth.scss"
import CheckEmailInfo from './components/CheckEmailInfo';

const Auth = ()  => {
    return (
        <section className="auth">
            <div className="auth__content">
                <Route exact path="/singin" component={LoginForm} />
                <Route exact path="/singup" component={RegisterForm} />
                <Route exact path="/singup/verify" component={CheckEmailInfo} />
            </div>
        </section>
    );
};

export default Auth;