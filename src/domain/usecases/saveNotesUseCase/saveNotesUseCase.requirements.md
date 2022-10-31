[x] save notes with no validation

[x] save note if note is provided with correctly parameters: {
    author: string,
    title: string | '',
    content: string
}
[x] return note with: {
    author: string,
    title: string | '',
    content: string
    createAt: Date
}
[x] return error 500 if not these parameter are not provided
[x] if exists a note, just update