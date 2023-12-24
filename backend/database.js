import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config()

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE
}).promise()

export async function urunEkle(urunAdi, urunFiyati, stokMiktari){
    try{
        const responseDb = await pool.query(`INSERT INTO urun (UrunAdi, Fiyat, StokMiktari)
        VALUES (?, ?, ?)`, [urunAdi, urunFiyati, stokMiktari]);
        
    }
    catch(err){
        console.log("Error : "+ err)
    }
}