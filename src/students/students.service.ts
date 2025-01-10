import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from './students.entity';
import { Repository } from 'typeorm';

@Injectable()
export class StudentsService {
    constructor (
        @InjectRepository(Student)
        private readonly studentRepository: Repository<Student>,
    ) {}

    // create function 
    async createStudent (data: Partial<Student>): Promise<Student> {
        const student = this.studentRepository.create(data);
        return this.studentRepository.save(student);
    }
}