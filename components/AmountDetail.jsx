import React from 'react';
import mui from 'material-ui';

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
    return (
      <div id = {this.props.id} >
        <span className="mui-font-style-display-3">
          $ {this.props.value}
        </span>
        <RaisedButton 
          onTouchEnd = {this.handleClick} 
          label = {this.props.lbl_btn} 
          className = 'no-width' 
          secondary = {true} />
      </div>
    )
  }

});

export default AmountDetail;