import mysql from 'mysql2';
import dotenv from 'dotenv';
import { generateHash } from './token.js';
dotenv.config();
//////////////creats connection to the database//////////////////////
 export const pool = mysql.createConnection({
    host: process.env.host,
    user: process.env.user,
    password: process.env.password,
    database: process.env.database,
    port: process.env.sql_port
}).promise();
//gets all the student///////////////////////////
export async function getStudents(){ 
    const [rows] = await pool.query('SELECT * FROM newStudents');
    return rows

}
/////////get a particular student by its ID////////////////////
export async function getStudent(id) {
    const [student] = await pool.query(
        'select * from newStudents where studentId = ?', [id]
    );
    return student
    
}
////////////////create new row in table newStudents/////////////////////
export async function createEntry(firstName, lastName, age, stream, school) {
    const createStudent = await pool.query(
      `INSERT INTO newStudents(firstName, lastName, Age, stream, school) 
      VALUES (?,?,?,?,?)`, [firstName, lastName, age, stream, school]
    );
    return createStudent;
  }
////////////////////updates the row in the table newStudent/////////////////////
export async function updateStudent(id, stream, school) {
    const [result] = await pool.query(
        `UPDATE newStudents 
         SET stream = ?, school = ? 
         WHERE studentId = ?`, 
        [stream, school, id]
    );

    return result;
}
//////////////////////Deletes a row in the table newStudent by specified studentId//////////////////
export async function deleteStudent(id) {
    const [result] = await pool.query(
        `DELETE FROM newStudents 
        WHERE studentId =?`, [id]
    )
    return result;
}
///////////////create new admin user and hashed password in the table users for auth////////////////
export async function createUser(username, password) {
    try {
        const newPassword = await generateHash(password);
        
        const newUser = await pool.query( `INSERT INTO users (userName, password)
        VALUES (?,?)`, [username, newPassword]);

        return newUser;
    } catch (err) {
        console.error(err);
    }
}
/////////////////gets the user from the table usrers by specified username////////////
export async function getUser(username){
    const [user] = await pool.query(`
        SELECT * FROM users WHERE userName = ?
        `, [username]);
        return user;
}
