import React from 'react';
import mui from 'material-ui';
import AmountDetail from './AmountDetail.jsx';
import Calculator from '../logic/Calculator.js';

let RaisedButton = mui.RaisedButton;

let Amount = React.createClass({

  getInitialState() {
    return {
      calculator: new Calculator(this.props.amount)
    };
  },

  componentDidMount() {
    this.$el = $('#amount-detail');
  },

  clear() {
    this.setState({
      calculator: this.state.calculator.clear(),
    });
  },

  touchBtn(key) {
    this.setState({
      calculator: this.state.calculator.addKey(key)
    })
  },

  continue() {
    if (this.state.calculator.numeric() > 0) {
      this.props.onClick(this.state.calculator.numeric());
    } else {
      this.$el.addClass('shake');
      let end = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd' +
                ' oanimationend animationend';
      this.$el.one(end,() => {
          this.$el.removeClass('shake');
        }
      );
    }
  },

  renderButtons() {
    return this.state.calculator.buttons.map((item, i) => {
      return <RaisedButton
        key = {i}
        onTouchEnd = {this.touchBtn.bind(null, item)} 
        secondary = {true} 
        label = {item} />
    });
  },

  render() {
    return (
      <div>
        <AmountDetail
          id = 'amount-detail' 
          value = {this.state.calculator.val()} 
          onClick = {this.clear} />
        <div className = 'buttons block-flex'>
          {this.renderButtons()}
        </div>
        <RaisedButton 
          onTouchEnd = {this.continue} 
          className = 'full-width'
          label = 'Pick Category' 
          primary = {true}/>
      </div>
    )
  }

});

export default Amount;