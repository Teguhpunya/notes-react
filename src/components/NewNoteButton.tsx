import React from "react";
import { Link } from "react-router-dom";
import { BsPlusLg } from "react-icons/bs";

const home = "/notes-react";

export default function NewNoteButton() {
  return (
    <div className="button-new-note">
      <Link to={`${home}/new`}>
        <button>
          <BsPlusLg /> <br />
          Note Baru
        </button>
      </Link>
    </div>
  );
}
