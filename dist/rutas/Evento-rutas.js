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
const Evento_1 = require("../entidades/Evento");
const router = (0, express_1.Router)();
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const eventos = yield (0, typeorm_1.getRepository)(Evento_1.Evento).find({
        relations: ['riesgos'],
    });
    res.json(eventos);
}));
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const evento = yield (0, typeorm_1.getRepository)(Evento_1.Evento).findOne({
        where: { CodEvento: parseInt(req.params.id, 10) },
        relations: ['services'],
    });
    res.json(evento);
}));
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newEvento = yield (0, typeorm_1.getRepository)(Evento_1.Evento).create(req.body);
        const resul = yield (0, typeorm_1.getRepository)(Evento_1.Evento).save(newEvento);
        res.json(resul);
    }
    catch (error) {
        res.json({ mensaje: 'Error de registro' });
    }
}));
router.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const evento = yield (0, typeorm_1.getRepository)(Evento_1.Evento).findOne({ where: { CodEvento: parseInt(req.params.id, 10) } });
    if (evento) {
        (0, typeorm_1.getRepository)(Evento_1.Evento).merge(evento, req.body);
        const resul = yield (0, typeorm_1.getRepository)(Evento_1.Evento).save(evento);
        res.json(resul);
    }
    else {
        res.json({ mensaje: 'No existe registro!' });
    }
}));
router.delete('/:id', (req, res) => {
    try {
        (0, typeorm_1.getRepository)(Evento_1.Evento).delete(req.params.id);
        res.json({ mensaje: true });
    }
    catch (error) {
        res.json({ mensaje: false });
    }
});
exports.default = router;
