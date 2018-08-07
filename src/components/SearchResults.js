import React from 'react'

const SearchResults = (props) => {
  const locations = props.locations.map(location => (
    <li key={location.id} className="list-item" onClick={() => {
      props.onToggleInfo(location.id);
    }}>
      <a className="links">{location.title}</a>
    </li>
  ))
  return <ul className="list">{locations}</ul>
}

export default SearchResults
