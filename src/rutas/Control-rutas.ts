import {Router, Request, Response, response, } from 'express';

import {getRepository} from "typeorm";
import { Control } from '../entidades/Control';

const router = Router()

router.get('/', async (req: Request, res: Response) => {
    const controles = await getRepository(Control).find({
                                                      relations: {
                                                        CodTipoControl: true,
                                                        CodTipoEjecucion: true,
                                                        CodDocumento: true
                                                      },
                                                    });
    res.json(controles);
})

router.get('/:id', async (req: Request, res: Response) => {
    const control = await getRepository(Control).findOne({
                                                            where: {CodControl: parseInt(req.params.id, 10)},
                                                         })
    res.json(control);
})

router.post('/', async (req: Request, res: Response) => {
    try{
        const newControl = await getRepository(Control).create(req.body);
        const resul = await getRepository(Control).save(newControl);
        res.json(resul);
    }catch(error){
        res.json({ mensaje: 'Error de registro' })
    }
})

router.put('/:id', async (req: Request, res: Response) => {
    const control = await getRepository(Control).findOne({where: {CodControl: parseInt(req.params.id, 10)}})
    if(control){
        getRepository(Control).merge(control, req.body);
        const resul = await getRepository(Control).save(control);
        res.json(resul);
    }else{
        res.json({mensaje: 'No existe registro!'});
    }
})

router.delete('/:id', async(req: Request, res: Response) => {
    try{
        getRepository(Control).delete(req.params.id);
        res.json({ mensaje: true })
    }catch(error){
        res.json({ mensaje: false })
    }
})

export default router;