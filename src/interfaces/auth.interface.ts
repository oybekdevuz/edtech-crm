import { Request } from 'express';
import { IAdmin } from '@/interfaces/admins.interface';

export interface DataStoredInToken {
  id: string;
}

export interface TokenData {
  token: string;
  expiresIn: number;
}

export interface RequestWithAdmin extends Request {
  user: IAdmin;
}
