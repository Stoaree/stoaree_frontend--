import React from 'react';
import { useHistory } from 'react-router-dom'


const SearchBar = (props) => {

  const history = useHistory()

  // Redirects the user when they search
  const handleSearchButton = (e) => {
    e.preventDefault()
    history.push("/search")
  }

  return (
    <div>
      <div className="search-div">
        <div className="inside-search-bar">
          <input onChange={props.handleSearch} name="searchInput" type="text" placeholder="Try searching for..." />
          <button onClick={handleSearchButton}> Submit </button>
        </div>    
      </div>
    </div>
  )
}

export default SearchBar;