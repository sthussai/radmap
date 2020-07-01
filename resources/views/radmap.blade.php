@extends('layouts.map')

@section('content')

	@include('components.rad-loader')
	<div id="infoDivContainer" class="w3-center ">
		<div id="infoDiv" class="w3-black w3-padding " style=" font-size: {{$fontSize}}; ">
			Viewing First Floor Map of University Hospital
		</div>
	</div>

	<div id="map">
	<div class="w3-center" style="margin: 0px auto; position:absolute; z-index: 1000; width: 100% ">
				<span id="hideBtn" style="display: none;" class="w3-grey w3-button"> <i class="fa fa-arrow-up w3-margin-right"></i><b>Hide</b></span>
			</div>




		<button id="findBtn" class="myBtn" style="font-size:{{$fontSize}}"
			title="Find My Location">Locate
			<span id="btn-loader" style="display:none" class="loader-1" title="Find My Location"></span>
		</button>
		<button id="stopBtn" style="display: none" class="myBtn" 
			title="Stop Location Sharing">Stop</button>

		<button id="menuBtn" class="menuBtn" style="background-color:{{$color}}" title="Open Menu">
			<i class="fa fa-bars "></i></button>

		<button id="clearPathBtn" class="menuBtn" style="position: relative; margin-top: 35px; " title="Open Menu">
			<i class="fa fa-undo "></i></button>

	@include('components.rad-mainmenu')

	</div>

	
<script>

	let center = "{{$centerCoords}}";
	let centerZoom = "{{$centerZoom}}";
	//	let demo = "{{$demo ? $demo : false}}";
	let demo = false;
	let markerColor = "{{$color}}";
	center = center.split(",");
	const centerMarker = L.marker([53.521217, -113.522732]).bindPopup('UofA Hospital Main Entrance');
	const floor1url = 'https://elasticbeanstalk-us-east-2-203326335658.s3.us-east-2.amazonaws.com/floorplan1.png';
	const floor2url = 'https://elasticbeanstalk-us-east-2-203326335658.s3.us-east-2.amazonaws.com/floorplan2.png';

	const floor1Bounds = [
		[53.522184, -113.525419],
			[53.519451, -113.521535]
		],
		firstFloorImage = L.imageOverlay(floor1url, floor1Bounds, {
			opacity: 0.7,
			interactive: true,
		});
		
		const floor2Bounds = [
			[53.521833, -113.525398],
			[53.519451, -113.521535]
		],
		secondFloorImage = L.imageOverlay(floor2url, floor2Bounds, {
			opacity: 0.7,
			interactive: true,
		});


	const main = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
		attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
		maxZoom: 20,
		id: 'mapbox/streets-v11',
		tileSize: 512,
		zoomOffset: -1,
		accessToken: 'pk.eyJ1IjoiZGV2dGVra2VuNDgyIiwiYSI6ImNrN21nN2oxdTAwMHMzZW4xc3hwcmljdnMifQ.1bf42iYapSNIQ_PS8D9DbQ'
	});
	const firstFloorMapOverlay = L.layerGroup();
	const secondFloorMapOverlay = L.layerGroup();
	const mapOverlay = L.layerGroup();
	const firstFloorMap = L.layerGroup([firstFloorImage, firstFloorMapOverlay]);
	const secondFloorMap = L.layerGroup([secondFloorImage, secondFloorMapOverlay]);

	const map = L.map('map', {
		center: center,
		zoom: centerZoom,
		layers: [main, firstFloorMap , centerMarker]
	});

	const firstFloorHelpDesk = L.marker([53.521326, -113.524185]).bindPopup('First Floor Help Desk'),
	secondFloorHelpDesk = L.marker([53.520186, -113.522549]).bindPopup('Second Floor Help Desk');
		
    const helpDeskMarkers = L.layerGroup([firstFloorHelpDesk, secondFloorHelpDesk]);

	const baseMaps = {
        "1st Floor": firstFloorMap,
        "2nd Floor": secondFloorMap,
    };

	const overlays = {
        "Help Desk Markers": helpDeskMarkers,
    }

    const controls = L.control.layers(baseMaps, overlays).addTo(map);
 
	const changeFloorModal = () => {
	 	 
	 Swal.fire({
	 title: 'RadMap',
		text: 'Which floor map would you like to view?',
		icon: 'question',
		confirmButtonText: 'First Floor',
		showCancelButton: true,
		cancelButtonText: 'Second Floor',
		backdrop: false,
		  showClass: {
    popup: 'animate__animated animate__fadeInDown'
  },
  hideClass: {
    popup: 'animate__animated animate__fadeOutUp'
  }
	  }).then((result) => {
          if (!result . value) {
              map . removeLayer(firstFloorMap);
              map . addLayer(secondFloorMap);
          }
		}); 
} 

changeFloorModal()

map.on('baselayerchange', changeInfoDivMessage );
$('#infoDiv').click(function(){
	changeFloorModal()
});

	

</script>


@endsection






