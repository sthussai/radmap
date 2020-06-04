<div id="container">



	<div id="myNav1" class="overlaynav" onclick="">

		<!-- Button to close the overlay navigation -->
		<a href="javascript:void(0)" class="closebtn" onclick="closeNav()">×</a>

		<!-- Overlay content -->
		<section class="overlaynav-content">
			<a href="#home" onclick="closeNav()">Home</a>
			<a href="#about" onclick="closeNav()">About</a>
			<a href="#about" onclick="closeNav()">Feedback</a>
			<button class="w3-button w3-padding w3-white w3-large w3-margin-top" onclick="testfxn()"
				title="Stop Location Sharing">Recenter Map</button> <br>
			<button class="w3-button w3-padding w3-white w3-large w3-margin-top" onclick=" location.reload(); "
                title="Stop Location Sharing">Refresh Map</button>

		@livewire('hello-world')

		</section>

	</div>

<div id="mapcontainer"></div>
<script>
	document.getElementById('mapcontainer').innerHTML = "<div id='map' style='width: 100%; height: 100%;'></div>";
	var center = [53.520742, -113.523992];
	var centerMarker = L.marker([53.521217, -113.522732]).bindPopup('UofA Hospital Main Entrance');
	var floor1url = 'https://elasticbeanstalk-us-east-2-203326335658.s3.us-east-2.amazonaws.com/floorplan1.png';
	var floor2url = 'https://elasticbeanstalk-us-east-2-203326335658.s3.us-east-2.amazonaws.com/floorplan2.png';
	var floor2details_url =
		'https://elasticbeanstalk-us-east-2-203326335658.s3.us-east-2.amazonaws.com/floor2details.png';
	var arr = [0, 0, 0];
	var currentCoord = '';
	var prevCoord = '';
	var pastCoord = '';
	var counter = 0;
	var x; //current location
	var p; //previous location
	var pp; //past location
	var coordPopup = L.popup();

	var main = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
		attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
		maxZoom: 20,
		id: 'mapbox/streets-v11',
		tileSize: 512,
		zoomOffset: -1,
		accessToken: 'pk.eyJ1IjoiZGV2dGVra2VuNDgyIiwiYSI6ImNrN21nN2oxdTAwMHMzZW4xc3hwcmljdnMifQ.1bf42iYapSNIQ_PS8D9DbQ'
	});

	var floor1Bounds = [
			[53.522184, -113.525419],
			[53.519451, -113.521535]
		],
		firstFloor = L.imageOverlay(floor1url, floor1Bounds, {
			opacity: 0.7,
			interactive: true,
		});

	var floor2Bounds = [
			[53.521833, -113.525398],
			[53.519451, -113.521535]
		],
		secondFloor = L.imageOverlay(floor2url, floor2Bounds, {
			opacity: 0.7,
			interactive: true,
		});
	var floor2DetailsBounds = [
			[53.521047, -113.52434],
			[53.520111, -113.52332]
		],
		floor2Details = L.imageOverlay(floor2details_url, floor2DetailsBounds, {
			opacity: 1,
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
		weight: 5,
		lineCap: 'butt',
	}).bindPopup('Second Floor Pedway Between UofA Hospital and Kaye Edmonton Clinic');

	var firstFloorMap = L.layerGroup([main, firstFloor]);
	var secondFloorMap = L.layerGroup([main, secondFloor, pedway]);
	var secondFloorDetailed = L.layerGroup([main, secondFloor, pedway, floor2Details]);

	var map = L.map('map', {
		center: center,
		zoom: 18,
		layers: [secondFloorMap, centerMarker]
	});



	/* 		googleStreets = L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
				maxZoom: 20,
				subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
			}).addTo(map); */

	var denver = L.marker([53.51978872112979, -113.52213084697725]).bindPopup('Parking'),
		aurora = L.marker([53.52067209847866, -113.52413713932039]).bindPopup('Radiology Department'),
		golden = L.marker([53.521326, -113.524185]).bindPopup('Help Desk');

	var markers = L.layerGroup([denver, aurora, golden]);

	var baseMaps = {
		"1st Floor": firstFloorMap,
		"2nd Floor": secondFloorMap,
		"2nd Floor Detailed": secondFloorDetailed,
	};

	var overlayMaps = {
		"Markers": markers,
	};

	L.control.layers(baseMaps, overlayMaps).addTo(map);


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
		var demo = '{{$demo}}';
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

	function testfxn() {
		console.log('Zoom = ' + map.getZoom());
		map.setView(center, 17);

	}

	function success() {
		console.log('Sweet success - image loaded');
		console.log('Zoom = ' + map.getZoom());
	}


	function openNav() {
		document.getElementById("myNav1").style.height = "100%";
	}

	/* Close when someone clicks on the "x" symbol inside the overlay Nav Bar */
	function closeNav() {
		document.getElementById("myNav1").style.height = "0%";
	}



</script>

</div>





            