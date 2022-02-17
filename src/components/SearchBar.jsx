import { useGlobalContext } from "../context";
import searchIcon from "../images/icons/search-icon.png";
import closeIcon from "../images/icons/close-icon.png";

function SearchBar() {
  const {
    searchValue,
    handleSearchValue,
    handleSubmit,
    autocompleteResults,
    clearAutocompleteResults,
    clearSearch,
    suggestedSearch,
  } = useGlobalContext();

  return (
    <label>
      <span className="visually-hidden">search another location</span>
      <button
        onClick={handleSubmit}
        type="button"
        className={`search-btn ${searchValue ? "clickable" : ""}`}
      >
        <img src={searchIcon} alt="" />
      </button>
      <input
        type="text"
        placeholder="Another location"
        value={suggestedSearch ? suggestedSearch : searchValue}
        onChange={(e) => {
          handleSearchValue(e.target.value);
        }}
      />

      {searchValue || autocompleteResults.length ? (
        <button
          className="clear-btn"
          type="button"
          onClick={() => {
            clearSearch();
            clearAutocompleteResults();
          }}
        >
          <span className="visually-hidden">close autocomplete results</span>
          <img src={closeIcon} alt="" />
        </button>
      ) : (
        ""
      )}
    </label>
  );
}

export default SearchBar;
