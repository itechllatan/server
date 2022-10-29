import { Entity, Column,
         PrimaryGeneratedColumn, 
         CreateDateColumn, 
         UpdateDateColumn, 
         OneToMany, 
         ManyToMany,
         JoinTable,
        } from "typeorm"

import { User } from "./User";
import { Service } from "./Service"

@Entity()
export class Rol{
    @PrimaryGeneratedColumn()
    CodRol: number

    @Column({ nullable: false })
    Descripcion: string

    @CreateDateColumn({
        name: 'creation',
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
    })
    creationAt: Date;

    @UpdateDateColumn({ name: 'updated', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    updatedAt: Date;

    @OneToMany(() => User, (user) => user.CodRol, { nullable: false })
    users: User[];

    @ManyToMany(() => Service, (service) => service.roles)
    @JoinTable({
    name: 'rol_services_t',
    joinColumn: {
      name: 'rol_id',
    },
    inverseJoinColumn: {
      name: 'service_id',
    },
    })
    services: Service[];
}
