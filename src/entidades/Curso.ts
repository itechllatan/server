import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm"
import {Alumno} from './Alumno'

@Entity()
export class Curso {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    nombre: string
    
    @ManyToOne(type => Alumno, (alumno) => alumno.cursos)
    alumno: Alumno;
}