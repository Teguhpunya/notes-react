export type Note = {
  id: number;
  title: string;
  body: string;
  createdAt: string;
  archived: boolean;
};
export type NoteActionEvents = {
  archiveNote: (noteId: number) => void;
  deleteNote: (noteId: number) => void;
  onClickNote: (state: { display: string; contents: Note }) => void;
};
