import { IError } from "../../helpers/errors/saveNotesUseCaseError/interfaces/IError"
import { ProvidedParamsError } from "../../helpers/errors/saveNotesUseCaseError/ProviedParamsError"
import { Note } from "../../models/Note"
import { DatabaseSpy } from "../mocks/repository/DatabaseSpy"

export class ChangeStatusNotesToTrash implements ChangeStatusNotesToTrash{
    async changeStatusToTrash(noteId: string): Promise<{trashedNote: Note | null, error: IError | null}> {
        if (!noteId) {
            return {
                error: {
                    code: 500,
                    message: new ProvidedParamsError('noteId')
                },
                trashedNote: null
            }
        }

        const trashedNote = await new DatabaseSpy().changeStatusToTrash(noteId)

        return {
            trashedNote,
            error: null,
        }
    }
}