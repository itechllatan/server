import {Router, Request, Response, response, } from 'express';

import {getRepository} from "typeorm";
import { TipoControl } from '../entidades/TipoControl';

const router = Router()

router.get('/', async (req: Request, res: Response) => {
    const tipoCs = await getRepository(TipoControl).find({ 
                                                           relations: ['controles'],
                                                        });
    res.json(tipoCs);
})

router.get('/:id', async (req: Request, res: Response) => {
    const tipoC = await getRepository(TipoControl).findOne({ 
                                                    where: { CodTipoControl: parseInt(req.params.id, 10) } ,
                                                    relations: ['controles'],
                                                 })
    res.json(tipoC);
})

router.post('/', async (req: Request, res: Response) => {
    try{
        const newTipoC = await getRepository(TipoControl).create(req.body);
        const resul = await getRepository(TipoControl).save(newTipoC);
        res.json(resul);
    }catch(error){
        res.json({ mensaje: 'Error de registro' })
    }
})

router.put('/:id', async (req: Request, res: Response) => {
    const tipoC = await getRepository(TipoControl).findOne({where: {CodTipoControl: parseInt(req.params.id, 10)}})
    if(tipoC){
        getRepository(TipoControl).merge(tipoC, req.body);
        const resul = await getRepository(TipoControl).save(tipoC);
        res.json(resul);
    }else{
        res.json({mensaje: 'No existe registro!'});
    }
})

router.delete('/:id', (req: Request, res: Response) => {
    try{
        getRepository(TipoControl).delete(req.params.id);
        res.json({ mensaje: true })
    }catch(error){
        res.json({ mensaje: false })
    }
})

export default router;