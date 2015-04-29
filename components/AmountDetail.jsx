import React from 'react';
import mui from 'material-ui';
import Settings from '../logic/Settings';

let FontIcon = mui.FontIcon;
let RaisedButton = mui.RaisedButton;

let AmountDetail = React.createClass({

  getDefaultProps() {
    return {
      lbl_btn: 'X'
    };
  },

  handleClick() {
    this.props.onClick();
  },

  render() {
    let icon = this.props.lbl_btn === 'X' ? 'icomoon icomoon-backspace2':
                                            'icomoon icomoon-pencil';
    return (
      <div id = {this.props.id} >
        <span className="mui-font-style-display-3">
          {Settings.get('currency').value} {this.props.value}
        </span>
        <RaisedButton 
          onTouchEnd = {this.handleClick} 
          secondary = {true} >
            <FontIcon 
              className = {icon}/>
        </RaisedButton>
      </div>
    )
  }

});

export default AmountDetail;