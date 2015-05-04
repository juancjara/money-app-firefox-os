import db from './db';
import constants from '../constants';

let Settings = (function() {
  var fields = {
    currency: {
      index: 0,
      value: '$ '
    },
    language: {
      index: 0,
      value: 0
    }
  }

  function init(data) {
    fields.currency.index = data.currency;
    fields.currency.value = constants.currencies[data.currency].value;
    fields.language.index = data.language;
    fields.language.value = Number(constants.languages[data.language].value);
  }
  function set(key, idx, value) {
    fields[key].index = idx;
    fields[key].value = Number(value) || value;
    db.updateSettings(key, idx, () => {})
  }
  function get(key) {
    return fields[key];
  }

  function getText(key) {
    return constants.texts[key][fields.language.value];
  }

  return {
    set,
    init,
    get,
    getText
  }

})();

export default Settings;