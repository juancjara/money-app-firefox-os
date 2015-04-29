import React from 'react';
import Settings from '../logic/Settings';

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
    let amountClass = 'amount ' + 
      (this.props.item.category.type > 0 ? 'income': 'expense');

    let moves = this.props.item.moves.map((item, i) => {

      return (
        <li key = {i} >
          <span 
            className = 'remove icomoon-bin2' 
            onTouchEnd = {this.removeMove.bind(null, i)} />
          {item.date}
          <div className = {amountClass} >
            {Settings.get('currency').value}
            {item.amount}
          </div>
        </li>
      )
    });

    let classArrow =  'arrow icomoon-arrow-' +
      (this.state.show ? 'up': 'down')
    return (
      <li className = 'move-item detail-block' >
        <div onTouchEnd = {this.toggleView}>
          <span className = {classArrow} />
          <span className = 'category' > 
            {this.props.item.category.name} 
          </span>
          <span className = {this.props.item.category.icon} />
          <div className = {amountClass} >
            {Settings.get('currency').value}
            {this.props.item.total}
          </div>
        </div>
        <ul className = {'list-detail '+(this.state.show ? '': 'hide')} >
          {moves}
        </ul>
      </li>
    );
  }

});

export default MovementItemGrouped;