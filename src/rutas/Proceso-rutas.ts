import {Router, Request, Response, response, } from 'express';

import {getRepository} from "typeorm";
import { Proceso } from '../entidades/Proceso';

const router = Router()

router.get('/', async (req: Request, res: Response) => {
    const procesos = await getRepository(Proceso).find({
                                                      relations: {
                                                        CodCategoria: true,
                                                        CodTipo: true,
                                                        riesgos: true
                                                      },
                                                    });
    res.json(procesos);
})

router.get('/:id', async (req: Request, res: Response) => {
    const proceso = await getRepository(Proceso).findOne({
                                                            where: {CodProceso: parseInt(req.params.id, 10)},
                                                            relations: ['riesgos'],
                                                         })
    res.json(proceso);
})

router.post('/', async (req: Request, res: Response) => {
    try{
        const newProceso = await getRepository(Proceso).create(req.body);
        const resul = await getRepository(Proceso).save(newProceso);
        res.json(resul);
    }catch(error){
        res.json({ mensaje: 'Error de registro' })
    }
})

router.put('/:id', async (req: Request, res: Response) => {
    const proceso = await getRepository(Proceso).findOne({where: {CodProceso: parseInt(req.params.id, 10)}})
    if(proceso){
        getRepository(Proceso).merge(proceso, req.body);
        const resul = await getRepository(Proceso).save(proceso);
        res.json(resul);
    }else{
        res.json({mensaje: 'No existe registro!'});
    }
})

router.delete('/:id', async(req: Request, res: Response) => {
    try{
        getRepository(Proceso).delete(req.params.id);
        res.json({ mensaje: true })
    }catch(error){
        res.json({ mensaje: false })
    }
})

export default router;