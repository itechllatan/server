import { Entity, Column,
         PrimaryGeneratedColumn, 
         CreateDateColumn, 
         UpdateDateColumn,
         ManyToOne, 
         JoinColumn,
         ManyToMany,
         JoinTable, 
        } from "typeorm"

import { TipoControl } from "./TipoControl"
import { TipoEjecucion } from "./TipoEjecucion"
import { Documento } from "./Documento"
import { Riesgo } from "./Riesgo"
import { Trabajador } from "./Trabajador"

@Entity()
export class Control{
    @PrimaryGeneratedColumn()
    CodControl: number

    @Column()
    Nombre: string

    @Column()
    Descripcion: string

    @Column({ default: false })
    Frecuencia: boolean

    @Column({ default: false })
    Evidencia: boolean

    @Column({ default: false })
    Asociado: boolean

    @Column({ default: false })
    Evento: boolean

    @Column({ default: false })
    ConEfectivo: boolean

    @Column({ default: false })
    EveEfectica: boolean

    @Column({ default: null })
    Solidez: number

    @CreateDateColumn({
        name: 'creation',
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
    })
    creationAt: Date;

    @UpdateDateColumn({ name: 'updated', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    updatedAt: Date;

    @ManyToOne(() => TipoControl, (tipoC) => tipoC.CodTipoControl, { nullable: false })
    @JoinColumn({ name: 'IdTipoC' })
    CodTipoControl: number

    @ManyToOne(() => TipoEjecucion, (tipoE) => tipoE.CodTipoEjecucion, { nullable: false })
    @JoinColumn({ name: 'IdTipoE' })
    CodTipoEjecucion: number

    @ManyToOne(() => Documento, (documento) => documento.CodDocumento, { nullable: false })
    @JoinColumn({ name: 'IdDoc' })
    CodDocumento: number

    @ManyToOne(() => Trabajador, (trabajador) => trabajador.CodTrabajador, { nullable: true })
    @JoinColumn({ name: 'IdRes' })
    CodResponsable: number

    @ManyToMany(() => Riesgo, (riesgo) => riesgo.controles)
    @JoinTable({
    name: 'riesgo_control_t',
    joinColumn: {
      name: 'control_id',
    },
    inverseJoinColumn: {
      name: 'riesgo_id',
    },
    })
    riesgos: Riesgo[];
}