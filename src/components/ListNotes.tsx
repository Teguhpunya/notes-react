import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Note } from "../data/Note";
import parse from "html-react-parser";

const home = "/notes-react";

/* Components */
const RenderNote = (props: { note: Note }) => {
  const title = props.note.title;
  const body = parse(props.note.body);
  const createdAt = props.note.createdAt;
  return (
    <Link to={`${home}/detail/${props.note.id}`}>
      <div className="item-note card">
        <h3>{title}</h3>
        <p>{body}</p>
        <div className="caption">{createdAt}</div>
      </div>
    </Link>
  );
};
const RenderNoteList = (filteredList: Note[], searchQuery: string) => {
  if (filteredList.length < 1)
    if (searchQuery)
      return (
        <div className="div-empty">
          Kata kunci {searchQuery} tidak ditemukan!
        </div>
      );
    else return <div className="div-empty">Tidak ada catatan!</div>;
  else
    return filteredList.map((item) => <RenderNote note={item} key={item.id} />);
};

/* Main */
type Props = {
  currentState: State;
};
type State = {
  notes: Note[];
  searchQuery: string;
};

export const DefaultList = (props: Props) => {
  const currentState = props.currentState;
  const initialNotes = currentState.notes;
  const search = currentState.searchQuery;
  const defaultNotes = initialNotes.filter((note) => !note.archived);

  return (
    <div className="container-notes">
      <div className="list-default">
        <h2 className="card">Catatanku</h2>
        <div className="list-background card">
          <div className="list-note">
            {RenderNoteList(defaultNotes, search)}
          </div>
        </div>
      </div>
    </div>
  );
};

export const ArchivedList = (props: Props) => {
  const currentState = props.currentState;
  const search = currentState.searchQuery;
  const initialNotes = currentState.notes;
  const archivedNotes = initialNotes.filter((note) => note.archived);

  return (
    <div className="container-notes">
      <div className="list-default">
        <h2 className="card">Arsip</h2>
        <div className="list-background card">
          <div className="list-note">
            {RenderNoteList(archivedNotes, search)}
          </div>
        </div>
      </div>
    </div>
  );
};

DefaultList.propTypes = {
  currentState: PropTypes.object.isRequired,
};
ArchivedList.propTypes = {
  currentState: PropTypes.object.isRequired,
};
