import { Client } from "pg";

const client = new Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT) || 5432,
});

export const connectToDatabase = async () => {
  try {
    await client.connect();
    console.log('Connected to PostgreSQL database successfully!');
  } catch (error:any) {
    console.error('Database connection failed:', error.stack);
    process.exit(1); // Exit the application if connection fails
  }
};

export const executeQuery = async(query: string, params?: any[]) => {
  console.log(`sql command execution: ${query}, ${params? params : ''}`);  
  await client.query(query, params)
};

process.on('exit', () => {
  client.end(); // Close the database connection when the application exits
});
