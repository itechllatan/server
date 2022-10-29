import {Router, Request, Response, response, } from 'express';

import {getRepository} from "typeorm";
import { Service } from '../entidades/Service';

const router = Router()

router.get('/', async (req: Request, res: Response) => {
    const servicios = await getRepository(Service).find({
                                                            relations: ['roles'],
                                                        });
    res.json(servicios);
})

router.get('/:id', async (req: Request, res: Response) => {
    // const servicio = await getRepository(Service).findOne({where: {CodService: parseInt(req.params.id, 10)}})
    // res.json(servicio);
    const servicio = await getRepository(Service).findOne({
                                                            where: {CodService: parseInt(req.params.id, 10)},
                                                            relations: ['roles'],
                                                          })
    res.json(servicio);
})

router.post('/', async (req: Request, res: Response) => {
    try{
        const nuevoServicio = await getRepository(Service).create(req.body);
        const resul = await getRepository(Service).save(nuevoServicio);
        res.json(resul);
    }catch(error){
        res.json({ mensaje: 'Error de registro' })
    }
})

router.put('/:id', async (req: Request, res: Response) => {
    const servicio = await getRepository(Service).findOne({where: {CodService: parseInt(req.params.id, 10)}})
    if(servicio){
        getRepository(Service).merge(servicio, req.body);
        const resul = await getRepository(Service).save(servicio);
        res.json(resul);
    }else{
        res.json({mensaje: 'No existe registro!'});
    }
})

router.delete('/:id', async(req: Request, res: Response) => {
    try{
        getRepository(Service).delete(req.params.id);
        res.json({ mensaje: true })
    }catch(error){
        res.json({ mensaje: false })
    }
})

export default router;