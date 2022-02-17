import { useGlobalContext } from "../context";
import AutocompleteResults from "./AutocompleteResults";
import SearchBar from "./SearchBar";

function SearchForm() {
  const { handleSubmit, handleMouseLeaveResult, handleFocusedResult } =
    useGlobalContext();

  return (
    <>
      <form
        className="search"
        onSubmit={handleSubmit}
        onMouseLeave={handleMouseLeaveResult}
        onKeyDown={handleFocusedResult}
      >
        <SearchBar />
        <AutocompleteResults />
      </form>
    </>
  );
}

export default SearchForm;
