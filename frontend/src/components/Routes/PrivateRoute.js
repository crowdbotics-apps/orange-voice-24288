import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { StorageService } from '../../store/services/StorageService';
const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        (StorageService.getToken())
            ? <Component {...props} />
            : <Redirect to={'/admin/auth/login'} />
    )} />
);
PrivateRoute.propTypes = {
    component: PropTypes.object
};
export default PrivateRoute;