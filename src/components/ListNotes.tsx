import React from "react";
import { Note, NoteActionEvents } from "../data/Note";

/* Components */
const RenderNote = (props: { note: Note; actionEvents: NoteActionEvents }) => {
  return (
    <div
      className="item-note card"
      onClick={() => {
        props.actionEvents.onClickNote({
          display: "block",
          contents: props.note,
        });
      }}
    >
      <h3>{props.note.title}</h3>
      <p>{props.note.body}</p>

      <div className="caption">{props.note.createdAt}</div>
    </div>
  );
};
const RenderNoteList = (
  filteredList: Note[],
  actionEvents: NoteActionEvents
) => {
  if (filteredList.length < 1) return <div className="div-empty">Kosong!</div>;
  else
    return filteredList.map((item) => (
      <RenderNote
        note={item}
        key={item.id}
        actionEvents={{
          archiveNote: actionEvents.archiveNote,
          deleteNote: actionEvents.deleteNote,
          onClickNote: actionEvents.onClickNote,
        }}
      />
    ));
};

/* Main */
type Props = {
  currentState: State;
  noteActionEvents: NoteActionEvents;
};
type State = {
  notes: Note[];
  searchQuery: string;
  displayFixedContainer: string;
};

const ListNotes = (props: Props) => {
  const currentState = props.currentState;
  const actionEvents = props.noteActionEvents;
  const initialNotes = currentState.notes;
  const defaultNotes = initialNotes.filter((note) => !note.archived);
  const archivedNotes = initialNotes.filter((note) => note.archived);

  return (
    <div className="container-notes">
      <div className="list-default">
        <h2 className="card">Catatanku</h2>
        <div className="list-background card">
          <div className="list-note">
            {RenderNoteList(defaultNotes, actionEvents)}
          </div>
        </div>
      </div>
      <div className="list-default">
        <h2 className="card">Arsip</h2>
        <div className="list-background card">
          <div className="list-note">
            {RenderNoteList(archivedNotes, actionEvents)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListNotes;
