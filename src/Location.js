import React, { Component } from 'react';
import Info from './Info';

class Location extends Component {
	openNav() {
		document.getElementById("mySidenav").style.width = "250px";
	}
	closeNav() {
		document.getElementById("mySidenav").style.width = "0";
	}
	render() {
		const { locations, locationsNow, locationChange } = this.props
		return (
		  <div className="location">
		  	<div style={{'fontSize':'30px', 'cursor':'pointer'}} onClick={()=> {this.openNav()}}>&#9776; open</div>
		  	<div id="mySidenav" className="sidenav">
		  		<a className="closebtn" onClick={()=> {this.closeNav()}}>&times;</a>
		  		<select placeholder="全部" aria-label="select location" className="select-location"
		  			onChange={(event)=> {
		  				locationChange(event.target.value);
		  			}}>
		  			<option key={'全部'} value="全部">全部</option>
		  			{locations.map((location)=> (
		  				<option key={location.title} value={location.title}>{location.title}</option>
		  			))}
		  		</select>
		  		<div>
		  			<ol>
		  				{locationsNow.map((location, index)=> (
		  					<li key={index}><button>{location.title}</button></li>
		  				))}
		  			</ol>
		  		</div>
		  		<Info
		  			location={locationsNow.length===1? locationsNow[0]: ''}
		  		/>
		  	</div>
		  </div>
		);
	}
}

export default Location;
