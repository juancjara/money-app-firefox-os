import React from 'react';
import mui from 'material-ui';

let RaisedButton = mui.RaisedButton;

let App = React.createClass({

  render () {
    return (
      <div>
        <RaisedButton label="test" primary = {true} />
      </div>
    );
  }

});

export default App;