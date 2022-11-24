import { IError } from "../../helpers/errors/saveNotesUseCaseError/interfaces/IError"
import { ProvidedParamsError } from "../../helpers/errors/saveNotesUseCaseError/ProviedParamsError"
import { Note } from "../../models/Note"
import { DatabaseSpy } from "../mocks/repository/DatabaseSpy"
import { IChangeStatusNotesToTrashRepository } from "./interfaces/IChangeStatusNotesToTrashRepository"

export class ChangeStatusNotesToTrashRepository implements IChangeStatusNotesToTrashRepository {
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

        if (!trashedNote) {
            return {
                error: {
                    code: 400,
                    message: new ProvidedParamsError('note not exists!')
                },
                trashedNote: null
            }
        }

        return {
            trashedNote,
            error: null,
        }
    }
}