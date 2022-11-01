import React, { Component } from "react";
import { useSearchParams } from "react-router-dom";
import { DefaultList } from "../components/ListNotes";
import SearchBar from "../components/SearchBar";
import { Note } from "../data/Note";
import { getActiveNotes } from "../utils/network-data";

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

    this.state = {
      notes: [],
      searchQuery: props.search,
    };
    this.eventOnSearchNote = this.eventOnSearchNote.bind(this);
  }

  componentDidMount(): void {
    this.eventOnSearchNote(this.state.searchQuery);
  }

  eventOnSearchNote = async (input: string) => {
    const originList = await getActiveNotes();
    const _input = input.toLowerCase();
    const result = originList.data.filter(
      (note: Note) =>
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
