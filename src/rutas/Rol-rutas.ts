import {Router, Request, Response, response, } from 'express';

import {getRepository} from "typeorm";
import { Rol } from '../entidades/Rol'

const router = Router()

router.get('/', async (req: Request, res: Response) => {
    const roles = await getRepository(Rol).find({ 
                                                    relations: ['services'],
                                                });
    res.json(roles);
})

router.get('/:id', async (req: Request, res: Response) => {
    // const rol = await getRepository(Rol).findOne({where: {CodRol: parseInt(req.params.id, 10)}})
    // res.json(rol);
    const rol = await getRepository(Rol).findOne({ 
                                                    where: { CodRol: parseInt(req.params.id, 10) } ,
                                                    relations: ['services'],
                                                 })
    res.json(rol);
})

router.post('/', async (req: Request, res: Response) => {
    try{
        const nuevoRol = await getRepository(Rol).create(req.body);
        const resul = await getRepository(Rol).save(nuevoRol);
        res.json(resul);
    }catch(error){
        res.json({ mensaje: 'Error de registro' })
    }
})

router.put('/:id', async (req: Request, res: Response) => {
    const rol = await getRepository(Rol).findOne({where: {CodRol: parseInt(req.params.id, 10)}})
    if(rol){
        getRepository(Rol).merge(rol, req.body);
        const resul = await getRepository(Rol).save(rol);
        res.json(resul);
    }else{
        res.json({mensaje: 'No existe registro!'});
    }
})

router.delete('/:id', (req: Request, res: Response) => {
    try{
        getRepository(Rol).delete(req.params.id);
        res.json({ mensaje: true })
    }catch(error){
        res.json({ mensaje: false })
    }
})

export default router;