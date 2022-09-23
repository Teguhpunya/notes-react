import React, { Component } from "react";
import { useSearchParams } from "react-router-dom";
import { ArchivedList } from "../components/ListNotes";
import { Note } from "../data/Note";
import {
  getInitialData,
  parseListFromStorage,
  saveListToStorage,
} from "../utils";

type Props = {
  search: string;
  setSearch: any;
};

type State = {
  notes: Note[];
  searchQuery: string;
};

class ArchiveComponent extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    const savedList = parseListFromStorage();

    this.state = {
      notes: savedList.length > 0 ? savedList : getInitialData(),
      searchQuery: props.search,
    };
    if (savedList.length < 1) saveListToStorage(this.state.notes);
  }

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
            onBlur={(e) => this.props.setSearch({ search: e.target.value })}
            value={this.state.searchQuery}
          />
        </div>
        <ArchivedList currentState={this.state} />
      </>
    );
  }
}
export default function ArchivePage() {
  const [searchParam, setSearchParam] = useSearchParams();
  return (
    <ArchiveComponent
      search={(searchParam.get("search") || "").toString()}
      setSearch={setSearchParam}
    />
  );
}
