module.exports = [
  {
    'id_variables_design_options': 1,
    'variablesDesign': { 'id_variables_design': 1 },
    'name': 'Correctivo',
    'description': 'Mitigan el impacto del evento y permiten la mejora del desempeño futuro aprendiendo de errores pasados',
    'weight': 10,
    'toDefault': 1,
  },
  {
    'id_variables_design_options': 2,
    'variablesDesign': { 'id_variables_design': 1 },
    'name': 'Detectivo',
    'description': 'Ajustan procesos en curso, este tipo de control monitorean actividades en el presente para evitar que se incumplan los resultados esperados',
    'weight': 50,
    'toDefault': 0,
  },
  {
    'id_variables_design_options': 3,
    'variablesDesign': { 'id_variables_design': 1 },
    'name': 'Preventivo',
    'description': 'Se anticipa a situaciones y previene problemas',
    'weight': 100,
    'toDefault': 0,
  },


  {
    'id_variables_design_options': 4,
    'variablesDesign': { 'id_variables_design': 2 },
    'name': 'Manual',
    'description': 'Es cuando existe la presencia e intervención de una persona en la acción de controlar',
    'weight': 10,
    'toDefault': 1,
  },
  {
    'id_variables_design_options': 5,
    'variablesDesign': { 'id_variables_design': 2 },
    'name': 'Combinado',
    'description': 'El control cuenta con una parte automatizada pero requiere la presencia e intervención de una persona',
    'weight': 50,
    'toDefault': 0,
  },
  {
    'id_variables_design_options': 6,
    'variablesDesign': { 'id_variables_design': 2 },
    'name': 'Automático',
    'description': 'Es cuando la acción del control es realizado por una aplicación o sistema',
    'weight': 100,
    'toDefault': 0,
  },


  {
    'id_variables_design_options': 7,
    'variablesDesign': { 'id_variables_design': 3 },
    'name': 'No',
    'description': 'Frecuencia de ejecución no asignada',
    'weight': 0,
    'toDefault': 1,
  },
  {
    'id_variables_design_options': 8,
    'variablesDesign': { 'id_variables_design': 3 },
    'name': 'Si',
    'description': 'Frecuencia de ejecución asignada',
    'weight': 100,
    'toDefault': 0,
  },


  {
    'id_variables_design_options': 9,
    'variablesDesign': { 'id_variables_design': 4 },
    'name': 'Sin Documentar',
    'description': 'No existe registro sobre el control y su información en ningún documento',
    'weight': 10,
    'toDefault': 1,
  },
  {
    'id_variables_design_options': 10,
    'variablesDesign': { 'id_variables_design': 4 },
    'name': 'Parcialmente Documentado',
    'description': 'El control y su información se encuentra incluido dentro de algún documento pero no oficializada en el proceso',
    'weight': 50,
    'toDefault': 0,
  },
  {
    'id_variables_design_options': 11,
    'variablesDesign': { 'id_variables_design': 4 },
    'name': 'Documentado',
    'description': 'El control y su información esta documentado',
    'weight': 100,
    'toDefault': 0,
  },


  {
    'id_variables_design_options': 12,
    'variablesDesign': { 'id_variables_design': 5 },
    'name': 'No',
    'description': 'El control no deja soporte',
    'weight': 0,
    'toDefault': 1,
  },
  {
    'id_variables_design_options': 13,
    'variablesDesign': { 'id_variables_design': 5 },
    'name': 'Si',
    'description': 'Queda soporte de la ejecución del control',
    'weight': 100,
    'toDefault': 0,
  },


  {
    'id_variables_design_options': 14,
    'variablesDesign': { 'id_variables_design': 6 },
    'name': 'No',
    'description': 'Responsable no asignado',
    'weight': 0,
    'toDefault': 1,
  },
  {
    'id_variables_design_options': 15,
    'variablesDesign': { 'id_variables_design': 6 },
    'name': 'Si',
    'description': 'Responsable asiganado',
    'weight': 100,
    'toDefault': 0,
  },
];