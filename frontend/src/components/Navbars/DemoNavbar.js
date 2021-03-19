
import React from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Container
} from 'reactstrap';

import routes from '../../routes.js';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { StorageService } from '../../store/services/StorageService.js';
import { AuthActions } from '../../store/actions/AuthActions.js';

class Header extends React.Component {
  state = {
    isOpen: false,
    dropdownOpen: false,
    color: 'transparent'
  };
  sidebarToggle = React.createRef();
  toggle = () => {
    if (this.state.isOpen) {
      this.setState({
        color: 'transparent'
      });
    } else {
      this.setState({
        color: 'white'
      });
    }
    this.setState({
      isOpen: !this.state.isOpen
    });
  };
  dropdownToggle = () => {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  };
  getBrand = () => {
    var name;
    routes.map((prop) => {
      if (prop.collapse) {
        prop.views.map((prop) => {
          if (prop.path === this.props.location.pathname) {
            name = prop.name;
          }
          return null;
        });
      } else {
        if (prop.redirect) {
          if (prop.path === this.props.location.pathname) {
            name = prop.name;
          }
        } else {
          if (prop.path === this.props.location.pathname) {
            name = prop.name;
          }
        }
      }
      return null;
    });
    return name;
  };
  openSidebar = () => {
    document.documentElement.classList.toggle('nav-open');
    this.sidebarToggle.current.classList.toggle('toggled');
  };
  // function that adds color white/transparent to the navbar on resize (this is for the collapse)
  updateColor = () => {
    if (window.innerWidth < 993 && this.state.isOpen) {
      this.setState({
        color: 'white'
      });
    } else {
      this.setState({
        color: 'transparent'
      });
    }
  };
  onLogout = () => {
    setTimeout(() => {
      StorageService.clearStorage();
      this.props.signout();
      this.props.history.replace('/admin/auth/login');
    }, 300);

  }
  componentDidMount() {
    window.addEventListener('resize', this.updateColor.bind(this));
  }
  componentDidUpdate(e) {
    if (
      window.innerWidth < 993 &&
      e.history.location.pathname !== e.location.pathname &&
      document.documentElement.className.indexOf('nav-open') !== -1
    ) {
      document.documentElement.classList.toggle('nav-open');
      this.sidebarToggle.current.classList.toggle('toggled');
    }
  }
  render() {
    return (
      // add or remove classes depending if we are on full-screen-maps page or not
      <Navbar
        color={
          this.props.location.pathname.indexOf('full-screen-maps') !== -1
            ? 'white'
            : this.state.color
        }
        expand="lg"
        className={
          this.props.location.pathname.indexOf('full-screen-maps') !== -1
            ? 'navbar-absolute fixed-top'
            : 'navbar-absolute fixed-top ' +
            (this.state.color === 'transparent' ? 'navbar-transparent ' : '')
        }
      >
        <Container fluid>
          <div className="navbar-wrapper">
            <div className="navbar-toggle">
              <button
                type="button"
                ref={this.sidebarToggle}
                className="navbar-toggler"
                onClick={() => this.openSidebar()}
              >
                <span className="navbar-toggler-bar bar1" />
                <span className="navbar-toggler-bar bar2" />
                <span className="navbar-toggler-bar bar3" />
              </button>
            </div>
            <NavbarBrand href="/">{this.getBrand()}</NavbarBrand>
          </div>
          <NavbarToggler onClick={this.toggle}>
            <span className="navbar-toggler-bar navbar-kebab" />
            <span className="navbar-toggler-bar navbar-kebab" />
            <span className="navbar-toggler-bar navbar-kebab" />
          </NavbarToggler>
          <Collapse
            isOpen={this.state.isOpen}
            navbar
            className="justify-content-end"
          >
            <Nav navbar>
              <Dropdown
                nav
                isOpen={this.state.dropdownOpen}
                toggle={e => this.dropdownToggle(e)}
              >
                <DropdownToggle caret nav>
                  <i className="now-ui-icons users_single-02" />
                  <p>
                    <span className="d-lg-none d-md-block">Account</span>
                  </p>
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem tag="a" className=" cursor-pointer" >{this.props?.user?.userName}</DropdownItem>
                  <DropdownItem tag="a" className=" cursor-pointer font-weight-bold" onClick={this.onLogout} >
                    <i className="fas fa-sign-out-alt font-weight-bold"></i>
                    Logout</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </Nav>
          </Collapse>
        </Container>
      </Navbar >
    );
  }
}
Header.propTypes = {
  pathname: PropTypes.string,
  location: PropTypes.object,
  history: PropTypes.object,
  replace: PropTypes.func,
  signout: PropTypes.func,
  user: PropTypes.object
};
const mapStateToProps = (store) => {
  return {
    user: store.auth.user
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    signout: () => dispatch(AuthActions.signout())
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Header);
