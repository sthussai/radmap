@extends('layouts.map')

@section('content')

	@include('components.rad-mainmenu')

	@include('components.rad-loader')

	<div id="infoDivContainer" class="w3-center"  style="margin: 0px auto; position:absolute; z-index: 1000; width: 100%; ">
		<div id="infoDiv" data-intro="This shows the current floor map you're viewing" data-step=1 class="w3-black w3-padding " style=" font-size: {{$fontSize}}; ">
			Viewing First Floor Map 

		</div>
		<div class="w3-row w3-light-grey " style="max-width:600px; margin:0 auto;" >
			<input data-intro='Use this search bar to search for locations and display paths to them from your current location' 
			class="w3-col s9 w3-light-grey w3-input w3-white" style="width:80%;"  type="text" name="search" placeholder="Search Locations (e.g. Unit 1D, 2C3, Cafeteria...)" id="searchBar">
			<button class="w3-col s1 w3-blue w3-btn" style="width:10%; padding: 8px" onclick="clearSearchInput()"><i class="fa fa-close"></i></button>
			<button id="hideBtn" class="w3-col s1 w3-black w3-btn w3-right" style="width:10%; padding: 8px"> <i class="fa fa-arrow-up"></i></button>
			<div id="results" style="position: relative; margin-top: 10%; z-index:1100" class="w3-hide"></div>
			</div>
			
	</div>

	
<script>
		var mapDiv = document.createElement("DIV");
	mapDiv.setAttribute("id", "map"); 
	mapDiv.setAttribute("class", "map"); 
	document.body.appendChild(mapDiv);
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

		const map = L.map(mapDiv, {
			zoomControl: false,
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
		const controlsContainer = controls.getContainer(); 
		controlsContainer.style.marginTop =  '80px';
		controlsContainer.setAttribute("data-intro", "Use this to switch between map floors");


	let showInfo = true;
		const infoDivContainer = document.getElementById("infoDiv");
		const infoDivContainerHeight = document.getElementById("infoDivContainer").offsetHeight;

		
		$("#hideBtn").click(function(){ 
			$('#infoDiv').slideToggle(100);
			if(showInfo){
				$("#hideBtn").html("<i class='fa fa-arrow-down'></i>");

			}
			else {
				$("#hideBtn").html("<i class='fa fa-arrow-up '></i>");

			}
			showInfo =! showInfo;
		});
		


		const changeFloorModal = () => {
			
		Swal.fire({
		title: 'RadMap',
			icon: 'question',
			html:'<div class="w3-btn w3-small" style="background-color:#C9DAE1;" id="tourBtn">Take a tour</div> '+ 
			'<br>Which floor map would you like to view?',
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


	/* $('#infoDiv').click(function(){
		changeFloorModal()
	}); */


	const clearSearchInput = () =>{
		document.getElementById('searchBar').value='';
		$('#results').addClass('w3-hide');
	}
			const ajaxSearch = () => {
				let value = $("#searchBar").val();
				$.ajax({
				type: 'get',
				url: '/search',
				data: {
					'search': value
				},
				success: function(data) {
					console.log(data);
					$('#results').html(data);
					$('#results').removeClass('w3-hide');
				}
				});
			}
		
			$('#searchBar').on('keyup', function() {
				ajaxSearch();
			});



		const searchMakerLayer = L.layerGroup();
		

		let searchMarker = {};

		const showSearchMarker = (firstFloor, lat, lng, pointName, description, lineCoords) => {
			if(firstFloorMapOverlay.hasLayer(searchMakerLayer)){firstFloorMapOverlay.removeLayer(searchMakerLayer)};
			if(secondFloorMapOverlay.hasLayer(searchMakerLayer)){secondFloorMapOverlay.removeLayer(searchMakerLayer)};
			searchMakerLayer.clearLayers();
			searchMarker['Latlng'] = [lat, lng];
			searchMarker['pointName'] = pointName;
			lineCoords = JSON.parse("[" + lineCoords + "]");
			searchMarker['lineCoords'] = lineCoords;
			map.setView(searchMarker['Latlng']);
			setTimeout(() => {
				$('#infoDiv').click();
				clearSearchInput();
				console.log('info div clicked')
			}, 500);
			if(firstFloor){
			searchMakerLayer.addTo(firstFloorMapOverlay);
			map.removeLayer(secondFloorMap);
			map.addLayer(firstFloorMap);
			return L.marker([lat, lng]).bindPopup(description + '<br><button id="searchMarkerBtn">Show Path From My Location</button>').addTo(searchMakerLayer).openPopup();
			} else {
			searchMakerLayer.addTo(secondFloorMapOverlay);
			map.removeLayer(firstFloorMap);
			map.addLayer(secondFloorMap);
			return L.marker([lat, lng]).bindPopup(description + '<br><button id="searchMarkerBtn">Show Path From My Location</button>').addTo(searchMakerLayer).openPopup();
			}

		}	

</script>
    

<!-- 		<button id="test" class="menuBtn" style="position: absolute; margin-top: 80px ; " >Test </button> -->
		<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/intro.js/2.9.3/introjs.min.css">
		<script src="https://cdnjs.cloudflare.com/ajax/libs/intro.js/2.9.3/intro.js"></script>
		<script>
			$('#tourBtn').click(function(){
					console.log('start')
					introJs().setOption('hideNext', true).setOption('scrollToElement', true).start() //start introduction for element id='intro-farm'
			});
		</script>

		<button data-intro="Use this button to show and track your location on the map" id="findBtn" class="myBtn w3-light-green" style="font-size:{{$fontSize}}"
			title="Find My Location">Locate
			<span id="btn-loader" style="display:none" class="loader-1" title="Find My Location"></span>
		</button>
		<button id="stopBtn" style="display: none" class="myBtn w3-pale-red" 
			title="Stop Location Sharing">Stop</button>

		<button data-intro="Use this button to open the menu" id="menuBtn" class="menuBtn" style="background-color:{{$color}}" title="Open Menu">
			<i class="fa fa-bars "></i></button>

		<button data-intro="Use this button clear the map of location markers" id="clearPathBtn" class="menuBtn" style="position: absolute; margin-top: 35px; " title="Clear Map">
			<i class="fa fa-undo "></i></button>




	



@endsection