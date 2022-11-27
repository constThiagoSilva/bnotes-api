import { DatabaseSpy } from "../DatabaseSpy"

export const instanceDatabaseSpy = () => {
    const databaseSpy = new DatabaseSpy()

    return databaseSpy
}