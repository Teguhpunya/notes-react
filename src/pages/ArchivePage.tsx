import React, { Component } from "react";
import { useSearchParams } from "react-router-dom";
import { ArchivedList } from "../components/ListNotes";
import SearchBar from "../components/SearchBar";
import { Note } from "../data/Note";
import { getArchivedNotes } from "../utils";

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

    this.state = {
      notes: [],
      searchQuery: props.search,
    };
  }

  componentDidMount(): void {
    this.eventOnSearchNote(this.state.searchQuery);
  }

  eventOnSearchNote = async (input: string) => {
    const originList = await getArchivedNotes();
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
