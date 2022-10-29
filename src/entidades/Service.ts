import { Entity, Column,
         PrimaryGeneratedColumn,
         CreateDateColumn,
         UpdateDateColumn, 
         ManyToMany,
        } from "typeorm"

import { Rol } from "./Rol"

@Entity()
export class Service {
    @PrimaryGeneratedColumn()
    CodService: number

    @Column()
    Descripcion: string

    @Column()
    Metodo: string

    @Column()
    Url: string

    @CreateDateColumn({
        name: 'creation',
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
    })
    creationAt: Date;

    @UpdateDateColumn({ name: 'updated', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    updatedAt: Date;


    @ManyToMany(() => Rol, (rol) => rol.services)
    roles: Rol[];
}
