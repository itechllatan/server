import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany, CreateDateColumn, UpdateDateColumn } from "typeorm"

import {Curso} from './Curso';

@Entity()
export class Alumno extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    nombres: string

    @Column()
    apellidos: string

    @Column()
    doc_identidad: number

    @CreateDateColumn({
        name: 'creation_at',
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
    })
    creationAt: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    updatedAt: Date;

    @OneToMany(type => Curso, (curso) => curso.alumno,{eager:true, cascade:true})
    cursos: Curso[]
}