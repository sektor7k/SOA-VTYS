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

        return { success: true, message: 'Ürün eklendi' }
    }
    catch(err){
        return { success: false, message: 'urunEkle failed' }
    }
}


export async function siparisEkle(urunAdi, urunAdedi){
    try{
        // const responseDb = await pool.query(`INSERT INTO siparis (MusteriID, ToplamTutar)
        // VALUES (?, ?)`, [1, 200]);


        const responseDb2 = await pool.query(`INSERT INTO siparisdetay (SiparisID, UrunID, Miktar)
        VALUES (?, ?, ?)`, [5,21, 47]);

        return { success: true, message: 'Sipariş Alındı' }
    }
    catch(err){
        return { success: false, message: 'siparisEkle failed' }
    }
}