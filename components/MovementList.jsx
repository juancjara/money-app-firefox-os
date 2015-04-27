import React from 'react';
import mui from 'material-ui';

import MovementItem from './MovementItem.jsx';
import MovementItemGrouped from './MovementItemGrouped.jsx';
import db from '../logic/db';

let Checkbox = mui.Checkbox;

let MovementList = React.createClass({
  getInitialState() {
    return {
      moves: [],
      movesGrouped: [],
      groupedBy: true
    }
  },

  getDefaultProps() {
    return {
      data: {amount: 'ggwp'}
    };
  },
  
  handleToggle(e, toggled) {
    this.onChange(toggled);
  },

  onChange(groupedBy) {
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
    console.log(move[0]);
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
      <div>
        <div className="mui-font-style-display-2">$ {this.props.data.amount}</div>
        <Checkbox
          onCheck = {this.handleToggle} 
          labelPosition = "left" 
          defaultChecked = {this.state.groupedBy} 
          label="Group by category" />
        <ul>
          {this.getMoves()}
        </ul>
      </div>
    )
  }

});

export default MovementList;