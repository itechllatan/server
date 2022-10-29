import { Entity, Column,
         PrimaryGeneratedColumn, 
         CreateDateColumn, 
         UpdateDateColumn,
         OneToMany
        } from "typeorm"

import { Proceso } from "./Proceso";

@Entity()
export class CateProceso{
    @PrimaryGeneratedColumn()
    CodCateProceso: number

    @Column()
    Categoria: string

    @CreateDateColumn({
        name: 'creation',
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
    })
    creationAt: Date;

    @UpdateDateColumn({ name: 'updated', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    updatedAt: Date;

    @OneToMany(() => Proceso, (proceso) => proceso.CodCategoria, { nullable: false })
    procesos: Proceso[];
}