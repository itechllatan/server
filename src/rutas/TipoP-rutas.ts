import {Router, Request, Response, response, } from 'express';

import {getRepository} from "typeorm";
import { TipoProceso } from '../entidades/TipoProceso';

const router = Router()

router.get('/', async (req: Request, res: Response) => {
    const tipoPs = await getRepository(TipoProceso).find({ 
                                                           relations: ['procesos'],
                                                        });
    res.json(tipoPs);
})

router.get('/:id', async (req: Request, res: Response) => {
    const tipoP = await getRepository(TipoProceso).findOne({ 
                                                    where: { CodTipoP: parseInt(req.params.id, 10) } ,
                                                    relations: ['procesos'],
                                                 })
    res.json(tipoP);
})

router.post('/', async (req: Request, res: Response) => {
    try{
        const newTipoP = await getRepository(TipoProceso).create(req.body);
        const resul = await getRepository(TipoProceso).save(newTipoP);
        res.json(resul);
    }catch(error){
        res.json({ mensaje: 'Error de registro' })
    }
})

router.put('/:id', async (req: Request, res: Response) => {
    const tipoP = await getRepository(TipoProceso).findOne({where: {CodTipoP: parseInt(req.params.id, 10)}})
    if(tipoP){
        getRepository(TipoProceso).merge(tipoP, req.body);
        const resul = await getRepository(TipoProceso).save(tipoP);
        res.json(resul);
    }else{
        res.json({mensaje: 'No existe registro!'});
    }
})

router.delete('/:id', (req: Request, res: Response) => {
    try{
        getRepository(TipoProceso).delete(req.params.id);
        res.json({ mensaje: true })
    }catch(error){
        res.json({ mensaje: false })
    }
})

export default router;