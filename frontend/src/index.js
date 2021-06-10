import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, Switch, Redirect} from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.css';
import './assets/scss/now-ui-dashboard.scss';

import AdminLayout from './container/Admin/index';
import AuthContainer from './container/Auth';
import PrivateRoute from './components/Routes/PrivateRoute';
import {store} from './store/index';
import {Provider} from 'react-redux';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-datepicker/dist/react-datepicker.css';
import {hist} from './routes';

const App = () => {
  return (
    <Provider store={store}>
      <Router history={hist}>
        <ToastContainer />
        <Switch>
          <Route
            path="/admin/auth"
            render={(props) => <AuthContainer {...props} />}
          />
          <Route
            path="/admin"
            render={(props) => (
              <PrivateRoute {...props} component={AdminLayout} />
            )}
          />
          <Redirect from="/" to="/admin/auth/login" />
        </Switch>
      </Router>
    </Provider>
  );
};
ReactDOM.render(<App />, document.getElementById('root'));
export {hist};
