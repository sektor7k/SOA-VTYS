import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { urunEkle, siparisEkle, getUrun } from "./database.js"
const app = express();
const port = 3030;

app.use(cookieParser());
app.use(express.json());

//CORS ayarları
app.use(cors({
  origin: 'http://localhost:3000', // İstemcinin kökeni
  credentials: true // Kimlik bilgilerine izin ver
}));

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

  const { urunAdi, urunAdedi } = req.body;

  try {
    const response = await siparisEkle(urunAdi, urunAdedi)
    console.log(response)
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






app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});


export default app;