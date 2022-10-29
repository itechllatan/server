import {Router, Request, Response, response, } from 'express';

import {getRepository} from "typeorm";
import { TipoEjecucion } from '../entidades/TipoEjecucion';

const router = Router()

router.get('/', async (req: Request, res: Response) => {
    const tipoEs = await getRepository(TipoEjecucion).find({ 
                                                           relations: ['controles'],
                                                        });
    res.json(tipoEs);
})

router.get('/:id', async (req: Request, res: Response) => {
    const tipoE = await getRepository(TipoEjecucion).findOne({ 
                                                    where: { CodTipoEjecucion: parseInt(req.params.id, 10) } ,
                                                    relations: ['controles'],
                                                 })
    res.json(tipoE);
})

router.post('/', async (req: Request, res: Response) => {
    try{
        const newTipoE = await getRepository(TipoEjecucion).create(req.body);
        const resul = await getRepository(TipoEjecucion).save(newTipoE);
        res.json(resul);
    }catch(error){
        res.json({ mensaje: 'Error de registro' })
    }
})

router.put('/:id', async (req: Request, res: Response) => {
    const tipoE = await getRepository(TipoEjecucion).findOne({where: {CodTipoEjecucion: parseInt(req.params.id, 10)}})
    if(tipoE){
        getRepository(TipoEjecucion).merge(tipoE, req.body);
        const resul = await getRepository(TipoEjecucion).save(tipoE);
        res.json(resul);
    }else{
        res.json({mensaje: 'No existe registro!'});
    }
})

router.delete('/:id', (req: Request, res: Response) => {
    try{
        getRepository(TipoEjecucion).delete(req.params.id);
        res.json({ mensaje: true })
    }catch(error){
        res.json({ mensaje: false })
    }
})

export default router;