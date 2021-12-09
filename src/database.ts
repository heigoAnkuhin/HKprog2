import mysql from 'mysql2';
import path from 'path';
import fs from 'fs';
import config from './config';

const yhendus = mysql.createPool({
    host: config.db.host,
    user: config.db.user,
    password: config.db.password,
    database: config.db.database,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    multipleStatements: true,
  }).promise();
  
  export default yhendus;