import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import parse from "html-react-parser";
import { Note } from "../data/Note";
import { parseListFromStorage, saveListToStorage } from "../utils";

const onNoteDelete = (note: Note) => {
  const savedData = parseListFromStorage();
  const index = savedData.map((item: any) => item.id).indexOf(note.id);
  savedData.splice(index, 1);
  saveListToStorage(savedData);
  alert("Catatan berhasil dihapus");
};

const onNoteArchive = (note: Note) => {
  const savedData = parseListFromStorage();
  const index = savedData.map((item: any) => item.id).indexOf(note.id);
  savedData[index].archived = !savedData[index].archived;
  saveListToStorage(savedData);
  alert("Catatan berhasil dipindahkan");
};

const getData = (id: number) => {
  const savedList = parseListFromStorage();
  const result = savedList.filter((note) => note.id === id)[0];
  return result;
};

export default function DetailNote() {
  const { id } = useParams();
  const navigate = useNavigate();
  const noteData = getData(Number(id));
  const home = "/notes-react";

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
              onNoteArchive(noteData);
              if (!noteData.archived) navigate(home);
              else navigate(`${home}/archive`);
            }}
          >
            {noteData.archived ? "Batalkan arsip" : "Arsipkan"}
          </button>
          <button
            className="red"
            onClick={(e) => {
              e.stopPropagation();
              onNoteDelete(noteData);
              navigate(home);
            }}
          >
            Hapus
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigate(home);
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
