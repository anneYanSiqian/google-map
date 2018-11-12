import React, { Component } from 'react';

class GoogleMap extends Component {
	constructor(props) {
	    super(props);
	    this.initMap = this.initMap.bind(this);
	}

	componentDidMount () {
	  	const script = document.createElement("script");
	  	window.initMap = this.initMap.bind(this);
	  	script.src ='https://maps.googleapis.com/maps/api/js?v=3&key=&v=3&callback=initMap';
	  	script.async = true;
	  	document.body.appendChild(script);
	}

	initMap() {
		const { locations } = this.props
		var map
		const google = window.google
		map = new google.maps.Map(document.getElementById('map'), {
    	center: {lat: 40.7413549, lng: -73.99802439999996},
    	zoom: 13
  	})

  	this.getMarker(google, locations, map)
	}

  getMarker(google, locations, map) {
    let markers = [];
    let largeInfowindow = new google.maps.InfoWindow();
    for (let i = 0; i < locations.length; i++) {
      var position = locations[i].location;
      var title = locations[i].title;
      // Create a marker per location, and put into markers array.
      var marker = new google.maps.Marker({
        map: map,
        position: position,
        title: title,
        animation: google.maps.Animation.DROP,
        id: i
      });
      // Push the marker to our array of markers.
      markers.push(marker);
      // Create an onclick event to open an infowindow at each marker.
      marker.addListener('click', function() {
        if (largeInfowindow.marker !== this) {
          largeInfowindow.this = this;
          largeInfowindow.setContent('<div>' + this.title + '</div>');
          largeInfowindow.open(map, this);
          // Make sure the marker property is cleared if the largeInfowindow is closed.
          largeInfowindow.addListener('closeclick',function() {
            largeInfowindow.setMarker = null;
          });
        }
      });
    }
  }

	render() {
    const { locations } = this.props
    if (locations.length === 1) {
      var map
      const google = window.google
      map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: locations[0].location.lat, lng: locations[0].location.lng},
        zoom: 13
      })
      this.getMarker(google, locations, map)
    } else {
      if (document.getElementById('map')) {
        const google = window.google
        map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: 40.7413549, lng: -73.99802439999996},
          zoom: 13
        })
        this.getMarker(google, locations, map)
      }
    }
  	return (
      	<div className="google-map" id="map">
      	</div>
  	);
	}
}

export default GoogleMap;
