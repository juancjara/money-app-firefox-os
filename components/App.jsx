import React from 'react';
import mui from 'material-ui';
import Main from './Main.jsx';
import Calc from './Calc.jsx';
import MovementList from './MovementList.jsx';

let App = React.createClass({
  getInitialState() {
    return {
      view: 'Calc'
    };
  },

  handle() {
    console.log('calc');
    this.setState({
      view: 'Calc'
    });
  }, 

  handleMain() {
    this.setState({
      view: 'Main' 
    });
  },

  showList() {
    this.setState({view: 'Mov'});
  },

  render () {
    let view = null;
    switch (this.state.view) {
      case 'Main': 
        view = <Main onClick = {this.handle} showList = {this.showList}/>
        break;
      case 'Calc':
        view = <Calc onClick = {this.handleMain} />
        break;
      case 'Mov': 
        view = <MovementList />
        break;
    }
    return (
      <div>
        <nav>
          Budget Handler
        </nav>
        {view}
      </div>
    )
  }

});

export default App;