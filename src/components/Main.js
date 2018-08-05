import React, { Component } from 'react'
import Map from './Map'
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
    render() {
        return(
            <div>
            <Map zoom={13} center={this.state.center}>
              {this.state.locations.map(location => (
                <Marker
                  key={location.id}
                  position={{ lat: location.pos[0], lng: location.pos[1] }}
                  animation={location.animation}
                >
                {location.info_open && (
                  <InfoWindow
                    key={location.id}

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
            </Map>
            </div>
        )
    }
}

export default Main
