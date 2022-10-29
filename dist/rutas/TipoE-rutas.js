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
const TipoEjecucion_1 = require("../entidades/TipoEjecucion");
const router = (0, express_1.Router)();
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const tipoEs = yield (0, typeorm_1.getRepository)(TipoEjecucion_1.TipoEjecucion).find({
        relations: ['controles'],
    });
    res.json(tipoEs);
}));
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const tipoE = yield (0, typeorm_1.getRepository)(TipoEjecucion_1.TipoEjecucion).findOne({
        where: { CodTipoEjecucion: parseInt(req.params.id, 10) },
        relations: ['controles'],
    });
    res.json(tipoE);
}));
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newTipoE = yield (0, typeorm_1.getRepository)(TipoEjecucion_1.TipoEjecucion).create(req.body);
        const resul = yield (0, typeorm_1.getRepository)(TipoEjecucion_1.TipoEjecucion).save(newTipoE);
        res.json(resul);
    }
    catch (error) {
        res.json({ mensaje: 'Error de registro' });
    }
}));
router.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const tipoE = yield (0, typeorm_1.getRepository)(TipoEjecucion_1.TipoEjecucion).findOne({ where: { CodTipoEjecucion: parseInt(req.params.id, 10) } });
    if (tipoE) {
        (0, typeorm_1.getRepository)(TipoEjecucion_1.TipoEjecucion).merge(tipoE, req.body);
        const resul = yield (0, typeorm_1.getRepository)(TipoEjecucion_1.TipoEjecucion).save(tipoE);
        res.json(resul);
    }
    else {
        res.json({ mensaje: 'No existe registro!' });
    }
}));
router.delete('/:id', (req, res) => {
    try {
        (0, typeorm_1.getRepository)(TipoEjecucion_1.TipoEjecucion).delete(req.params.id);
        res.json({ mensaje: true });
    }
    catch (error) {
        res.json({ mensaje: false });
    }
});
exports.default = router;
