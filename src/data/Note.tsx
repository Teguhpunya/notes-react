export type Note = {
  id: number;
  title: string;
  body: string;
  createdAt: string;
  archived: boolean;
};
export type NoteActionEvents = {
  archiveNote: any;
  deleteNote: any;
};
