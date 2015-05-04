import React from 'react';
import mui from 'material-ui';
import AmountDetail from './AmountDetail.jsx';
import db from '../logic/db';
import Settings from '../logic/Settings';

let RaisedButton = mui.RaisedButton;
let FontIcon = mui.FontIcon;

let Category = React.createClass({

  getInitialState: function() {
    return {
      categories: []
    };
  },

  componentDidMount: function() {
    db.getCategoryList(this.props.type, (categories) => {
      this.setState({categories});
    });
  },  

  handleSelection(item) {
    this.props.onClick(item);
  },

  render() {
    var categories = this.state.categories.map((item, i) => {;
      return (
        <div key = {i} >
          <RaisedButton 
            secondary = {true} 
            onTouchEnd = {this.handleSelection.bind(null, item)} >
            <FontIcon 
              className = {'icomoon ' + item.icon} />
            <div className = 'title'> {item.name}</div>
          </RaisedButton>
        </div>
      )
    });
    return (
      <div className = 'category' >
        <AmountDetail 
          lbl_btn = 'edit' 
          value = {this.props.amount}
          onClick = {this.props.back} />
        <div>{Settings.getText('choose category')}</div>
        <div className = 'cat-list block-flex' onTouchEnd = {this.handleClick} >
          {categories}
        </div>
      </div>
    )
  }

});

export default Category;