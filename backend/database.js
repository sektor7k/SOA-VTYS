import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config()

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE
}).promise()

export async function getMusteri(){
    try{
        const resultDb = await pool.query('SELECT * FROM tedarikci');
        console.log(resultDb[0][0].IletisimBilgisi)
    }
    catch(err){
        console.log("Error : "+ err)
    }
}