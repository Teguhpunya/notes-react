import React, { useReducer } from "react";
import { Note, NoteActionEvents } from "../data/Note";

const onNoteDelete = (list: Note[], noteId: any) => {
  const noteList = list;
  const index = noteList.map((item) => item.id).indexOf(noteId);
  list.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(noteList));
};
const onNoteArchive = (list: Note[], noteId: any) => {
  const noteList = list;
  const index = noteList.map((item) => item.id).indexOf(noteId);
  list[index].archived = !list[index].archived;
  localStorage.setItem("notes", JSON.stringify(noteList));
};

/* Components */
const RenderNote = (props: { note: Note; actionEvents: NoteActionEvents }) => {
  return (
    <div className="item-note card">
      <h3>{props.note.title}</h3>
      <p>{props.note.body}</p>
      <div className="item-actions">
        <button className="green" onClick={props.actionEvents.archiveNote}>
          {props.note.archived ? "Batalkan arsip" : "Arsipkan"}
        </button>
        <button className="red" onClick={props.actionEvents.deleteNote}>
          Hapus
        </button>
      </div>
      <div className="caption">{props.note.createdAt}</div>
    </div>
  );
};

const RenderNoteList = (
  initialList: Note[],
  filteredList: Note[],
  forceRender: any
) => {
  if (filteredList.length < 1) return <div className="div-empty">Kosong!</div>;
  else
    return filteredList.map((item) => (
      <RenderNote
        note={item}
        key={item.id}
        actionEvents={{
          archiveNote: () => {
            onNoteArchive(initialList, item.id);
            forceRender();
          },
          deleteNote: () => {
            onNoteDelete(initialList, item.id);
            forceRender();
          },
        }}
      />
    ));
};

/* Main */
const ListNotes = (props: { notes: Note[] }) => {
  const [, forceRender] = useReducer((x) => x + 1, 0);
  const initialNotes = props.notes;
  const defaultNotes = initialNotes.filter((note) => !note.archived);
  const archivedNotes = initialNotes.filter((note) => note.archived);

  return (
    <div className="container-notes">
      <div className="list-default">
        <h2>Catatanku</h2>
        <div className="list-background card">
          <div className="list-note">
            {RenderNoteList(initialNotes, defaultNotes, forceRender)}
          </div>
        </div>
      </div>
      <div className="list-default">
        <h2>Arsip</h2>
        <div className="list-background card">
          <div className="list-note">
            {RenderNoteList(initialNotes, archivedNotes, forceRender)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListNotes;
