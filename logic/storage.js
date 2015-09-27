import moment from 'moment';
import Settings from './Settings';

const Storage = {
  create(data, fileName) {
    console.log('create');
    let sdcard = navigator.getDeviceStorage('sdcard');
    let file = new Blob([data], {type: "text/csv"});

    console.log('whut');
    let request = sdcard.addNamed(file, fileName);

    console.log('what');
    request.onsuccess = function() {
      var name = this.result;
      console.log('File', name);
    };

    request.onerror = function() {
      console.warn('unable to create', this.error);
    };
  },

  export(moves) {
    console.log('export');
    let fileName = 'Budget-' + moment().format('MMMM DD YYYY, h:mm:ss a');
    let headers = ['Date,Category,Amount, Expense/Income'];
    let dataToSave = moves.map(formatMove);
    dataToSave.unshift(headers);
    Storage.create(dataToSave.join('\n'), fileName);
  }
};

let formatMove = function(move) {
  var data = [
    move.date,
    Settings.getText(move.category.name),
    move.amount,
    move.category.type > 0 ? 'income': 'expense'
  ];
  console.log(data.join(','));
  return data.join(',');
};

export default Storage;
