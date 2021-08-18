import React, { useEffect } from 'react';
import queryString from "query-string";
// reactstrap components
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Row,
  Col,
} from 'reactstrap';

import {useDispatch, useSelector} from 'react-redux';
import {StripeActions} from '../../../store/actions/StripeActions'

const StripeConnect = ({location}) => {
  const user = useSelector((store) => store?.auth?.user);
  const isProgress = useSelector((store) => store.auth.stripeConnecting);
  const dispatch = useDispatch();
  const profile = user?.profile;
  const parsed = queryString.parse(location.search);

  useEffect(() => {
    dispatch(StripeActions.stripeConnect({code: parsed.code, callBack: (obj) => {console.warn('We connected successfully ::', obj)}})) // eslint-disable-next-line
  }, []);

  return (
    <div className="content">
      <Row>
        <Col xs={12}>
          <Card>
            <CardHeader className="d-flex justify-content-between">
              <CardTitle tag="h4">
               Stripe Connected 
              </CardTitle>
            </CardHeader>
            <CardBody style={{    
              height: '75vh',
              display: 'flex',    
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center'
              }}>
              {isProgress && <div>Loading.....</div>}
              {profile?.stripe_connected && <div>Stripe connected successfully.</div>}
              {!profile?.stripe_connected && !isProgress && <div>Stripe not connected. Please try again.</div>}
              </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default StripeConnect;
