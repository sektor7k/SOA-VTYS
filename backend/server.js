import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import {getMusteri} from "./database.js"
const app = express();
const port = 3030;

app.use(cookieParser());
app.use(express.json());

// CORS ayarları
// app.use(cors({
//   origin: 'http://localhost:3000', // İstemcinin kökeni
//   credentials: true // Kimlik bilgilerine izin ver
// }));

app.get("/", (req, res) => {
    
    getMusteri();


});






app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});


export default app;