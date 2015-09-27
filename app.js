import React from 'react'
import App from './components/App.jsx';
import injectTapEventPlugin from 'react-tap-event-plugin';
import db from './logic/db';
import Settings from './logic/Settings';
import Storage from './logic/storage';

injectTapEventPlugin();

db.init((values) => {
  db.fixSummary(() => {
    db.getSettings((conf) => {
      Settings.init(conf);
      React.render(<App />, document.getElementById('app'));
      db.getMovementList((moves) => {
        console.log('asdf');
        Storage.export(moves);
      });
    })
  })
})



//Storage.create('a,b,c\nd,e,f,', 'test.csv', () => {});
