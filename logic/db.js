import localforage from 'localforage';
import moment from 'moment';
import constants from '../constants';

const keys = {
  MOVES: 'moves',
  MOVE_ID: 'idMov',
  CATEGORIES : 'categories'
}

localforage.config({
  name: 'budget'
});

function update(key,transform, cb) {
  localforage.getItem(key)
    .then((value) => {
      let newValue = transform(value);
      localforage.setItem(key, newValue).then(cb);
    });
};
//type = 1 income , 0 expense
const db = {
  getCategoryList(type, cb) {
    const arr = [
      {id: '0', name: 'a', used: 0, type: constants.EXPENSE},
      {id: '1', name: 'b', used: 0, type: constants.EXPENSE},
      {id: '2', name: 'c', used: 0, type: constants.EXPENSE},
      {id: '3', name: 'd', used: 0, type: constants.EXPENSE},
      {id: '4', name: 'e', used: 0, type: constants.EXPENSE},
      {id: '5', name: 'f', used: 0, type: constants.EXPENSE},
      {id: '6', name: 'g', used: 0, type: constants.EXPENSE},
      {id: '7', name: 'h', used: 0, type: constants.INCOME},
      {id: '8', name: 'i', used: 0, type: constants.INCOME},
      {id: '9', name: 'j', used: 0, type: constants.INCOME}
    ];
    let filArr = arr.filter((elem) => {
      return elem.type === type;
    })
    cb(filArr);
  },
  getCatMostUsed(cb) {
    const arr = [
      {id: '0', name: 'a', used: 0},
      {id: '1', name: 'b', used: 0},
      {id: '2', name: 'c', used: 0},
      {id: '3', name: 'd', used: 0},
      {id: '4', name: 'e', used: 0},
      {id: '5', name: 'f', used: 0},
      {id: '6', name: 'g', used: 0}
    ];
    cb(arr);
  },
  useCategory(id, cb) {
    update(keys.CATEGORIES, function(arr) {
      arr[id].used++;
      return arr;
    }, cb);
  },
  getMainAmount(cb) {
    cb({income: '400', expense: '100', total: '300'});
  },
  nextId(cb) {
    update(keys.MOVE_ID, function(val) {return val + 1;}, cb);
  },
  getMovementList(cb) {
    const arr = [];
    for (let i = 6; i >= 0; i--) {
      arr.push({
        date: moment().subtract(i, 'm').toDate(),
        amount: '44.5',
        category: {name: 'ggwp'}
      });
    };
    arr.sort((a, b) => a.date < b.date);
    let temp = arr.map((a) => {
      a.date = moment(a.date).format('MMMM DD YYYY, h:mm:ss a');
      return a;
    });
    cb(temp);
  },
  addMovement(data, cb) {
    const obj = {
      date: moment().toDate(),
      amount: data.amount,
      category: {
        name: data.category.name,
        id: data.category.id
      } 
    };

    function pushElem(elem) {
      return function(arr) {
        arr.push(elem);
        return arr;
      }
    }

    db.nextId((id) => {
      obj.id = id;
      update(keys.MOVES, pushElem(obj), (res) =>{
        console.log('added', res);
        cb();
      });
    })
  },
  init() {
    console.log('init');
  }
}

localforage.clear(function() {
  localforage.setItem(keys.MOVE_ID, 0)
    .then(()=> {
      localforage.setItem(keys.MOVES, [])
        .then(() => {console.log('saved')});
    })
});

export default db;