import React, {useEffect, useCallback, useState, useRef} from 'react';
import 'react-datetime/css/react-datetime.css';
import {Formik, Form} from 'formik';
// reactstrap components
import {Row, Col, Button} from 'reactstrap';
import {useDispatch, useSelector} from 'react-redux';
import {DomainActions} from '../../../store/actions/DomainActions';
import TextField from '../../../components/Forms/TextField';
import {domainValidationSchema} from '../../Auth/validation';
import ColorPickerField from '../../../components/Forms/ColorPickerField';

const Domain = ({location}) => {
  const dispatch = useDispatch();
  const [imageNotValid, setImageNotValid] = useState({
    error: false,
    message: '',
  });
  const isProgress = useSelector((store) => store?.domain?.isProgress);
  const domain = useSelector((store) => store?.domain?.domain);
  const [logo, setLogo] = useState(domain?.logo);
  const fileInput = useRef();

  useEffect(() => {
    dispatch(DomainActions.getDomain()); // eslint-disable-next-line
  }, []);

  useEffect(() => {
    setLogo(domain?.logo);
  }, [domain]);

  const onImageSelect = useCallback(
    (e) => {
      let img;
      let _URL = window.URL || window.webkitURL;
      let file = e.target.files[0];
      if (file) {
        let fileSizeInMB = file?.size / 1000000;
        img = new Image();
        let objectUrl = _URL.createObjectURL(file);
        img.onload = function () {
          if (fileSizeInMB > 4) {
            setImageNotValid({
              error: true,
              message: 'File size is exceeding 4MB',
            });
          } else if (imageNotValid.error) {
            setImageNotValid({error: false, message: ''});
          }
        };
        console.log(file);
        img.src = objectUrl;
        setLogo(objectUrl);
        let formData = new FormData();
        formData.append('logo', file);
        dispatch(DomainActions.editDomain(formData));
      } else {
        setImageNotValid({error: false, message: ''});
      }
    }, // eslint-disable-next-line
    [imageNotValid], // eslint-disable-next-line
  );

  if (isProgress && Object.keys(domain).length === 0) {
    return <div className="spinner-lg"></div>;
  }

  return (
    <Col xs={12} md={12}>
      <Formik
        onSubmit={async (values) => {
          dispatch(DomainActions.editDomain(values));
        }}
        initialValues={{
          tax: domain?.tax || '',
          dropOffThreshold: domain?.dropOffThreshold || '',
          contactEmail: domain?.contactEmail || '',
          deliveryFee: domain?.deliveryFee || '',
          darkOrange: domain?.darkOrange || '',
          lightOrange: domain?.lightOrange || '',
          white: domain?.white || '',
          steelBlue: domain?.steelBlue || '',
          lightBlue: domain?.lightBlue || '',
          fbBlue: domain?.fbBlue || '',
          boxShadow: domain?.boxShadow || '',
          fieldLabel: domain?.fbBlue || '',
        }}
        validationSchema={domainValidationSchema}
        validateOnChange={true}>
        {(formBag) => (
          <Form>
            <Row>
              <Col xs={12} md={6}>
                <Row>
                  <Col md={3}>
                    <div style={{width: 63, height: 63}}>
                      <img src={logo} alt="logo" />
                    </div>
                  </Col>
                  <Col md={9}>
                    <Button
                      color="primary"
                      onClick={() => {
                        if (fileInput.current) {
                          fileInput.current.click();
                        }
                      }}>
                      Upload Logo
                    </Button>
                    <input
                      style={{display: 'none'}}
                      type="file"
                      placeholder="Image"
                      accept="image/x-png,image/jpg,image/jpeg,image/svg+xml"
                      onChange={onImageSelect}
                      ref={fileInput}
                    />
                  </Col>
                  <Col xs={12} md={6}>
                    <ColorPickerField
                      label="Primary Dark"
                      onChange={(value) =>
                        formBag.setFieldValue('darkOrange', value)
                      }
                      color={formBag.values.darkOrange}
                    />
                  </Col>
                  <Col xs={12} md={6}>
                    <ColorPickerField
                      label="Primary Light"
                      onChange={(value) =>
                        formBag.setFieldValue('lightOrange', value)
                      }
                      color={formBag.values.lightOrange}
                    />
                  </Col>
                  <Col xs={12} md={6}>
                    <ColorPickerField
                      label="Background "
                      onChange={(value) =>
                        formBag.setFieldValue('white', value)
                      }
                      color={formBag.values.white}
                    />
                  </Col>
                  <Col xs={12} md={6}>
                    <ColorPickerField
                      label="Text"
                      onChange={(value) =>
                        formBag.setFieldValue('steelBlue', value)
                      }
                      color={formBag.values.steelBlue}
                    />
                  </Col>
                  {/* <Col xs={12} md={6}>
                    <ColorPickerField
                      label="Light Blue"
                      onChange={(value) =>
                        formBag.setFieldValue('lightBlue', value)
                      }
                      color={formBag.values.lightBlue}
                    />
                  </Col> */}
                  <Col xs={12} md={6}>
                    <ColorPickerField
                      label="Facebook"
                      onChange={(value) =>
                        formBag.setFieldValue('fbBlue', value)
                      }
                      color={formBag.values.fbBlue}
                    />
                  </Col>
                  <Col xs={12} md={6}>
                    <ColorPickerField
                      label="boxShadow"
                      onChange={(value) =>
                        formBag.setFieldValue('boxShadow', value)
                      }
                      color={formBag.values.boxShadow}
                    />
                  </Col>
                  <Col xs={12} md={6}>
                    <ColorPickerField
                      label="Field Label"
                      onChange={(value) =>
                        formBag.setFieldValue('fieldLabel', value)
                      }
                      color={formBag.values.fieldLabel}
                    />
                  </Col>
                </Row>
              </Col>
              <Col xs={12} md={6}>
                <TextField
                  label="Contact email address"
                  name={'contactEmail'}
                  type="email"
                  placeholder="Email"
                  value={formBag.values.contactEmail}
                  required
                />
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
                  label="Delivery Fee"
                  name="deliveryFee"
                  type="number"
                  placeholder="Delivery Fee"
                  value={formBag.values.deliveryFee}
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
