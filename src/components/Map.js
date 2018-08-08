import React from "react";
import { compose, withProps } from "recompose";
import { withScriptjs, withGoogleMap, GoogleMap} from "react-google-maps";

/*
 Map settings as per official react google map configuration with recompose
*/
const Map = compose(
  withProps({
    googleMapURL:
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyA_3niI9e5yxgUf27WM6qaHRTWJhvxl2Dc&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: "100%", backgroundColor: "grey" }} />,
    containerElement: <div style={{ height: "700px" }} />,
    mapElement: <div style={{ height: "100%" }} />
  }),
  withScriptjs,
  withGoogleMap
)(props => (
  <GoogleMap
    defaultZoom={15}
    defaultCenter={{ lat: 52.237657, lng: -0.8919 }}
    zoom={props.zoom}
  >
    {props.children}
  </GoogleMap>
));

export default Map;
