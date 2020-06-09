<!doctype html>
<html lang="{{ app()->getLocale() }}">



<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />

	<title>@yield('title','Radiology Map')</title>


	<!-- Fonts -->
	<link href="https://fonts.googleapis.com/css?family=Raleway:100,600" rel="stylesheet" type="text/css">


	<!-- Styles -->
	<link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
	<link rel="stylesheet" href="https://unpkg.com/leaflet@1.6.0/dist/leaflet.css"
		integrity="sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ=="
		crossorigin="" />



	<!-- Scripts -->
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
	<script src="https://unpkg.com/leaflet@1.6.0/dist/leaflet.js"
		integrity="sha512-gZwIG9x3wUXg2hdXF6+rVkLF/0Vi9U8D2Ntg4Ga5I5BZpVkVxlJWbSQtXPSiUTtC0TjtGOmxa1AJPuV0CPthew=="
		crossorigin=""></script>

	<style>
		body {
			padding: 0;
			margin: 0;
		}

		html,
		body,
		#map {
			height: 100%;
			width: 100vw;
		}

		.leaflet-fade-anim .leaflet-tile,
		.leaflet-zoom-anim .leaflet-zoom-animated {
			will-change: auto !important;
		}

		.myBtn {
			display: block;
			/* Hidden by default */
			position: fixed;
			/* Fixed/sticky position */
			bottom: 20px;
			/* Place the button at the bottom of the page */
			right: 10px;
			/* Place the button 30px from the right */
			z-index: 1000;
			/* Make sure it does not overlap */
			border: solid 2px grey;
			/* Remove borders */
			outline: none;
			/* Remove outline */
			background-color: white;
			/* Set a background color */
			color: darkgrey;
			/* Text color */
			cursor: pointer;
			/* Add a mouse pointer on hover */
			border-radius: 10px;
			/* Rounded corners */
			font-size: 12px;
			/* Increase font size */
			width: 80px;
			height: 50px;
		}

		.myBtn:hover {
			background-color: #555;
			/* Add a dark-grey background on hover */
		}

		.menuBtn {
			display: block;
			/* Hidden by default */
			position: fixed;
			/* Fixed/sticky position */
			top: 80px;
			/* Place the button at the bottom of the page */
			left: 11px;
			/* Place the button 11px from the Left */
			z-index: 1000;
			/* Make sure it does not overlap */
			border: solid 2px grey;
			/* Remove borders */
			outline: none;
			/* Remove outline */
			background-color: white;
			/* Set a background color */
			color: darkgrey;
			/* Text color */
			cursor: pointer;
			/* Add a mouse pointer on hover */
			border-radius: 2px;
			/* Rounded corners */
			font-size: 12px;
			/* Increase font size */
			height: 30px;
			width: 30px;

		}

		.my-div-icon {
			z-index: 1000;
			/* Make sure it does not overlap */
			border: solid 2px grey;
			/* Remove borders */
			outline: none;
			/* Remove outline */
			background-color: pink;
			/* Set a background color */
			color: darkgrey;
			/* Text color */
			cursor: pointer;
			/* Add a mouse pointer on hover */
			border-radius: 2px;
			/* Rounded corners */
			font-size: 12px;
			/* Increase font size */
			height: 130px;
			width: 130px;

		}

		/* LOADER 1 */

		.loader-1:before,
		.loader-1:after {
			padding: 10px;
			position: absolute;
			content: "";
			border-radius: 100%;
			border: 3px solid transparent;
			border-top-color: #3498db;
			top: 20%;
			right: 30%;
		}

		.loader-1:before {
			z-index: 1001;
			animation: spin 0.5s infinite;
		}

		.loader-1:after {
			border: 3px solid #ccc;
		}

		@keyframes spin {
			0% {
				-webkit-transform: rotate(0deg);
				-ms-transform: rotate(0deg);
				-o-transform: rotate(0deg);
				transform: rotate(0deg);
			}

			100% {
				-webkit-transform: rotate(360deg);
				-ms-transform: rotate(360deg);
				-o-transform: rotate(360deg);
				transform: rotate(360deg);
			}
		}

		.overlaynav .closebtn {
			position: absolute;
			top: 20px;
			right: 45px;
			font-size: 60px;
		}

		.overlaynav a {
			padding: 8px;
			text-decoration: none;
			font-size: 36px;
			color: #818181;
			display: block;
			transition: 0.3s;
		}
	</style>


