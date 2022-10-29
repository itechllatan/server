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
const User_1 = require("../entidades/User");
const router = (0, express_1.Router)();
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield (0, typeorm_1.getRepository)(User_1.User).find({
        relations: {
            CodRol: true,
        },
    });
    res.json(users);
}));
router.get('/completo/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield (0, typeorm_1.getRepository)(User_1.User)
        .createQueryBuilder("user")
        .where("user.id = :id", { id: 1 })
        .getOne();
    // const userC = await createQueryBuilder()
    //                     .select("user")
    //                     .from(User, "user")
    //                     .where("user.id = :id", {id: })
    //                     .getOne();
    res.json(user);
}));
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield (0, typeorm_1.getRepository)(User_1.User).findOne({ where: { CodUser: parseInt(req.params.id, 10) }, relations: { CodRol: true }, });
    res.json(user);
}));
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const nuevoUser = yield (0, typeorm_1.getRepository)(User_1.User).create(req.body);
        const resul = yield (0, typeorm_1.getRepository)(User_1.User).save(nuevoUser);
        res.json(resul);
    }
    catch (error) {
        res.json({ mensaje: 'Error de registro' });
    }
}));
router.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield (0, typeorm_1.getRepository)(User_1.User).findOne({ where: { CodUser: parseInt(req.params.id, 10) } });
    if (user) {
        (0, typeorm_1.getRepository)(User_1.User).merge(user, req.body);
        const resul = yield (0, typeorm_1.getRepository)(User_1.User).save(user);
        res.json(resul);
    }
    else {
        res.json({ mensaje: 'No existe registro!' });
    }
}));
router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        (0, typeorm_1.getRepository)(User_1.User).delete(req.params.id);
        res.json({ mensaje: true });
    }
    catch (error) {
        res.json({ mensaje: false });
    }
}));
exports.default = router;
