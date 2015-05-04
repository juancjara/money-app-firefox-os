import React from 'react';
import mui from 'material-ui';
import db from '../logic/db';
import constants from '../constants';
import Settings from '../logic/Settings';

let FontIcon = mui.FontIcon;
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
    let data = {
      amount: this.state.mainAmount.total
    }
    this.props.showList('Mov', data);
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
            onTouchEnd = {this.handleCategory.bind(null, item)} 
            secondary = {true} >
              <FontIcon 
                className = {'icomoon ' + item.icon}/>
              <div className = 'title'>{Settings.getText(item.name)}</div>
          </RaisedButton>
        </li>
      )
    });

    return (
      <div className = 'main text-center'>
        <div 
          className="mui-font-style-display-1 income">
          {Settings.get('currency').value} {this.state.mainAmount.income}
        </div>
        <div 
          className="mui-font-style-display-1 expense">
          {Settings.get('currency').value} {this.state.mainAmount.expense}
        </div>
        <ul className = 'more-used'>
          {categories}
        </ul>
        <div 
          onTouchEnd = {this.showList} 
          className="mui-font-style-display-2">
          {Settings.get('currency').value} {this.state.mainAmount.total}
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