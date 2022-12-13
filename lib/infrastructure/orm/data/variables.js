module.exports = [
    {
        'id_variable': 1,
        'name': 'Legal',
        'description': 'Descripción',
        'weight': '20',
        'user': { 'id_user': 1 },
        'variable_type': { 'id_variable_type': 1 }
    },
    {
        'id_variable': 2,
        'name': 'Reputacional',
        'description': 'Descripción',
        'weight': '20',
        'user': { 'id_user': 1 },
        'variable_type': { 'id_variable_type': 1 }
    },
    {
        'id_variable': 3,
        'name': 'Operacional',
        'description': 'Descripción',
        'weight': '20',
        'user': { 'id_user': 1 },
        'variable_type': { 'id_variable_type': 1 }
    },
    {
        'id_variable': 4,
        'name': 'Financiero',
        'description': 'Descripción',
        'weight': '20',
        'user': { 'id_user': 1 },
        'variable_type': { 'id_variable_type': 1 }
    },
    {
        'id_variable': 5,
        'name': 'Continuidad de negocio',
        'description': 'Descripción',
        'weight': '20',
        'user': { 'id_user': 1 },
        'variable_type': { 'id_variable_type': 1 }
    },
    {
        'id_variable': 6,
        'name': 'Antecedentes de materializaciones',
        'description': 'Descripción',
        'weight': '50',
        'user': { 'id_user': 1 },
        'variable_type': { 'id_variable_type': 2 }
    },
    {
        'id_variable': 7,
        'name': 'Periodicidad de ejecución',
        'description': 'Descripción',
        'weight': '50',
        'user': { 'id_user': 1 },
        'variable_type': { 'id_variable_type': 2 }
    },

    // continuidad
    {
        'id_variable': 8,
        'name': 'Afectación a la rentabilidad y los ingresos',
        'description': 'Nivel de afectación en los ingresos de la organización.',
        'weight': 20,
        'user': { 'id_user': 1 },
        'variable_type': { 'id_variable_type': 3 }
    },
    {
        'id_variable': 9,
        'name': 'Afectación al cliente interno',
        'description': 'Consecuencias que origina la materialización del riesgo.',
        'weight': 20,
        'user': { 'id_user': 1 },
        'variable_type': { 'id_variable_type': 3 }
    },
    {
        'id_variable': 10,
        'name': 'Afectación de la Imagen y reputación',
        'description': 'Consecuencias que origina la materialización del riesgo.',
        'weight': 20,
        'user': { 'id_user': 1 },
        'variable_type': { 'id_variable_type': 3 }
    },
    {
        'id_variable': 11,
        'name': 'Incumplimiento normativo, regulatorio y contractual',
        'description': 'Consecuencias que origina la materialización del riesgo.',
        'weight': 20,
        'user': { 'id_user': 1 },
        'variable_type': { 'id_variable_type': 3 }
    },
    {
        'id_variable': 12,
        'name': 'Afectación al cliente externo',
        'description': 'Consecuencias que origina la materialización del riesgo.',
        'weight': 20,
        'user': { 'id_user': 1 },
        'variable_type': { 'id_variable_type': 3 }
    },

    //diseño
    {
        'id_variable': 13,
        'name': 'Tipo de control',
        'description': 'Clasificación de controles',
        'weight': 30,
        'user': { 'id_user': 1 },
        'variable_type': { 'id_variable_type': 4 }
    },
    {
        'id_variable': 14,
        'name': 'Tipo de ejecución',
        'description': 'Clasificación de ejecución del control',
        'weight': 20,
        'user': { 'id_user': 1 },
        'variable_type': { 'id_variable_type': 4 }
    },
    {
        'id_variable': 15,
        'name': '¿Se ejecuta con alguna frecuencia?',
        'description': 'Periodicidad del control',
        'weight': 10,
        'user': { 'id_user': 1 },
        'variable_type': { 'id_variable_type': 4 }
    },
    {
        'id_variable': 16,
        'name': '¿Está documentado?',
        'description': 'El control esta detallado en los procesos',
        'weight': 10,
        'user': { 'id_user': 1 },
        'variable_type': { 'id_variable_type': 4 }
    },
    {
        'id_variable': 17,
        'name': '¿Tiene evidencia?',
        'description': 'Soporte de validaciòn de la ejecución',
        'weight': 20,
        'user': { 'id_user': 1 },
        'variable_type': { 'id_variable_type': 4 }
    },
    {
        'id_variable': 18,
        'name': '¿Tiene responsables asociados?',
        'description': 'Personal a cargo de la ejecución del control',
        'weight': 10,
        'user': { 'id_user': 1 },
        'variable_type': { 'id_variable_type': 4 }
    },

    //ejecucion
    {
        'id_variable': 19,
        'name': '¿Se han presentado eventos?',
        'description': 'El control ha fallado en el ultimo año',
        'weight': 35,
        'user': { 'id_user': 1 },
        'variable_type': { 'id_variable_type': 5 }
    },
    {
        'id_variable': 20,
        'name': '¿El diseño del control es efectivo?',
        'description': 'El control si cumple con sus variables de diseño',
        'weight': 35,
        'user': { 'id_user': 1 },
        'variable_type': { 'id_variable_type': 5 }
    },
    {
        'id_variable': 21,
        'name': '¿La evidencia es efectiva?',
        'description': 'La evidencia del control es completa y suficiente',
        'weight': 30,
        'user': { 'id_user': 1 },
        'variable_type': { 'id_variable_type': 5 }
    },
]