import React from 'react';
import mui from 'material-ui';
import Category from './Category.jsx';
import Amount from './Amount.jsx';
import db from '../logic/db';

let RaisedButton = mui.RaisedButton;

let Calc = React.createClass({

  getInitialState() {
    console.log('data', this.props.data);
    return {
      view: <Amount  
              onClick = {this.setAmount} />,
      data: {
        amount: 0,
        category: this.props.data.category
      }
    };
  },

  editAmount() {
    this.setState({ 
      view: <Amount 
              onClick = {this.setAmount} 
              amount = {this.state.data.amount}/> 
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
    this.setState({
      data: data
    });
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