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
const Service_1 = require("../entidades/Service");
const router = (0, express_1.Router)();
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const servicios = yield (0, typeorm_1.getRepository)(Service_1.Service).find({
        relations: ['roles'],
    });
    res.json(servicios);
}));
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // const servicio = await getRepository(Service).findOne({where: {CodService: parseInt(req.params.id, 10)}})
    // res.json(servicio);
    const servicio = yield (0, typeorm_1.getRepository)(Service_1.Service).findOne({
        where: { CodService: parseInt(req.params.id, 10) },
        relations: ['roles'],
    });
    res.json(servicio);
}));
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const nuevoServicio = yield (0, typeorm_1.getRepository)(Service_1.Service).create(req.body);
        const resul = yield (0, typeorm_1.getRepository)(Service_1.Service).save(nuevoServicio);
        res.json(resul);
    }
    catch (error) {
        res.json({ mensaje: 'Error de registro' });
    }
}));
router.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const servicio = yield (0, typeorm_1.getRepository)(Service_1.Service).findOne({ where: { CodService: parseInt(req.params.id, 10) } });
    if (servicio) {
        (0, typeorm_1.getRepository)(Service_1.Service).merge(servicio, req.body);
        const resul = yield (0, typeorm_1.getRepository)(Service_1.Service).save(servicio);
        res.json(resul);
    }
    else {
        res.json({ mensaje: 'No existe registro!' });
    }
}));
router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        (0, typeorm_1.getRepository)(Service_1.Service).delete(req.params.id);
        res.json({ mensaje: true });
    }
    catch (error) {
        res.json({ mensaje: false });
    }
}));
exports.default = router;
