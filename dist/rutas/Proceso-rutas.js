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
const Proceso_1 = require("../entidades/Proceso");
const router = (0, express_1.Router)();
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const procesos = yield (0, typeorm_1.getRepository)(Proceso_1.Proceso).find({
        relations: {
            CodCategoria: true,
            CodTipo: true,
            riesgos: true
        },
    });
    res.json(procesos);
}));
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const proceso = yield (0, typeorm_1.getRepository)(Proceso_1.Proceso).findOne({
        where: { CodProceso: parseInt(req.params.id, 10) },
        relations: ['riesgos'],
    });
    res.json(proceso);
}));
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newProceso = yield (0, typeorm_1.getRepository)(Proceso_1.Proceso).create(req.body);
        const resul = yield (0, typeorm_1.getRepository)(Proceso_1.Proceso).save(newProceso);
        res.json(resul);
    }
    catch (error) {
        res.json({ mensaje: 'Error de registro' });
    }
}));
router.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const proceso = yield (0, typeorm_1.getRepository)(Proceso_1.Proceso).findOne({ where: { CodProceso: parseInt(req.params.id, 10) } });
    if (proceso) {
        (0, typeorm_1.getRepository)(Proceso_1.Proceso).merge(proceso, req.body);
        const resul = yield (0, typeorm_1.getRepository)(Proceso_1.Proceso).save(proceso);
        res.json(resul);
    }
    else {
        res.json({ mensaje: 'No existe registro!' });
    }
}));
router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        (0, typeorm_1.getRepository)(Proceso_1.Proceso).delete(req.params.id);
        res.json({ mensaje: true });
    }
    catch (error) {
        res.json({ mensaje: false });
    }
}));
exports.default = router;
