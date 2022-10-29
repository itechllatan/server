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
exports.Documento = void 0;
const typeorm_1 = require("typeorm");
const Control_1 = require("./Control");
let Documento = class Documento {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Documento.prototype, "CodDocumento", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Documento.prototype, "Nombre", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({
        name: 'creation',
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
    }),
    __metadata("design:type", Date)
], Documento.prototype, "creationAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], Documento.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Control_1.Control, (control) => control.CodDocumento, { nullable: false }),
    __metadata("design:type", Array)
], Documento.prototype, "controles", void 0);
Documento = __decorate([
    (0, typeorm_1.Entity)()
], Documento);
exports.Documento = Documento;
