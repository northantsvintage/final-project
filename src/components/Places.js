import React, { Component } from 'react'

// venues results in infoWindow
class Places extends Component {
    render(){
        return (
            <div>
                <ol>
                {this.props.venues.map(venue => (
                    <li
                      key={venue.title}
                      tabIndex="0"
                    >
                      <span className="locationtitle">{venue.name} - Coming from Foursquare</span>
                    </li>
                  ))}
                </ol>

            </div>
        )
    }
}

export default Places
