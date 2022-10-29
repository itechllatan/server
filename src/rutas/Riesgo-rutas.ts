import {Router, Request, Response, response, } from 'express';

import {getRepository} from "typeorm";
import { Riesgo } from '../entidades/Riesgo';

const router = Router()

router.get('/', async (req: Request, res: Response) => {
    const riesgos = await getRepository(Riesgo).find({
                                                          relations: ['eventos'],
                                                        });
    res.json(riesgos);
})

router.get('/:id', async (req: Request, res: Response) => {
    const riesgo = await getRepository(Riesgo).findOne({
                                                          where: {CodRiesgo: parseInt(req.params.id, 10)},
                                                          relations: ['eventos'],
                                                        })
    res.json(riesgo);
})

router.post('/', async (req: Request, res: Response) => {
    try{
        const newRiesgo = await getRepository(Riesgo).create(req.body);
        const resul = await getRepository(Riesgo).save(newRiesgo);
        res.json(resul);
    }catch(error){
        res.json({ mensaje: 'Error de registro' })
    }
})

router.put('/:id', async (req: Request, res: Response) => {
    const riesgo = await getRepository(Riesgo).findOne({where: {CodRiesgo: parseInt(req.params.id, 10)}})
    if(riesgo){
        getRepository(Riesgo).merge(riesgo, req.body);
        const resul = await getRepository(Riesgo).save(riesgo);
        res.json(resul);
    }else{
        res.json({mensaje: 'No existe registro!'});
    }
})

router.delete('/:id', async(req: Request, res: Response) => {
    try{
        getRepository(Riesgo).delete(req.params.id);
        res.json({ mensaje: true })
    }catch(error){
        res.json({ mensaje: false })
    }
})

export default router;