import React from "react";
import { compose, withProps } from "recompose";
import { withGoogleMap, GoogleMap } from "react-google-maps";

const Map = compose(
  withProps({
    loadingElement: <div style={{ height: "100%", backgroundColor: "grey" }} />,
    containerElement: <div style={{ height: "700px" }} />,
    mapElement: <div style={{ height: "100%" }} />
  }),
  withGoogleMap
)(props => (
  <GoogleMap
    defaultZoom={11}
    defaultCenter={{ lat: 52.236927, lng: -0.898598 }}
    zoom={props.zoom}
  >
    {props.children}
  </GoogleMap>
));

export default Map;
