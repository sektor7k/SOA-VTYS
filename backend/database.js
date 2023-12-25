import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config()

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise()

export async function urunEkle(urunAdi, urunFiyati, stokMiktari) {
    try {
        const responseDb = await pool.query(`INSERT INTO urun (UrunAdi, Fiyat, StokMiktari)
        VALUES (?, ?, ?)`, [urunAdi, urunFiyati, stokMiktari]);

        return { success: true, message: 'Ürün eklendi' }
    }
    catch (err) {
        return { success: false, message: 'urunEkle failed' }
    }
}


export async function siparisEkle(urunID, urunAdedi) {
    try {

        const resgetUrunID = await getUrunID(urunID);
        const fiyat = resgetUrunID[0][0].Fiyat

        const responseDb = await pool.query(`INSERT INTO siparis (MusteriID, ToplamTutar, UrunID, Miktar)
        VALUES (?, ?, ?, ?)`, [1, fiyat * urunAdedi, urunID, urunAdedi]);

        return { success: true, message: 'Sipariş Alındı' }
    }
    catch (err) {
        return { success: false, message: 'siparisEkle failed' }
    }
}

export async function getUrun() {
    try {
        const responseDb = await pool.query('SELECT * FROM urun')
        return responseDb
    }
    catch (err) {
        return { success: false, message: 'getUrun failed' }
    }
}

export async function getUrunID(urunID) {
    try {
        const responseDb = await pool.query('SELECT * FROM urun WHERE UrunID = ?', [urunID])
        return responseDb
    }
    catch (err) {
        return { success: false, message: 'getUrunID failed' }
    }
}

export async function getSiparisler() {
    try {
        const [responseDb] = await pool.query('SELECT * FROM siparis')

        const siparisWithName = await Promise.all(
            responseDb.map(async (siparis) => {
                const musteriAdi = await getMusteri(siparis.MusteriID);
                const urunID = await getUrunID(siparis.UrunID);
                const urunAdi = urunID[0][0].UrunAdi
                return { ...siparis, musteriAdi: musteriAdi, urunAdi: urunAdi };
            })
        );
        return siparisWithName


    }
    catch (err) {
        return { success: false, message: 'getSiparisler failed' }
    }
}


export async function getMusteri(musteriID) {
    try {
        const responseDb = await pool.query('SELECT * FROM musteri WHERE MusteriID = ?', [musteriID])
        return responseDb[0][0].MusteriAdi
    }
    catch (err) {
        return { success: false, message: 'getMusteri failed' }
    }
}

export async function tedarikciID(tedarikciID) {
    try {

        const responseDb = await pool.query('SELECT * FROM tedarikci WHERE TedarikciID = ?', [tedarikciID])
        return responseDb[0][0].TedarikciAdi
    }
    catch (err) {
        return { success: false, message: 'tedarikciAdi failed' }
    }
}

export async function getStokGiris() {
    try {
        const [responseDb] = await pool.query('SELECT * FROM stokgiris')

        const stokGirisWithName = await Promise.all(
            responseDb.map(async (stok) => {
                const tedarikciAdi = await tedarikciID(stok.TedarikciID);
                const urunID = await getUrunID(stok.UrunID);
                const urunAdi = urunID[0][0].UrunAdi
                return { ...stok, tedarikciAdi: tedarikciAdi, urunAdi: urunAdi };
            })
        );

        return stokGirisWithName

    }
    catch (err) {
        return { success: false, message: 'getStokGiris failed' }
    }
}

export async function getStokCikis() {
    try {
        const [responseDb] = await pool.query('SELECT * FROM stokcikis')

        const stokCikisWithName = await Promise.all(
            responseDb.map(async (stok) => {
                const urunID = await getUrunID(stok.UrunID);
                const urunAdi = urunID[0][0].UrunAdi;
                const musteriAdi = await getMusteriAdi(stok.SiparisID);
                return { ...stok, urunAdi: urunAdi, musteriAdi: musteriAdi };
            })
        );

        return stokCikisWithName
    }
    catch (err) {
        return { success: false, message: 'getStokGiris failed' }
    }
}

export async function getMusteriAdi(siparisID) {
    try {
        const responseDb = await pool.query('SELECT * FROM siparis WHERE SiparisID = ?', [siparisID])
        const musteriID = responseDb[0][0].MusteriID

        const responseDb2 = await getMusteri(musteriID)
        return responseDb2


    }
    catch (err) {
        return { success: false, message: 'getStokGiris failed' }
    }
}







