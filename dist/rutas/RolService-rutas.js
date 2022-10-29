"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const typeorm_1 = require("typeorm");
const RolService_1 = require("../entidades/RolService");
//import { Service } from '../entidades/Service';
const router = (0, express_1.Router)();
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // const rolesS = await getRepository(RolService).find({
    //     relations: {
    //         CodRol: true,
    //         CodService: true,
    //     },
    // });
    const rolesS = yield (0, typeorm_1.getRepository)(RolService_1.RolService).find();
    res.json(rolesS);
}));
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const roles = yield (0, typeorm_1.getRepository)(RolService_1.RolService).findOne({ where: { CodRolService: parseInt(req.params.id, 10) } });
    res.json(roles);
}));
// router.post('/', async (req: Request, res: Response) => {
//     const nuevoRol = await getRepository(RolService).create(req.body);
//     const resul = await getRepository(RolService).save(nuevoRol);
//     res.json(resul);
// })
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // res.json({ mensaje: 'No existe registro!' });
    // const rol = await getRepository(Rol).findOne({ where: { CodRol: parseInt(req.params.id, 10) } })
    // if (!rol){
    //     res.json({ mensaje: 'No existe la relación!' });
    // }else{
    const newItem = yield (0, typeorm_1.getRepository)(RolService_1.RolService).create(req.body);
    const resul = yield (0, typeorm_1.getRepository)(RolService_1.RolService).save(newItem);
    res.json(resul);
    //}
}));
router.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const rol = yield (0, typeorm_1.getRepository)(RolService_1.RolService).findOne({ where: { CodRolService: parseInt(req.params.id, 10) } });
    if (rol) {
        (0, typeorm_1.getRepository)(RolService_1.RolService).merge(rol, req.body);
        const resul = yield (0, typeorm_1.getRepository)(RolService_1.RolService).save(rol);
        res.json(resul);
    }
    else {
        res.json({ mensaje: 'No existe registro!' });
    }
}));
router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        (0, typeorm_1.getRepository)(RolService_1.RolService).delete(req.params.id);
        res.json({ mensaje: true });
    }
    catch (error) {
        res.json({ mensaje: false });
    }
}));
exports.default = router;
