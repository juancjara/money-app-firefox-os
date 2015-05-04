import localforage from 'localforage';
import moment from 'moment';
import constants from '../constants';
import Settings from './Settings';

const appName = 'budget';

const keys = {
  MOVES: appName + '-moves',
  MOVE_ID: appName + '-idMov',
  CATEGORIES : appName + '-categories',
  SUMMARY: appName + '-summary',
  SETTINGS: appName + '-settings'
}

function format(a) {
  a.date = moment(a.date).format('MMMM DD YYYY, h:mm:ss a');
  return a;
}

const types = {};
types[constants.INCOME] = 'income';
types[constants.EXPENSE] = 'expense';

localforage.config({
  name: appName,
  version: 1.0
});

function update(key,transform, cb) {
  localforage.getItem(key)
    .then((value) => {
      let newValue = transform(value);
      localforage.setItem(key, newValue).then(cb);
    });
};

function createBulk(tasks, cb) {
  let promises = tasks.map(item => {
    return localforage.setItem(item.key, item.value);
  });
  Promise.all(promises)
    .then(values => {
      cb(values);
    });
}

//type = 1 income , 0 expense
const db = {
  getSettings(cb) {
    localforage.getItem(keys.SETTINGS).then(cb);
  },
  updateSettings(newData, key, cb) {

    function customUpdate(newData, key) {
      return function(elem) {
        elem[key] = newData;
        return elem;
      }
    }
    update(keys.SETTINGS, customUpdate(newData, key), cb);
  },
  getCategoryList(type, cb) {
    localforage.getItem(keys.CATEGORIES)
      .then(arr => {
        let filArr = arr.filter((elem) => {
          return elem.type === type;
        })
        filArr.sort((a,b) => a.used < b.used);
        cb(filArr);  
      })
  },
  getCatMostUsed(cb) {
    localforage.getItem(keys.CATEGORIES)
      .then(arr => {
        arr.sort((a, b) => a.used < b.used);
        cb(arr.slice(0, 9));
      })
  },
  useCategory(id, cb) {
    update(keys.CATEGORIES, function(arr) {
      arr[id].used++;
      return arr;
    }, cb);
  },
  getMainAmount(cb) {
    localforage.getItem(keys.SUMMARY).then(cb);
  },
  nextId(cb) {
    update(keys.MOVE_ID, function(val) {return val + 1;}, cb);
  },
  getMovementList(cb) {
    localforage.getItem(keys.MOVES)
      .then((arr) => {
        arr.sort((a, b) => a.date < b.date);
        let temp = arr.map(format);
        cb(temp);
    });
  },
  getMovesGrouped(cb) {
    db.getMovementList((arr) => {
        let grouped = {};
        arr.forEach((item) => {
          let category = item.category.name;
          if (!(category in grouped)) {
            grouped[category] = {
              category: item.category,
              moves: [],
              total: 0
            }
          }
          grouped[category].total += Number(item.amount);
          grouped[category].moves.push(item);
        });
        let temp = [];
        for(let key in grouped) {
          temp.push(grouped[key]);
        }
        cb(temp);
      });
  },
  removeMovement(move, cb) {
    function deleteElem(id) {
      return function(arr) {
        let posFound;
        for (posFound = arr.length - 1; posFound >= 0; posFound--) {
          if (arr[posFound].id === id) break;
        };
        arr.splice(posFound, 1);
        return arr;
      }
    }
    db.updateCategory(move.category.id, -1, () => {
      db.updateSummary(move.amount, types[move.category.type], 
        () => {
          update(keys.MOVES, deleteElem(move.id), () => {
            cb();
          })
        })
    });
  },
  updateCategory(id, offset, cb) {
    function customUpdate(id, offset) {
      return arr => {
        for (let i = arr.length - 1; i >= 0; i--) {
          if (arr[i].id === id) {
            arr[i].used += offset;
            break;
          }
        };
        return arr;
      }
    }

    update(keys.CATEGORIES, customUpdate(id, offset), cb);
  },
  updateSummary(amount, type, cb) {
    function customUpdate(amount, type) {
      return function(elem) {
        elem[type] = '' + (Number(elem[type]) + Number(amount));
        elem.total = '' + (Number(elem.income) - Number(elem.expense));
        return elem;
      }
    }
    update(keys.SUMMARY, customUpdate(amount, type), cb);
  },
  addMovement(data, cb) {
    const obj = {
      date: moment().toDate(),
      amount: data.amount,
      category: {
        name: data.category.name,
        id: data.category.id,
        type: data.category.type
      } 
    };


    function pushElem(elem) {
      return function(arr) {
        arr.push(elem);
        return arr;
      }
    }

    //TODO refactor
    db.updateCategory(data.category.id, 1, () => {
      db.updateSummary(data.amount, types[data.category.type], 
        () => {
          db.nextId((id) => {
            obj.id = id;
            update(keys.MOVES, pushElem(obj), (res) => {
              cb();
            });
          });
        })
    });
  },
  createDB(cb) {
    const summaryDefault = {income: '0', expense: '0', total: '0'};
    const categories = [
      {id: '0', name: 'home', icon: 'icomoon-home2', 
        used: 0, type: constants.EXPENSE},
      {id: '1', name: 'car', icon: 'icomoon-car', 
        used: 0, type: constants.EXPENSE},
      {id: '2', name: 'food', icon: 'icomoon-spoon-knife', 
        used: 0, type: constants.EXPENSE},
      {id: '3', name: 'sport', icon: 'icomoon-soccer', 
        used: 0, type: constants.EXPENSE},
      {id: '4', name: 'entertainment', icon: 'icomoon-glass2', 
        used: 0, type: constants.EXPENSE},
      {id: '5', name: 'bills', icon: 'icomoon-cash', 
        used: 0, type: constants.EXPENSE},
      {id: '6', name: 'health', icon: 'icomoon-aid-kit2', 
        used: 0, type: constants.EXPENSE},
      {id: '7', name: 'pet', icon: 'icomoon-paw', 
        used: 0, type: constants.EXPENSE},
      {id: '8', name: 'gift', icon: 'icomoon-gift2', 
        used: 0, type: constants.EXPENSE},
      {id: '9', name: 'phone', icon: 'icomoon-phone', 
        used: 0, type: constants.EXPENSE},
      {id: '10', name: 'bus', icon: 'icomoon-bus', 
        used: 0, type: constants.EXPENSE},
      {id: '11', name: 'studies', icon: 'icomoon-library', 
        used: 0, type: constants.EXPENSE},
      {id: '12', name: 'others', icon: 'icomoon-coins', 
        used: 0, type: constants.INCOME},
      {id: '13', name: 'savings', icon: 'icomoon-piggy-bank', 
        used: 0, type: constants.INCOME},
      {id: '14', name: 'salary', icon: 'icomoon-cash', 
        used: 0, type: constants.INCOME},
    ];
    const settingsDefault = {
      language: 0,
      currency: 0
    }

    var moves = []

    createBulk([
      {key: keys.SUMMARY, value: summaryDefault},
      {key: keys.MOVES, value: moves},
      {key: keys.MOVE_ID, value: 0},
      {key: keys.CATEGORIES, value: categories},
      {key: keys.SETTINGS, value: settingsDefault}
    ], cb);
  },
  init(cb) {
    localforage.getItem(keys.SUMMARY)
    .then(val => {
      if (val) return cb();
      db.createDB(cb);
    })
  }
}

export default db;