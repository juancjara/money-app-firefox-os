import React from 'react';
import mui from 'material-ui';

import Settings from '../logic/Settings';
import MovementItem from './MovementItem.jsx';
import MovementItemGrouped from './MovementItemGrouped.jsx';
import db from '../logic/db';

let Checkbox = mui.Checkbox;

let MovementList = React.createClass({
  getInitialState() {
    return {
      moves: [],
      movesGrouped: [],
      groupedBy: false
    }
  },

  getDefaultProps() {
    return {
      data: {amount: '42.5'}
    };
  },
  
  doToggle() {
    this.onChange(!this.state.groupedBy);
    $('.mui-enhanced-switch-input').click();
  },

  onChange() {
    let groupedBy = !this.state.groupedBy;
    if (groupedBy) {
      return db.getMovesGrouped((movesGrouped) => {
        this.setState({movesGrouped, groupedBy});
      });
    }
    db.getMovementList((moves) => {
      this.setState({moves, groupedBy});
    });
  },

  componentDidMount() {
    //TODO ADD INIT VALUE
    this.onChange(this.state.groupedBy);
  },

  removeGroup(x, y) {
    let movesGrouped = this.state.movesGrouped;
    let move = movesGrouped[x].moves.splice(y, 1);
    if (!movesGrouped[x].moves.length) {
      movesGrouped.splice(x, 1);
    }
    this.setState({movesGrouped});
    db.removeMovement(move[0], () => {});
  },

  removeMove(move) {
    let moves = this.state.moves;
    let posFound;
    for (posFound = moves.length - 1; posFound >= 0; posFound--) {
      if (moves[posFound].id === move.id) break;
    };
    moves.splice(posFound, 1);
    this.setState({moves});

    db.removeMovement(move, () =>{});
  },

  getMoves() {
    if (!this.state.groupedBy) {
      return this.state.moves.map((item, i) => {
        return <MovementItem 
                  remove = {this.removeMove}
                  key = {i} 
                  item = {item} />
      });  
    }
    return this.state.movesGrouped.map((item, i) => {
      return <MovementItemGrouped 
                key = {i} 
                x = {i}
                item = {item}
                remove = {this.removeGroup} />
    })
  },

  render() {
    return (
      <div className = 'Movement'>
        <div className="text-center mui-font-style-display-2">
          {Settings.get('currency').value}
          {this.props.data.amount}
        </div>
        <span onTouchEnd = {this.doToggle}>
          <Checkbox
            labelPosition = "left" 
            defaultSwitched = {this.state.groupedBy} 
            label = {Settings.getText('group by category')} />
        </span>
        <ul className = 'list'>
          {this.getMoves()}
        </ul>
      </div>
    )
  }

});

export default MovementList;