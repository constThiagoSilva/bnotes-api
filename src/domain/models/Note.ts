export interface Note {
    id: string;
    author: string;
    title: string;
    content: string;
    status: 'Active' | 'Trash'
    createAt: Date;
    updateAt: Date | null
  }