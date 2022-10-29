import {Router, Request, Response, response, } from 'express';

import {getRepository} from "typeorm";
import { CateProceso } from '../entidades/CateProceso';

const router = Router()

router.get('/', async (req: Request, res: Response) => {
    const catePs = await getRepository(CateProceso).find({ 
                                                           relations: ['procesos'],
                                                        });
    res.json(catePs);
})

router.get('/:id', async (req: Request, res: Response) => {
    const cateP = await getRepository(CateProceso).findOne({ 
                                                    where: { CodCateProceso: parseInt(req.params.id, 10) } ,
                                                    relations: ['procesos'],
                                                 })
    res.json(cateP);
})

router.post('/', async (req: Request, res: Response) => {
    try{
        const newCateP = await getRepository(CateProceso).create(req.body);
        const resul = await getRepository(CateProceso).save(newCateP);
        res.json(resul);
    }catch(error){
        res.json({ mensaje: 'Error de registro' })
    }
})

router.put('/:id', async (req: Request, res: Response) => {
    const cateP = await getRepository(CateProceso).findOne({where: {CodCateProceso: parseInt(req.params.id, 10)}})
    if(cateP){
        getRepository(CateProceso).merge(cateP, req.body);
        const resul = await getRepository(CateProceso).save(cateP);
        res.json(resul);
    }else{
        res.json({mensaje: 'No existe registro!'});
    }
})

router.delete('/:id', (req: Request, res: Response) => {
    try{
        getRepository(CateProceso).delete(req.params.id);
        res.json({ mensaje: true })
    }catch(error){
        res.json({ mensaje: false })
    }
})

export default router;