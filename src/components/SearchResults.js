import React from 'react'

const SearchResults = (props) => {
  const locations = props.locations.map(location => (
    <li key={location.id}>
      {location.title}
    </li>
  ))
  return <ul>{locations}</ul>
}

export default SearchResults
