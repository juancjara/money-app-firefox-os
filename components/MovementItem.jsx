import React from 'react';

let MovementItem = React.createClass({

  render() {
    return (
      <li>
        {this.props.item.amount}
        {this.props.item.date}
        {this.props.item.category.name}
      </li>
    );
  }

});

export default MovementItem;