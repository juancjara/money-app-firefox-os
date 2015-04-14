import React from 'react';

let MovementItem = React.createClass({

  render() {
    return (
      <li>
        {this.props.item.type}
        {this.props.item.date}
        {this.props.item.amount}
      </li>
    );
  }

});

export default MovementItem;