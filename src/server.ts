import express from "express";
import { router } from "./presentation/routes/router";

const app = express();

app.use(express.json());

app.use(router);

app.listen(8080, () => console.log("server on"));
