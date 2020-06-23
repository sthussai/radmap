@extends('layouts.map')

@section('content')

	@include('components.rad-loader')
	<div id="infoDivContainer" class="w3-center ">
		<div id="infoDiv" class="w3-black w3-padding " style=" font-size: {{$fontSize}}; ">
			Viewing Second Floor Map of University Hospital
		</div>
	</div>

	<div id="map">
	<div class="w3-center" style="margin: 0px auto; position:absolute; z-index: 1000; width: 100% ">
				<span id="hideBtn" class="w3-grey w3-button"> <i class="fa fa-arrow-up w3-margin-right"></i><b>Hide</b></span>
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
	//	var demo = "{{$demo ? $demo : false}}";
	var demo = false;
	var markerColor = "{{$color}}";
	center = center.split(",");
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


	var main = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
		attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
		maxZoom: 20,
		id: 'mapbox/streets-v11',
		tileSize: 512,
		zoomOffset: -1,
		accessToken: 'pk.eyJ1IjoiZGV2dGVra2VuNDgyIiwiYSI6ImNrN21nN2oxdTAwMHMzZW4xc3hwcmljdnMifQ.1bf42iYapSNIQ_PS8D9DbQ'
	});
	var firstFloorMapOverlay = L.layerGroup();
	var secondFloorMapOverlay = L.layerGroup();
	var mapOverlay = L.layerGroup();
	var firstFloorMap = L.layerGroup([firstFloorImage, firstFloorMapOverlay]);
	var secondFloorMap = L.layerGroup([secondFloorImage, secondFloorMapOverlay]);

	var map = L.map('map', {
		center: center,
		zoom: centerZoom,
		layers: [main, secondFloorMap, centerMarker]
	});

	
/* 	Swal.fire({
	title: 'Error!',
	text: 'Do you want to continue',
	icon: 'info',
	input: 'radio',
	inputPlaceholder: 'Select Floor Level',
	timer: 	3000,
	timerProgressBar: true
  }) */

  /* 		googleStreets = L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
                maxZoom: 20,
                subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
            }).addTo(map); */
	

</script>


@endsection






