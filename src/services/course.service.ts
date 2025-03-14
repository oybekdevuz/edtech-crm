import { EntityRepository, Repository } from 'typeorm';
import Container, { Service } from 'typedi';
import { HttpException } from '@/exceptions/httpException';
import { CourseEntity } from '../entities/courses.entity';
import { ICourses } from '../interfaces/courses.interface';
import { CourseActionDto } from '@/dtos/enroll-student.dto';
import { StudentService } from './student.service';
import { StudentCourseEntity } from '@/entities/studentCourses.entity';
import { QueryDto } from '@/dtos/query.dto';

@Service()
@EntityRepository()
export class CourseService extends Repository<CourseEntity> {
  public studentService = Container.get(StudentService);

  public async findAll(dto: QueryDto): Promise<{ data: ICourses[]; total: number }> {
    const { page = 1, page_size = 10, search } = dto;
    const queryBuilder = CourseEntity.createQueryBuilder('course');
    if (search) {
      queryBuilder.where('(course.course_name ILIKE :search)', {
        search: `%${search}%`,
      });
    }
    const skip = (page - 1) * page_size;
    const total = await queryBuilder.getCount();
    const students = await queryBuilder.skip(skip).take(page_size).orderBy('course.created_at', 'DESC').getMany();

    return {
      data: students,
      total,
    };
  }

  public async findById(userId: string): Promise<ICourses> {
    const findCourse: ICourses = await CourseEntity.findOne({ where: { id: userId }, relations: ['studentCourses', 'studentCourses.student'] });
    if (!findCourse) throw new HttpException(409, "Course doesn't exist");

    return findCourse;
  }

  public async enrollStudent(dto: CourseActionDto): Promise<StudentCourseEntity> {
    const student = await this.studentService.findById(dto.student_id);
    const course = await this.findById(dto.course_id);
    const createCourseData: StudentCourseEntity = await StudentCourseEntity.create({ student, course }).save();
    return createCourseData;
  }
  public async withdrawStudent(dto: CourseActionDto): Promise<[]> {
    const student = await this.studentService.findById(dto.student_id);
    const course = await this.findById(dto.course_id);
    await StudentCourseEntity.delete({ student, course });
    return [];
  }

  public async createData(dto: ICourses): Promise<ICourses> {
    const createCourseData: ICourses = await CourseEntity.create(dto).save();
    return createCourseData;
  }

  public async updateData(userId: string, dto: ICourses): Promise<ICourses> {
    const findCourse: ICourses = await CourseEntity.findOne({ where: { id: userId } });
    if (!findCourse) throw new HttpException(409, "Course doesn't exist");
    await CourseEntity.update(userId, dto);

    const updateCourse: ICourses = await CourseEntity.findOne({ where: { id: userId } });
    return updateCourse;
  }

  public async deleteData(userId: string): Promise<ICourses> {
    const findCourse: ICourses = await CourseEntity.findOne({ where: { id: userId } });
    if (!findCourse) throw new HttpException(409, "Course doesn't exist");

    await CourseEntity.delete({ id: userId });
    return findCourse;
  }
}
