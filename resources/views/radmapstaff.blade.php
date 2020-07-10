@extends('layouts.map')

@section('content')

	@include('components.rad-mainmenu')
	
	@include('components.rad-loader')

	<div id="infoDivContainer" class="w3-center " style="margin: 0px auto; position:absolute; z-index: 1000; width: 100%; ">
		<div id="infoDiv" class="w3-black w3-padding " style=" font-size: {{$fontSize}}; ">
			Viewing Second Floor Map 
		</div>
 
		<div class="w3-row w3-light-grey " style="max-width:600px; margin:0 auto;" >		
			<input class="w3-col s9 w3-light-grey w3-input w3-white" style="width:70%;"  type="text" name="search" placeholder="Search Locations" id="searchBar">
			<button class="w3-col s1 w3-blue w3-btn" style="width:10%; padding: 8px" onclick="clearSearchInput()"><i class="fa fa-close"></i></button>
			<button id="hideBtn" class="w3-col s1 w3-black w3-btn w3-right" style="width:10%; padding: 8px"> <i class="fa fa-arrow-up"></i></button>
			<div class="w3-col s1 w3-grey w3-dropdown-click" style="width:10%;">
			<button class="w3-grey w3-btn" onclick="toggleDropDown()"><i class="fa fa-user"></i></button>
			<div id="dropDownContent" class="w3-dropdown-content w3-bar-block w3-card-4 w3-animate-zoom">
			<a href="{{ route('logout') }}" class="w3-bar-item w3-button"
			onclick="event.preventDefault();document.getElementById('logout-form').submit();">{{ __('Logout') }}</a>
			<form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
			@csrf</form>
			</div>
		</div>

			<div id="results" style="position: relative; margin-top: 10%; z-index:1100" class="w3-hide"></div>
		</div>
			
	</div>

	<div id="map">


		<button id="findBtn" class="myBtn w3-light-green" style="font-size:{{$fontSize}}"
			title="Find My Location">Locate
			<span id="btn-loader" style="display:none" class="loader-1" title="Find My Location"></span>
		</button>
		<button id="stopBtn" style="display: none" class="myBtn w3-pale-red" 
			title="Stop Location Sharing">Stop</button>

		<button id="menuBtn" class="menuBtn" style="background-color:{{$color}}" title="Open Menu">
			<i class="fa fa-bars "></i></button>

		<button id="clearPathBtn" class="menuBtn" style="position: relative; margin-top: 35px; " title="Clear Map">
			<i class="fa fa-undo "></i></button>



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
	const floor2details_url =
			'https://elasticbeanstalk-us-east-2-203326335658.s3.us-east-2.amazonaws.com/floor2details2.png';

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
		const floor2DetailsBounds = [
				[53.521047, -113.52434],
				[53.520111, -113.52332]
			],
			 floor2DetailsImage = L.imageOverlay(floor2details_url, floor2DetailsBounds, {
				opacity: 1,
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
	const kayeClinicMarker = L.marker([53.518729084031214, -113.52677643299104])
	.bindPopup('<br> For Edmonton Clinic Body CT/MRI/Ultrasound, take elevator to Floor 0 or call 407-5020 OR 407-5045 <br>For Edmonton Clinic MSK MRI/Fluoro, take elevator to  Floor 0 or call 407-5021');
	const point24Marker = L.marker([53.52010627846002, -113.52474868297578]).bindPopup('MRI Clinic Reporting: 780-407-7003'),
    point27Marker = L.marker([53.520104371655584, -113.52429538965228]).bindPopup('Pediatrics/Fluoroscopy and Radiography 780-407-1630');
	const floor1staffMarkers = L.layerGroup([point24Marker, point27Marker]);
	const firstFloorMapOverlay = L.layerGroup([floor1staffMarkers]);
	const secondFloorMapOverlay = L.layerGroup([kayeClinicMarker]);
	const secondFloorDetailedMapOverlay = L.layerGroup([floor2DetailsImage]);
	const mapOverlay = L.layerGroup();
	const firstFloorMap = L.layerGroup([firstFloorImage, firstFloorMapOverlay]);
	const secondFloorMap = L.layerGroup([secondFloorImage, secondFloorMapOverlay]);
	const secondFloorDetailedMap = L.layerGroup([secondFloorMap, secondFloorDetailedMapOverlay]);

	const map = L.map('map', {
		zoomControl: false,
		center: center,
		zoom: centerZoom,
		layers: [main, secondFloorDetailedMap, centerMarker]
	});
		

	const baseMaps = {
        "1st Floor": firstFloorMap,
		"2nd Floor": secondFloorMap,
		"2nd Floor Detailed": secondFloorDetailedMap,
    };



    const controls = L.control.layers(baseMaps).addTo(map);
	const controlsContainer = controls.getContainer(); 
	controlsContainer.style.marginTop =  '80px';

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

	const onZoomShowStaff = () => {
			let zoomstaff = map.getZoom();
			if (zoomstaff < 19) {
				if(map.hasLayer(secondFloorDetailedMapOverlay)){
					map.removeLayer(secondFloorDetailedMapOverlay);
				}
			}
			else {
				if(!map.hasLayer(secondFloorDetailedMapOverlay)){
					secondFloorDetailedMapOverlay.addTo(map);
				}

			}
		}

		map.on('zoomend', onZoomShowStaff);


		const ajaxGetGeoJsonStaff = () => {
    $.ajax({
        dataType: "json",
        url: '/staffData.json',
        success: function(data) {
            L.geoJSON(data, {
				onEachFeature: popupStaff,
				pointToLayer: function (feature, latlng) {
                    return L.circleMarker(latlng, {color: 'blue'});
                },
                style: function(feature) {
                    switch (feature.properties.size) {
                        case 'small': return {color: "blue", fillColor: "red", radius: 5};
                    }
                    switch (feature.properties.floor) {
                        case 'second': return {color: "blue", fillColor: "red", radius: 8};
                    }
                },

            }).addTo(secondFloorDetailedMapOverlay);
        },
        error: function (xhr) {
            console.log('Error - probably with parsing JSON data');
            console.log(xhr);
          }
    });
}
ajaxGetGeoJsonStaff();
const popupStaff = (feature, layer) => {	
if (feature.properties && feature.properties.popupContent) {
	layer.bindPopup(feature.properties.popupContent);
	}
}

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
		  if (result.value) {
			  console.log(result.value);
			  map.removeLayer(secondFloorMap);
			  map.removeLayer(secondFloorDetailedMap);
			  map.addLayer(firstFloorMap);
		  } else {
			console.log(result.value);
			  map.removeLayer(firstFloorMap);
			  map.addLayer(secondFloorMap);
		  } ;
	 
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

    const showSearchMarker = (firstFloor, lat, lng, pointName, description) => {
        if(firstFloorMapOverlay.hasLayer(searchMakerLayer)){firstFloorMapOverlay.removeLayer(searchMakerLayer)};
        if(secondFloorMapOverlay.hasLayer(searchMakerLayer)){secondFloorMapOverlay.removeLayer(searchMakerLayer)};
		searchMakerLayer.clearLayers();
		searchMarker['Latlng'] = [lat, lng];
		searchMarker['pointName'] = pointName;
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
        return L.marker([lat, lng]).bindPopup(description + '<br><button id="searchMarkerBtn">Show Path To here</button>').addTo(searchMakerLayer).openPopup();
        } else {
        searchMakerLayer.addTo(secondFloorMapOverlay);
        map.removeLayer(firstFloorMap);
        map.addLayer(secondFloorMap);
		return L.marker([lat, lng]).bindPopup(description + '<button id="searchMarkerBtn">Show Path To here</button>').addTo(searchMakerLayer).openPopup();
        }

	}	
	const toggleDropDown = () => {
		var x = document.getElementById("dropDownContent");
		if (x.className.indexOf("w3-show") == -1) {
			x.className += " w3-show";
		} else { 
			x.className = x.className.replace(" w3-show", "");
		}
	}



</script>


@endsection
