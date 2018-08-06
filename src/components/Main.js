import React, { Component } from 'react'
import Map from './Map'
import SearchResults from './SearchResults'
import Places from './Places'
import { restaurants } from "./locations"
import { Marker, InfoWindow } from "react-google-maps"
import superagent from "superagent"

class Main extends Component {
    state = {
        locations: [],
        center: {
            lat: 52.2454,
            lng: -0.89
          },
          venues: []
    }

    componentDidMount() {
      const url = 'https://api.foursquare.com/v2/venues/search?v=20140806&ll=52.237451,-0.898825&client_id= LSOLJXIKSXNPBIUUXTR5J1JTUBKZQ4TL3CNFW4ZDE0MHFBJJ&client_secret= SMQR2A2LHE2ORUXF32MHYME5VEAEOIDBTNCAJYBZU1D01C3X'
      // const url = 'https://api.foursquare.com/v2/venues/49eeaf08f964a52078681fe3?&oauth_token=OYKLBVCKXIBLKPHM2DEDVOYTZHDHWKHN3FCZY4H2GBATOQQY&v=20180806'
      superagent
        .get(url)
        .query(null)
        .set('Accept', 'text/json')
        .end((error, response) => {
            const venues = response.body.response.venues
            console.log(JSON.stringify(venues))
            this.setState({
                venues: venues
            })

        })

      this.setState({
        locations: restaurants
      })
    }

    onToggleInfo = index => {
        // manipulating openInfo boolean values to toggle on and off
        // loop throgh locations using map, check condition and
        // modifying objects properties with ... spread
        // https://dmitripavlutin.com/object-rest-spread-properties-javascript/
        // https://medium.com/front-end-hacking/immutability-in-array-of-objects-using-map-method-dd61584c7188
      const new_locations = this.state.locations.map(
        location =>
          index === location.index ?
          // modified value of openInfo, toggling InfoWindow
            { ...location, openInfo: !location.openInfo }
            // setting openInfo to false value
            : { ...location, openInfo: false }
      );
      this.setState({ locations: new_locations });
    };

    /*
    FourSquare
    */

    render() {
        return(
            <div>
            <Map zoom={13} center={this.state.center}>
          {this.state.locations.map(location => (
            <Marker
              key={location.index}
              position={{ lat: location.position[0], lng: location.position[1] }}
              onClick={() => {
                this.onToggleInfo(location.index);
              }}
            >
              {location.openInfo && (
                <InfoWindow
                  key={location.index}
                  onCloseClick={() => this.onToggleInfo(location.index)}
                >
                  <div>
                    <p>{location.title}</p>
                    <p>{location.address}</p>
                    <p>{location.call}</p>
                    // info from Foursquare
                    <Places venues={this.state.venues} />
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
