import {Router, Request, Response, response, } from 'express';

import {getRepository} from "typeorm";
import { Alumno } from '../entidades/Alumno';

const router = Router()

router.get('/', async (req: Request, res: Response) => {
    //res.json({ mensaje: "metodo get" })
    const alumnos = await getRepository(Alumno).find();
    res.json(alumnos);
})

router.get('/:id', async (req: Request, res: Response) => {
    //res.json({ mensaje: `metodo get id: ${req.params.id}` })
    //const alumno = await getRepository(Alumno).findOne(req.params.id);
    const alumno = await getRepository(Alumno).findOne({where: {id: parseInt(req.params.id, 10)}})
    res.json(alumno);
})

router.post('/', async (req: Request, res: Response) => {
    //res.json({ mensaje: "metodo post" })
    const nuevoAlumno = await getRepository(Alumno).create(req.body);
    const resul = await getRepository(Alumno).save(nuevoAlumno);
    res.json(resul);
})

router.put('/:id', async (req: Request, res: Response) => {
    //res.json({ mensaje: "metodo put" })
    const alumno = await getRepository(Alumno).findOne({where: {id: parseInt(req.params.id, 10)}})
    if(alumno){
        getRepository(Alumno).merge(alumno, req.body);
        const resul = await getRepository(Alumno).save(alumno);
        res.json(resul);
    }else{
        res.json({mensaje: 'no existe alumno'});
    }
})

router.delete('/', (req: Request, res: Response) => {
    //res.json({ mensaje: "metodo delete" })
    getRepository(Alumno).delete(req.params.id);
    res.json({ mensaje: "eliminado" })
})



export default router;