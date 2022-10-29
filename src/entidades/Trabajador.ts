import { Entity, Column,
         PrimaryGeneratedColumn, 
         CreateDateColumn, 
         UpdateDateColumn,
         OneToMany,
        } from "typeorm"

import { Control } from "./Control"
import { Proceso } from "./Proceso"

@Entity()
export class Trabajador{
    @PrimaryGeneratedColumn()
    CodTrabajador: number

    @Column()
    Nombre: string

    @Column()
    Correo: string

    @CreateDateColumn({
        name: 'creation',
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
    })
    creationAt: Date;

    @UpdateDateColumn({ name: 'updated', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    updatedAt: Date;
    
    @OneToMany(() => Proceso, (proceso) => proceso.CodResponsable , { nullable: true })
    procesos: Control[];

    @OneToMany(() => Control, (control) => control.CodResponsable , { nullable: true })
    controles: Control[];
}