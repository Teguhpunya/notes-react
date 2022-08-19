import React, { Component } from "react";
import { Note } from "../data/Note";
import {
  getInitialData,
  parseListFromStorage,
  saveListToStorage,
} from "../utils";
import ListNotes from "./ListNotes";
import NewNote from "./NewNote";

export type State = { notes: Note[] };

export default class Main extends Component<{}, State> {
  constructor(props: {}) {
    super(props);

    const savedList = parseListFromStorage();
    this.state = {
      notes: savedList.length > 0 ? savedList : getInitialData(),
    };
    if (savedList.length < 1) saveListToStorage(this.state.notes);
    this.eventSubmitNewNote = this.eventSubmitNewNote.bind(this);
  }

  eventSubmitNewNote = (newList: Note[]) => {
    this.setState(
      () => {
        saveListToStorage(newList);
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