</head>



<body>
	@include('components.rad-loader')

	<div id="map">

		<div class="w3-display-container" style="z-index: 1000">
			<div id="infoDiv" class="w3-display-topmiddle w3-black w3-padding " style="font-size: {{$fontSize}};">Viewing Second Floor Map of University Hospital
			</div>
		</div>


		<button id="find" class="myBtn" onclick="locateMe(map);" style="font-size:{{$fontSize}}"
			title="Find My Location">Locate
			<span id="btn-loader" style="display:none" class="loader-1" title="Find My Location"></span>
		</button>
		<button id="stop" style="display: none" class="myBtn" onclick="stopLocating(map);"
			title="Stop Location Sharing">Stop</button>

		<button class="menuBtn" style="background-color:{{$color}}" onclick="openNav();" title="Open Menu">
			<i class="fa fa-bars "></i></button>

		<div id="myNav1" class="overlaynav" onclick="">



			<!-- Button to close the overlay navigation -->
			<a href="javascript:void(0)" class="closebtn" onclick="closeNav()">×</a>

			<!-- Overlay content -->
			<section class="overlaynav-content">

			<div id='menu_items' class="w3-row w3-white w3-opacity " style='font-size:1.5em;'>
      <div class="w3-col s6">
        <button class="w3-button  w3-block w3-hover-blue-grey  " onclick="menuTabChange('Settings')"><i class="fa fa-gear w3-margin-right"></i>Settings</button>
      </div>

      <div class="w3-col  s6">
        <button href="#plans" class="w3-button w3-block w3-hover-blue-grey  "
          onclick="menuTabChange('Directions')"><i class="fa fa-map w3-margin-right"></i>Directions</button>
      </div>

    </div>


			<div class="tabContent w3-margin-top" id="Links">
			<a href="/" onclick="closeNav()" class="w3-hover-white">Home</a>
				<a href="/about" onclick="closeNav()" class="w3-hover-white">About</a>
				<a href="/feedback" onclick="closeNav()" class="w3-hover-white">Feedback</a>

			</div>

			<div class="tabContent" id="Directions">
			<button onclick="menuTabChange('Links')" class="w3-btn w3-text-white w3-hover-opacity"><i class="fa fa-bars w3-margin-right"></i>Main Menu</button>
			<div class="w3-container w3-margin-top">
					<label class="w3-text-white w3-large ">Show Path to...</label><br><br>
						<select id="directionsToInput" style="max-width: 250px; margin:auto" class="w3-select" name="directionsTo">
							<option value="null" selected> </option>
							<option value="kayeEdmontonClinic">Kaye Edmonton Clinic</option>
							<option value="radiologyUAH">Radiology UAH</option>
							<option value="mainCafeteria">Main Cafeteria</option>
							<option value="2J2">Unit 2J2</option>
						</select>
						<br><br>	
					<label class="w3-text-white w3-large ">From</label><br><br>
					<select id="directionsFromInput" style="max-width: 250px; margin:auto" class="w3-select" name="directionsFrom">
							<option value="null" selected> </option>
							<option value="kayeEdmontonClinic">Kaye Edmonton Clinic</option>
							<option value="radiologyUAH">Radiology UAH</option>
							<option value="mainCafeteria">Main Cafeteria</option>
							<option value="2J2">Unit 2J2</option>
						</select>
					<br><br>	
					<button id="showPathsBtn" class="w3-button w3-dark-grey" 
						autocomplete="off" onclick="event.preventDefault();showRequestedPaths();closeNav() "
						>Show Path</button>							
					</div>

					<br><br>
					<button onclick="toggleAllPaths();closeNav()" id="pathsBtn" class="w3-btn w3-text-white w3-hover-opacity">Show All Paths</button>
			</div>
			
			<div class="tabContent" id="Settings">
				<button onclick="menuTabChange('Links')" class="w3-btn w3-text-white w3-hover-opacity"><i class="fa fa-bars w3-margin-right"></i>Main Menu</button>
				
				<form class="w3-padding-large" action="/cookie/set" method="GET">
				<div class="w3-container w3-margin-top">
					<label class="w3-text-white w3-large ">Set Map Center and Zoom</label><br><br>
						<input name="centerCoords" id="centerCoordsInput" style="max-width: 200px; margin:auto"
							class="w3-input w3-white" type="text">
						<input name="centerZoom" id="centerZoomInput" style="max-width: 200px; margin:auto"
						class="w3-input w3-white" max="20" type="number">
					</div>

					<div class="w3-container w3-margin-top">
						<button id="setMapCenterBtn" class="w3-button w3-dark-grey" 
					 onclick="event.preventDefault();setMapCenter();closeNav()"><i class="fa fa-check w3-margin-right"></i> Set Center</button>
					</div>
					
					<div class="w3-container w3-margin-top">
						<label class="w3-text-white w3-large">Location Marker Color</label><br><br>
						<input name="color" style="max-width: 100px; margin:auto" class="w3-input w3-button w3-white"
						type="color">
					</div>

					<div class="w3-container w3-margin-top">
						<label class="w3-text-white w3-large">Change Font Size</label><br><br>
						<select style="max-width: 250px; margin:auto" class="w3-select" name="fontSize">
							<option value="null" selected> </option>
							<option value="10px">Small Font</option>
							<option value="15px">Medium Font</option>
							<option value="20px">Large Font</option>
						</select>
					</div>
					
					<div class="w3-container w3-margin-top">
						<button class="w3-button w3-dark-grey" type="submit"><i class="fa fa-check w3-margin-right"></i>
							Save</button>
					</div>
				</form>
				
				<button class="w3-button w3-padding w3-white w3-large w3-margin-top" onclick="recenterMap()"
				title="Stop Location Sharing">Recenter Map</button> <br>
				<button class="w3-button w3-padding w3-white w3-large w3-margin-top" onclick=" location.reload(); "
				title="Stop Location Sharing">Refresh Map</button>
			</div>

			</section>

		</div>

	</div>

	


	<script>
