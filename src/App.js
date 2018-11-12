import React, { Component } from 'react';
import Location from './Location';
import GoogleMap from './GoogleMap';
import { locations } from './data'
import './App.css';

class App extends Component {
  state = {
    locations: locations,
    locationsNow: []
  }

  componentDidMount () {

  }

  locationChange = (location)=> {
    if (location !== '全部') {
      this.setState({
        locationsNow: locations.filter(lo=> lo.title === location)
      })
    } else {
      this.setState({
        locationsNow: this.state.locations
      })
    }
  }

  render() {
    let { locations, locationsNow } = this.state
    locationsNow = locationsNow.length>0? locationsNow: locations

    return (
      <div className="app">
        <Location
          locations={locations}
          locationsNow = {locationsNow}
          locationChange={this.locationChange}
        />
        <GoogleMap locations={locationsNow}/>
      </div>
    );
  }
}

export default App;
