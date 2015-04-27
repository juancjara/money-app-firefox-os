import React from 'react'
import App from './components/App.jsx';
import injectTapEventPlugin from 'react-tap-event-plugin';
import db from './logic/db.js';

injectTapEventPlugin();

db.init(() =>{
  React.render(<App />, document.getElementById('app'));
})