var navContent = document.getElementById('myNav1');
/* map.on('scroll', L.DomEvent.disableScrollPropagation(navContent));
map.on('click', L.DomEvent.disableClickPropagation(navContent)); */
L.DomEvent.on(navContent, 'click dblclick scroll', function (ev) {
	L.DomEvent.stopPropagation(ev);
	L.DomEvent.disableScrollPropagation(navContent);
	console.log('stopped event');
});


function menuTabChange(showTab){
var i, tabcontent, tablinks;
      tabcontent = document.getElementsByClassName("tabContent");
      for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
	  }
	  if(showTab != null){
		  document.getElementById(showTab).style.display = "block";
	  }
    }

	menuTabChange('Links');

		//function to close Navigation After pressing 'ESc'
		$(window).keydown(function(event) {
			if (event.which == 27) { //27 == Key Code for ESc
				closeNav();
				console.log('Closing nav');
			}
		});


		//function to open Navigation After pressing Key M

		$(window).keydown(function(event) {
			if (event.which == 77) { //77 == Key Code for M
				openNav();
				console.log('Open nav');
			}
		});
	</script>


	<script>

		var center = "{{$centerCoords}}";
		center = center.split(",");
		console.log('center = ' + center);
		var centerMarker = L.marker([53.521217, -113.522732]).bindPopup('UofA Hospital Main Entrance');
		var floor1url = 'https://elasticbeanstalk-us-east-2-203326335658.s3.us-east-2.amazonaws.com/floorplan1.png';
		var floor2url = 'https://elasticbeanstalk-us-east-2-203326335658.s3.us-east-2.amazonaws.com/floorplan2.png';
		var arr = [0, 0, 0];
		var currentCoord = '';
		var prevCoord = '';
		var pastCoord = '';
		var counter = 0;
		var x; //current location
		var p; //previous location
		var pp; //past location
		var coordPopup = L.popup();

		var floor1Bounds = [
				[53.522184, -113.525419],
				[53.519451, -113.521535]
			],
			firstFloorImage = L.imageOverlay(floor1url, floor1Bounds, {
				opacity: 0.7,
				interactive: true,
			});

		var floor2Bounds = [
				[53.521833, -113.525398],
				[53.519451, -113.521535]
			],
			secondFloorImage = L.imageOverlay(floor2url, floor2Bounds, {
				opacity: 0.7,
				interactive: true,
			});

		var pedwaylatlngs = [
			[53.52037, -113.525395],
			[53.520363, -113.526096],
			[53.519151, -113.526086],
			[53.519151, -113.526406]
		];
		var pedway = L.polyline(pedwaylatlngs, {
			color: '#50C7E9',
			weight: 8,
			lineCap: 'butt',
		}).bindPopup('Second Floor Pedway Between UofA Hospital and Kaye Edmonton Clinic');
		
		var main = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
			attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
			maxZoom: 20,
			id: 'mapbox/streets-v11',
			tileSize: 512,
			zoomOffset: -1,
			accessToken: 'pk.eyJ1IjoiZGV2dGVra2VuNDgyIiwiYSI6ImNrN21nN2oxdTAwMHMzZW4xc3hwcmljdnMifQ.1bf42iYapSNIQ_PS8D9DbQ'
		});
		var firstFloorMap = L.layerGroup([firstFloorImage]);
		var secondFloorMap = L.layerGroup([secondFloorImage, pedway]);
		
		var map = L.map('map', {
			center: center,
			zoom: {{$centerZoom}},
			layers: [main, secondFloorMap, centerMarker]
		});



		/* 		googleStreets = L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
					maxZoom: 20,
					subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
				}).addTo(map); */

		var parkingMarker = L.marker([53.51978872112979, -113.52213084697725]).bindPopup('Parking'),
			radiologyMarker = L.marker([53.52067209847866, -113.52413713932039]).bindPopup('Radiology Department'),
			helpDeskMarker = L.marker([53.521326, -113.524185]).bindPopup('Help Desk');

		var markers = L.layerGroup([parkingMarker, radiologyMarker, helpDeskMarker]);

		var baseMaps = {
			"1st Floor": firstFloorMap,
			"2nd Floor": secondFloorMap,
		};

		var overlays = {
			"Markers": markers,
		}


		var controls = L.control.layers(baseMaps, overlays, {collapsed:false}).addTo(map);


		var stairsMarker1stFloor = L.marker([53.520605, -113.524552]).bindPopup('Stairs to go up to 2nd Floor Level').addTo(firstFloorMap).openPopup();
		var stairsMarker2ndFloor = L.marker([53.520518, -113.524601]).bindPopup('Stairs to go down to 1st Floor Level').addTo(secondFloorMap).openPopup();
	
		var coordsBetweenCafeteriaAndStairs1stFloor = [
			[53.520919, -113.523939], //cafeteria starting point
			[53.521032, -113.523937], //2nd point
			[53.52103, -113.524552], //3
			[53.520605, -113.524552], //Stairs btw 1st and 2nd Floor
			
		];
		var pathBetweenCafeteriaAndStairs1stFloor = L.polyline(coordsBetweenCafeteriaAndStairs1stFloor, {
			color: 'green',
			weight: 5,
			lineCap: 'butt',
		}).bindPopup('Path Between UofA Hospital Cafeteria And Kaye Clinic Radiology').addTo(firstFloorMap);
		var coordsBetweenStairsAndMRI1stFloor = [
			[53.520605, -113.524552], //Stairs btw 1st and 2nd Floor
			[53.520606, -113.524306], //Point 1 to MRI
			[53.520185, -113.524305], //Point 2 
			[53.520186, -113.524734], //Point 3  
			[53.520129, -113.524733], //Final point at MRI CLinic  
			
		];
		var pathBetweenStairsAndMRI1stFloor = L.polyline(coordsBetweenStairsAndMRI1stFloor, {
			color: 'purple',
			weight: 5,
			lineCap: 'butt',
		}).bindPopup('Path to University Hospital MRI Clinic').addTo(firstFloorMap);

		var coordsBetweenStairsAndKayeClinic2ndFloor = [
			[53.520518, -113.524601], //Stairs btw 1st and 2nd Floor
			[53.520374, -113.524596],
			[53.52037, -113.525395], //Pedway point 1, 2nd floor UAH side
			[53.520363, -113.526096],
			[53.519151, -113.526086],
			[53.519151, -113.526406], //Pedway point 4, 2nd floor KEC side
			[53.519144, -113.526546],
			[53.518876, -113.526551], // KEC Radiology Ending point
		];
		var pathBetweenStairsAndKayeClinic2ndFloor = L.polyline(coordsBetweenStairsAndKayeClinic2ndFloor, {
			color: 'green',
			weight: 5,
			lineCap: 'butt',
		}).bindPopup('Path Between UofA Hospital Cafeteria And Kaye Clinic Radiology');

		var coordsBetweenStairsAndRadiologyUAH2ndFloor= [
			[53.520518, -113.524601], //Stairs btw 1st and 2nd Floor
			[53.520518, -113.524294], // 2nd point between stairs and Radz UAH 2nd FLoor 
			[53.520617, -113.524293], //3rd point, in front of Radz UAH 2nd FLoor
			[53.520621, -113.524148], // Final point to UAH Radiology 2nd Floor
		];
		var pathBetweenStairsAndRadiologyUAH2ndFloor = L.polyline(coordsBetweenStairsAndRadiologyUAH2ndFloor, {
			color: 'purple',
			weight: 5,
			lineCap: 'butt',
		}).bindPopup('Path UAH Radiology 2nd Floor');

		var coordsBetweenRadiologyUAH2ndFloorAnd2J2= [
			[53.520617, -113.524293], //Point, in front of Radz UAH 2nd FLoor
			[53.521019, -113.524291],
			[53.521021, -113.523381], //3rd point at intersection to 2J2
			[53.521027, -113.523227], // Final point to 2J2 
		];
		var pathBetweenRadiologyUAH2ndFloorAnd2J2 = L.polyline(coordsBetweenRadiologyUAH2ndFloorAnd2J2, {
			color: 'yellow',
			weight: 5,
			lineCap: 'butt',
		}).bindPopup('Path between UAH Radiology 2nd Floor and 2J2 ');

		var coordsBetweenUAH2ndFloorParkingAnd2J2= [
			[53.519851, -113.522193], //Point at 2nd Floor parking
			[53.520163, -113.522705],
			[53.520166, -113.523375], // First Main intersection between 2nd Floor parking and UAH
			[53.521021, -113.523381], //3rd point at intersection to 2J2
		];
		var pathBetweenUAH2ndFloorParkingAnd2J2 = L.polyline(coordsBetweenUAH2ndFloorParkingAnd2J2, {
			color: 'grey',
			weight: 5,
			lineCap: 'butt',
		}).bindPopup('Path between UAH 2nd Floor Parking and 2J2 ');

		var coordsBetweenUAH2ndFloorParkingAndRadiologyUAH= [
			[53.520166, -113.523375], // First Main intersection between 2nd Floor parking and UAH 
			[53.520166, -113.524297], // At intersection to Radz 2nd floor UAH
			[53.520518, -113.524294], // Point between stairs and Radz UAH 2nd FLoor
		];
		var pathBetweenUAH2ndFloorParkingAndRadiologyUAH = L.polyline(coordsBetweenUAH2ndFloorParkingAndRadiologyUAH, {
			color: 'lightgreen',
			weight: 5,
			lineCap: 'butt',
		}).bindPopup('Path between UAH Radiology 2nd Floor and Parking 2nd Floor ');
		
		
		var firstFloorPaths = new L.layerGroup([pathBetweenCafeteriaAndStairs1stFloor,pathBetweenStairsAndMRI1stFloor]); 
		
		var secondFloorPaths = new L.layerGroup([pathBetweenStairsAndKayeClinic2ndFloor,pathBetweenStairsAndRadiologyUAH2ndFloor, pathBetweenRadiologyUAH2ndFloorAnd2J2, pathBetweenUAH2ndFloorParkingAnd2J2, pathBetweenUAH2ndFloorParkingAndRadiologyUAH]); 

		var showingAllPaths = false;	
		function toggleAllPaths(){
			showingAllPaths =! showingAllPaths;
			if(showingAllPaths) {
				document.getElementById('pathsBtn').innerText = 'Hide All Paths';
				secondFloorPaths.addTo(secondFloorMap);
				firstFloorPaths.addTo(firstFloorMap);
			}
			else{
				document.getElementById('pathsBtn').innerText = 'Show All Paths';
				secondFloorPaths.remove();
				firstFloorPaths.remove();
			}
		}

		var requestedPathsLayerGroup = new L.layerGroup([]);
		function showRequestedPaths(){
			if(showingAllPaths){toggleAllPaths()};
			var directionToPath = document.getElementById("directionsToInput").value;
			var directionFromPath = document.getElementById("directionsFromInput").value;
			console.log(directionToPath);
			console.log(directionFromPath);
			requestedPathsLayerGroup.clearLayers();
			if(directionToPath == 'kayeEdmontonClinic' && directionFromPath == 'radiologyUAH'){
				var requestedPathTo = pathBetweenStairsAndKayeClinic2ndFloor.setStyle({color:'black'});
				var requestedPathFrom = pathBetweenStairsAndRadiologyUAH2ndFloor.setStyle({color:'black'});
				requestedPathTo.addTo(requestedPathsLayerGroup);
				requestedPathFrom.addTo(requestedPathsLayerGroup);
				requestedPathsLayerGroup.addTo(secondFloorMap);
			}
			if(directionToPath == 'kayeEdmontonClinic' && directionFromPath == '2J2'){
				var requestedPathTo = pathBetweenStairsAndKayeClinic2ndFloor.setStyle({color:'black'});
				var requestedPathbetween = pathBetweenStairsAndRadiologyUAH2ndFloor.setStyle({color:'black'});
				var requestedPathFrom = pathBetweenRadiologyUAH2ndFloorAnd2J2.setStyle({color:'black'});
				requestedPathTo.addTo(requestedPathsLayerGroup);
				requestedPathFrom.addTo(requestedPathsLayerGroup);
				requestedPathbetween.addTo(requestedPathsLayerGroup);
				requestedPathsLayerGroup.addTo(secondFloorMap);
			}
		}

			var divMarkerRadPats = new L.Marker([53.51876, -113.52683], {
				icon: new L.DivIcon({
					className: '',
					html: '<span style="text-align: center">Radiology</span><br><span style="text-align: center">Patient Area</span>'
				})
			});
			var divMarkerRadStaff = new L.Marker([53.518423, -113.526814], {
				icon: new L.DivIcon({
					className: '',
					html: '<span style="text-align: center">Radiology</span><br><span style="text-align: center">Staff Area</span>'
				})
			});

			
			var rectRadPatsBounds = [
				[53.51888, -113.527026],
				[53.518565, -113.5265]
			];
			var rectRadPats = new L.rectangle(rectRadPatsBounds).bindTooltip('Radiology Patients Area');

			var rectRadStaffBounds = [
				[53.518534, -113.527023],
				[53.51825, -113.526496]
			];
			var rectRadStaff = new L.rectangle(rectRadStaffBounds).bindTooltip('Radiology Staff Area');

			var kayeClinicRadiologyGroup = new L.layerGroup([divMarkerRadPats, divMarkerRadStaff, rectRadPats, rectRadStaff]).addTo(secondFloorMap);
		var rect1Bounds = [
			[53.520515, -113.523949],
			[53.520484, -113.523893]
		];

	

		var rect1 = new L.rectangle(rect1Bounds).bindTooltip('2A1');
		var divMarker1 = new L.Marker(center, {
			icon: new L.DivIcon({
				className: 'my-div-icon',
				html: '<span class="w3-text-white">Hallway</span>'
			})
		});
		var pedwayRemoved;

		function onZoomShow() {
			var zoomx = map.getZoom();
			console.log('Zoom level is = ' + zoomx);

			if (zoomx < 17 && !pedwayRemoved) {
				pedway.remove();
				kayeClinicRadiologyGroup.remove();
				pedwayRemoved = true;
				console.log('Pedway removed on zoom out');
			}
			if (zoomx >= 17 && pedwayRemoved) {
				pedway.addTo(secondFloorMap);
				kayeClinicRadiologyGroup.addTo(secondFloorMap);
				pedwayRemoved = false;
				console.log('Pedway added after being removed');
			}
		}

		map.on('zoomend', onZoomShow);




		function locateMe(map) {
			document.getElementById('btn-loader').style.display = 'block';
			document.getElementById('find').style.backgroundColor = '#555';
			map.locate({
				setView: true,
				maxZoom: 19,
				watch: true,
				enableHighAccuracy: true,
			});
			console.log('Locating true...');
		}

		//locateMe(map);

		function onLocationError(e) {
			alert(e.message);
		}
		map.on('locationerror', onLocationError);

		function onLocationFound(e) {
			var demo = "{{$demo ? $demo : 'true'}}";
			console.log('Demo = ' + demo);
			if (demo) {
				var rand = Math.random() / 5000;
				e.latlng.lat = e.latlng.lat + rand;
				e.latlng.lng = e.latlng.lng + rand;
			}

			counter++;
			console.log('counter = ' + counter);
			console.log('color = ' + '{{$color}}');
			var radius = e.accuracy / 2;
			if (counter == 1) {
				document.getElementById('find').style.display = 'none';
				document.getElementById('stop').style.display = 'block';
				x = L.circleMarker(e.latlng, {
						color: "{{$color ? $color : 'green'}}"
					})
					.bindTooltip("You are within " + radius + " meters from this point")
					.addTo(map).openTooltip(e.latlng);
			} else {
				x.remove();
				x = L.circleMarker(e.latlng, {
						color: "{{$color ? $color : 'green'}}"
					})
					.bindPopup("Your current approximate location")
					.addTo(map);
			}


			arr.push(e.latlng);
			if (arr.length > 3) {
				arr.shift();
			}

			currentCoord = arr[2];
			prevCoord = arr[1];
			pastCoord = arr[0];



			if (counter == 2) {
				p = L.circleMarker(prevCoord, {
						radius: 7,
						color: '#848D99'
					})
					.bindPopup("Your previous location")
					.addTo(map);
			} else if (counter > 2) {
				p.remove();
				p = L.circleMarker(prevCoord, {
						radius: 7,
						color: '#848D99'
					})
					.bindPopup("Your previous location")
					.addTo(map);
			}


			if (counter == 3) {
				pp = L.circleMarker(pastCoord, {
						radius: 5,
						color: '#848D99'
					})
					.bindPopup("Your past location")
					.addTo(map);
			} else if (counter > 3) {
				pp.remove();
				pp = L.circleMarker(pastCoord, {
						radius: 5,
						color: '#848D99'
					})
					.bindPopup("Your past location")
					.addTo(map);
			}
		}

		map.on('locationfound', onLocationFound);




		function onMapDblClick(t) {
			coordPopup.setLatLng(t.latlng)
				.setContent("You clicked the map at " + t.latlng.toString()).openOn(map);

		}

		map.on('dblclick', onMapDblClick);


		function stopLocating(map) {
			map.stopLocate();
			console.log('Stopped Locating');
			coordPopup.setLatLng(currentCoord).addTo(map)
				.setContent("Stopped Location Sharing")
				.openPopup(currentCoord);

			x.remove();
			if (counter >= 2) {
				p.remove();
			}
			if (counter >= 3) {
				pp.remove();
			}
			counter = 0;
			document.getElementById('find').style.display = 'block';
			document.getElementById('find').style.backgroundColor = '';
			document.getElementById('btn-loader').style.display = 'none';
			document.getElementById('stop').style.display = 'none';
		}

		function recenterMap() {
			console.log('Zoom = ' + map.getZoom());
			map.setView(center, 17);

		}

		function success() {
			console.log('Sweet success - image loaded');
			console.log('Zoom = ' + map.getZoom());
		}


		function openNav() {
			document.getElementById("myNav1").style.height = "100%";
			document.getElementById("myNav1").click();
		}

		/* Close when someone clicks on the "x" symbol inside the overlay Nav Bar */
		function closeNav() {
			document.getElementById("myNav1").style.height = "0%";
		}
		



		function setMapCenter() {
			var centerCoords = document.getElementById("centerCoordsInput").value;
			var centerZoom = document.getElementById("centerZoomInput").value;
			ajaxSetMapCenter(centerCoords, centerZoom);
			centerCoords = centerCoords.split(",");
			map.setView(centerCoords, centerZoom);
		}

		


		var baseLayerChange = false;	
		function changeInfoDivMessage(){
			baseLayerChange =! baseLayerChange;
			if(baseLayerChange) {document.getElementById('infoDiv').innerText = 'Viewing First Floor Map of University Hospital';}
			else{document.getElementById('infoDiv').innerText = 'Viewing Second Floor Map of University Hospital';}
		}

		map.on('baselayerchange', changeInfoDivMessage );

		function ajaxSetMapCenter(centerCoords, centerZoom) {
			$.ajax({
				type: 'get',
				url: '/cookie/setCenterCookie',
				data: {
					'centerCoords': centerCoords,
					'centerZoom': centerZoom
				},
				success: function(data) {
					console.log(centerCoords + 'set successfully');
				}
			});
		}
	</script>










</body>

</html>