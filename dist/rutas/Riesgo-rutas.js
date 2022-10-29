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
const Riesgo_1 = require("../entidades/Riesgo");
const router = (0, express_1.Router)();
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const riesgos = yield (0, typeorm_1.getRepository)(Riesgo_1.Riesgo).find({
        relations: ['eventos'],
    });
    res.json(riesgos);
}));
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const riesgo = yield (0, typeorm_1.getRepository)(Riesgo_1.Riesgo).findOne({
        where: { CodRiesgo: parseInt(req.params.id, 10) },
        relations: ['eventos'],
    });
    res.json(riesgo);
}));
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newRiesgo = yield (0, typeorm_1.getRepository)(Riesgo_1.Riesgo).create(req.body);
        const resul = yield (0, typeorm_1.getRepository)(Riesgo_1.Riesgo).save(newRiesgo);
        res.json(resul);
    }
    catch (error) {
        res.json({ mensaje: 'Error de registro' });
    }
}));
router.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const riesgo = yield (0, typeorm_1.getRepository)(Riesgo_1.Riesgo).findOne({ where: { CodRiesgo: parseInt(req.params.id, 10) } });
    if (riesgo) {
        (0, typeorm_1.getRepository)(Riesgo_1.Riesgo).merge(riesgo, req.body);
        const resul = yield (0, typeorm_1.getRepository)(Riesgo_1.Riesgo).save(riesgo);
        res.json(resul);
    }
    else {
        res.json({ mensaje: 'No existe registro!' });
    }
}));
router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        (0, typeorm_1.getRepository)(Riesgo_1.Riesgo).delete(req.params.id);
        res.json({ mensaje: true });
    }
    catch (error) {
        res.json({ mensaje: false });
    }
}));
exports.default = router;
