import React from "react";
import PropTypes from "prop-types";
type Props = {
  onChange: Function;
  onBlur: Function;
  searchQuery: string;
};

const SearchBar = (props: Props) => {
  return (
    <div className="container-search">
      <input
        type="text"
        id="input-search"
        placeholder="Cari catatan.."
        onChange={(e) => {
          props.onChange(e.target.value);
        }}
        onBlur={(e) => props.onBlur({ search: e.target.value })}
        value={props.searchQuery}
      />
    </div>
  );
};
SearchBar.propTypes = {
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  searchQuery: PropTypes.string,
};
export default SearchBar;
