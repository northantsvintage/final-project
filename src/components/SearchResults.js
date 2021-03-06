import React from 'react'

const SearchResults = (props) => {
  const locations = props.locations.map(location => (
    <li key={location.id} className="list-item" tabIndex="0" onClick={() => {
      props.onSearchToggleInfo(location.id);

    }}>
      <a className="links">{location.title}</a>
    </li>
  ))
  return <ul aria-labelledby="list of locations" className="list">{locations}</ul>
}

export default SearchResults
