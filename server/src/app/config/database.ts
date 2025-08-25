import { neon } from '@neondatabase/serverless';
import type { NeonQueryFunction } from '@neondatabase/serverless';
import config from './index.js';

class DatabaseConfig {
  private static instance: DatabaseConfig;
  private sql: NeonQueryFunction<false, false>;
  private constructor() {
    if (!config.database_url) {
      throw new Error(
        'DATABASE_URL is not defined in the environment variables',
      );
    }
    this.sql = neon(`${config.database_url}`);
  }
  static getInstance(): DatabaseConfig {
    if (!DatabaseConfig.instance) {
      DatabaseConfig.instance = new DatabaseConfig();
    }
    return DatabaseConfig.instance;
  }
  getConnection(): NeonQueryFunction<false, false> {
    return this.sql;
  }
  async testConnection(): Promise<{
    success: boolean;
    version?: string;
    error?: string;
    timestamp?: string;
    latency?: number;
  }> {
    const startTime = Date.now();
    try {
      console.log('Testing Database connection');
      const response = await this
        .sql`SELECT version() as db_version,now() as current_time,current_database() as database_name`;
      const latency = Date.now() - startTime;
      const { db_version, current_time, database_name } = response[0] as {
        db_version: string;
        current_time: string;
        database_name: string;
      };
      console.log('Database connection successful!');
      console.log(`Connected to: ${database_name}`);
      console.log(`Response time: ${latency}ms`);
      return {
        success: true,
        version: db_version,
        timestamp: current_time,
        latency,
      };
    } catch (error) {
      const latency = Date.now() - startTime;
      console.log(`Database connection failed!`);
      console.log(`Response time: ${latency}ms`);
      return {
        success: false,
        error:
          error instanceof Error ? error.message : 'Database connection failed',
        latency,
      };
    }
  }
}
export const db = DatabaseConfig.getInstance().getConnection();
export default DatabaseConfig;
