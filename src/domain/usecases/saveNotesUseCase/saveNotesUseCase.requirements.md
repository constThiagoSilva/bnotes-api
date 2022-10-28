[x] save notes with no validation

[] save note if note is provided with correctly parameters: {
    author: string,
    title: string | '',
    content: string
}
[] return note with: {
    author: string,
    title: string | '',
    content: string
    createAt: Date
}
[] return error 500 if not these parameter are not provided