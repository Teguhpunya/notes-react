import React, { useState } from "react";
import { parseListFromStorage, showFormattedDate } from "../utils";

/* Methods */
const submitNewNote = (
  noteTitle: string,
  noteBody: string,
  currentState: any,
  setNewState: any
) => {
  const currentTime = +new Date();
  const newNote = {
    id: currentTime,
    title: noteTitle,
    body: noteBody,
    archived: false,
    createdAt: showFormattedDate(currentTime),
  };
  const newList = parseListFromStorage();
  newList.push(newNote);
  setNewState(newList);
};

const eventSubmitNewNote = (
  e: any,
  noteTitle: string,
  noteBody: string,
  currentState: any,
  setNewState: any
) => {
  e.preventDefault();
  submitNewNote(noteTitle, noteBody, currentState, setNewState);
};

/* Components */
// const TextRemaining = (props: {
//   inputText: string;
//   maxChar: number;
// }) => {
//   const _maxChar = props.maxChar;
//   return (
//     <div className="char-remaining">
//       Sisa karakter: {_maxChar - props.inputText.length}
//     </div>
//   );
// };
const TextRemaining = React.forwardRef(
  (props: { maxChar: number; inputText: string }, ref: any) => {
    const _maxChar = props.maxChar;
    return (
      <div ref={ref} className="char-remaining">
        Sisa karakter: {_maxChar - props.inputText.length}
      </div>
    );
  }
);
/* Main */
const NewNote = (props: { currentState: any; onSubmit: any }) => {
  const [currentState] = useState(props.currentState);
  const [noteTitle, setNoteTitle] = useState("");
  const [noteBody, setnoteBody] = useState("");
  const maxTitleChars = 50;
  const refCharRemain = React.createRef<HTMLDivElement>();

  return (
    <div className="container-newnote card">
      <h2>Catatan baru</h2>
      <form
        onSubmit={(e) => {
          eventSubmitNewNote(
            e,
            noteTitle,
            noteBody,
            currentState,
            props.onSubmit
          );
          alert("Catatan berhasil disimpan");
        }}
      >
        <input
          type="text"
          id="add-note-title"
          placeholder="Judul catatan"
          onChange={(e) => {
            if (e.target.value.length > maxTitleChars) {
              alert("Maksimal judul catatan 50 karakter");
              return;
            }
            setNoteTitle(e.target.value);
          }}
          onFocus={() => {
            if (refCharRemain.current) {
              refCharRemain.current.style.display = "block";
            }
          }}
          onBlur={() => {
            if (refCharRemain.current) {
              refCharRemain.current.style.display = "none";
            }
          }}
          value={noteTitle}
          required
        />
        <TextRemaining
          ref={refCharRemain}
          inputText={noteTitle}
          maxChar={maxTitleChars}
        />
        <textarea
          name=""
          id="add-note-content"
          placeholder="Isi catatan"
          onChange={(e) => {
            setnoteBody(e.target.value);
          }}
          value={noteBody}
          required
        />
        <button id="btn-create" type="submit">
          Buat
        </button>
      </form>
    </div>
  );
};

export default NewNote;
