import { Request } from 'express';
import { Admin } from '@interfaces/users.interface';

export interface DataStoredInToken {
  id: string;
}

export interface TokenData {
  token: string;
  expiresIn: number;
}

export interface RequestWithAdmin extends Request {
  user: Admin;
}
