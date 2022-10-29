import {Router, Request, Response, response, } from 'express';

import {getRepository} from "typeorm";
import { Frecuencia } from '../entidades/Frecuencia';

const router = Router()

router.get('/', async (req: Request, res: Response) => {
    const frecuencia = await getRepository(Frecuencia).find();
    res.json(frecuencia);
})

router.get('/:id', async (req: Request, res: Response) => {
    const frecuencia = await getRepository(Frecuencia).findOne({ 
                                                                  where: { CodFrecuencia: parseInt(req.params.id, 10) } ,
                                                                  relations: ['CodFrecuencia'],
                                                                });
    res.json(frecuencia);
})

router.post('/', async (req: Request, res: Response) => {
    try{
        const newFrecuencia = await getRepository(Frecuencia).create(req.body);
        const resul = await getRepository(Frecuencia).save(newFrecuencia);
        res.json(resul);
    }catch(error){
        res.json({ mensaje: 'Error de registro' })
    }
})

router.put('/:id', async (req: Request, res: Response) => {
    const frecuencia = await getRepository(Frecuencia).findOne({where: {CodFrecuencia: parseInt(req.params.id, 10)}})
    if(frecuencia){
        getRepository(Frecuencia).merge(frecuencia, req.body);
        const resul = await getRepository(Frecuencia).save(frecuencia);
        res.json(resul);
    }else{
        res.json({mensaje: 'No existe registro!'});
    }
})

router.delete('/:id', (req: Request, res: Response) => {
    try{
        getRepository(Frecuencia).delete(req.params.id);
        res.json({ mensaje: true })
    }catch(error){
        res.json({ mensaje: false })
    }
})

export default router;