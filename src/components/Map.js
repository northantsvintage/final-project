import React, { Component } from 'react'
import GoogleMapReact from 'google-map-react'
// import PropTypes from 'prop-types'

class Map extends Component {
    static defaultProps = {
        center: {
          lat: 52.2405,
          lng: -0.88333
        },
        zoom: 11
      };
    render() {
        return(
            <div style={{ height: '100vh', width: '100%' }}>
            <GoogleMapReact 
            bootstrapURLKeys={{ key: 'AIzaSyA_3niI9e5yxgUf27WM6qaHRTWJhvxl2Dc' }}
            defaultCenter={this.props.center}
            defaultZoom={this.props.zoom} >

            </GoogleMapReact>
            </div>
        )
    }
}

export default Map