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
    containerElement: <div style={{ height: "700px",margin: "0 0 50px 0" }} />,
    mapElement: <div style={{ height: "100%" }} />
  }),
  withScriptjs,
  withGoogleMap
)(props => (
  <GoogleMap
    defaultZoom={13}
    defaultCenter={{ lat: 52.23854936169176, lng: -0.8920812606811523 }}
    zoom={props.zoom}
  >
    {props.children}
  </GoogleMap>
));

export default Map;
