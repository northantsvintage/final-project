import React, { Component } from 'react';
import Navigation from '../components/Navigation'
import Map from '../components/Map'

const locations = [
    {"id": 1, "title": "Karmana", "name": "Karmana", "position": {"lat": 52.259, "lng": -0.864}},
    {"id": 2, "title": "Meem-Saab", "name": "Meem-Saab", "position": {"lat": 52.2449, "lng": -0.869}},
    {"id": 3, "title": "Lazeez", "name": "Lazeez", "position": {"lat": 52.2454, "lng": -0.897}},
    {"id": 4, "title": "Star of India", "name": "Star of India", "position": {"lat": 52.2481, "lng": -0.881}},
    {"id": 5, "title": "Imperial Raj", "name": "Imperial Raj", "position": {"lat": 52.253, "lng": -0.8794}}
    ]

class Main extends Component {
    state = {
        locations: [],
        center: {
            lat: 52.2454,
            lng: -0.89
          },
          zoom: 13
    }
    render() {
        return(
            <div>
                <Navigation locations={this.state.locations} />
                <Map locations={this.state.locations} />
            </div>
        )
    }
}

export default Main