import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Map, TileLayer, Marker, Popup, ImageOverlay } from 'react-leaflet';


class SimpleExample extends Component {
  constructor() {
    super()
    this.state = {
      hasLocation: false,
      lat: 51.505,
      lng: -0.09,
      zoom: 18,
      showNav: false,
      arr: [0, 0, 0],
      currentCoord: '',
      prevCoord: '',
      pastCoord: '',
      counter: 0 ,
      x: '',  //current location
      p: '',  //previous location
      pp: '', //past location
    }
  }

   openNav = () => {
    document.getElementById("myNav1").style.height = "100%";
  }
  
  /* Close when someone clicks on the "x" symbol inside the overlay Nav Bar */
   closeNav = () => {
    document.getElementById("myNav1").style.height = "0%";
  }
  
   handleClicked = () => {
    const map = this.mapElement
    if (map != null) {
      map.leafletElement.locate({
        setView: true,
        maxZoom: 19,
        watch: true,
        enableHighAccuracy: true,
      })
      console.log('Locating...');}
   }
   handleStopLocating = () => {
    document.getElementById('find').style.display = 'block';
    document.getElementById('stop').style.display = 'none';
    const map = this.mapElement
    if (map != null) {
			map.leafletElement.stopLocate();
      console.log('Stopped Locating');}
      document.getElementById('find').style.display = 'block';  
   }
  


/*     arr = [0, 0, 0];
   var currentCoord = '';
   var prevCoord = '';
   var pastCoord = '';
   var counter = 0;
   var x; //current location
   var p; //previous location
   var pp; //past location
 */
   handleLocationFound = (e) => {
    document.getElementById('find').style.display = 'none';
    document.getElementById('stop').style.display = 'block';
    const arr1 = this.state.arr;
    arr1.push(e.latlng);


    if (this.state.arr.length > 3) { 
      arr1.shift();
      console.log('arr = ' + arr1);
    }

    prevlatlng = arr1[1]
    

      this.setState({
        hasLocation: true,
        latlng: e.latlng,
        counter: this.state.counter + 1,
        arr: arr1,    
        
      })

      console.log('arr state = ' + this.state.arr);

      const map = this.mapElement;
      var rand = Math.random() / 5000;
			e.latlng.lat = e.latlng.lat + rand;
			e.latlng.lng = e.latlng.lng + rand;
			console.log('counter = ' + this.state.counter);

			var radius = e.accuracy / 2;
		}

  
  
  

  render() {
//    const position = [this.state.lat, this.state.lng];

var floor1url = 'https://elasticbeanstalk-us-east-2-203326335658.s3.us-east-2.amazonaws.com/floorplan1.png';
var floor1Bounds = [  [53.522184, -113.525419],   [53.519451, -113.521535] ];
var floor2url = 'https://elasticbeanstalk-us-east-2-203326335658.s3.us-east-2.amazonaws.com/floorplan2.png';
var floor2details_url =
  'https://elasticbeanstalk-us-east-2-203326335658.s3.us-east-2.amazonaws.com/floor2details.png';

var center = [53.520742, -113.523992];
var centerMarker = [53.521217, -113.522732];

const marker = this.state.hasLocation ? (
  <Marker position={this.state.latlng}>
    <Popup>You are here</Popup>
  </Marker>
) : null



const style = {
zIndex:1000
}



//locateMe(map);

function onLocationError(e) {
  alert(e.message);
}


function onLocationFound(e) {
  alert(e.message);
}






return (
<div>

      <Map ref={(mapEl)=>{this.mapElement = mapEl}} onLocationfound={this.handleLocationFound}  
        center={center} zoom={this.state.zoom}>
              <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url='https://{s}.tile.osm.org/{z}/{x}/{y}.png'
              />
      <ImageOverlay url={floor1url} bounds={floor1Bounds} opacity='0.7'></ImageOverlay>
              <Marker position={centerMarker}>
                <Popup>
                UofA Hospital Main Entrance
                </Popup>
              </Marker>
            {marker}
            </Map>
            <button id="find" className="myBtn" onClick={this.handleClicked} title="Find My Location">Find Us</button>
		{/* <span id="btn-loader" className="loader-1" title="Find My Location"></span> */}

	<button id="stop" className="myBtn" style={{display:'none'}} onClick={this.handleStopLocating}
		title="Stop Location Sharing">Stop</button>
            <button className="menuBtn w3-grey" onClick={this.openNav} title="Open Menu">
    <i className="fa fa-question w3-large "></i></button>
            
            <div id="myNav1" className="overlaynav" style={style} onClick={this.closeNav}>


                <a className="closebtn" onClick={this.closeNav}>×</a>

                <div className="overlaynav-content">
                  <a href="#home" onClick={this.closeNav}>Home</a>
                  <a href="#about" onClick={this.closeNav}>About</a>
                  <button className="w3-button w3-padding w3-white w3-large w3-margin-top" 
                    title="Stop Location Sharing">Recenter Map</button> <br/>
                  <button className="w3-button w3-padding w3-white w3-large w3-margin-top" 
                    title="Stop Location Sharing">Refresh Map</button>
                </div>

            </div>






</div>      

    );
  }
}


if (document.getElementById('ReactMap')) {
    ReactDOM.render(<SimpleExample />, document.getElementById('ReactMap'));
}
