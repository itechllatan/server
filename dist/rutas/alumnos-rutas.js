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
const Alumno_1 = require("../entidades/Alumno");
const router = (0, express_1.Router)();
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //res.json({ mensaje: "metodo get" })
    const alumnos = yield (0, typeorm_1.getRepository)(Alumno_1.Alumno).find();
    res.json(alumnos);
}));
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //res.json({ mensaje: `metodo get id: ${req.params.id}` })
    //const alumno = await getRepository(Alumno).findOne(req.params.id);
    const alumno = yield (0, typeorm_1.getRepository)(Alumno_1.Alumno).findOne({ where: { id: parseInt(req.params.id, 10) } });
    res.json(alumno);
}));
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //res.json({ mensaje: "metodo post" })
    const nuevoAlumno = yield (0, typeorm_1.getRepository)(Alumno_1.Alumno).create(req.body);
    const resul = yield (0, typeorm_1.getRepository)(Alumno_1.Alumno).save(nuevoAlumno);
    res.json(resul);
}));
router.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //res.json({ mensaje: "metodo put" })
    const alumno = yield (0, typeorm_1.getRepository)(Alumno_1.Alumno).findOne({ where: { id: parseInt(req.params.id, 10) } });
    if (alumno) {
        (0, typeorm_1.getRepository)(Alumno_1.Alumno).merge(alumno, req.body);
        const resul = yield (0, typeorm_1.getRepository)(Alumno_1.Alumno).save(alumno);
        res.json(resul);
    }
    else {
        res.json({ mensaje: 'no existe alumno' });
    }
}));
router.delete('/', (req, res) => {
    //res.json({ mensaje: "metodo delete" })
    (0, typeorm_1.getRepository)(Alumno_1.Alumno).delete(req.params.id);
    res.json({ mensaje: "eliminado" });
});
exports.default = router;
