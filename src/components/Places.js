import React, { Component } from "react";
import superagent from "superagent";

class Places extends Component {
  constructor(props) {
    super(props);
    this.state = {
      windowLocation: this.props.location,
      loading: true,
      venues: '',
      foundLocation:null,
      icon: ''
    };
  }

  componentDidMount() {
    this.getLocationDetails(this.props.location);
  }

  
  getLocationDetails(location) {
    var ll = location.position[0] + "," + location.position[1];
    const url =
      "https://api.foursquare.com/v2/venues/search?ll=" +
      ll +
      "&intent=checkin&client_id=LSOLJXIKSXNPBIUUXTR5J1JTUBKZQ4TL3CNFW4ZDE0MHFBJJ&client_secret=SMQR2A2LHE2ORUXF32MHYME5VEAEOIDBTNCAJYBZU1D01C3X&v=20180808";
    superagent
      .get(url)
      .query(null)
      .set("Accept", "text/json")
      .end((error, response) => {
        const venues = response.body.response.venues;
        const locationAddress = response.body.response.venues.find(function(venue){
            if(venue.id === location.idFS){
                return venue;
            }
            return null
        });
        this.setState({
            venues: venues,
            foundLocation: locationAddress,
            loading:false,
            icon : locationAddress.categories ? locationAddress.categories[0].icon.prefix+"88"+locationAddress.categories[0].icon.suffix : null
        })
      });

  }

  render() {
    const { loading } = this.state;

    if (loading) {
      // if your component doesn't have to wait for an async action, remove this block
      return <p> Loading </p>; // render null when app is not ready
    }

    return (

      <div className="info-Window">
          <div className="address">
            <p>{this.props.location.title}</p>
            <ul className="formatted-Address">
            {this.state.foundLocation.location.formattedAddress.map((addr,i) =>(
                 <li key={i}> {addr} </li>
            ))}

            </ul>
          </div>
          <div className="icon">
            {this.state.icon ? <img className="icon-position" alt={this.props.location.title} style={{marginLeft:20, backgroundColor:'#FF7F50'}} src={this.state.icon} /> : null}
          </div>

      </div>
    );
  }
}

export default Places;
