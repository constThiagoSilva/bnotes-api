import { Router } from "express";
import { notesRouter } from "./Notes/notesRouter";

const router = Router()

router.use(notesRouter)

export {router}