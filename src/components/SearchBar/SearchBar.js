import React from 'react';
import { useHistory } from 'react-router-dom'
import { connect } from "react-redux";
import { setSearchQuery } from "../../redux/searchReducer";

function mapStateToProps(state) {
  return {
    searchQuery: state.searchReducer.searchQuery
  }
}

const mapDispatchToProps = {
  setSearchQuery
}

const SearchBar = (props) => {

  const history = useHistory()

  // Redirects the user when they search
  const handleSearchButton = (e) => {

    e.target.value = e.target.value.toLowerCase();
    if (e.key === "Enter") {
      history.push("/search")
    }
  }

  const handleSearch = (e) => {
    props.setSearchQuery(e.target.value);
  }

  return (
    <div>
      <div className="search-div">
        <div className="inside-search-bar">
          <input onChange={handleSearch} name="searchInput" type="text" placeholder="Try searching for..." onKeyPress={handleSearchButton} />
        </div>
      </div>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);