import {Router, Request, Response, response, } from 'express';

import {getRepository} from "typeorm";
import { Evento } from '../entidades/Evento';

const router = Router()

router.get('/', async (req: Request, res: Response) => {
    const eventos = await getRepository(Evento).find({ 
                                                    relations: ['riesgos'],
                                                });
    res.json(eventos);
})

router.get('/:id', async (req: Request, res: Response) => {
    const evento = await getRepository(Evento).findOne({ 
                                                    where: { CodEvento: parseInt(req.params.id, 10) } ,
                                                    relations: ['services'],
                                                 })
    res.json(evento);
})

router.post('/', async (req: Request, res: Response) => {
    try{
        const newEvento = await getRepository(Evento).create(req.body);
        const resul = await getRepository(Evento).save(newEvento);
        res.json(resul);
    }catch(error){
        res.json({ mensaje: 'Error de registro' })
    }
})

router.put('/:id', async (req: Request, res: Response) => {
    const evento = await getRepository(Evento).findOne({where: {CodEvento: parseInt(req.params.id, 10)}})
    if(evento){
        getRepository(Evento).merge(evento, req.body);
        const resul = await getRepository(Evento).save(evento);
        res.json(resul);
    }else{
        res.json({mensaje: 'No existe registro!'});
    }
})

router.delete('/:id', (req: Request, res: Response) => {
    try{
        getRepository(Evento).delete(req.params.id);
        res.json({ mensaje: true })
    }catch(error){
        res.json({ mensaje: false })
    }
})

export default router;