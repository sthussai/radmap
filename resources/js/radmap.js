var arr = [0, 0, 0];
var currentCoord = '';
var prevCoord = '';
var pastCoord = '';
var counter = 0;
var x; //current location
var p; //previous location
var pp; //past location
var coordPopup = L.popup();

var showInfo = true;
$("#infoDiv").hide();
$(window).on("load", function() {
	$("#infoDiv").slideDown();
	console.log("hello");
	});

    $("#hidebtn").click(function(){ 
     $("#infoDiv").toggle(500);
      
        if(showInfo){
       $("#hidebtn").text("Show")
       }
        else {
       $("#hidebtn").text("Hide")
        }
		showInfo =! showInfo;
    });
            

$('#findBtn').click(function(){locateMe();});
$('#stopBtn').click(function(){stopLocating();});
$('#menuBtn').click(function(){openNav();});


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



    


		var stairsMarker1stFloor = L.marker([53.520605, -113.524552]).bindPopup('Stairs to go up to 2nd Floor Level').addTo(firstFloorMap);
		var stairsMarker2ndFloor = L.marker([53.520518, -113.524601]).bindPopup('Stairs to go down to 1st Floor Level').addTo(secondFloorMap);
		var urhere = L.marker([53.520419, -113.524389]).bindPopup('Ur here for Demo').addTo(secondFloorMap);
		var from = stairsMarker2ndFloor.getLatLng();
     	var to = urhere.getLatLng();

		var distance = map.distance(from, to);

		var coordsDistancePolyLine = [
			urhere.getLatLng(), //cafeteria starting point
			stairsMarker2ndFloor.getLatLng(), //2nd point			
		];

		L.polyline(coordsDistancePolyLine).bindPopup('Nearest Path with distance of ' + Math.floor(distance) +' m').addTo(secondFloorMap);
		var pixel = map.project(urhere.getLatLng(), 19);
	//	console.log(pixel);
		



		var coordsBetweenCafeteriaAndStairs1stFloor = [
			[-113.523939, 53.520919 ], //cafeteria starting point
			[-113.523937,53.521032], //2nd point
			[-113.524552,53.52103], //3
			[-113.524552,53.520605], //Stairs btw 1st and 2nd Floor
			
		];
		var pathBetweenCafeteriaAndStairs1stFloor = L.polyline(coordsBetweenCafeteriaAndStairs1stFloor, {
			color: 'green',
			weight: 5,
			lineCap: 'butt',
		}).bindPopup('Path Between UofA Hospital Cafeteria And Kaye Clinic Radiology');
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
		}).bindPopup('Path to University Hospital MRI Clinic');

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

		$('#allPathsBtn').click(function(){
			toggleAllPaths();
		});
		var showingAllPaths = false;	
		function toggleAllPaths(){
			showingAllPaths =! showingAllPaths;
			if(showingAllPaths) {
				document.getElementById('allPathsBtn').innerText = 'Hide All Paths';
				secondFloorPaths.addTo(secondFloorMap);
				firstFloorPaths.addTo(firstFloorMap);
				closeNav();
			}
			if(!showingAllPaths){
				document.getElementById('allPathsBtn').innerText = 'Show All Paths';
				secondFloorPaths.remove();
				firstFloorPaths.remove();
				closeNav();
			}
		}


		var firstFloorRequestedPathsLayerGroup = new L.layerGroup([]);
		var secondFloorRequestedPathsLayerGroup = new L.layerGroup([]);
		$('#showPathsBtn').click(function(){
			showRequestedPaths();
		});
		function showRequestedPaths(){
			closeNav();
			if(showingAllPaths){toggleAllPaths()};
			var directionToPath = document.getElementById("directionsToInput").value;
			var directionFromPath = document.getElementById("directionsFromInput").value;
			console.log(directionToPath);
			console.log(directionFromPath);
			firstFloorRequestedPathsLayerGroup.clearLayers();
			secondFloorRequestedPathsLayerGroup.clearLayers();
			if(directionToPath == 'kayeEdmontonClinic' && directionFromPath == 'radiologyUAH' || directionToPath == 'radiologyUAH' && directionFromPath == 'kayeEdmontonClinic'){
				var requestedPathTo = pathBetweenStairsAndKayeClinic2ndFloor.setStyle({color:'black'});
				var requestedPathFrom = pathBetweenStairsAndRadiologyUAH2ndFloor.setStyle({color:'black'});
				requestedPathTo.addTo(secondFloorRequestedPathsLayerGroup);
				requestedPathFrom.addTo(secondFloorRequestedPathsLayerGroup);
				secondFloorRequestedPathsLayerGroup.addTo(secondFloorMap);
			}
			if(directionToPath == 'kayeEdmontonClinic' && directionFromPath == 'mainCafeteria' || directionToPath == 'mainCafeteria' && directionFromPath == 'kayeEdmontonClinic'){
				var requestedPathTo = pathBetweenStairsAndKayeClinic2ndFloor.setStyle({color:'black'});
				var requestedPathFrom = pathBetweenCafeteriaAndStairs1stFloor.setStyle({color:'black'});
				requestedPathTo.addTo(secondFloorRequestedPathsLayerGroup);
				requestedPathFrom.addTo(firstFloorRequestedPathsLayerGroup);

				stairsMarker2ndFloor.remove();
				stairsMarker2ndFloor.addTo(map).openPopup();

				document.getElementById('infoDiv').innerText = 'Please use stairs or elevator to go to First Floor Level where path continues to Main Cafeteria';

				firstFloorRequestedPathsLayerGroup.addTo(firstFloorMap);
				secondFloorRequestedPathsLayerGroup.addTo(secondFloorMap);
			}
			if(directionToPath == 'kayeEdmontonClinic' && directionFromPath == '2J2'){
				var requestedPathTo = pathBetweenStairsAndKayeClinic2ndFloor.setStyle({color:'black'});
				var requestedPathbetween = pathBetweenStairsAndRadiologyUAH2ndFloor.setStyle({color:'black'});
				var requestedPathFrom = pathBetweenRadiologyUAH2ndFloorAnd2J2.setStyle({color:'black'});
				requestedPathTo.addTo(secondFloorRequestedPathsLayerGroup);
				requestedPathFrom.addTo(secondFloorRequestedPathsLayerGroup);
				requestedPathbetween.addTo(secondFloorRequestedPathsLayerGroup);
				secondFloorRequestedPathsLayerGroup.addTo(secondFloorMap);
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

		function locateMe() {
			document.getElementById('btn-loader').style.display = 'block';
			document.getElementById('findBtn').style.backgroundColor = '#555';
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

			console.log('Located');

			if (demo) {
				var rand = Math.random() / 5000;
				e.latlng.lat = e.latlng.lat + rand;
				e.latlng.lng = e.latlng.lng + rand;
			}

			counter++;
			console.log('counter = ' + counter);

			var radius = e.accuracy / 2;
			if (counter == 1) {
				document.getElementById('findBtn').style.display = 'none';
				document.getElementById('stopBtn').style.display = 'block';
				x = L.circleMarker(e.latlng, {
						color: markerColor
					})
					.bindTooltip("You are within " + radius + " meters from this point")
					.addTo(map).openTooltip(e.latlng);
			} else {
				x.remove();
				x = L.circleMarker(e.latlng, {
						color: markerColor
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


		function stopLocating() {
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
			document.getElementById('findBtn').style.display = 'block';
			document.getElementById('findBtn').style.backgroundColor = '';
			document.getElementById('btn-loader').style.display = 'none';
			document.getElementById('stopBtn').style.display = 'none';
		}



		function success() {
			console.log('Sweet success - image loaded');
			console.log('Zoom = ' + map.getZoom());
		}





		var baseLayerChange = false;	
		function changeInfoDivMessage(){
			baseLayerChange =! baseLayerChange;
			if(baseLayerChange) {document.getElementById('infoDiv').innerText = 'Viewing First Floor Map of University Hospital';}
			else{document.getElementById('infoDiv').innerText = 'Viewing Second Floor Map of University Hospital';}
		}

		map.on('baselayerchange', changeInfoDivMessage );



		$('#setMapCenterBtn').click(function(){
			setMapCenter();
		});	

		function setMapCenter() {
			var centerCoords = document.getElementById("centerCoordsInput").value;
            var centerZoom = document.getElementById("centerZoomInput").value;
            
            if(centerCoords != '' && centerCoords != ''){
                ajaxSetMapCenter(centerCoords, centerZoom);
                centerCoords = centerCoords.split(",");
                map.setView(centerCoords, centerZoom);
                closeNav()
            } else { console.log('Please Enter Valid Values ');}
		}


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




