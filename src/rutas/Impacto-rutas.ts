import {Router, Request, Response, response, } from 'express';

import {getRepository} from "typeorm";
import { Impacto } from '../entidades/Impacto';

const router = Router()

router.get('/', async (req: Request, res: Response) => {
    const impactos = await getRepository(Impacto).find();
    res.json(impactos);
})

router.get('/:id', async (req: Request, res: Response) => {
    const impacto = await getRepository(Impacto).findOne({ 
                                                    where: { CodImpacto: parseInt(req.params.id, 10) } ,
                                                    relations: ['CodImpacto'],
                                                 })
    res.json(impacto);
})

router.post('/', async (req: Request, res: Response) => {
    try{
        const newImpacto = await getRepository(Impacto).create(req.body);
        const resul = await getRepository(Impacto).save(newImpacto);
        res.json(resul);
    }catch(error){
        res.json({ mensaje: 'Error de registro' })
    }
})

router.put('/:id', async (req: Request, res: Response) => {
    const impacto = await getRepository(Impacto).findOne({where: {CodImpacto: parseInt(req.params.id, 10)}})
    if(impacto){
        getRepository(Impacto).merge(impacto, req.body);
        const resul = await getRepository(Impacto).save(impacto);
        res.json(resul);
    }else{
        res.json({mensaje: 'No existe registro!'});
    }
})

router.delete('/:id', (req: Request, res: Response) => {
    try{
        getRepository(Impacto).delete(req.params.id);
        res.json({ mensaje: true })
    }catch(error){
        res.json({ mensaje: false })
    }
})

export default router;