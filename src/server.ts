import express, { Router } from "express";
import { DatabaseSpy } from "./domain/repositories/mocks/repository/DatabaseSpy";
import { SaveNotesRepository } from "./domain/repositories/saveNotesRepository/SaveNotesRepository";
import { UpdateNotesRepository } from "./domain/repositories/updateNotesRepository/UpdateNotesRepository";
import { SaveNotesUseCase } from "./domain/usecases/saveNotesUseCase/SaveNotesUseCase";
import { instanceSaveNotesController } from "./presentation/controllers/saveNotesController/helper/instanceSaveNotesController";
import { SaveNotesController } from "./presentation/controllers/saveNotesController/SaveNotesController";

const app = express();
const router = Router();
const databaseSpy = new DatabaseSpy();

app.use(express.json());

router.get("/", (request, response) => response.send("ola"));
router.post("/notes/save", async (request, response) => {
  const result = await instanceSaveNotesController().route(request)

  return response.status(result.code).json(result.response)
});

app.use(router);

app.listen(8080, () => console.log("server on"));
