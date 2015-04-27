import React from 'react';

let MovementItemGrouped = React.createClass({
  getInitialState() {
    return {
      show: false 
    };
  },

  removeMove(y) {
    this.props.remove(this.props.x, y);
  },

  toggleView() {
    this.setState({
      show: !this.state.show 
    });
  },

  render() {
    let moves = this.props.item.moves.map((item, i) => {
      return (
        <li key = {i} >
          {item.date}
          {item.amount}
          <div onTouchEnd = {this.removeMove.bind(null, i)} >R</div>
        </li>
      )
    });

    return (
      <li>
        <div onTouchEnd = {this.toggleView}>
          {this.props.item.category.name}
          {this.props.item.total}
        </div>
        <ul className = {this.state.show ? '': 'hide' } >
          {moves}
        </ul>
      </li>
    );
  }

});

export default MovementItemGrouped;