import * as Yup from 'yup';

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const validationSchemaLogin = Yup.object().shape({
  email: Yup.string().required().email('This is not an email.'),
  password: Yup.string().required().min(2, 'Input more than 3 characters.'),
});

const validationSchemaDriverLogin = Yup.object().shape({
  userId: Yup.string().required('License Id is required'),
});

const validationSchemaCreditCard = Yup.object().shape({
  cardNumber: Yup.string().required('Please enter card number'),
  cvv: Yup.string().required('Please enter cvv'),
  month: Yup.string().required('Please select month'),
  year: Yup.string().required('Please select year'),
});

const validationSchemaEmail = Yup.object().shape({
  email: Yup.string()
    .required('Email address is required')
    .email('This is not an email.'),
});

const validationSchemaName = Yup.object().shape({
  name: Yup.string().required().min(2, 'Input more than 3 characters.'),
});

const validationSchemaChangePassword = Yup.object().shape({
  oldPassword: Yup.string().required('Please input old password.'),
  password: Yup.string()
    .required('Password is required.')
    .min(3, 'Input more than 3 characters.'),
  confirmPassword: Yup.string()
    .required('Confirm password is required.')
    .oneOf([Yup.ref('password'), null], 'Passwords must be matched.'),
});

const validationSchemaPhone = Yup.object().shape({
  phone: Yup.string()
    .required('Phone number is required')
    .min(10, 'Phone number is not valid.')
    .matches(phoneRegExp, 'Phone number is not valid.')
    .test(
      'valid',
      'Phone number is not valid',
      (phone) =>
        (phone.startsWith('1') && phone.length === 11) ||
        (!phone.startsWith('1') && phone.length === 10),
    ),
});

const validationSchemaSignUp = Yup.object().shape({
  fName: Yup.string()
    .required('First name is required.')
    .min(3, 'Text length should not be less than 3 characters'),
  lName: Yup.string()
    .required('Last name is required.')
    .min(3, 'Text length should not be less than 3 characters'),
  phoneNo: Yup.string().required('Phone number is required'),
  email: Yup.string()
    .required('Email address is required')
    .email('This is not an email.'),
  password: Yup.string()
    .required('Password is required.')
    .min(8, 'Password must be at least 8 characters long.'),
  postalCode: Yup.string().required('Postal code is required.'),
});

const validationDriverSchemaSignUp = Yup.object().shape({
  fName: Yup.string()
    .required('Full name is required.')
    .min(3, 'Text length should not be less than 3 characters'),
  phoneNo: Yup.string().required('Phone number is required'),
  email: Yup.string()
    .required('Email address is required')
    .email('This is not an email.'),
});

const validationSchemaAddress = Yup.object().shape({
  phoneNo: Yup.string().required('Phone number is required'),
  postalCode: Yup.string().required('Postal code is required.'),
  suiteNumber: Yup.string().required('Suite number is required.'),
  state: Yup.string().required('State is required.'),
  city: Yup.string().required('City is required.'),
  propertyType: Yup.string().required('Property type is required.'),
});

const validationSchemaProfile = Yup.object().shape({
  fName: Yup.string()
    .required('First name is required.')
    .min(3, 'Text length should not be less than 3 characters'),
  lName: Yup.string()
    .required('Last name is required.')
    .min(3, 'Text length should not be less than 3 characters'),
  phoneNo: Yup.string().required('Phone number is required'),
  postalCode: Yup.string().required('Postal code is required.'),
});

export {
  validationSchemaEmail,
  validationSchemaLogin,
  validationSchemaName,
  validationSchemaChangePassword,
  validationSchemaPhone,
  validationSchemaSignUp,
  validationSchemaCreditCard,
  validationSchemaProfile,
  validationSchemaDriverLogin,
  validationSchemaAddress,
  validationDriverSchemaSignUp,
};
