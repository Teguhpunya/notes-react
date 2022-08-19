import React, { Component } from "react";
import { Note } from "../data/Note";
import {
  getInitialData,
  parseListFromStorage,
  saveListToStorage,
} from "../utils";
import ListNotes from "./ListNotes";
import NewNote from "./NewNote";

type State = { notes: Note[]; searchQuery: string };

export default class Main extends Component<{}, State> {
  constructor(props: {}) {
    super(props);

    const savedList = parseListFromStorage();
    this.state = {
      notes: savedList.length > 0 ? savedList : getInitialData(),
      searchQuery: "",
    };
    if (savedList.length < 1) saveListToStorage(this.state.notes);
    this.eventSubmitNewNote = this.eventSubmitNewNote.bind(this);
    this.eventOnSearchNote = this.eventOnSearchNote.bind(this);
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
  eventOnSearchNote = (input: string) => {
    this.setState(() => {
      return { searchQuery: input };
    });
    const originList = parseListFromStorage();
    const _input = input.toLowerCase();
    const result = originList.filter(
      (note) =>
        note.title.toLowerCase().includes(_input) ||
        note.body.toLowerCase().includes(_input)
    );
    this.setState(() => {
      return { notes: result };
    });
  };

  render() {
    return (
      <>
        <div className="container-search">
          <input
            type="text"
            id="input-search"
            placeholder="Cari catatan.."
            onChange={(e) => {
              this.eventOnSearchNote(e.target.value);
            }}
            value={this.state.searchQuery}
          />
        </div>
        <main>
          <NewNote
            currentState={this.state}
            onSubmit={this.eventSubmitNewNote}
          />
          <ListNotes notes={this.state.notes} />
        </main>
      </>
    );
  }
}
