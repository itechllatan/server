import { Entity, Column,
         PrimaryGeneratedColumn, 
         CreateDateColumn, 
         UpdateDateColumn,
         ManyToOne, 
         JoinColumn,
         ManyToMany,
         JoinTable
        } from "typeorm"

import { TipoProceso } from "./TipoProceso"
import { CateProceso } from "./CateProceso"
import { Riesgo } from "./Riesgo"
import { Trabajador } from "./Trabajador"

@Entity()
export class Proceso{
    @PrimaryGeneratedColumn()
    CodProceso: number

    @Column()
    Nombre: string

    @Column({ default: null })
    evidencia: string

    @CreateDateColumn({
        name: 'creation',
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
    })
    creationAt: Date;

    @UpdateDateColumn({ name: 'updated', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    updatedAt: Date;

    @ManyToOne(() => TipoProceso, (tipoP) => tipoP.CodTipoP, { nullable: false })
    @JoinColumn({ name: 'IdTipoP' })
    CodTipo: TipoProceso;

    @ManyToOne(() => CateProceso, (cateP) => cateP.CodCateProceso, { nullable: false })
    @JoinColumn({ name: 'IdCateP' })
    CodCategoria: TipoProceso;

    @ManyToOne(() => Trabajador, (trabajador) => trabajador.CodTrabajador, { nullable: true })
    @JoinColumn({ name: 'IdRes' })
    CodResponsable: number

    @ManyToMany(() => Riesgo, (riesgo) => riesgo.procesos)
    @JoinTable({
    name: 'proceso_riesgo_t',
    joinColumn: {
      name: 'proceso_id',
    },
    inverseJoinColumn: {
      name: 'riesgo_id',
    },
    })
    riesgos: Riesgo[];


}