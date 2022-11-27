import express, { Router } from "express";
import { DatabaseSpy } from "./domain/repositories/mocks/repository/DatabaseSpy";
import { saveNotesController } from "./presentation/controllers/saveNotesController/helper/instanceSaveNotesController";

const app = express();
const router = Router();

app.use(express.json());

router.get("/", (request, response) => response.send("ola"));
router.post("/notes/save", async (request, response) => {
  const result = await saveNotesController.route(request)

  return response.status(result.code).json(result.response)
});

app.use(router);

app.listen(8080, () => console.log("server on"));
