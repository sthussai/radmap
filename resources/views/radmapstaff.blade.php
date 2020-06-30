@extends('layouts.map')

@section('content')

	@include('components.rad-loader')

	<div id="infoDivContainer" class="w3-center">
		<div id="infoDiv" class="w3-black w3-rest w3-padding " style=" font-size: {{$fontSize}}; ">
			Viewing Second Floor Map of University Hospital 			
		</div>
	</div>

	<div id="map">
	<div class="w3-center " style="margin: 0px auto; position:absolute; z-index: 1000; width: 100% ">
				<span id="hideBtn" style="display: none;" class="w3-grey w3-button"> 
				<i class="fa fa-arrow-up w3-margin-right"></i><b>Hide</b>
				</span>
				<a href="/home" class="w3-grey w3-button" title="Logged in staff view" > <i class="fa fa-user w3-margin-right"></i> Logged In</a>
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
	const firstFloorMapOverlay = L.layerGroup();
	const secondFloorMapOverlay = L.layerGroup();
	const mapOverlay = L.layerGroup();
	const firstFloorMap = L.layerGroup([firstFloorImage, firstFloorMapOverlay]);
	const secondFloorMap = L.layerGroup([secondFloorImage, secondFloorMapOverlay]);
	const secondFloorDetailedMap = L.layerGroup([floor2DetailsImage]);

	const map = L.map('map', {
		center: center,
		zoom: centerZoom,
		layers: [main, secondFloorMap, centerMarker]
	});
		

	const baseMaps = {
        "1st Floor": firstFloorMap,
        "2nd Floor": secondFloorMap,
    };

	const overlays = {
        "Second Floor Details": secondFloorDetailedMap,
    }

    const controls = L.control.layers(baseMaps, overlays).addTo(map);
	
	function onZoomShowStaff() {
			let zoomstaff = map.getZoom();
			if (zoomstaff < 19) {
				if(map.hasLayer(secondFloorDetailedMap)){
					map.removeLayer(secondFloorDetailedMap);
				}
			}
			else {
				if(!map.hasLayer(secondFloorDetailedMap)){
					secondFloorDetailedMap.addTo(map);
				}

			}
		}

		map.on('zoomend', onZoomShowStaff);


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
			  map.addLayer(firstFloorMap);
		  } else {
			console.log(result.value);
			  map.removeLayer(firstFloorMap);
			  map.addLayer(secondFloorMap);
		  } ;
	 
		}); 
} 

changeFloorModal()

$('#infoDiv').click(function(){
	changeFloorModal()
});



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

            }).addTo(secondFloorDetailedMap);
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


</script>


@endsection
