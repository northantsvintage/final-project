import React, { Component } from 'react'
import { Marker, InfoWindow } from "react-google-maps"
import superagent from "superagent"
import Map from './Map'
import SearchResults from './SearchResults'
import Places from './Places'
import { restaurants } from "./locations"
import './Main.css'


class Main extends Component {
    state = {
        locations: [],
        center: {
            lat: 52.237657,
            lng: -0.8919
          },
          venues: []
    }

    componentDidMount() {
      const url = 'https://api.foursquare.com/v2/venues/search?ll=52.237743,-0.891818&intent=browse&radius=100000&client_id=LSOLJXIKSXNPBIUUXTR5J1JTUBKZQ4TL3CNFW4ZDE0MHFBJJ&client_secret=SMQR2A2LHE2ORUXF32MHYME5VEAEOIDBTNCAJYBZU1D01C3X&v=20180808'

      // client-side HTTP request library
      superagent
        .get(url)
        .query(null)
        .set('Accept', 'text/json')
        .then(response => {
            const venues = response.body.response.venues
            this.setState({
              venues: venues
            })
         })
         .catch(error => {
            alert(error.message)
         });

      this.setState({
        locations: restaurants
      })
    }

    /*
    manipulating openInfo boolean values to toggle on and off
    loop throgh locations using map, check condition and
    modifying objects properties with ... spread
    */
    onToggleInfo = id => {
      const new_locations = this.state.locations.map(
        location =>
          id === location.id ?
          // modified value of openInfo, toggling InfoWindow
            { ...location, openInfo: !location.openInfo }
            : { ...location, openInfo: false }
      );
      this.setState({ locations: new_locations });
    };

    /*
      Toggle Info and Bounce Animation for Search Results - Navigation
    */
    onSearchToggleInfo = id => {

      const locationAnimation = this.state.locations.map(
        location =>
          id === location.id
            ? { ...location, animation: window.google.maps.Animation.BOUNCE, openInfo: !location.openInfo  }
            : { ...location, openInfo: false }
          );
        this.setState({
          locations: locationAnimation,
        });

      // stop the animation after 2 sec
      setTimeout(() => {
        const stopAnimation = this.state.locations.map(
          location =>
            id === location.id ? { ...location, animation: undefined } : location
        );
        this.setState({ locations: stopAnimation });
      }, 2000);

    };


    /*
      search method taking in query from input and manipulating
      the state by setting locations to matched locations
    */
    Search = (event) => {
      event.preventDefault();
      const query = this.search.value.toLowerCase()
      const match = restaurants.filter(location => location.title.toLowerCase().includes(query))
      this.setState({ locations: match})
    }

    /*
      assigning animation bounce on marker
    */
    onBounce = id => {
    const locationAnimation = this.state.locations.map(
      location =>
        id === location.id
          ? { ...location, animation: window.google.maps.Animation.BOUNCE }
          : location
    );
    this.setState({
      locations: locationAnimation,
      // center: restaurants[id].position
    });

    // stop the animation after 1 sec
    setTimeout(() => {
      const stopAnimation = this.state.locations.map(
        location =>
          id === location.id ? { ...location, animation: undefined } : location
      );
      this.setState({ locations: stopAnimation });
    }, 1000);

  };

    render() {
        return(
          <div id="wrapper">

              <header>
                <a href="#main-menu"
                   className="menu-toggle link"
                   role="button"
                   id="main-menu-toggle"
                   aria-expanded="false"
                   aria-controls="main-menu"
                   aria-label="Open main menu">
                  <span className="sr-only">Open main menu</span>
                  <span className="fa fa-bars" aria-hidden="true">{'\u2630'}</span>
                </a>

                  <h1 className="headline" tabIndex="0">Northampton Maps</h1>

                  <nav id="main-menu"
                     className="main-menu"
                     aria-expanded="false"
                     aria-label="Main menu">
                    <a href="#main-menu-toggle"
                       className="menu-close link"
                       role="button"
                       id="main-menu-close"
                       aria-expanded="false"
                       aria-controls="main-menu"
                       aria-label="Close main menu">
                      <span className="sr-only">Close main menu</span>
                      <span className="fa fa-close" aria-hidden="true">x</span>
                    </a>
                      <input type="text" className="input" ref={node => {this.search = node}} onKeyUp={this.Search} aria-label="Search" placeholder = "Search" />
                      <SearchResults locations={this.state.locations} onSearchToggleInfo={this.onSearchToggleInfo} />
                    </nav>

                      <a href="#main-menu-toggle"
                       className="backdrop link"
                       tabIndex="-1"
                       aria-hidden="true"
                       hidden>x
                       </a>
                  </header>

                  <section>
                   <div id="map-container" tabIndex="0">
                    <Map zoom={17} center={this.state.center} >
                      {this.state.locations.map(location => (
                        <Marker 
                          key={location.id}
                          position={{ lat: location.position[0], lng: location.position[1] }}
                          onClick={() => {
                            this.onToggleInfo(location.id);
                            this.onBounce(location.id);
                          }}
                          animation={location.animation}
                        >
                        {location.openInfo && (
                          <InfoWindow
                          key={location.id}
                          onCloseClick={() => this.onToggleInfo(location.id)}
                        >


                          <Places venues={this.state.venues} location={location} />

                          </InfoWindow>
                        )}
                      </Marker>
                    ))}
                    </Map>
                    </div>
                    </section>
                    <footer className="footer">
                      <h2 tabIndex={0}>
                  		  Site integrated with <a className="a-fs" href="https://developer.foursquare.com/" tabIndex={0}
                  		 	aria-label="Link to four square API developer site"> Foursquare API</a>
                  		</h2>
                      <p className="made-by">Made by @northantsvintage</p>
                    </footer>
              </div>

        )
    }
}

export default Main
