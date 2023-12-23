import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
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
    res.send('Hello guys');
});






app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});


export default app;