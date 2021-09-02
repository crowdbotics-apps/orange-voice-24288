import React, {useEffect} from 'react';
import 'react-datetime/css/react-datetime.css';
import {Formik, Form} from 'formik';
// reactstrap components
import {Row, Col, Button} from 'reactstrap';
import {useDispatch, useSelector} from 'react-redux';
import {DomainActions} from '../../../store/actions/DomainActions';
import TextField from '../../../components/Forms/TextField';
import {domainValidationSchema} from '../../Auth/validation';

const Domain = ({location}) => {
  const dispatch = useDispatch();
  const isProgress = useSelector((store) => store?.domain?.isProgress);
  const domain = useSelector((store) => store?.domain?.domain);

  useEffect(() => {
    dispatch(DomainActions.getDomain()); // eslint-disable-next-line
  }, []);
  if (isProgress && Object.keys(domain).length === 0) {
    return <div className="spinner-lg"></div>;
  }

  return (
    <Col xs={12} md={6}>
      <Formik
        onSubmit={async (values) => {
          dispatch(DomainActions.editDomain(values));
        }}
        initialValues={{
          tax: domain?.tax || '',
          dropOffThreshold: domain?.dropOffThreshold || '',
          contactEmail: domain?.contactEmail || '',
        }}
        validationSchema={domainValidationSchema}
        validateOnChange={true}>
        {(formBag) => (
          <Form>
            <Row>
              <Col xs={12} md={12}>
                <TextField
                  label="Tax"
                  name="tax"
                  type="number"
                  placeholder="Tax (%)"
                  value={formBag.values.tax}
                  required
                />
                <TextField
                  label="Drop off threshold"
                  name="dropOffThreshold"
                  type="number"
                  placeholder="threshold"
                  value={formBag.values.dropOffThreshold}
                  required
                />

                <TextField
                  label="Contact email address"
                  name={'contactEmail'}
                  type="email"
                  placeholder="Email"
                  value={formBag.values.contactEmail}
                  required
                />
              </Col>
            </Row>
            <Row>
              <Col xs={12} md={6}>
                <Button
                  className="btn-fill"
                  color="primary"
                  onClick={formBag.submitForm}>
                  {formBag.loading ? (
                    <div className="spinner"></div>
                  ) : (
                    <span>Save</span>
                  )}
                </Button>
              </Col>
            </Row>
          </Form>
        )}
      </Formik>
    </Col>
  );
};

export default Domain;
