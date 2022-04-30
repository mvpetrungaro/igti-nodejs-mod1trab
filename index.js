import express from "express";
import marcas from "./marcas.js";

const app = express();
app.use(express.json());

app.use("/marcas", marcas);

app.listen(8080, () => {
    console.log("API started");
});