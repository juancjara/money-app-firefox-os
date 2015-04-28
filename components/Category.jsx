import React from 'react';
import mui from 'material-ui';
import AmountDetail from './AmountDetail.jsx';
import db from '../logic/db'

let RaisedButton = mui.RaisedButton;

let Category = React.createClass({

  getInitialState: function() {
    return {
      categories: []
    };
  },

  componentDidMount: function() {
    db.getCategoryList(this.props.type, (list) => {
      this.setState({
        categories: list 
      });
    });
  },  

  handleSelection(item) {
    this.props.onClick(item);
  },

  render() {
    var categories = this.state.categories.map((item, i) =>{
      return <RaisedButton 
                key = {i} 
                secondary = {true} 
                label = {item.name}
                onTouchEnd = {this.handleSelection.bind(null, item)} />
    });
    return (
      <div className = 'category' >
        <AmountDetail 
          lbl_btn = 'edit' 
          value = {this.props.amount}
          onClick = {this.props.back} />
        <div>Pick a category</div>
        <div className = 'cat-list block-flex' onTouchEnd = {this.handleClick} >
          {categories}
        </div>
      </div>
    )
  }

});

export default Category;