import React, {useCallback, useEffect} from 'react';
// reactstrap components
import {Button, Card, CardBody, Form, Row, Col} from 'reactstrap';
import logo from '../../assets/img/Logo.svg';
import PropTypes from 'prop-types';
import {useDispatch, useSelector} from 'react-redux';
import {AuthActions} from '../../store/actions/AuthActions';
import {StorageService} from '../../store/services/StorageService';
import {Link} from 'react-router-dom';
import {Formik} from 'formik';
import {authFields} from './contants';
import {registerValidationSchema} from './validation';
import TextField from '../../components/Forms/TextField';

function Signup({history}) {
  const isError = useSelector((store) => store.auth.isError);
  const errorMessage = useSelector((store) => store.auth.errorText);
  const isProgress = useSelector((store) => store.auth.isProgress);
  const user = useSelector((store) => store.auth.user);
  const dispatch = useDispatch();

  const onLoginClick = useCallback(
    (values) => {
      dispatch(AuthActions.signup(values));
      console.warn(isError);
    },
    [dispatch, isError],
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
    <Formik
      initialValues={{
        [authFields.firstName]: '',
        [authFields.lastName]: '',
        [authFields.phoneNumber]: '',
        [authFields.email]: '',
        [authFields.password]: '',
        [authFields.postalCode]: '',
        [authFields.referralCode]: '',
      }}
      onSubmit={(values) => {
        onLoginClick(values);
      }}
      validationSchema={registerValidationSchema}
      validateOnChange={true}>
      {({formBag, submitForm}) => (
        <div className="full-height">
          <Row className="full-height">
            <Col sm="12" md="9" lg="6" className="zero-padding">
              <Card className="card-user h-100 force-center ">
                <CardBody className="margin-horizontal">
                  <div className="author">
                    <a href="#pablo" onClick={(e) => e.preventDefault()}>
                      <img alt="..." className="avatar " src={logo} />
                      <h5 className="title">Get Registered</h5>
                    </a>
                  </div>
                  <Form onSubmit={(e) => e.preventDefault}>
                    <Row className="justify-content-center">
                      <Col sm="12">
                        <TextField
                          name="firstName"
                          type="text"
                          placeholder="First Name"
                        />
                      </Col>
                      <Col sm="12">
                        <TextField
                          name="lastName"
                          type="text"
                          placeholder="Last Name"
                        />
                      </Col>
                      <Col sm="12">
                        <TextField
                          name="phoneNumber"
                          type="text"
                          placeholder="Phone Number"
                        />
                      </Col>
                      <Col sm="12">
                        <TextField
                          name="email"
                          type="email"
                          placeholder="Email"
                        />
                      </Col>
                      <Col sm="12">
                        <TextField
                          name="password"
                          type="password"
                          placeholder="Password"
                        />
                      </Col>
                      <Col sm="12">
                        <TextField
                          name="postalCode"
                          type="text"
                          placeholder="Postal Code"
                        />
                      </Col>
                      <Col sm="12">
                        <TextField
                          name="referralCode"
                          type="text"
                          placeholder="Referral Code"
                        />
                      </Col>
                    </Row>

                    <Row className="justify-content-center">
                      <Col sm="12">
                        <span className="muted-text">
                          By Signing up, you accept our &nbsp;&nbsp;
                        </span>
                        <span className="text-primary">
                          Terms and Conditions and Privacy Policy
                        </span>
                      </Col>
                    </Row>
                    <Row className="justify-content-center margin-top-30">
                      <Col sm="12">
                        <Button
                          className="btn-block"
                          color="primary"
                          size="lg"
                          onClick={submitForm}
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
                        Already Have an Account?&nbsp;&nbsp;
                      </span>
                      <Link to="/admin/auth/login">
                        <span className="text-primary">Signin</span>
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
      )}
    </Formik>
  );
}
Signup.propTypes = {
  history: PropTypes.object,
};
export default Signup;
