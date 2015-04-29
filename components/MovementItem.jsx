import React from 'react';
import Settings from '../logic/Settings';

let MovementItem = React.createClass({

  remove() {
    this.props.remove(this.props.item);
  },

  render() {
    let amountClass = 'amount ' + 
      (this.props.item.category.type > 0 ? 'income': 'expense');
    return (
      <li className = 'move-item'>
        <div 
          onClick = {this.remove}
          className = 'remove icomoon-bin2 pull-left' />
        <div className = 'detail-block pull-left'> 
          <span className = 'category'>
            {this.props.item.category.name}
          </span>
          <span className = {this.props.item.category.icon} />
          <div className = {amountClass} >
            {Settings.get('currency').value}
            {this.props.item.amount}
          </div>
          <div className = 'date' >{this.props.item.date}</div>
        </div>

      </li>
    );
  }

});

export default MovementItem;