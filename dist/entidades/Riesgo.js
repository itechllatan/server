"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Riesgo = void 0;
const typeorm_1 = require("typeorm");
const Evento_1 = require("./Evento");
const Impacto_1 = require("./Impacto");
const Frecuencia_1 = require("./Frecuencia");
const Proceso_1 = require("./Proceso");
const Control_1 = require("./Control");
let Riesgo = class Riesgo {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Riesgo.prototype, "CodRiesgo", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Riesgo.prototype, "Nombre", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Riesgo.prototype, "Descripcion", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], Riesgo.prototype, "Continuidad", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({
        name: 'creation',
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
    }),
    __metadata("design:type", Date)
], Riesgo.prototype, "creationAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], Riesgo.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => Evento_1.Evento, (evento) => evento.riesgos),
    __metadata("design:type", Array)
], Riesgo.prototype, "eventos", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => Proceso_1.Proceso, (proceso) => proceso.riesgos),
    __metadata("design:type", Array)
], Riesgo.prototype, "procesos", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => Control_1.Control, (control) => control.riesgos),
    __metadata("design:type", Array)
], Riesgo.prototype, "controles", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Impacto_1.Impacto, (impacto) => impacto.CodImpacto, { nullable: false }),
    (0, typeorm_1.JoinColumn)({ name: 'IdImpacto' }),
    __metadata("design:type", Impacto_1.Impacto)
], Riesgo.prototype, "CodImpacto", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Frecuencia_1.Frecuencia, (frecuencia) => frecuencia.CodFrecuencia, { nullable: false }),
    (0, typeorm_1.JoinColumn)({ name: 'IdFrecuencia' }),
    __metadata("design:type", Frecuencia_1.Frecuencia)
], Riesgo.prototype, "CodFrecuencia", void 0);
Riesgo = __decorate([
    (0, typeorm_1.Entity)()
], Riesgo);
exports.Riesgo = Riesgo;
