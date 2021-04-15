import React, {useCallback, useState, useEffect} from 'react';
// reactstrap components
import {
  Button,
  Card,
  CardBody,
  Form,
  Input,
  Row,
  Col,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
} from 'reactstrap';
import logo from '../../assets/img/Logo.svg';
import PropTypes from 'prop-types';
import {useDispatch, useSelector} from 'react-redux';
import {AuthActions} from '../../store/actions/AuthActions';
import {StorageService} from '../../store/services/StorageService';
import {Link} from 'react-router-dom';

function ForgotPassword({history}) {
  const [valid, setValid] = useState({isValid: true, type: '', message: ''});
  const isError = useSelector((store) => store.auth.isError);
  const errorMessage = useSelector((store) => store.auth.errorText);
  const isProgress = useSelector((store) => store.auth.isProgress);
  const user = useSelector((store) => store.auth.user);
  const [formValues, setFormValues] = useState({email: '', password: ''});
  const dispatch = useDispatch();

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
      }
      let body = {
        email: formValues.email,
      };
      dispatch(AuthActions.resetPassword(body));
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
                <div className="back-arrow" onClick={() => history.goBack()}>
                  <i class="fas fa-arrow-left"></i>
                </div>
                {/* <Alert color="danger" >Invalid username of password</Alert> */}
                <div className="author">
                  <a href="#pablo" onClick={(e) => e.preventDefault()}>
                    <img alt="..." className="avatar " src={logo} />
                    <h5 className="title">Forgot Password</h5>
                  </a>
                  <p className="description">
                    Enter registered email to receive password reset link
                  </p>
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
                          <span> Send </span>
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
                    <h2 className="white-text heading">Laundrez</h2>
                    <p>&nbsp;</p>
                  </div>
                  <p className="white-text">The easiest way to stay clean</p>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
}
ForgotPassword.propTypes = {
  history: PropTypes.object,
};
export default ForgotPassword;
