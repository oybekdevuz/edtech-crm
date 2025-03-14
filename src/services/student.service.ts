import { EntityRepository, Repository } from 'typeorm';
import { Service } from 'typedi';
import { HttpException } from '@/exceptions/httpException';
import { Istudent } from '../interfaces/students.interface';
import { StudentEntity } from '../entities/students.entity';

@Service()
@EntityRepository()
export class StudentService extends Repository<StudentEntity> {
  public async findAll(): Promise<Istudent[]> {
    const users: Istudent[] = await StudentEntity.find();
    return users;
  }

  public async findById(userId: string): Promise<Istudent> {
    const findStudent: Istudent = await StudentEntity.findOne({ where: { id: userId } });
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
