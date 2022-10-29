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
const Control_1 = require("../entidades/Control");
const router = (0, express_1.Router)();
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const controles = yield (0, typeorm_1.getRepository)(Control_1.Control).find({
        relations: {
            CodTipoControl: true,
            CodTipoEjecucion: true,
            CodDocumento: true
        },
    });
    res.json(controles);
}));
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const control = yield (0, typeorm_1.getRepository)(Control_1.Control).findOne({
        where: { CodControl: parseInt(req.params.id, 10) },
    });
    res.json(control);
}));
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newControl = yield (0, typeorm_1.getRepository)(Control_1.Control).create(req.body);
        const resul = yield (0, typeorm_1.getRepository)(Control_1.Control).save(newControl);
        res.json(resul);
    }
    catch (error) {
        res.json({ mensaje: 'Error de registro' });
    }
}));
router.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const control = yield (0, typeorm_1.getRepository)(Control_1.Control).findOne({ where: { CodControl: parseInt(req.params.id, 10) } });
    if (control) {
        (0, typeorm_1.getRepository)(Control_1.Control).merge(control, req.body);
        const resul = yield (0, typeorm_1.getRepository)(Control_1.Control).save(control);
        res.json(resul);
    }
    else {
        res.json({ mensaje: 'No existe registro!' });
    }
}));
router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        (0, typeorm_1.getRepository)(Control_1.Control).delete(req.params.id);
        res.json({ mensaje: true });
    }
    catch (error) {
        res.json({ mensaje: false });
    }
}));
exports.default = router;
