import React from "react";
import { Note, NoteActionEvents } from "../data/Note";

const RenderNoteContents = (props: {
  note: Note;
  actionEvents: NoteActionEvents;
}) => {
  const _id = props.note.id;
  return (
    <div
      className="container-fixed-content card"
      onClick={(e) => e.stopPropagation()}
    >
      <div>
        <h3>{props.note.title}</h3>
        <div className="caption">{props.note.createdAt}</div>
        <p>{props.note.body}</p>
      </div>
      <div className="item-actions">
        <button
          className="green"
          onClick={(e) => {
            e.stopPropagation();
            props.actionEvents.archiveNote(_id);
            props.actionEvents.onClickNote({
              display: "none",
              contents: props.note,
            });
          }}
        >
          {props.note.archived ? "Batalkan arsip" : "Arsipkan"}
        </button>
        <button
          className="red"
          onClick={(e) => {
            e.stopPropagation();
            props.actionEvents.deleteNote(_id);
            props.actionEvents.onClickNote({
              display: "none",
              contents: props.note,
            });
          }}
        >
          Hapus
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            props.actionEvents.onClickNote({
              display: "none",
              contents: props.note,
            });
          }}
        >
          Tutup
        </button>
      </div>
    </div>
  );
};

type Props = {
  contents: Note;
  displayState: string;
  actionEvents: NoteActionEvents;
};

const FixedContainer = (props: Props) => {
  return (
    <div
      className="container-fixed"
      style={{ display: props.displayState }}
      onClick={() =>
        props.actionEvents.onClickNote({
          display: "none",
          contents: props.contents,
        })
      }
    >
      <RenderNoteContents
        note={props.contents}
        actionEvents={props.actionEvents}
      />
    </div>
  );
};

export default FixedContainer;
