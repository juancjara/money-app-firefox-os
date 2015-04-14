import React from 'react';
import MovementItem from './MovementItem.jsx'

let MovementList = React.createClass({

  render() {
    let moves = [];
    for (let i = 6; i >= 0; i--) {
      moves.push({'type': 'Ahorro', 'date': '15/05/2015', 'amount': '$ 400.00' });
    };
    let movesView = moves.map((item, i) => {
      return <MovementItem key = {i} item = {item} />
    });
    return (
      <div>
        <div className="mui-font-style-display-2">$ 800.00</div>
        <ul>
          {movesView}
        </ul>
      </div>
    )
  }

});

export default MovementList;