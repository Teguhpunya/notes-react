import React from "react";
import { Link } from "react-router-dom";

type Props = {};

const home = "/notes-react";

export default function NewNoteButton({}: Props) {
  return (
    <div className="button-new-note">
      <Link to={`${home}/new`}>
        <button>
          ➕ <br />
          Note Baru
        </button>
      </Link>
    </div>
  );
}
