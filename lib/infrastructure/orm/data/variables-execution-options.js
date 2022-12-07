module.exports = [
  {
    'id_variables_execution_options': 1,
    'variablesExecution': { 'id_variables_execution': 1 },
    'name': 'Si',
    'description': 'Existen eventos relacionados a falla del control',
    'weight': 0,
    'toDefault': 1,
  },
  {
    'id_variables_execution_options': 2,
    'variablesExecution': { 'id_variables_execution': 1 },
    'name': 'No',
    'description': 'No se presentaron eventos que afecte el control',
    'weight': 100,
    'toDefault': 0,
  },


  {
    'id_variables_execution_options': 3,
    'variablesExecution': { 'id_variables_execution': 2 },
    'name': 'No',
    'description': 'Una o varias variables del control no son efectivas para el control',
    'weight': 0,
    'toDefault': 1,
  },
  {
    'id_variables_execution_options': 4,
    'variablesExecution': { 'id_variables_execution': 2 },
    'name': 'Si',
    'description': 'La calificación de variables fue acorde al diseño',
    'weight': 100,
    'toDefault': 0,
  },


  {
    'id_variables_execution_options': 5,
    'variablesExecution': { 'id_variables_execution': 3 },
    'name': 'No',
    'description': 'La evidencia no es clara y suficiente',
    'weight': 0,
    'toDefault': 1,
  },
  {
    'id_variables_execution_options': 6,
    'variablesExecution': { 'id_variables_execution': 3 },
    'name': 'Si',
    'description': 'La evidencia cumple como soporte de auditoria',
    'weight': 100,
    'toDefault': 0,
  },
];

















