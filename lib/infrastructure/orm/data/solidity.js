module.exports = [
  {
    'id_solidity': 1,
    'name': 'Débil',
    'description': 'El control no se ejecuta correctamente',
    'weight_since': 0,
    'weight_until': 40,
    'levelCriticalityColor': { 'level_criticality_color': 10 },
    'user': { 'id_user': 1 }
  },
  {
    'id_solidity': 2,
    'name': 'Regular',
    'description': 'El control se ejecuta ocasionalmente y presenta falencias',
    'weight_since': 40.01,
    'weight_until': 80,
    'levelCriticalityColor': { 'level_criticality_color': 8 },
    'user': { 'id_user': 1 }
  },
  {
    'id_solidity': 3,
    'name': 'Fuerte',
    'description': 'El control se ejecuta correctamente',
    'weight_since': 80.01,
    'weight_until': 100,
    'levelCriticalityColor': { 'level_criticality_color': 7 },
    'user': { 'id_user': 1 }
  },
];
