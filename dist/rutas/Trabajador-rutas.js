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
const Trabajador_1 = require("../entidades/Trabajador");
const router = (0, express_1.Router)();
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const trabajadores = yield (0, typeorm_1.getRepository)(Trabajador_1.Trabajador).find({
        relations: ['procesos', 'controles'],
    });
    res.json(trabajadores);
}));
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const trabajador = yield (0, typeorm_1.getRepository)(Trabajador_1.Trabajador).findOne({
        where: { CodTrabajador: parseInt(req.params.id, 10) },
        relations: ['procesos', 'controles'],
    });
    res.json(trabajador);
}));
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newTrabajador = yield (0, typeorm_1.getRepository)(Trabajador_1.Trabajador).create(req.body);
        const resul = yield (0, typeorm_1.getRepository)(Trabajador_1.Trabajador).save(newTrabajador);
        res.json(resul);
    }
    catch (error) {
        res.json({ mensaje: 'Error de registro' });
    }
}));
router.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const trabajador = yield (0, typeorm_1.getRepository)(Trabajador_1.Trabajador).findOne({ where: { CodTrabajador: parseInt(req.params.id, 10) } });
    if (trabajador) {
        (0, typeorm_1.getRepository)(Trabajador_1.Trabajador).merge(trabajador, req.body);
        const resul = yield (0, typeorm_1.getRepository)(Trabajador_1.Trabajador).save(trabajador);
        res.json(resul);
    }
    else {
        res.json({ mensaje: 'No existe registro!' });
    }
}));
router.delete('/:id', (req, res) => {
    try {
        (0, typeorm_1.getRepository)(Trabajador_1.Trabajador).delete(req.params.id);
        res.json({ mensaje: true });
    }
    catch (error) {
        res.json({ mensaje: false });
    }
});
exports.default = router;
