import { Router } from "express";
import { statusNoteToTrashControllert } from "../../controllers/changeStatusNotesToTrashController/helper/instanceChangeStatusNotesToTrashController";
import { getAllNotesController } from "../../controllers/getAllNotesController/helper/instanceGetAllNotesController";
import { saveNotesController } from "../../controllers/saveNotesController/helper/instanceSaveNotesController";

const notesRouter = Router();

notesRouter.get("/", (request, response) => response.send("ola"));
notesRouter.post("/notes/save", async (request, response) => {
  const result = await saveNotesController.route(request);

  return response.status(result.code).json(result.response);
});
notesRouter.put("/notes/save/:noteId", async (request, response) => {
  const result = await saveNotesController.route(request);

  return response.status(result.code).json(result.response);
});
notesRouter.get("/notes/all/:author", async (request, response) => {
  const result = await getAllNotesController.route(request);

  return response.status(result.code).json(result.response);
});
notesRouter.patch("/notes/trash/:noteId", async (request, response) => {
  const result = await statusNoteToTrashControllert.route(request);

  return response.status(result.code).json(result.response);
});

export { notesRouter };
