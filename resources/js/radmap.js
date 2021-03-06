const {Toast} = require("./references");


	let arr = [0, 0, 0];
	let currentCoord = '';
	let prevCoord = '';
	let pastCoord = '';
	let counter = 0;
	let x; //current location
	let p; //previous location
	let pp; //past location
	let coordPopup = L.popup();
	
	const pedwaylatlngs = [
		[53.52037, -113.525395],
	[53.520363, -113.526096],
	[53.519151, -113.526086],
	[53.519151, -113.526406]
	];
	const pedway = L.polyline(pedwaylatlngs, {
	color: '#50C7E9',
	weight: 8,
	lineCap: 'butt',
	}).bindPopup('Second Floor Pedway Between UofA Hospital and Kaye Edmonton Clinic');
	pedway.addTo(secondFloorMapOverlay);
	
	$('#fontSizeSelect').change(function(){
		console.log($('#fontSizeSelect').val());
		document.getElementById("infoDiv").style.fontSize = $('#fontSizeSelect').val();
		document.getElementById("findBtn").style.fontSize = $('#fontSizeSelect').val();
		document.getElementById("stopBtn").style.fontSize = $('#fontSizeSelect').val();
		closeNav();
	})
	
	function recenterMap2() {
        console.log('Zoom = ' + map.getZoom());
		map.setView(center, 17);
		Toast.fire({
			title: '<span class="w3-text-white">Re-centered map view...</span>'
		  })

    }	
	
	
	
	$('#centerMapBtn').click(function(){recenterMap2();});
	$('#locateBtn').click(function(){locateMe();});
	$('#stopBtn').click(function(){stopLocating();});
	$('#menuBtn').click(function(){openNav();});
	
	//demo default is false
	$("#demoBtn").click(function(){
		demo =! demo;
		console.log('demo ' + demo);
		if(demo){
			$("#demoBtn").text("Demo ON - Turn OFF?");
			}
			else {
				$("#demoBtn").text("Demo Movement OFF ");
			}
	});
		
	
		
				var divMarkerRadPats = new L.Marker([53.518570974858534, -113.52696150541308], {
					icon: new L.DivIcon({
						className: '',
						html: '<span style="text-align: center">Radiology</span><br><span style="text-align: center">Patient Area</span>'
					})
				});
				var divMarkerRadStaff = new L.Marker([53.51857895180517, -113.52668255567552], {
					icon: new L.DivIcon({
						className: '',
						html: '<span style="text-align: center">Radiology</span><br><span style="text-align: center">Staff Area</span>'
					})
				});
	
				
				var rectRadPatsBounds = [
					[53.51862112948697, -113.52706074714662],
					[53.51846888301307, -113.52678984403612]
				];
				var rectRadPats = new L.rectangle(rectRadPatsBounds).bindTooltip('Radiology Patients Area');
	
				var rectRadStaffBounds = [
					[53.518619628257014, -113.52674692869188],
					[53.51846651102743, -113.52648943662645]
				];
				var rectRadStaff = new L.rectangle(rectRadStaffBounds).bindTooltip('Radiology Staff Area');
				
				var kayeClinicRadiologyGroup = new L.layerGroup([divMarkerRadPats, divMarkerRadStaff, rectRadPats, rectRadStaff]).addTo(secondFloorMapOverlay);
			
			var overlaysRemoved = false;
			
			function onZoomShow() {
				var zoomx = map.getZoom();
				console.log('Zoom level is = ' + zoomx);
	
				if (zoomx < 17 && !overlaysRemoved) {
					firstFloorMapOverlay.remove();
					secondFloorMapOverlay.remove();
					overlaysRemoved = true;
					console.log('Overlays removed');
				}
				if (zoomx >= 17 && overlaysRemoved) {
					firstFloorMapOverlay.addTo(firstFloorMap);
					secondFloorMapOverlay.addTo(secondFloorMap);
					overlaysRemoved = false;
					console.log('Overlays added after being removed');
				}
			}
	
			map.on('zoomend', onZoomShow);
	
			let watchLocation = false;
	
			function locateMe() {
				watchLocation = true
				map.locate({
					setView: false,
					maxZoom: 19,
					watch: watchLocation,
					enableHighAccuracy: true,
				});
				console.log('Locating with watch option ON...');
				if(watchLocation){
					Toast.fire({
						title: '<span class="w3-text-white">Locating with live location update...</span>'
					  })
				}
				
			}
	
	
	
	
	
			//locateMe(map);
			let locationMarkersLayerGroup = L.layerGroup().addTo(map);
			function onLocationError(e) {
				alert(e.message);
			}
			map.on('locationerror', onLocationError);
	
			function onLocationFound(e) {
				if(!watchLocation){
					console.log('watch Location not true, returning from watch fxn');
					return
				} else{
					console.log('Located via location watch fxn');
				}
	
				if (counter == 0 ){
					Toast.fire({
						title: '<span class="w3-text-white">Showing live location... cancel with Stop button >>> </span>'
					  })
					document.getElementById('stopBtn').style.display = 'block';	
					map.setView(e.latlng, 18);
				}
				if (demo) {
					var rand = Math.random() / 5000;
					e.latlng.lat = e.latlng.lat + rand;
					e.latlng.lng = e.latlng.lng + rand;
				} 
				
				//if new latlng is same as previous in array, return
				if(JSON.stringify(arr[2]) === JSON.stringify(e.latlng)){
					console.log('new latlng is same as previous')
					return;
				}
				locationMarkersLayerGroup.clearLayers();
				counter++;
				var radius = e.accuracy / 2;
				arr.push(e.latlng);
				if (arr.length > 3) {
					arr.shift();
				}
	
				currentCoord = arr[2];
				prevCoord = arr[1];
				pastCoord = arr[0];
	
				if (counter >= 1) {
	
					x = L.circleMarker(e.latlng, {
							color: markerColor
						})
						.bindPopup("You are within " + radius + " meters from this point")
						.addTo(locationMarkersLayerGroup);
						
				}
				
				if (counter <= 2) {
					x.openPopup();
				}
	
				if (counter >= 2) {
					p = L.circleMarker(prevCoord, {
							radius: 2,
							color: '#848D99'
						})
						.bindPopup("Your previous location")
						.addTo(locationMarkersLayerGroup);
				}
	
	
				if (counter >= 3) {
					pp = L.circleMarker(pastCoord, {
							radius: 1,
							color: '#848D99'
						})
						.bindPopup("Your past location")
						.addTo(locationMarkersLayerGroup);
				} 
			}
	
			map.on('locationfound', onLocationFound);
	
			function stopLocating() {
				watchLocation = false
				map.stopLocate();
				Toast.fire({
					title: '<span class="w3-text-white">Stopped Location Sharing >>> </span>'
				  })
				console.log('Stopped Locating');
				counter = 0;
				document.getElementById('stopBtn').style.display = 'none';
			}
	
	
	
		  const copyToClipboard = (str) => {
			const el = document.createElement('textarea');
			el.value = str;
			el.setAttribute('readonly', '');
			el.style.position = 'absolute';
			el.style.left = '-9999px';
			document.body.appendChild(el);
			el.select();
			document.execCommand('copy');
			document.body.removeChild(el);
		  };
	
	
	
			function onMapDblClick(t) {
				coordPopup.setLatLng(t.latlng)
					.setContent("You clicked the map at " + t.latlng.toString()).openOn(map);
					let coordString = t.latlng.lat + ', ' + t.latlng.lng;
					//coordString = t.latlng.lng + ', ' + t.latlng.lat;
				
				copyToClipboard(coordString);
				console.log("Copied the Coordinates to Clipboard: " + coordString);
	
			}
	
			map.on('dblclick', onMapDblClick);
	
	
			
	
	
	
	
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
	
	
			$(document).ready(function(){
				// Toggles paragraphs display with sliding
				$("#slideUpBtn").click(function(){
					$(".slideUp").slideUp();
					$(this).animate({'margin-top':'35px'});
					setTimeout(
			  function() 
			  {
				$("#slideUpBtn").hide();
				$("#slideDownBtn").css('margin-top','35px').show();
			  }, 300);
					
				});
			});
			$(document).ready(function(){
				// Toggles paragraphs display with sliding
				$("#slideDownBtn").click(function(){
					$(".slideUp").slideDown();
					$(this).animate({'margin-top':'180px'});
					setTimeout(
			  function() 
			  {
				$("#slideDownBtn").hide();
				$("#slideUpBtn").css('margin-top','180px').show();
			  }, 300);
					
				});
			});