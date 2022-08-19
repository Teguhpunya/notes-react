import React, { Component } from "react";
import { Note } from "../data/Note";
import { getInitialData } from "../utils";
import ListNotes from "./ListNotes";
import NewNote from "./NewNote";

export type State = { notes: Note[] };

const parseListFromStorage = () => {
  const storage = localStorage.getItem("notes");
  if (storage) {
    return JSON.parse(storage);
  }
  return [];
};

export default class Main extends Component<{}, State> {
  constructor(props: {}) {
    super(props);

    const savedList = parseListFromStorage();
    this.state = {
      notes: savedList.length > 0 ? savedList : getInitialData(),
    };
    this.eventSubmitNewNote = this.eventSubmitNewNote.bind(this);
  }

  eventSubmitNewNote = (newList: Note[]) => {
    this.setState(
      () => {
        localStorage.setItem("notes", JSON.stringify(newList));
        return {
          notes: newList,
        };
      },
      () => alert("Note added")
    );
  };

  render() {
    return (
      <main>
        <NewNote currentState={this.state} onSubmit={this.eventSubmitNewNote} />
        <ListNotes notes={this.state.notes} />
      </main>
    );
  }
}
