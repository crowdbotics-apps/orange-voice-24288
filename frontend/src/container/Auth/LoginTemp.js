import React, { useCallback, useState, useEffect } from 'react';
// reactstrap components
import {
  Button,
  Card,
  CardBody,
  FormGroup,
  Form,
  Input,
  Row,
  Col
} from 'reactstrap';
import logo from '../../assets/img/Logo.svg';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { AuthActions } from '../../store/actions/AuthActions';
import { StorageService } from '../../store/services/StorageService';

function Login({ history }) {

  const [valid, setValid] = useState({ isValid: true, type: '', message: '' });
  // const [error, setError] = useState({ isError: false, message: '' });
  const isError = useSelector(store => store.auth.isError);
  const errorMessage = useSelector(store => store.auth.errorText);
  const isProgress = useSelector(store => store.auth.isProgress);
  const user = useSelector(store => store.auth.user);
  const [formValues, setFormValues] = useState({ email: '', password: '' });
  const dispatch = useDispatch();


  const onLoginClick = useCallback((e) => {
    e.preventDefault();
    if (!valid.isValid)
      setValid({ isValid: true, type: '', message: '' });
    if (isError)
      dispatch(AuthActions.clearError());
    if (!formValues.email) {
      setValid({ isValid: false, type: 'email', message: 'Please provide email' });
      return;
    }
    if (
      !(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i).test(formValues.email)
    ) {
      setValid({ isValid: false, type: 'email', message: 'Email is not valid' });
      return;
    }

    else if (!formValues.password) {
      setValid({ isValid: false, type: 'password', message: 'Please provide password' });
      return;
    }

    else if (formValues.password.length < 8) {
      setValid({ isValid: false, type: 'password', message: 'Password is too short' });
      return;
    }
    let body = {
      username: formValues.email,
      password: formValues.password
    };
    dispatch(AuthActions.signin(body));
  }, [formValues, dispatch, valid, isError]);

  useEffect(() => {
    const token = StorageService.getToken();

    if (token && Object.keys(user).length) {
      history.replace('/admin/services');
    }
    else if (token && Object.keys(user).length === 0) {
      const userFromStorage = StorageService.getUser();
      dispatch(AuthActions.setUser(userFromStorage));
    }
  }, [user, dispatch, history]);


  return (
    <>

      <div className="content content-padding ">
        <Row className="top-row-height" >
          <Col>
          </Col>
        </Row>
        <Row className=" justify-content-center middle-row-height  " >
          <Col sm="12" md="9" lg="6"   >
            <Card className="card-user h-100  " >
              <CardBody>
                {/* <Alert color="danger" >Invalid username of password</Alert> */}
                <div className="author">
                  <a href="#pablo" onClick={e => e.preventDefault()}>
                    <img
                      alt="..."
                      className="avatar "
                      src={logo}
                    />
                    {/* <h5 className="title">Mike Andrew</h5> */}
                  </a>
                  {/* <p className="description">michael24</p> */}
                </div>
                <Form onSubmit={onLoginClick} >
                  <Row className="justify-content-center" >
                    <Col sm="9">
                      <FormGroup className="pl-2 pr-2" >
                        <label htmlFor="exampleInputEmail1">
                          Email address
                          </label>
                        <Input placeholder="Email"
                          type="email"
                          value={formValues.email}
                          onChange={(e) => setFormValues({ email: e.target.value, password: formValues.password })}
                        />
                        {(!valid.isValid && valid.type === 'email') && <label className="text-danger ml-3" >{valid.message}</label>}
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row className="justify-content-center" >
                    <Col sm="9">
                      <FormGroup className="pl-2 pr-2" >
                        <label>Password</label>
                        <Input
                          placeholder="Password"
                          type="password"
                          value={formValues.password}
                          onChange={(e) => setFormValues({ email: formValues.email, password: e.target.value })}
                        />
                        {(!valid.isValid && valid.type === 'password') && <label className="text-danger ml-3" >{valid.message}</label>}
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row className="justify-content-center pl-2 pr-2" >
                    <Col sm="9">
                      <Button
                        className="btn-round btn-block"
                        color="primary"
                        type="submit"
                        size="lg"
                        disabled={isProgress}
                      >
                        {
                          isProgress ?
                            <div className="spinner" ></div>
                            :
                            <span> Login </span>
                        }
                      </Button>
                      {isError && <label className="text-danger w-100 text-center" >{errorMessage}</label>}
                    </Col>
                  </Row>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
        {/* <Row className="last-row-height" >
          <Col>
          </Col>
        </Row> */}

      </div>
    </>
  );
}
Login.propTypes = {
  history: PropTypes.object
};
export default Login;