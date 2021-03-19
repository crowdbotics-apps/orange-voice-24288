
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Switch, Redirect } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.css';
import './assets/scss/now-ui-dashboard.scss';
// import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css';

import AdminLayout from './container/Admin/index';
import AuthContainer from './container/Auth';
import PrivateRoute from './components/Routes/PrivateRoute';
import { store } from './store/index';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-datepicker/dist/react-datepicker.css';
import { hist } from './routes';

ReactDOM.render(
  <Provider store={store}>
    <Router history={hist}>
      <ToastContainer />
      <Switch>
        <Route path="/admin/auth" render={props => <AuthContainer {...props} />} />
        <Route path="/admin" render={props => <PrivateRoute {...props} component={AdminLayout} />} />
        <Redirect from="/" to="/admin/auth/login" />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById('root')
);
export { hist };
