import { Entity, Column, 
         PrimaryGeneratedColumn,
         CreateDateColumn, 
         UpdateDateColumn,
         OneToMany,
        } from "typeorm"

import { Control } from "./Control";

@Entity()
export class Documento{
    @PrimaryGeneratedColumn()
    CodDocumento: number

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

    @OneToMany(() => Control, (control) => control.CodDocumento, { nullable: false })
    controles: Control[];
}