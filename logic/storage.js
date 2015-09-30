import moment from 'moment';
import Settings from './Settings';

const Storage = {
  create(data, fileName, cb) {
    let sdcard = navigator.getDeviceStorage('sdcard');
    console.log(sdcard);
    let file = new Blob([data], {type: "text/csv"});
    let request = sdcard.addNamed(file, fileName);

    request.onsuccess = function() {
      var name = this.result;
      cb(null);
    };

    request.onerror = function() {
      console.log(this.error.name);
      cb(this.error);
    };
  },

  export(moves, cb) {
    let fileName = 'Budget-' + moment().format('MMMM DD YYYY, h:mm:ss a');
    let headers = ['Date,Category,Amount, Expense/Income'];
    let dataToSave = moves.map(formatMove);
    dataToSave.unshift(headers);
    Storage.create(dataToSave.join('\n'), fileName, cb);
  }
};

let formatMove = function(move) {
  var data = [
    move.date,
    Settings.getText(move.category.name),
    move.amount,
    move.category.type > 0 ? 'income': 'expense'
  ];
  return data.join(',');
};

export default Storage;
