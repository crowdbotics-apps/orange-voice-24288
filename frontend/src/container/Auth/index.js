import React from 'react';
import { Route, Switch } from 'react-router-dom';
import ForgotPassword from './ForgotPassword';
import Login from './Login';
import Signup from './Signup';

function AuthContainer() {
    return (
        <div className="wrapper">
            <div className="main-panel-login">
                <Switch>
                    <Route path="/admin/auth/login" component={Login} />
                    <Route path="/admin/auth/signup" component={Signup} />
                    <Route path="/admin/auth/forgot-password" component={ForgotPassword} />
                </Switch>
            </div>
        </div>
    );
}
export default AuthContainer;