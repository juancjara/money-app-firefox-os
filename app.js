import React from 'react'
import App from './components/App.jsx';
import injectTapEventPlugin from 'react-tap-event-plugin';
import db from './logic/db';
import Settings from './logic/Settings';

injectTapEventPlugin();

db.init((values) => {
  db.fixSummary(() => {
    db.getSettings((conf) => {
      Settings.init(conf);
      React.render(<App />, document.getElementById('app'));
    })
  })
})
