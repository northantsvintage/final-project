import React from 'react'

const SearchResults = (props) => {
  const locations = props.locations.map(location => (
    <li key={location.id} className="list-item" tabindex="0" onClick={() => {
      props.onToggleInfo(location.id);
    }}>
      <a className="links">{location.title}</a>
    </li>
  ))
  return <ul aria-label="list of locations" className="list">{locations}</ul>
}

export default SearchResults
