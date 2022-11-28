import express, { Router } from "express";
import { DatabaseSpy } from "./domain/repositories/mocks/repository/DatabaseSpy";
import { statusNoteToTrashControllert } from "./presentation/controllers/changeStatusNotesToTrashController/helper/instanceChangeStatusNotesToTrashController";
import { getAllNotesController } from "./presentation/controllers/getAllNotesController/helper/instanceGetAllNotesController";
import { saveNotesController } from "./presentation/controllers/saveNotesController/helper/instanceSaveNotesController";
import { router } from "./presentation/routes/router";

const app = express();

app.use(express.json());

router.get("/", (request, response) => response.send("ola"));
router.post("/notes/save", async (request, response) => {
  const result = await saveNotesController.route(request)

  return response.status(result.code).json(result.response)
});
router.put('/notes/save/:noteId', async (request, response) => {
  const result = await saveNotesController.route(request)

  return response.status(result.code).json(result.response)
})
router.get('/notes/all/:author', async (request, response) => {
  const result = await getAllNotesController.route(request)

  return response.status(result.code).json(result.response)
})
router.patch('/notes/trash/:noteId', async (request, response) => {
  const result = await statusNoteToTrashControllert.route(request)

  return response.status(result.code).json(result.response)
})

app.use(router);

app.listen(8080, () => console.log("server on"));
