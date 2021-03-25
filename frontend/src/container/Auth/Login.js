import React, {useCallback, useState, useEffect} from 'react';
// reactstrap components
import {
  Button,
  Card,
  CardBody,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Label,
} from 'reactstrap';
import logo from '../../assets/img/Logo.svg';
import PropTypes from 'prop-types';
import {useDispatch, useSelector} from 'react-redux';
import {AuthActions} from '../../store/actions/AuthActions';
import {StorageService} from '../../store/services/StorageService';
import {Link} from 'react-router-dom';

function Login({history}) {
  const [valid, setValid] = useState({isValid: true, type: '', message: ''});
  // const [error, setError] = useState({ isError: false, message: '' });
  const isError = useSelector((store) => store.auth.isError);
  const errorMessage = useSelector((store) => store.auth.errorText);
  const isProgress = useSelector((store) => store.auth.isProgress);
  const user = useSelector((store) => store.auth.user);
  const [formValues, setFormValues] = useState({email: '', password: ''});
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);

  const onLoginClick = useCallback(
    (e) => {
      e.preventDefault();
      if (!valid.isValid) setValid({isValid: true, type: '', message: ''});
      if (isError) dispatch(AuthActions.clearError());
      if (!formValues.email) {
        setValid({
          isValid: false,
          type: 'email',
          message: 'Please provide email',
        });
        return;
      }
      if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formValues.email)) {
        setValid({
          isValid: false,
          type: 'email',
          message: 'Email is not valid',
        });
        return;
      } else if (!formValues.password) {
        setValid({
          isValid: false,
          type: 'password',
          message: 'Please provide password',
        });
        return;
      } else if (formValues.password.length < 8) {
        setValid({
          isValid: false,
          type: 'password',
          message: 'Password is too short',
        });
        return;
      }
      let body = {
        email: formValues.email,
        password: formValues.password,
      };
      dispatch(AuthActions.signin(body));
    },
    [formValues, dispatch, valid, isError],
  );

  useEffect(() => {
    const token = StorageService.getToken();

    if (token && Object.keys(user).length) {
      history.replace('/admin/services');
    } else if (token && Object.keys(user).length === 0) {
      const userFromStorage = StorageService.getUser();
      dispatch(AuthActions.setUser(userFromStorage));
    }
  }, [user, dispatch, history]);

  return (
    <>
      <div className="full-height">
        <Row className="full-height">
          <Col sm="12" md="9" lg="6" className="zero-padding">
            <Card className="card-user h-100 force-center ">
              <CardBody className="margin-horizontal">
                {/* <Alert color="danger" >Invalid username of password</Alert> */}
                <div className="author">
                  <a href="#pablo" onClick={(e) => e.preventDefault()}>
                    <img alt="..." className="avatar " src={logo} />
                    {/* <h5 className="title">Mike Andrew</h5> */}
                  </a>
                  {/* <p className="description">michael24</p> */}
                </div>
                <Form onSubmit={onLoginClick}>
                  <Row className="justify-content-center">
                    <Col sm="12">
                      <InputGroup
                        className={'form-control-lg input-group-focus'}>
                        <Input
                          type="email"
                          placeholder="Email"
                          name="email"
                          value={formValues.email}
                          onChange={(e) =>
                            setFormValues({
                              email: e.target.value,
                              password: formValues.email,
                            })
                          }
                        />
                        <InputGroupAddon addonType="append">
                          <InputGroupText>
                            <i className="" />
                          </InputGroupText>
                        </InputGroupAddon>
                        {!valid.isValid && valid.type === 'email' && (
                          <label className="text-danger ml-3">
                            {valid.message}
                          </label>
                        )}
                      </InputGroup>
                    </Col>
                  </Row>

                  <Row className="justify-content-center">
                    <Col sm="12">
                      <InputGroup
                        className={'form-control-lg input-group-focus'}>
                        <Input
                          type={showPassword ? 'text' : 'password'}
                          placeholder="Password"
                          name="firstname"
                          value={formValues.password}
                          onChange={(e) =>
                            setFormValues({
                              email: formValues.email,
                              password: e.target.value,
                            })
                          }
                        />
                        <InputGroupAddon addonType="append">
                          <InputGroupText
                            onClick={() => setShowPassword(!showPassword)}>
                            <i
                              className={
                                showPassword
                                  ? `black-text fas fa-eye`
                                  : `fas fa-eye-slash`
                              }
                            />
                          </InputGroupText>
                        </InputGroupAddon>
                        {!valid.isValid && valid.type === 'password' && (
                          <label className="text-danger ml-3">
                            {valid.message}
                          </label>
                        )}
                      </InputGroup>
                    </Col>
                  </Row>
                  <Row className="justify-content-center">
                    <Col sm="6">
                      <FormGroup check className="mt-3 margin-left-zero">
                        <Label check>
                          <Input type="checkbox" />
                          <span className="form-check-sign" />
                          Remember me
                        </Label>
                      </FormGroup>
                    </Col>
                    <Col sm="6 text-right align-middle float-content-right">
                      <span className="text-primary">Forgot password?</span>
                    </Col>
                  </Row>
                  <Row className="justify-content-center margin-top-30">
                    <Col sm="12">
                      <Button
                        className="btn-block"
                        color="primary"
                        type="submit"
                        size="lg"
                        disabled={isProgress}>
                        {isProgress ? (
                          <div className="spinner"></div>
                        ) : (
                          <span> Login </span>
                        )}
                      </Button>
                      {isError && (
                        <label className="text-danger w-100 text-center">
                          {errorMessage}
                        </label>
                      )}
                    </Col>
                  </Row>
                </Form>
                <Row className="justify-content-center margin-top-40">
                  <Col sm="12">
                    <span className="muted-text">
                      Don't have an account yet?&nbsp;&nbsp;
                    </span>
                    <Link to="/admin/auth/signup">
                      <span className="text-primary">Sign up</span>
                    </Link>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
          <Col sm="0" md="6" lg="6" className="zero-padding">
            <div className="login-bg">
              <div className="login-right-content">
                <div className="margin-15">
                  <div style={{display: 'flex'}}>
                    <h1 className="white-text heading">Join our community</h1>
                    <p>&nbsp;</p>
                  </div>
                  <p className="white-text">
                    Lorem ipsum dolor sit amet, coectetuer adipiscing elit sed
                    diam nonummy et nibh euismod
                  </p>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
}
Login.propTypes = {
  history: PropTypes.object,
};
export default Login;
