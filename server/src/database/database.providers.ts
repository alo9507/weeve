import { DatabaseRepository } from './database.repository';
import { DatabaseService } from './database.service';
import { Discussion } from '../models/discussion';

/**
 * Initialize the database and the separate collections.
 */
const initializeDatabase = async () => {

  const discussionRepository = new DatabaseRepository<Discussion>(
    { filename: `.configx/discussionDb` },
  );

  return {
    discussions: discussionRepository
  };
};

/**
 * Initialize database lock. Used in order to provide a singleton connection to the database.
 */
let initializeDatabasePromise;


export const databaseServiceProvider = {
  provide: DatabaseService,
  useFactory: async (): Promise<DatabaseService> => {

    if (!initializeDatabasePromise) {
      initializeDatabasePromise = initializeDatabase();
    }

    return initializeDatabasePromise;
  },
};
