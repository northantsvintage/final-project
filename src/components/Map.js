import React from "react";
import { compose, withProps } from "recompose";
import { withScriptjs, withGoogleMap, GoogleMap} from "react-google-maps";

/*
 Map settings as per official react google map configuration with recompose
*/
const exampleMapStyles = [
  {
    "featureType": "all",
    "stylers": [
      { "color": "#C0C0C0" }
    ]
  },{
    "featureType": "road.arterial",
    "elementType": "geometry",
    "stylers": [
      { "color": "#CCFFFF" }
    ]
  },{
    "featureType": "landscape",
    "elementType": "labels",
    "stylers": [
      { "visibility": "onn" }
    ]
  }
]

const Map = compose(
  withProps({
    googleMapURL:
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyA_3niI9e5yxgUf27WM6qaHRTWJhvxl2Dc&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: "100%", backgroundColor: "grey" }} />,
    containerElement: <div style={{ height: "70vh" }} />,
    mapElement: <div style={{ height: "100%", display: "flex", flexFlow: 'row nowrap' }} />
  }),
  withScriptjs,
  withGoogleMap
)(props => (
  <GoogleMap
    defaultZoom={13}
    defaultCenter={{ lat: 52.23854936169176, lng: -0.8920812606811523 }}
    zoom={props.zoom}
    options={{
            styles: exampleMapStyles,
        }}
  >
    {props.children}
  </GoogleMap>
));

export default Map;
