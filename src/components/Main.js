import React, { Component } from 'react'
import { Marker, InfoWindow } from "react-google-maps"
import superagent from "superagent"
import Map from './Map'
import SearchResults from './SearchResults'
import Places from './Places'
import { restaurants } from "./locations"
import './Main.css'


class Main extends Component {
  constructor(props) {
    super(props)
    this.Places = React.createRef();
  }
    state = {
        locations: [],
        center: {
            lat: 52.237657,
            lng: -0.8919
          },
          venues: [],
          activeLocation: {}
    }

    pushIntoInfo(data) {

       const node = this.myRef.current;
       node.innerHtml = 'test'
       console.log(data)

 }


    componentDidMount() {
      // const url = 'https://api.foursquare.com/v2/venues/49eeaf08f964a52078681fe3?&oauth_token=OYKLBVCKXIBLKPHM2DEDVOYTZHDHWKHN3FCZY4H2GBATOQQY&v=20180808'
      // const url = 'https://api.foursquare.com/v2/venues/search?v=20140806&ll=52.237451,-0.898825&client_id= LSOLJXIKSXNPBIUUXTR5J1JTUBKZQ4TL3CNFW4ZDE0MHFBJJ&client_secret= SMQR2A2LHE2ORUXF32MHYME5VEAEOIDBTNCAJYBZU1D01C3X'
      // const url = 'https://api.foursquare.com/v2/venues/49eeaf08f964a52078681fe3?&oauth_token=OYKLBVCKXIBLKPHM2DEDVOYTZHDHWKHN3FCZY4H2GBATOQQY&v=20180806'
      const url = 'https://api.foursquare.com/v2/venues/search?ll=52.237743,-0.891818&intent=browse&radius=100000&client_id=LSOLJXIKSXNPBIUUXTR5J1JTUBKZQ4TL3CNFW4ZDE0MHFBJJ&client_secret=SMQR2A2LHE2ORUXF32MHYME5VEAEOIDBTNCAJYBZU1D01C3X&v=20180808'
      // console.log(url);
      // client-side HTTP request library
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

      // this.fetchDataFS(location.idFS)

      this.setState({
        locations: restaurants
      })
    }

    // selectLocation = location => {
    // this.setState({
    //   activeLocation: location,
    // });

    // this.fetchFourSquare(location.idFS);
  // };

  //   fetchFourSquare(id) {
  //   fetch(`https://api.foursquare.com/v2/venues/${id}?client_id=LSOLJXIKSXNPBIUUXTR5J1JTUBKZQ4TL3CNFW4ZDE0MHFBJJ&client_secret=SMQR2A2LHE2ORUXF32MHYME5VEAEOIDBTNCAJYBZU1D01C3X&v=20180808`)
  //     .then(res => res.json())
  //     .then(data =>
  //       this.pushIntoInfo(data))
  //     .catch(err => {
  //       alert(`Unable to get data from FourSquare (${err})`);
  //     });
  // }

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
      assigning animation bounce on marker according to
      the restaurants position by manipulating the state
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
      center: restaurants[id].position
    });

    // to stop the animation after 1 sec
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
          <div id="app">
          <div id="infos" />
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
                  <input type="text" className="input" ref={node => {this.search = node}} onKeyUp={this.Search} />
                  <SearchResults locations={this.state.locations} onToggleInfo={this.onToggleInfo} />
                  <SearchResults locations={this.state.locations} onToggleInfo={this.onToggleInfo} />
                </nav>
                <a href="#main-menu-toggle"
                 className="backdrop link"
                 tabIndex="-1"
                 aria-hidden="true"
                 hidden>x</a>
              </header>


              <Map zoom={17} center={this.state.center}>
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
                    <div>
                      <p>{location.title}</p>
                      <p>{location.address}</p>
                      <Places venues={this.state.venues} ref={this.Places}/>
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
