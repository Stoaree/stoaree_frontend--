import React from 'react';
import { useHistory } from 'react-router-dom'

const SearchBar = (props) => {

  const history = useHistory()

  // Redirects the user when they search
  const handleSearchButton = (e) => {

    e.target.value = e.target.value.toLowerCase();
    if (e.key === "Enter"){
      history.push("/search")
    }
  }

  return (
    <div>
      <div className="search-div">
        <div className="inside-search-bar">
          <input onChange={props.handleSearch} name="searchInput" type="text" placeholder="Try searching for..." onKeyPress={handleSearchButton} />
        </div>    
      </div>
    </div>
  )
}

export default SearchBar;