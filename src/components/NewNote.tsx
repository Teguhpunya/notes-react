import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addNote } from "../utils";

/* Methods */
const eventCreateNote = (e: any, noteTitle: string, noteBody: string) => {
  e.preventDefault();
  addNote({ title: noteTitle, body: noteBody });
};

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
const NewNote = () => {
  const [noteTitle, setNoteTitle] = useState("");
  const [noteBody, setNoteBody] = useState("");
  const maxTitleChars = 50;
  const refCharRemain = React.createRef<HTMLDivElement>();
  const navigate = useNavigate();
  const home = "/notes-react";

  return (
    <div className="container-newnote card">
      <h2>Catatan baru</h2>
      <form
        onSubmit={(e) => {
          eventCreateNote(e, noteTitle, noteBody);
          alert("Catatan berhasil disimpan");
          navigate(home);
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
        <div
          id="add-note-content"
          placeholder="Isi catatan"
          contentEditable
          onInput={(e) => {
            setNoteBody(e.currentTarget.innerHTML);
          }}
        ></div>
        <button id="btn-create" type="submit">
          Buat
        </button>
      </form>
    </div>
  );
};

export default NewNote;
