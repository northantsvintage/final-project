import React, { Component } from 'react'
import Map from './Map'
import SearchResults from './SearchResults'
import { restaurants } from "./locations"
import { Marker, InfoWindow } from "react-google-maps"

class Main extends Component {
    state = {
        locations: [],
        center: {
            lat: 52.2454,
            lng: -0.89
          }
    }
    componentDidMount() {
      this.setState({
        locations: restaurants
      })
    }

    onToggleInfo = id => {
      // manipulating openInfo boolean values to toggle on and off
      // loop throgh locations using map, check condition and
      // modifying objects properties with ... spread
      // https://dmitripavlutin.com/object-rest-spread-properties-javascript/
      // https://medium.com/front-end-hacking/immutability-in-array-of-objects-using-map-method-dd61584c7188
    const new_locations = this.state.locations.map(
      location =>
        id === location.id ?
        // modified value of openInfo, toggling InfoWindow
          { ...location, openInfo: !location.openInfo }
          // setting openInfo to false value
          : { ...location, openInfo: false }
    );
    this.setState({ locations: new_locations });
  };


    render() {
        return(
            <div>
            <Map zoom={13} center={this.state.center}>
          {this.state.locations.map(location => (
            <Marker
              key={location.id}
              position={{ lat: location.position[0], lng: location.position[1] }}
              onClick={() => {
                this.onToggleInfo(location.id);
              }}
            >
              {location.openInfo && (
                <InfoWindow
                  key={location.id}
                  onCloseClick={() => this.onToggleInfo(location.id)}
                >
                  <div>
                    <p>{location.title}</p>
                    <p>{location.address}</p>
                    <p>{location.call}</p>
                  </div>
                </InfoWindow>
              )}
            </Marker>
          ))}
            <SearchResults locations={this.state.locations} />
            </Map>

            </div>
        )
    }
}

export default Main
