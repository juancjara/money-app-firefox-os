import db from './db';
import constants from '../constants';

let Settings = (function() {
  var fields = {
    currency: {
      index: 0,
      value: ''
    },
    language: {
      index: 0,
      value: ''
    }
  }

  function init(data) {
    fields.currency.index = data.currency;
    fields.currency.value = constants.currencies[data.currency].value;
    fields.language.index = data.language;
    fields.language.value = constants.languages[data.language].value;
  }
  function set(key, idx, value) {
    fields[key].index = idx;
    fields[key].value = value;
    db.updateSettings(key, idx, () => {})
  }
  function get(key) {
    return fields[key];
  }

  return {
    set,
    init,
    get
  }

})();

export default Settings;