import { Client } from 'pg';
import { env } from '../config/env.js';

const setup = async () => {
  const client = new Client({
    host: env.DB_HOST,
    port: env.DB_PORT,
    user: env.DB_USERNAME,
    password: env.DB_PASSWORD,
    database: 'postgres', // Connect to default DB
  });

  try {
    await client.connect();
    
    // Check if db exists
    const res = await client.query(`SELECT 1 FROM pg_database WHERE datname = '${env.DB_NAME}'`);
    
    if (res.rowCount === 0) {
      console.log(`Creating database ${env.DB_NAME}...`);
      await client.query(`CREATE DATABASE "${env.DB_NAME}"`);
      console.log(`✅ Database ${env.DB_NAME} created successfully`);
    } else {
      console.log(`ℹ️ Database ${env.DB_NAME} already exists`);
    }
  } catch (error) {
    console.error('❌ Database setup failed:', error);
    process.exit(1);
  } finally {
    await client.end();
  }
};

setup();
