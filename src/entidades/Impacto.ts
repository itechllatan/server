import { Entity, 
         Column,
         PrimaryGeneratedColumn, 
         CreateDateColumn, 
         UpdateDateColumn,
         OneToMany,
        } from "typeorm"

import { Riesgo } from "./Riesgo"

@Entity()
export class Impacto{
    @PrimaryGeneratedColumn()
    CodImpacto: number

    @Column()
    Nombre: string

    @Column()
    Peso: number

    @CreateDateColumn({
        name: 'creation',
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
    })
    creationAt: Date;

    @UpdateDateColumn({ name: 'updated', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    updatedAt: Date;

    @OneToMany(() => Riesgo, (riesgo) => riesgo.CodImpacto, { nullable: false })
    riesgo: Riesgo[];
}