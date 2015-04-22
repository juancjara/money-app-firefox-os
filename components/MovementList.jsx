import React from 'react';
import MovementItem from './MovementItem.jsx';
import db from '../logic/db';

let MovementList = React.createClass({
  getInitialState() {
    return {
      moves: []
    }
  },

  getDefaultProps() {
    return {
      data: {amount: 'ggwp'}
    };
  },

  update(moves) {
    this.setState({moves});
  },

  componentDidMount() {
    db.getMovementList((res) => {
      this.update(res);
    });
  },

  render() {
    let movesView = this.state.moves.map((item, i) => {
      return <MovementItem key = {i} item = {item} />
    });
    return (
      <div>
        <div className="mui-font-style-display-2">$ {this.props.data.amount}</div>
        <ul>
          {movesView}
        </ul>
      </div>
    )
  }

});

export default MovementList;