import mysql from 'mysql2';
import dotenv from 'dotenv';
import colors from 'colors';

dotenv.config();

const conn = async () => {
  try {
    // Create the connection pool
    const pool = mysql.createPool({
      host: process.env.MY_SQL_HOST,
      user: process.env.MY_SQL_USERNAME,
      password: process.env.MY_SQL_PASSWORD,
      database: process.env.MY_SQL_DATABASE,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0
    }).promise();

    // Check if the connection works by getting a connection from the pool
    await pool.getConnection();
    console.log(colors.bold.yellow('Database is connected...'));

    return pool;
  } catch (error) {
    // Handle different types of MySQL errors
    if (error.code === 'ER_ACCESS_DENIED_ERROR') {
      console.error(colors.red('Invalid MySQL credentials. Please check your username and password.'));
    } else if (error.code === 'ER_BAD_DB_ERROR') {
      console.error(colors.red('Database does not exist. Please verify the database name.'));
    } else if (error.code === 'ECONNREFUSED') {
      console.error(colors.red('Connection refused. Check if your MySQL server is running.'));
    } else {
      // General error
      console.error(colors.red(`Error connecting to the database: ${error.message}`));
    }
    throw new Error(error.message);
  }
};

export default conn;