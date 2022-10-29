import { Entity, Column, 
         PrimaryGeneratedColumn,
         CreateDateColumn, 
         UpdateDateColumn,
         ManyToOne, 
         JoinColumn,
        } from "typeorm"
import { Rol } from "./Rol"

@Entity()
export class User{
    @PrimaryGeneratedColumn()
    CodUser: number

    @Column({ nullable: false })
    Nombre: string

    @Column({ default: true })
    Estado: boolean

    @CreateDateColumn({
        name: 'creation',
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
    })
    creationAt: Date;

    @UpdateDateColumn({ name: 'updated', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    updatedAt: Date;

    @ManyToOne(() => Rol, (rol) => rol.CodRol, { nullable: false })
    @JoinColumn({ name: 'IdRol' })
    CodRol: Rol;
}