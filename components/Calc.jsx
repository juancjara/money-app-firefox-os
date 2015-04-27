import React from 'react';
import mui from 'material-ui';
import Category from './Category.jsx';
import Amount from './Amount.jsx';
import db from '../logic/db';

let RaisedButton = mui.RaisedButton;

let Calc = React.createClass({

  getInitialState() {
    return {
      view: this.getAmountView(),
      data: {
        amount: '0',
        category: this.props.data.category
      }
    };
  },

  getAmountView() {
    let amount;
    if (this.state) {
      amount = this.state.data.amount;
    }
    return <Amount 
              onClick = {this.setAmount} 
              categoryIsSet = {this.props.data.category != null} 
              amount = {amount} />
  },

  editAmount() {
    this.setState({ 
      view: this.getAmountView()
    });
  },

  save(data) {
    db.addMovement(data, () => {
      this.props.onClick();
    })
  },

  setCategory(category) {
    let data = this.state.data;
    data.category = category
    this.setState({data});
    this.save(data);
  },

  setAmount(amount) {
    let data = this.state.data;
    data.amount = amount;
    if (!data.category) {
      return this.setState({
        data: data,
        view: <Category 
                  type = {this.props.data.type} 
                  amount = {amount}
                  onClick = {this.setCategory}
                  back = {this.editAmount} /> 
      });
    }
    this.save(data);
  },

  render() {
    return (
      <div className = 'calculator text-center' >
        {this.state.view}
      </div>
    )
  }

});

export default Calc;