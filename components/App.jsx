import React from 'react';
import mui from 'material-ui';
import Main from './Main.jsx';
import Calc from './Calc.jsx';
import MovementList from './MovementList.jsx';
import SettingsView from './SettingsView.jsx';

let App = React.createClass({
  getInitialState() {
    return {
      view: 'Main',
      type: null,
      back: null
    };
  },

  back() {
    let currentView = this.state.view;
    let backView = this.state.back;
    console.log('gg');
    if (currentView === 'Set') {
      backView = null;
    }
    let view = backView ? backView: 'Main';
    if (currentView === view) {
      return;
    }
    console.log('back', currentView, view);
    this.setState({
      view,
      back: null 
    });
  },

  changeView(view, data) {
    console.log('changeView');
    this.setState({
      view,
      back: this.state.view,
      data
    });
  },

  handle(data) {
    this.changeView('Calc', data);
  },

  renderView() {

    switch (this.state.view) {
      case 'Main': 
        return <Main {...this.props} 
                onClick = {this.handle} 
                showList = {this.changeView} />
      case 'Calc': 
        return <Calc 
                  data = {this.state.data}
                  onClick = {this.changeView.bind(null, 'Main')} />
      case 'Mov': 
        return <MovementList data = {this.state.data} />
      case 'Set': 
        return <SettingsView />
    }
  },

  render () {
    return (
      <div>
        <nav>
          <span className = 'back' onTouchEnd = {this.back} >
            <span className = 'icomoon icomoon-arrow-left' />
          </span>
          <span className = 'title' >Budget Handler</span>
          <span 
            className = 'settings' 
            onTouchEnd = {this.changeView.bind(null, 'Set')} >
            <span className = 'icomoon icomoon-cog' />
          </span>
        </nav>
        {this.renderView()}
      </div>
    )
  }

});

export default App;