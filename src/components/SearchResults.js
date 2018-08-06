import React from 'react'

const SearchResults = (props) => {
  const locations = props.locations.map(location => (
    <li key={location.id} onClick={() => {
      props.onToggleInfo(location.id);
    }}>
      {location.title}
    </li>
  ))
  return <ul tabIndex="1">{locations}</ul>
}

export default SearchResults
