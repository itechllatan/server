import {Router, Request, Response, response, } from 'express';

import {createQueryBuilder, getRepository} from "typeorm";
import { User } from '../entidades/User'
import { getManager } from 'typeorm';

const router = Router()

router.get('/', async (req: Request, res: Response) => {
    const users = await getRepository(User).find({
                                                    relations: {
                                                        CodRol: true,
                                                    },
                                                });
    res.json(users);
})

router.get('/completo/:id', async (req: Request, res: Response) => {
    // const user = await getManager()
    //                 .getRepository(User)
    //                 .createQueryBuilder("user")
    //                 .where('"user"."CodUser" = :id', {id: parseInt(req.params.id, 10)})
    //                 .getOneOrFail();
    const user = await getManager()
                    .getRepository(User)
                    .createQueryBuilder("user") //alias
                    .select(['user.CodUser', 'user.Nombre']) //columnnas
                    .where('user.CodUser = :id', {id: parseInt(req.params.id, 10)})
                    .getOneOrFail();
    res.json(user);
})

router.get('/:id', async (req: Request, res: Response) => {
    const user = await getRepository(User).findOne({where: {CodUser: parseInt(req.params.id, 10)}, relations: {CodRol: true},})
    res.json(user);
})

router.post('/', async (req: Request, res: Response) => {
    try{
        const nuevoUser = await getRepository(User).create(req.body);
        const resul = await getRepository(User).save(nuevoUser);
        res.json(resul);
    }catch(error){
        res.json({ mensaje: 'Error de registro' })
    }
})

router.put('/:id', async (req: Request, res: Response) => {
    const user = await getRepository(User).findOne({where: {CodUser: parseInt(req.params.id, 10)}})
    if(user){
        getRepository(User).merge(user, req.body);
        const resul = await getRepository(User).save(user);
        res.json(resul);
    }else{
        res.json({mensaje: 'No existe registro!'});
    }
})

router.delete('/:id', async(req: Request, res: Response) => {
    try{
        getRepository(User).delete(req.params.id);
        res.json({ mensaje: true })
    }catch(error){
        res.json({ mensaje: false })
    }
})

export default router;