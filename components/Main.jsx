import React from 'react';
import mui from 'material-ui';
import db from '../logic/db';
import constants from '../constants';

let RaisedButton = mui.RaisedButton;
let FloatingActionButton = mui.FloatingActionButton;

let Main = React.createClass({

  getInitialState() {
    return {
      mainAmount: {income: 0, expense: 0, total: 0},
      categories: []
    };
  },

  showList() {
    this.props.showList();
  },

  update() {
    db.getMainAmount((mainAmount) => {
      this.setState({
        mainAmount:  mainAmount
      });
    });
    db.getCatMostUsed((categories) => {
      this.setState({
        categories: categories 
      });
    });
  },

  componentDidMount() {
    this.update();
  },

  handleClick(type) {
    this.props.onClick({type});
  },

  handleCategory(category) {
    this.props.onClick({category});
  },

  render() {
    var categories = this.state.categories.map((item, i) => {
      return (
        <li key = {i}>
          <RaisedButton 
            label = {item.name} 
            secondary = {true} 
            onTouchEnd = {this.handleCategory.bind(null, item)} />
        </li>
      )
    });

    return (
      <div className = 'main text-center'>
        <div 
          className="mui-font-style-display-1 total-income">
          $ {this.state.mainAmount.income}
        </div>
        <div 
          className="mui-font-style-display-1 total-expense">
          $ {this.state.mainAmount.expense}
        </div>
        <ul className = 'more-used'>
          {categories}
        </ul>
        <div 
          onTouchEnd = {this.showList} 
          className="mui-font-style-display-2">
          $ {this.state.mainAmount.total}
        </div>
        <div className = 'actions'>
          <FloatingActionButton 
            onTouchEnd = {this.handleClick.bind(null, constants.EXPENSE)} 
            iconClassName=" icomoon-minus" />
          <FloatingActionButton 
            onTouchEnd = {this.handleClick.bind(null, constants.INCOME)} 
            iconClassName=" icomoon-plus" />
        </div>
      </div>
    )
  }
});

export default Main;