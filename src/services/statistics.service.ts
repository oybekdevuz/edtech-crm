import { EntityRepository, Repository } from 'typeorm';
import { Service } from 'typedi';
import { CourseEntity } from '../entities/courses.entity';
import { ICourses } from '../interfaces/courses.interface';
import { getRepository } from 'typeorm';

@Service()
@EntityRepository()
export class StatisticsService extends Repository<CourseEntity> {
  public async getStatistics(): Promise<ICourses[]> {
    // First get all courses with their student counts
    const coursesWithCounts = await getRepository(CourseEntity)
      .createQueryBuilder('course')
      .leftJoinAndSelect('course.studentCourses', 'studentCourse')
      .leftJoinAndSelect('studentCourse.student', 'student')
      .loadRelationCountAndMap('course.studentCount', 'course.studentCourses')
      .getMany();

    // Then sort them in memory by the calculated studentCount
    coursesWithCounts.sort((a, b) => {
      const countA = (a as any).studentCount || 0;
      const countB = (b as any).studentCount || 0;
      return countB - countA; // Descending order
    });

    return coursesWithCounts;
  }
}
