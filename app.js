import React from 'react'
import App from './components/App.jsx';
import injectTapEventPlugin from 'react-tap-event-plugin';
import db from './logic/db';
import Settings from './logic/Settings';

injectTapEventPlugin();
console.log('init all');
db.init((values) =>{
  db.getSettings((conf) => {
    Settings.init(conf);
    React.render(<App />, document.getElementById('app'));
  })
})
