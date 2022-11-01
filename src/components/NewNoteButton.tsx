import React from "react";
import { Link } from "react-router-dom";
import { BsPlusLg } from "react-icons/bs";
import { LangConsumer } from "../contexts/LangContext";

const home = "/notes-react";

export default function NewNoteButton() {
  return (
    <LangConsumer>
      {({ langData }) => {
        return (
          <div className="button-new-note">
            <Link to={`${home}/new`}>
              <button>
                <BsPlusLg /> <br />
                {langData.button.add}
              </button>
            </Link>
          </div>
        );
      }}
    </LangConsumer>
  );
}
