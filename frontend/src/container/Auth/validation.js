import * as yup from 'yup';
import {authFields} from './contants';

export const emailValidation = yup
  .string()
  .email('Please enter a valid email.')
  .required('Email field is required.');

const stringRequired = yup.string().required('Field is required');

const passwordValidation = yup.string()
.required('No password provided.') 
.min(8, 'Password is too short - should be 8 chars minimum.')


export const passwordConfirmationValidation = yup
  .string()
  .oneOf(
    [yup.ref(authFields.password)],
    'Password and confirm password should match.'
  )
  .required('Confirm password is required.');
export const registerValidationSchema = () =>
  yup.object().shape({
    [authFields.email]: emailValidation,
    [authFields.password]: passwordValidation,
    [authFields.confirmPassword]: passwordConfirmationValidation,
    [authFields.username]: stringRequired,
  });


  export const profileValidationSchema = () =>
  yup.object().shape({
    [authFields.email]: emailValidation,
    [authFields.firstName]: stringRequired,
    [authFields.lastName]: stringRequired,
    [authFields.businessName]: stringRequired,
    [authFields.phoneNo]: stringRequired,
    [authFields.postalCode]: stringRequired,
    [authFields.businessAddress]: stringRequired,
  });
