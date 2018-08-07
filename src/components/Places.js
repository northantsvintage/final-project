import React, { Component } from 'react'

// venues results in infWindow
class Places extends Component {
    render(){
        const list = this.props.venues.map((venue, id ) => {
            return (
                <li key={id}>{venue.name}{venue.location.formattedAddress[0]}</li>
            )
        })
        return (
            <div className="col2">
                <ol>
                    {list}
                </ol>
            </div>
        )
    }
}

export default Places
