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
exports.Proceso = void 0;
const typeorm_1 = require("typeorm");
const TipoProceso_1 = require("./TipoProceso");
const CateProceso_1 = require("./CateProceso");
const Riesgo_1 = require("./Riesgo");
const Trabajador_1 = require("./Trabajador");
let Proceso = class Proceso {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Proceso.prototype, "CodProceso", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Proceso.prototype, "Nombre", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: null }),
    __metadata("design:type", String)
], Proceso.prototype, "evidencia", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({
        name: 'creation',
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
    }),
    __metadata("design:type", Date)
], Proceso.prototype, "creationAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], Proceso.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => TipoProceso_1.TipoProceso, (tipoP) => tipoP.CodTipoP, { nullable: false }),
    (0, typeorm_1.JoinColumn)({ name: 'IdTipoP' }),
    __metadata("design:type", TipoProceso_1.TipoProceso)
], Proceso.prototype, "CodTipo", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => CateProceso_1.CateProceso, (cateP) => cateP.CodCateProceso, { nullable: false }),
    (0, typeorm_1.JoinColumn)({ name: 'IdCateP' }),
    __metadata("design:type", TipoProceso_1.TipoProceso)
], Proceso.prototype, "CodCategoria", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Trabajador_1.Trabajador, (trabajador) => trabajador.CodTrabajador, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'IdRes' }),
    __metadata("design:type", Number)
], Proceso.prototype, "CodResponsable", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => Riesgo_1.Riesgo, (riesgo) => riesgo.procesos),
    (0, typeorm_1.JoinTable)({
        name: 'proceso_riesgo_t',
        joinColumn: {
            name: 'proceso_id',
        },
        inverseJoinColumn: {
            name: 'riesgo_id',
        },
    }),
    __metadata("design:type", Array)
], Proceso.prototype, "riesgos", void 0);
Proceso = __decorate([
    (0, typeorm_1.Entity)()
], Proceso);
exports.Proceso = Proceso;
