import express from 'express';
import cors from 'cors';

import alumnoRutas from './rutas/alumnos-rutas'
import userRutas from './rutas/User-rutas'
import rolRutas from './rutas/Rol-rutas'
import serviceRutas from './rutas/Service-rutas'
import eventoRutas from  './rutas/Evento-rutas'
import riesgoRutas from  './rutas/Riesgo-rutas'
import frecuenciaRutas from './rutas/Frecuencia-rutas'
import impactoRutas from './rutas/Impacto-rutas'
import procesoRutas from './rutas/Proceso-rutas'
import tipoPRutas from './rutas/TipoP-rutas'
import catePRutas from './rutas/CateP-rutas'
import controlRutas from './rutas/Control-rutas'
import tipoCRutas from './rutas/TipoC-rutas'
import tipoERutas from './rutas/TipoE-rutas'
import docRutas from './rutas/Documento-rutas'
import traRutas from './rutas/Trabajador-rutas'

import "reflect-metadata";

import { createConnection } from 'typeorm';

//variables
const app = express()
const port = 3000

createConnection()

//midleware
app.use(cors());
app.use(express.json());

app.use('/api-lab', alumnoRutas);
app.use('/usuario', userRutas);
app.use('/rol', rolRutas);
app.use('/service', serviceRutas);
app.use('/evento', eventoRutas);
app.use('/riesgo', riesgoRutas);
app.use('/impacto', impactoRutas);
app.use('/frecuencia', frecuenciaRutas);
app.use('/proceso', procesoRutas);
app.use('/tipoP', tipoPRutas);
app.use('/cateP', catePRutas);
app.use('/control', controlRutas);
app.use('/tipoC', tipoCRutas);
app.use('/tipoE', tipoERutas);
app.use('/doc', docRutas);
app.use('/trabajador', traRutas);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
