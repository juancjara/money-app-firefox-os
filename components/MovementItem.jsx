import React from 'react';

let MovementItem = React.createClass({

  remove() {
    this.props.remove(this.props.item);
  },

  render() {
    return (
      <li>
        {this.props.item.amount}
        {this.props.item.date}
        {this.props.item.category.name}
        <div onClick = {this.remove}>
          R
        </div>
      </li>
    );
  }

});

export default MovementItem;