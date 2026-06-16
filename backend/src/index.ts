import express from "express";
import cors from "cors";

import userRoute from "./routes/userRoute.js";
import artikelRoute from "./routes/artikelRoute.js";
import jadwalRoute from "./routes/jadwalRoute.js";

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
res.send("Ini adalah API untuk PPM Syubbanul Khoir");
});

app.use("/users", userRoute);
app.use("/artikel", artikelRoute);
app.use("/jadwal", jadwalRoute);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});