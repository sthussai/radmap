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
    <!-- Styles -->
    <link href="{{ asset('css/custom.css') }}" rel="stylesheet">


	<!-- Scripts -->
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
	<script src="https://unpkg.com/leaflet@1.6.0/dist/leaflet.js"
	integrity="sha512-gZwIG9x3wUXg2hdXF6+rVkLF/0Vi9U8D2Ntg4Ga5I5BZpVkVxlJWbSQtXPSiUTtC0TjtGOmxa1AJPuV0CPthew=="
	crossorigin=""></script>



</head>



<body>
	@include('components.rad-loader')

	<div id="map">

		<div class="w3-display-container " style="z-index: 1000">
		<div class="w3-display-topmiddle">
			<div id="infoDiv" class="w3-black w3-padding " style="font-size: {{$fontSize}};">Viewing Second Floor Map of University Hospital
			</div>
			<div class="w3-center">
				<span id="hidebtn" class="w3-grey w3-button">Hide</span>
			</div>
		</div>
		</div>


		<button id="findBtn" class="myBtn" style="font-size:{{$fontSize}}"
			title="Find My Location">Locate
			<span id="btn-loader" style="display:none" class="loader-1" title="Find My Location"></span>
		</button>
		<button id="stopBtn" style="display: none" class="myBtn" 
			title="Stop Location Sharing">Stop</button>

		<button id="menuBtn" class="menuBtn" style="background-color:{{$color}}" title="Open Menu">
			<i class="fa fa-bars "></i></button>

	@include('components.rad-mainmenu')

	</div>

	
<script>

var center = "{{$centerCoords}}";
var centerZoom = "{{$centerZoom}}";
var demo = "{{$demo ? $demo : false}}";
var markerColor = "{{$color}}";
center = center.split(",");
//console.log('center = ' + center);
var centerMarker = L.marker([53.521217, -113.522732]).bindPopup('UofA Hospital Main Entrance');
var floor1url = 'https://elasticbeanstalk-us-east-2-203326335658.s3.us-east-2.amazonaws.com/floorplan1.png';
var floor2url = 'https://elasticbeanstalk-us-east-2-203326335658.s3.us-east-2.amazonaws.com/floorplan2.png';

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
	zoom: centerZoom,
	layers: [main, secondFloorMap, centerMarker]
});
	

</script>


<script src="{{ asset('js/radmap.js') }}"></script>	









</body>

</html>