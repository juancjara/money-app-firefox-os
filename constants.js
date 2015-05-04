const constants = {
  EXPENSE: 0,
  INCOME: 1,
  currencies: [
    {text: 'USD $', value: '$ '},
    {text: 'PEN S/.', value: 'S/. '}
  ],
  languages: [
    {text: 'English', value: 0},
    {text: 'Español', value: 1}
  ],
  texts: {
    'home': ['Home', 'Casa'],
    'car': ['Car', 'Auto'],
    'food': ['Food', 'Comida'],
    'sport': ['Sport', 'Deportes'],
    'entertainment': ['Entertainment', 'Entretenimiento'],
    'bills': ['Bills', 'Recibos'],
    'health': ['Health', 'Salud'],
    'pet': ['Pet', 'Mascota'],
    'gift': ['Gift', 'Regalo'],
    'phone': ['Phone', 'Celular'],
    'bus': ['Bus', 'Transporte'],
    'studies': ['Studies', 'Estudios'],
    'salary': ['Salary', 'Salario'],
    'others': ['Others', 'Otros'],
    'savings': ['Savings', 'Ahorros'],
    'choose category': ['Choose a category', 'Elige una categoría'],
    'save move': ['Save move', 'Guardar movimiento'],
    'group by category': ['Group by category', 'Agrupar por categoría'],
    'currency': ['Currency', 'Moneda'],
    'language': ['Idiom', 'Idioma']
  }
};

export default constants;