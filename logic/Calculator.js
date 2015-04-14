let Operator = function(ope) {
  let result = 0;
  let op = '';

  function addNumber(num) {
    let number = parseFloat(num);
    if (op) {
      operate(op, number);
      op = '';
    } else {
      result = number;
    }
  }

  function operate(o, number) {
    switch (o) {
      case ope.ADD:
        result += number;
        break;
      case ope.MINUS:
        result -= number;
        break;
      case ope.DIV:
        result /= number;
        break;
      case ope.MULT:
        result *= number;
        break;
      case ope.EQ:
        result = number;
        break;
    }
  }

  function updateOp(o) {
    op = o;
  }

  function action(operation, num) {
    if (num) {
      addNumber(num);
    }
    if (operation) {
      op = operation;
    }
    return result;
  }

  function clear() {
    result = 0;
    op = '';
    return this;
  }

  return {
    action,
    clear,
    updateOp
  } 
}

let Calculator = function(initialShow = '0') {
  const ope = {'ADD': '+', 'MINUS': '-', 'DIV': '/', 
                      'MULT': 'x', 'EQ': '='};
  let showText = initialShow;
  const buttons = ['1','2','3',ope.ADD,'4','5','6',ope.MINUS,
                    '7','8','9',ope.MULT,'0',ope.EQ,'.',ope.DIV];
  const operator = new Operator(ope);

  function isOperator(op) {
    switch(op) {
      case ope.ADD: case ope.MINUS: case ope.DIV: 
      case ope.MULT: case ope.EQ:
        return true;
    }
    return false;
  }

  function isNumber(n) {
    var numStr = /^(\d+\.?\d*)$|(\d*\.?\d+)$/;
    return numStr.test(n.toString());
  };

  let needClean = false;
  let beforeOperator = false;
  function addKey (k) {

    if (isOperator(k) && beforeOperator) {
      operator.updateOp(k);
      beforeOperator = false;
      return this;
    }

    if (isOperator(k)) {
      showText = operator.action(k, showText);
      needClean = true;
      beforeOperator = true;
      return this;
    }
    beforeOperator = false;
    if ( k != '.' && (showText === '0' || needClean)) {
      needClean = false;
      showText = '';
    }

    let nextNumber = showText + k;
    if (isNumber(nextNumber)) {
      showText = nextNumber;
    }

    return this;
  }

  function val() {
    return showText;
  }

  function numeric() {
    return parseFloat(showText);
  }

  function clear() {
    showText = '0';
    operator.clear();
    needClean = false;
    beforeOperator = false;
    return this;
  }

  return {
    addKey,
    buttons,
    val,
    clear,
    numeric
  }

}

export default Calculator;