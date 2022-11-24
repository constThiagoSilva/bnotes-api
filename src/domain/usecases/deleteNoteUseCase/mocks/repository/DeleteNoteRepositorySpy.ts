import { Note } from "../../../../models/Note";
import { DeleteNoteRepository } from "./interfaces/DeleteNotesRepository";

export class DeleteNoteRepositorySpy implements DeleteNoteRepository {
  async delete(id: string): Promise<Note | null> {



    return {
      author: "any_author",
      content: "any_content",
      id: "1",
      title: "any_title",
      status: "Trash",
      updateAt: new Date("2022-10-31"),
      createAt: new Date("2022-10-31"),
    };
  }
}
