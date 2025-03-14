import { EntityRepository, Repository } from 'typeorm';
import { Service } from 'typedi';
import { HttpException } from '@/exceptions/httpException';
import { CourseEntity } from '../entities/courses.entity';
import { ICourses } from '../interfaces/courses.interface';

@Service()
@EntityRepository()
export class CourseService extends Repository<CourseEntity> {
  public async findAll(): Promise<ICourses[]> {
    const data: ICourses[] = await CourseEntity.find();
    return data;
  }

  public async findById(userId: string): Promise<ICourses> {
    const findCourse: ICourses = await CourseEntity.findOne({ where: { id: userId } });
    if (!findCourse) throw new HttpException(409, "Course doesn't exist");

    return findCourse;
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
