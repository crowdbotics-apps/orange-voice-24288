import React from 'react';
import {Item, Input, Icon, Label} from 'native-base';
import {Fonts} from '../../theme/fonts';

class PasswordTextBox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      icon: 'eye-slash',
      password: true,
      value: props.value,
    };
  }

  _changeIcon() {
    this.setState((prevState) => ({
      icon: prevState.icon === 'eye' ? 'eye-slash' : 'eye',
      password: !prevState.password,
    }));
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.value !== nextProps.value) {
      return {
        value: nextProps.value,
      };
    }
    return null;
  }

  _onChange(text) {
    const {onChangeText} = this.props;

    this.setState({
      value: text,
    });

    if (onChangeText) {
      onChangeText(text);
    }
  }

  // https://stackoverflow.com/questions/7305538/uitextfield-with-secure-entry-always-getting-cleared-before-editing

  render() {
    const {label} = this.props;
    const {value} = this.state;

    return (
      <Item floatingLabel>
        <Label
          style={{
            fontFamily: Fonts.poppinsRegular,
            fontSize: 12,
            letterSpacing: 0.2,
            color: '#949EAE',
            lineHeight: 18,
          }}>
          {label}
        </Label>
        <Input
          style={{
            fontFamily: Fonts.poppinsMedium,
            fontSize: 14,
            letterSpacing: 0.3,
            color: '#2C436A',
            lineHeight: 21,
          }}
          secureTextEntry={this.state.password}
          onChangeText={this._onChange.bind(this)}
          value={value}
        />
        <Icon
          name={this.state.icon}
          type={'FontAwesome5'}
          style={{
            fontSize: 20,
          }}
          onPress={() => this._changeIcon()}
        />
      </Item>
    );
  }
}

export default PasswordTextBox;
