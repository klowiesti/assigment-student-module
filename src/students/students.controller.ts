import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { StudentsService } from './students.service';
import { Student } from './students.entity';

@Controller('students')
export class StudentsController {
    constructor(private readonly studentService: StudentsService) {}

    @Post()
    async createStudent(@Body() data: Partial<Student>): Promise<Student> {
        return this.studentService.createStudent(data);
    }

    @Get()
    async getStudent(): Promise<Student[]> {
        return this.studentService.getStudents();
    }

    @Get (':id')
    async getStudentById(@Param('id') id: number): Promise<Student> {
        return this.studentService.getStudentById(id);
    }
}
