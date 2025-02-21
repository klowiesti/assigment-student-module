import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from './students.entity';
import { Not, Repository } from 'typeorm';

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

    // read function
    async getStudents(): Promise<Student[]> {
        return this.studentRepository.find();
    }

    async getStudentById(id: number): Promise<Student> {
        const student = await this.studentRepository.findOneBy({ id });
        if (!student){
            throw new NotFoundException('Student with ID ${id} not found');
        }
        return student;
    }

    //UPDATE
    async updateStudent(id: number, data: Partial<Student>): Promise<Student> {
        const student = await this.getStudentById(id);
        Object.assign(student, data);
        return this.studentRepository.save(student);
    }

    // DELETE
    async deleteStudent(id: number): Promise<void> {
        const result = await this.studentRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException('Student with ID ${id} not found');
        }
}
}