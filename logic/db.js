import localforage from 'localforage';
import moment from 'moment';

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

const db = {
  getCategoryList(cb) {
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
    //update used on id
    cb();
  },
  getMainAmount(cb) {
    cb({income: '400', expense: '100', total: '300'});
  },
  nextId(cb) {
    update(keys.MOVE_ID, function(val) {return val + 1;}, cb);
  },
  getMovementList(cb) {
    const arr = [];
    cb(arr);
  },
  addMovement(data, cb) {
    const obj = {
      date: moment().format('MMMM DD YYYY, h:mm:ss a'),
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