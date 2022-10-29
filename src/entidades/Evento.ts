import { Entity, Column,
         PrimaryGeneratedColumn, 
         CreateDateColumn, 
         UpdateDateColumn,
         ManyToMany,
         JoinTable, 
        } from "typeorm"

import { Riesgo } from "./Riesgo"

@Entity()
export class Evento{
    @PrimaryGeneratedColumn()
    CodEvento: number
    
    @Column()
    Nombre: string

    @Column()
    Descripcion: string

    @Column({default: null})
    Evidencia: string

    @Column({default: false})
    Perdida: boolean

    @Column()
    Lugar: string

    @Column()
    FechaIni: Date;

    @Column()
    FechaFin: Date

    @CreateDateColumn({
        name: 'creation',
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
    })
    creationAt: Date;

    @UpdateDateColumn({ name: 'updated', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    updatedAt: Date;

    @ManyToMany(() => Riesgo, (riesgo) => riesgo.eventos)
    @JoinTable({
    name: 'riesgo_evento_t',
    joinColumn: {
      name: 'evento_id',
    },
    inverseJoinColumn: {
      name: 'riesgo_id',
    },
    })
    riesgos: Riesgo[];
}