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
exports.Control = void 0;
const typeorm_1 = require("typeorm");
const TipoControl_1 = require("./TipoControl");
const TipoEjecucion_1 = require("./TipoEjecucion");
const Documento_1 = require("./Documento");
const Riesgo_1 = require("./Riesgo");
const Trabajador_1 = require("./Trabajador");
let Control = class Control {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Control.prototype, "CodControl", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Control.prototype, "Nombre", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Control.prototype, "Descripcion", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], Control.prototype, "Frecuencia", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], Control.prototype, "Evidencia", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], Control.prototype, "Asociado", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], Control.prototype, "Evento", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], Control.prototype, "ConEfectivo", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], Control.prototype, "EveEfectica", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: null }),
    __metadata("design:type", Number)
], Control.prototype, "Solidez", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({
        name: 'creation',
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
    }),
    __metadata("design:type", Date)
], Control.prototype, "creationAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], Control.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => TipoControl_1.TipoControl, (tipoC) => tipoC.CodTipoControl, { nullable: false }),
    (0, typeorm_1.JoinColumn)({ name: 'IdTipoC' }),
    __metadata("design:type", Number)
], Control.prototype, "CodTipoControl", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => TipoEjecucion_1.TipoEjecucion, (tipoE) => tipoE.CodTipoEjecucion, { nullable: false }),
    (0, typeorm_1.JoinColumn)({ name: 'IdTipoE' }),
    __metadata("design:type", Number)
], Control.prototype, "CodTipoEjecucion", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Documento_1.Documento, (documento) => documento.CodDocumento, { nullable: false }),
    (0, typeorm_1.JoinColumn)({ name: 'IdDoc' }),
    __metadata("design:type", Number)
], Control.prototype, "CodDocumento", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Trabajador_1.Trabajador, (trabajador) => trabajador.CodTrabajador, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'IdRes' }),
    __metadata("design:type", Number)
], Control.prototype, "CodResponsable", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => Riesgo_1.Riesgo, (riesgo) => riesgo.controles),
    (0, typeorm_1.JoinTable)({
        name: 'riesgo_control_t',
        joinColumn: {
            name: 'control_id',
        },
        inverseJoinColumn: {
            name: 'riesgo_id',
        },
    }),
    __metadata("design:type", Array)
], Control.prototype, "riesgos", void 0);
Control = __decorate([
    (0, typeorm_1.Entity)()
], Control);
exports.Control = Control;
