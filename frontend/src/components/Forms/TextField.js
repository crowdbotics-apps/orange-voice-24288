import React from 'react';
import {useField} from 'formik';
import {Input, InputGroup, InputGroupAddon, InputGroupText} from 'reactstrap';

const TextField = ({label, iconName, type, ...props}) => {
  const [field, meta] = useField(props);
  const [showPassword, setShowPassword] = React.useState(false);
  const isPasswordField = props && Object.values(props).includes('password');

  return (
    <React.Fragment>
      <InputGroup className={'form-control-lg input-group-focus'}>
        <Input type={showPassword ? 'text' : type} {...field} {...props} />

        {isPasswordField && (
          <InputGroupAddon addonType="append">
            <InputGroupText onClick={() => setShowPassword(!showPassword)}>
              <i
                className={
                  showPassword ? `black-text fas fa-eye` : `fas fa-eye-slash`
                }
              />
            </InputGroupText>
          </InputGroupAddon>
        )}
        {!isPasswordField && (
          <InputGroupAddon addonType="append">
            <InputGroupText>
              <i className={iconName} />
            </InputGroupText>
          </InputGroupAddon>
        )}
      </InputGroup>
      {meta.touched && meta.error ? (
        <label className="text-danger ml-3 fade-in">{meta.error}</label>
      ) : null}
    </React.Fragment>
  );
};

export default TextField;
