import React, { Component } from "react";
import { Note } from "../data/Note";
import { getInitialData } from "../utils";
import ListNotes from "./ListNotes";
import NewNote from "./NewNote";

export type State = { notes: Note[] };

export default class Main extends Component<{}, State> {
  constructor(props: {}) {
    super(props);

    this.state = {
      notes: getInitialData(),
    };
    this.eventSubmitNewNote = this.eventSubmitNewNote.bind(this);
  }

  eventSubmitNewNote = (newList: Note[]) => {
    this.setState(
      () => {
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
