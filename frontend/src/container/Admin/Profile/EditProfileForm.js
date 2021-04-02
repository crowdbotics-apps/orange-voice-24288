import React, {useCallback} from 'react';
// reactstrap components
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Button,
  CardFooter,
} from 'reactstrap';
import {Formik, Form} from 'formik';

import {authFields} from '../../Auth/contants';
import TextField from '../../../components/Forms/TextField';
import {profileValidationSchema} from '../../Auth/validation';
import {useDispatch, useSelector} from 'react-redux';
import { AuthActions } from '../../../store/actions/AuthActions';

const EditProfileForm = ({profile}) => {
  const isError = useSelector((store) => store.profile.isError);
  const errorMessage = useSelector((store) => store.auth.errorText);
  const isProgress = useSelector((store) => store.auth.isProgress);
  const dispath = useDispatch();

  const onProfileSubmit = useCallback(
    (values) => {
      dispath(AuthActions.editProfile({...values, fullname: `${values?.firstName} ${values?.lastName}`}, profile?.id));
    },
    [dispath, profile],
  );

  return (
    <Formik
      initialValues={{
        [authFields.firstName]: profile?.firstName || '',
        [authFields.lastName]: profile?.lastName || '',
        [authFields.email]: profile?.email || '',
        [authFields.businessName]: profile?.businessName || '',
        [authFields.businessAddress]: profile?.businessAddress || '',
        [authFields.phoneNo]: profile?.phoneNo || '',
        [authFields.postalCode]: profile?.postalCode || '',
      }}
      onSubmit={(values) => {
        onProfileSubmit(values);
      }}
      validationSchema={profileValidationSchema}
      validateOnChange={true}>
      {({formBag, submitForm}) => (
        <Card>
          <CardHeader>
            <CardTitle tag="h4">Edit Profile</CardTitle>
          </CardHeader>
          <CardBody>
            <Form>
              <TextField
                label="First Name"
                name="firstName"
                type="text"
                placeholder="First Name"
              />
              <TextField
                label="Last Name"
                name="lastName"
                type="text"
                placeholder="Last Name"
              />
              <TextField
                label="Bussiness Name"
                name="businessName"
                type="text"
                placeholder="Business Name"
              />
              <TextField
                label="Bussiness Phone Number"
                name="phoneNo"
                type="text"
                placeholder="Business Phone Number"
              />
              <TextField
                label="Bussiness Address"
                name="businessAddress"
                type="text"
                placeholder="Business Address"
              />
              <TextField
                label="Postal Code"
                name="postalCode"
                type="text"
                placeholder="Postal Code"
              />
              <TextField
                label="Email address"
                name={authFields.email}
                type="email"
                placeholder="Email"
                disabled
              />
            </Form>
          </CardBody>
          <CardFooter>
            <Button className="btn-fill" color="primary" onClick={submitForm}>
              {isProgress ? (
                <div className="spinner"></div>
              ) : (
                <span>Update Profile</span>
              )}
            </Button>
            {isError && (
              <label className="text-danger w-100 text-center">
                {errorMessage}
              </label>
            )}
          </CardFooter>
        </Card>
      )}
    </Formik>
  );
};

export default EditProfileForm;
