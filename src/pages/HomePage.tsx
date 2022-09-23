import React, { Component } from "react";
import { useSearchParams } from "react-router-dom";
import { DefaultList } from "../components/ListNotes";
import SearchBar from "../components/SearchBar";
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

export default function HomePage() {
  const [searchParam, setSearchParam] = useSearchParams();
  return (
    <HomeComponent
      search={(searchParam.get("search") || "").toString()}
      setSearch={setSearchParam}
    />
  );
}

class HomeComponent extends Component<Props, State> {
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
    const originList = parseListFromStorage();
    const _input = input.toLowerCase();
    const result = originList.filter(
      (note) =>
        note.title.toLowerCase().includes(_input) ||
        note.body.toLowerCase().includes(_input)
    );
    this.setState(() => {
      return { searchQuery: input, notes: result };
    });
  };

  render() {
    const setSearchParam = this.props.setSearch;
    const searchQuery = this.state.searchQuery;
    return (
      <>
        <SearchBar
          onChange={this.eventOnSearchNote}
          onBlur={setSearchParam}
          searchQuery={searchQuery}
        />
        <DefaultList currentState={this.state} />
      </>
    );
  }
}
