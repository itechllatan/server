import {Router, Request, Response, response, } from 'express';

import {getRepository} from "typeorm";
import { Trabajador } from '../entidades/Trabajador';

const router = Router()

router.get('/', async (req: Request, res: Response) => {
    const trabajadores = await getRepository(Trabajador).find({ 
                                                           relations: ['procesos', 'controles'],
                                                        });
    res.json(trabajadores);
})

router.get('/:id', async (req: Request, res: Response) => {
    const trabajador = await getRepository(Trabajador).findOne({ 
                                                    where: { CodTrabajador: parseInt(req.params.id, 10) } ,
                                                    relations: ['procesos', 'controles'],
                                                 })
    res.json(trabajador);
})

router.post('/', async (req: Request, res: Response) => {
    try{
        const newTrabajador = await getRepository(Trabajador).create(req.body);
        const resul = await getRepository(Trabajador).save(newTrabajador);
        res.json(resul);
    }catch(error){
        res.json({ mensaje: 'Error de registro' })
    }
})

router.put('/:id', async (req: Request, res: Response) => {
    const trabajador = await getRepository(Trabajador).findOne({where: {CodTrabajador: parseInt(req.params.id, 10)}})
    if(trabajador){
        getRepository(Trabajador).merge(trabajador, req.body);
        const resul = await getRepository(Trabajador).save(trabajador);
        res.json(resul);
    }else{
        res.json({mensaje: 'No existe registro!'});
    }
})

router.delete('/:id', (req: Request, res: Response) => {
    try{
        getRepository(Trabajador).delete(req.params.id);
        res.json({ mensaje: true })
    }catch(error){
        res.json({ mensaje: false })
    }
})

export default router;