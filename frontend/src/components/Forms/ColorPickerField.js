import React from 'react';
import reactCSS from 'reactcss';
import {SketchPicker} from 'react-color';

class ColorPickerField extends React.Component {
  state = {
    displayColorPicker: false,
    color: this.props.color,
  };

  handleClick = () => {
    this.setState({displayColorPicker: !this.state.displayColorPicker});
  };

  handleClose = () => {
    this.setState({displayColorPicker: false});
  };

  handleChange = (color) => {
    this.setState({color: color.hex});
    this.props.onChange(color.hex);
  };

  render() {
    const styles = reactCSS({
      default: {
        color: {
          width: '36px',
          height: '14px',
          borderRadius: '2px',
          background: `${this.state.color}`,
        },
        swatch: {
          padding: '5px',
          background: '#fff',
          borderRadius: '1px',
          boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
          display: 'inline-block',
          cursor: 'pointer',
	  width: '100%',
	  marginTop: 12
        },
        popover: {
          position: 'absolute',
          zIndex: '2',
        },
        cover: {
          position: 'fixed',
          top: '0px',
          right: '0px',
          bottom: '0px',
          left: '0px',
        },
      },
    });

    return (
      <div>
        <label style={{marginTop: 5}}>{this.props.label}</label>
        <br />
        <div style={styles.swatch} onClick={this.handleClick}>
          <div style={{display: 'flex', flexDirection: 'row'}}>
            <div style={styles.color} />
            <span style={{fontSize: 9}}>&nbsp;{this.state.color}</span>
          </div>
        </div>
        {this.state.displayColorPicker ? (
          <div style={styles.popover}>
            <div style={styles.cover} onClick={this.handleClose} />
            <SketchPicker
              color={this.state.color}
              onChange={this.handleChange}
            />
          </div>
        ) : null}
      </div>
    );
  }
}

export default ColorPickerField;
