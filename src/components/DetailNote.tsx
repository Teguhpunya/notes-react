import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import parse from "html-react-parser";
import { Note } from "../data/Note";
import { getNote, deleteNote, archiveNote, unarchiveNote } from "../utils";

const onNoteDelete = async (note: Note) => {
  const result = await deleteNote(note.id);
  if (result.error) {
    alert("Catatan gagal dihapus");
    return result;
  }
  alert("Catatan berhasil dihapus");
  return result;
};

const onNoteArchive = async (note: Note) => {
  let result;
  if (note.archived) result = await unarchiveNote(note.id);
  else result = await archiveNote(note.id);
  if (result.error) {
    alert("Catatan gagal dipindahkan");
    return result;
  }
  alert("Catatan berhasil dipindahkan");
  return result;
};

export default function DetailNote() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [noteData, setNoteData] = useState<Note>();
  const home = "/notes-react";

  useEffect(() => {
    async function getData(id: string) {
      const note: Note = (await getNote(id)).data;
      setNoteData(note);
    }
    if (id) getData(id);
  }, []);

  if (noteData) {
    const title = noteData.title;
    const createdAt = noteData.createdAt;
    const body = parse(noteData.body);
    return (
      <div className="container-detail card">
        <div>
          <h3>{title}</h3>
          <div className="caption">{createdAt}</div>
        </div>
        <p>{body}</p>
        <div className="item-actions">
          <button
            className="green"
            onClick={(e) => {
              e.stopPropagation();
              onNoteArchive(noteData).then((result) => {
                if (result.error) return;
                if (!noteData.archived) navigate(home);
                else navigate(`${home}/archive`);
              });
            }}
          >
            {noteData.archived ? "Batalkan arsip" : "Arsipkan"}
          </button>
          <button
            className="red"
            onClick={(e) => {
              e.stopPropagation();
              onNoteDelete(noteData).then((result) => {
                if (result.error) return;
                navigate(home);
              });
            }}
          >
            Hapus
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (noteData.archived) navigate(`${home}/archive`);
              else navigate(home);
            }}
          >
            Kembali
          </button>
        </div>
      </div>
    );
  } else
    return (
      <div className="container-detail card">
        <div className="div-empty">Catatan tidak ditemukan!</div>
      </div>
    );
}
