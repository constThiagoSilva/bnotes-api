import { Note } from "../../../../models/Note";
import { GetAllNotesRepository } from "../interfaces/GetAllNotesRepository";

export class GetAllNotesRepositorySpy implements GetAllNotesRepository {
  private notes: Note[] = [
    {
      author: "any_author",
      id: "1",
      title: "any_title",
      content: "any_content",
      createAt: new Date("2022-10-31"),
      updateAt: new Date("2022-10-31"),
    },
    {
      author: "any_author",
      id: "2",
      title: "any_title",
      content: "any_content",
      createAt: new Date("2022-10-31"),
      updateAt: new Date("2022-10-31"),
    },
  ];
  async getAll(author: string): Promise<Note[] | null> {
    const isTheAuthorHaveNotes = this.notes.find(
      (note) => note.author === author
    );

    if (!isTheAuthorHaveNotes) {
      return null;
    }

    const notes: Note[] = this.notes.filter((note) => note.author === author);

    return notes;
  }
}
