import { EntityRepository, Repository } from 'typeorm';
import { Service } from 'typedi';
import { HttpException } from '@/exceptions/httpException';
import { Istudent } from '../interfaces/students.interface';
import { StudentEntity } from '../entities/students.entity';
import { QueryDto } from '@/dtos/query.dto';

@Service()
@EntityRepository()
export class StudentService extends Repository<StudentEntity> {
  public async findAll(dto: QueryDto): Promise<{ data: Istudent[]; total: number }> {
    const { page = 1, page_size = 10, search } = dto;
    const queryBuilder = StudentEntity.createQueryBuilder('student');
    if (search) {
      queryBuilder.where('(student.first_name ILIKE :search OR student.last_name ILIKE :search OR student.phone_number ILIKE :search)', {
        search: `%${search}%`,
      });
    }
    const skip = (page - 1) * page_size;
    const total = await queryBuilder.getCount();
    const students = await queryBuilder.skip(skip).take(page_size).orderBy('student.created_at', 'DESC').getMany();

    return {
      data: students,
      total,
    };
  }

  public async findById(userId: string): Promise<StudentEntity> {
    const findStudent: StudentEntity = await StudentEntity.findOne({
      where: { id: userId },
      relations: ['studentCourses', 'studentCourses.course'],
    });
    if (!findStudent) throw new HttpException(409, "Student doesn't exist");

    return findStudent;
  }

  public async createData(dto: Istudent): Promise<Istudent> {
    const findStudent: Istudent = await StudentEntity.findOne({ where: { phone_number: dto.phone_number } });
    if (findStudent) throw new HttpException(409, `This phone_number ${dto.phone_number} already exists`);

    const createStudentData: Istudent = await StudentEntity.create(dto).save();

    return createStudentData;
  }

  public async updateData(userId: string, dto: Istudent): Promise<Istudent> {
    const findStudent: Istudent = await StudentEntity.findOne({ where: { id: userId } });
    if (!findStudent) throw new HttpException(409, "Student doesn't exist");
    await StudentEntity.update(userId, dto);

    const updateStudent: Istudent = await StudentEntity.findOne({ where: { id: userId } });
    return updateStudent;
  }

  public async deleteData(userId: string): Promise<Istudent> {
    const findStudent: Istudent = await StudentEntity.findOne({ where: { id: userId } });
    if (!findStudent) throw new HttpException(409, "Student doesn't exist");

    await StudentEntity.delete({ id: userId });
    return findStudent;
  }
}
