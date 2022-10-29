import { Entity, Column,
         PrimaryGeneratedColumn, 
         CreateDateColumn, 
         UpdateDateColumn,
         ManyToMany,
         ManyToOne, 
         JoinColumn
        } from "typeorm"

import { Evento } from "./Evento"
import { Impacto } from "./Impacto"
import { Frecuencia } from "./Frecuencia"
import { Proceso } from "./Proceso"
import { Control } from "./Control"

@Entity()
export class Riesgo{
    @PrimaryGeneratedColumn()
    CodRiesgo: number

    @Column()
    Nombre: string

    @Column()
    Descripcion: string

    @Column({default: false})
    Continuidad: boolean

    @CreateDateColumn({
        name: 'creation',
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
    })
    creationAt: Date;

    @UpdateDateColumn({ name: 'updated', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    updatedAt: Date;

    @ManyToMany(() => Evento, (evento) => evento.riesgos)
    eventos: Evento[];

    @ManyToMany(() => Proceso, (proceso) => proceso.riesgos)
    procesos: Evento[];

    @ManyToMany(() => Control, (control) => control.riesgos)
    controles: Evento[];

    @ManyToOne(() => Impacto, (impacto) => impacto.CodImpacto, { nullable: false })
    @JoinColumn({ name: 'IdImpacto' })
    CodImpacto: Impacto;

    @ManyToOne(() => Frecuencia, (frecuencia) => frecuencia.CodFrecuencia, { nullable: false })
    @JoinColumn({ name: 'IdFrecuencia' })
    CodFrecuencia: Frecuencia;

}