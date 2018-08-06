import React from 'react'

const SearchResults = (props) => {
  const locations = props.locations.map(location => (
    <li key={location.index}>
      {location.title}
      aria-labelledby={`view details for ${location.title}`}
    </li>
  ))
  return <ul aria-labelledby="location list" tabIndex="1">{locations}</ul>
}

export default SearchResults
