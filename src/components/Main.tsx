import React, { Component } from "react";
import { Note } from "../data/Note";
import {
  getInitialData,
  parseListFromStorage,
  saveListToStorage,
} from "../utils";
import FixedContainer from "./FixedContainer";
import ListNotes from "./ListNotes";
import NewNote from "./NewNote";

type State = {
  notes: Note[];
  searchQuery: string;
  displayFixedContainer: string;
  contentFixedContainer: Note;
};

export default class Main extends Component<{}, State> {
  constructor(props: {}) {
    super(props);

    const savedList = parseListFromStorage();

    this.state = {
      notes: savedList.length > 0 ? savedList : getInitialData(),
      searchQuery: "",
      displayFixedContainer: "none",
      contentFixedContainer: {
        id: 0,
        title: "",
        body: "",
        createdAt: "",
        archived: false,
      },
    };
    if (savedList.length < 1) saveListToStorage(this.state.notes);
    // this.eventSubmitNewNote = this.eventSubmitNewNote.bind(this);
    // this.eventOnSearchNote = this.eventOnSearchNote.bind(this);
  }

  eventSubmitNewNote = (newList: Note[]) => {
    this.setState(() => {
      saveListToStorage(newList);
      return {
        notes: newList,
      };
    });
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
  eventChangeFixedContainerState = (state: {
    display: string;
    contents: Note;
  }) => {
    this.setState(() => {
      return {
        displayFixedContainer: state.display,
        contentFixedContainer: state.contents,
      };
    });
  };
  eventOnNoteDelete = (noteId: number) => {
    const noteList = this.state.notes;
    const savedData = parseListFromStorage();
    const index = noteList.map((item) => item.id).indexOf(noteId);
    noteList.splice(index, 1);
    savedData.splice(index, 1);
    saveListToStorage(savedData);
    this.setState(
      () => {
        return {
          notes: noteList,
        };
      },
      () => alert("Catatan berhasil dihapus")
    );
  };
  eventOnNoteArchive = (noteId: number) => {
    const noteList = this.state.notes;
    const savedData = parseListFromStorage();
    const index = noteList.map((item) => item.id).indexOf(noteId);
    savedData[index].archived = noteList[index].archived =
      !noteList[index].archived;
    saveListToStorage(savedData);
    this.setState(
      () => {
        return {
          notes: noteList,
        };
      },
      () => alert("Catatan telah dipindahkan")
    );
  };
  actionEvents = {
    archiveNote: this.eventOnNoteArchive,
    deleteNote: this.eventOnNoteDelete,
    onClickNote: this.eventChangeFixedContainerState,
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
          <ListNotes
            currentState={this.state}
            noteActionEvents={this.actionEvents}
          />
        </main>
        <FixedContainer
          displayState={this.state.displayFixedContainer}
          contents={this.state.contentFixedContainer}
          actionEvents={this.actionEvents}
        />
      </>
    );
  }
}
