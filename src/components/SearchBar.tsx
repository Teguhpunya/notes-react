import React from "react";
import PropTypes from "prop-types";
import { LangConsumer } from "../contexts/LangContext";
type Props = {
  onChange: Function;
  onBlur: Function;
  searchQuery: string;
};

const SearchBar = (props: Props) => {
  return (
    <LangConsumer>
      {({ langData }) => {
        return (
          <div className="container-search">
            <input
              type="text"
              id="input-search"
              placeholder={langData.search.placeholder}
              onChange={(e) => {
                props.onChange(e.target.value);
              }}
              onBlur={(e) => props.onBlur({ search: e.target.value })}
              value={props.searchQuery}
            />
          </div>
        );
      }}
    </LangConsumer>
  );
};
SearchBar.propTypes = {
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  searchQuery: PropTypes.string,
};
export default SearchBar;
