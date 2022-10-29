import {Router, Request, Response, response, } from 'express';

import {getRepository} from "typeorm";
import { Documento } from '../entidades/Documento';

const router = Router()

router.get('/', async (req: Request, res: Response) => {
    const documentos = await getRepository(Documento).find({ 
                                                           relations: ['controles'],
                                                        });
    res.json(documentos);
})

router.get('/:id', async (req: Request, res: Response) => {
    const documento = await getRepository(Documento).findOne({ 
                                                    where: { CodDocumento: parseInt(req.params.id, 10) } ,
                                                    relations: ['controles'],
                                                 })
    res.json(documento);
})

router.post('/', async (req: Request, res: Response) => {
    try{
        const newDoc = await getRepository(Documento).create(req.body);
        const resul = await getRepository(Documento).save(newDoc);
        res.json(resul);
    }catch(error){
        res.json({ mensaje: 'Error de registro' })
    }
})

router.put('/:id', async (req: Request, res: Response) => {
    const newDoc = await getRepository(Documento).findOne({where: {CodDocumento: parseInt(req.params.id, 10)}})
    if(newDoc){
        getRepository(Documento).merge(newDoc, req.body);
        const resul = await getRepository(Documento).save(newDoc);
        res.json(resul);
    }else{
        res.json({mensaje: 'No existe registro!'});
    }
})

router.delete('/:id', (req: Request, res: Response) => {
    try{
        getRepository(Documento).delete(req.params.id);
        res.json({ mensaje: true })
    }catch(error){
        res.json({ mensaje: false })
    }
})

export default router;