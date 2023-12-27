import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import soap from 'soap';
import { readFileSync } from 'fs';
import { urunEkle, siparisEkle, getUrun, getSiparisler, getStokGiris, getStokCikis } from "./database.js"
import pool from './database.js'
const app = express();
const port = 3030;

app.use(cookieParser());
app.use(express.json());

//CORS ayarları
app.use(cors({
  origin: 'http://localhost:3000', // İstemcinin kökeni
  credentials: true // Kimlik bilgilerine izin ver
}));

const service = {
  MyService: {
    MyPort: {
      GetTedarikciler: async function () {
        try {
          const [rows] = await pool.query('SELECT * FROM tedarikci');
          return { tedarikciler: rows };
        } catch (error) {
          return { error: 'Veritabanı hatası' };
        }
      }
    }
  }
};


const xml = readFileSync('myservice.wsdl', 'utf8');

app.post("/urunekle", async (req, res) => {

  const { urunAdi, urunFiyati, stokMiktari } = req.body;

  try {
    const response = await urunEkle(urunAdi, urunFiyati, stokMiktari)
    console.log(response)
    return res.status(200).send({ success: response.success, message: response.message });

  } catch (err) {
    return res.status(500).send({ message: 'Server error', error: err });
  }
});


app.post("/siparisOlustur", async (req, res) => {

  const { urunID, urunAdedi } = req.body;

  try {
    const response = await siparisEkle(urunID, urunAdedi)

    return res.status(200).send({ success: response.success, message: response.message });

  } catch (err) {
    return res.status(500).send({ message: 'Server error', error: err });
  }
});

app.get("/urun", async (req, res) => {

  try {
    const urunler = await getUrun()

    return res.status(200).send(urunler[0])
  }
  catch (err) {
    return res.status(500).send({ message: 'Server error', error: err });
  }
});

app.get("/siparisler", async (req, res) => {

  try {
    const siparisler = await getSiparisler()


    return res.status(200).send(siparisler)
  }
  catch (err) {
    return res.status(500).send({ message: 'Server error', error: err });
  }
});

app.get("/stokgiris", async (req, res) => {

  try {

    const stokgiris = await getStokGiris()
    return res.status(200).send(stokgiris)

  }
  catch (err) {
    return res.status(200).send({ message: 'Server error', error: err })
  }
})

app.get("/stokcikis", async (req, res) => {

  try {

    const stokcikis = await getStokCikis()
    return res.status(200).send(stokcikis)

  }
  catch (err) {
    return res.status(200).send({ message: 'Server error', error: err })
  }
})





app.listen(port, () => {
  soap.listen(app, '/my-service', service, xml);
  console.log(`SOAP service listening on http://localhost:${port}/my-service?wsdl`);
});


export default app;