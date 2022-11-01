import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import parse from "html-react-parser";
import { Note } from "../data/Note";
import { getNote, deleteNote, archiveNote, unarchiveNote } from "../utils";
import LoadingSpinner from "./LoadingSpinner";
import { LangConsumer } from "../contexts/LangContext";

const onNoteDelete = async (note: Note, langData: any) => {
  const result = await deleteNote(note.id);
  if (result.error) {
    alert(langData.alertwindow.deleteError);
    return result;
  }
  alert(langData.alertwindow.deleteSuccess);
  return result;
};

const onNoteArchive = async (note: Note, langData: any) => {
  let result;
  if (note.archived) result = await unarchiveNote(note.id);
  else result = await archiveNote(note.id);
  if (result.error) {
    alert(langData.alertwindow.moveError);
    return result;
  }
  alert(langData.alertwindow.moveSuccess);
  return result;
};

export default function DetailNote() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [noteData, setNoteData] = useState<Note>();
  const home = "/notes-react";

  const [isLoading, setIsLoading] = React.useState(false);

  useEffect(() => {
    setIsLoading(true);
    async function getData(id: string) {
      const note: Note = (await getNote(id)).data;
      setNoteData(note);
    }
    if (id) getData(id).then(() => setIsLoading(false));
  }, [id]);

  if (!isLoading) {
    if (noteData) {
      const title = noteData.title;
      const createdAt = noteData.createdAt;
      const body = parse(noteData.body);
      return (
        <LangConsumer>
          {({ langData }) => {
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
                      onNoteArchive(noteData, langData).then((result) => {
                        if (result.error) return;
                        if (!noteData.archived) navigate(home);
                        else navigate(`${home}/archive`);
                      });
                    }}
                  >
                    {noteData.archived
                      ? langData.button.unarchive
                      : langData.button.archive}
                  </button>
                  <button
                    className="red"
                    onClick={(e) => {
                      e.stopPropagation();
                      onNoteDelete(noteData, langData).then((result) => {
                        if (result.error) return;
                        navigate(home);
                      });
                    }}
                  >
                    {langData.button.delete}
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (noteData.archived) navigate(`${home}/archive`);
                      else navigate(home);
                    }}
                  >
                    {langData.button.back}
                  </button>
                </div>
              </div>
            );
          }}
        </LangConsumer>
      );
    } else
      return (
        <LangConsumer>
          {({ langData }) => {
            return (
              <div className="container-detail card">
                <div className="div-empty">{langData.card.noResult}</div>
              </div>
            );
          }}
        </LangConsumer>
      );
  } else
    return (
      <LangConsumer>
        {({ langData }) => {
          return (
            <div className="container-detail card">
              <LoadingSpinner />
              <div>{langData.card.loading}</div>
            </div>
          );
        }}
      </LangConsumer>
    );
}
