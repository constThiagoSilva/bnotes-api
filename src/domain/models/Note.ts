export interface Note {
    id: string;
    author: string;
    title: string;
    content: string;
    createAt: Date;
    updateAt: Date | null
  }