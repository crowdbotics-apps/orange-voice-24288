
import React from 'react';
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from 'perfect-scrollbar';

// reactstrap components
import { Route, Switch, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
// core components
import DemoNavbar from '../../components/Navbars/DemoNavbar';
import Sidebar from '../../components/Sidebar/Sidebar';
import routes from '../../routes';
import { StorageService } from '../../store/services/StorageService';
import { AuthActions } from '../../store/actions/AuthActions';
import { connect } from 'react-redux';

var ps;

class Dashboard extends React.Component {
  state = {
    backgroundColor: 'blue'
  };
  mainPanel = React.createRef();
  componentDidMount() {
    const token = StorageService.getToken();
    if (navigator.platform.indexOf('Win') > -1) {
      ps = new PerfectScrollbar(this.mainPanel.current);
      document.body.classList.toggle('perfect-scrollbar-on');
    }
    else if (token && Object.keys(this.props.user).length === 0) {
      const userFromStorage = StorageService.getUser();
      this.props.setUser(userFromStorage);
    }
  }
  componentWillUnmount() {
    if (navigator.platform.indexOf('Win') > -1) {
      ps.destroy();
      document.body.classList.toggle('perfect-scrollbar-on');
    }
  }
  componentDidUpdate(e) {
    if (e.history.action === 'PUSH') {
      this.mainPanel.current.scrollTop = 0;
      document.scrollingElement.scrollTop = 0;
    }
  }
  handleColorClick = color => {
    this.setState({ backgroundColor: color });
  };
  render() {
    return (
      <div className="wrapper">
        <Sidebar
          {...this.props}
          routes={routes}
          backgroundColor={this.state.backgroundColor}
        />
        <div className="main-panel" ref={this.mainPanel}>
          <DemoNavbar {...this.props} />
          <Switch>
            {routes.map((prop, key) => {
              return (
                <Route
                  path={prop.layout + prop.path}
                  component={prop.component}
                  key={key}
                />
              );
            })}
            <Redirect from="/admin" to="/admin/orders" />
          </Switch>
          {/* <Footer fluid /> */}
        </div>
      </div>
    );
  }
}
const mapStateToProps = (store) => {
  return {
    user: store.auth.user
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setUser: (user) => dispatch(AuthActions.setUser(user))
  };
};
Dashboard.propTypes = {
  user: PropTypes.object,
  setUser: PropTypes.func
};
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
