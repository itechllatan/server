import { Entity, Column,
         PrimaryGeneratedColumn, 
         CreateDateColumn, 
         UpdateDateColumn,
         OneToMany,
        } from "typeorm"

import { Control } from "./Control";

@Entity()
export class TipoControl{
    @PrimaryGeneratedColumn()
    CodTipoControl: number

    @Column()
    Nombre: string

    @CreateDateColumn({
        name: 'creation',
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
    })
    creationAt: Date;

    @UpdateDateColumn({ name: 'updated', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    updatedAt: Date;

    @OneToMany(() => Control, (control) => control.CodTipoControl, { nullable: false })
    controles: Control[];
}