import { DatabaseRepository } from './database.repository';
import { Discussion } from '../models/discussion';

export class DatabaseService {
  constructor(
    public discussions: DatabaseRepository<Discussion>,
  ) {
  }
}
