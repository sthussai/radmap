<!doctype html>
<html lang="{{ app()->getLocale() }}">



<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />

	<title>@yield('title','Rad Map Test')</title>

	<!-- Fonts -->
	<link href="https://fonts.googleapis.com/css?family=Raleway:100,600" rel="stylesheet" type="text/css">


	<!-- Styles -->
	<link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
	<link rel="stylesheet"    href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.0.0/animate.min.css"/>
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
	<link rel="stylesheet" href="https://unpkg.com/leaflet@1.6.0/dist/leaflet.css"
		integrity="sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ=="
		crossorigin="" />
    <!-- Styles -->
    <link href="{{ secure_asset('css/app.css') }}" rel="stylesheet">
		
	<!-- Scripts -->
	<script src="https://cdn.jsdelivr.net/npm/sweetalert2@9"></script>
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


	html,
	body {
		background-color: #fff;
		color: #636b6f;
		font-family: 'Nunito', sans-serif;
		font-weight: 200;
	}

	.full-height {
		height: 100vh;
	}

	.flex-center {
		align-items: center;
		display: flex;
		justify-content: center;
	}

	.position-ref {
		position: relative;
	}

	.top-right {
		position: absolute;
		right: 10px;
		top: 18px;
	}

	.content {
		text-align: center;
	}

	.title {
		font-size: 84px;
	}

	.links>a {
		color: #636b6f;
		padding: 0 25px;
		font-size: 13px;
		font-weight: 600;
		letter-spacing: .1rem;
		text-decoration: none;
		text-transform: uppercase;
	}

	.m-b-md {
		margin-bottom: 30px;
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
		bottom: 30px;
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
		position: absolute;
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


	/* START Map Navigation Bar Styling */
	.overlaynav {
		height: 0;
		width: 100%;
		position: fixed;
		z-index: 1001;
		left: 0;
		top: 0;
		background-color: rgb(0, 0, 0);
		background-color: rgba(0, 0, 0, 0.9);
		overflow-x: hidden;
		transition: 0.5s;
		overflow-y: hidden
	}

	.overlaynav-content {
		position: relative;
		width: 100%;
		max-width: 450px;
		text-align: center;
		margin: 0 auto;
		-webkit-overflow-scrolling: touch;
	}

	#infoDivContainer{
		width: 100%;
	}
		#infoDiv{
				z-index: 1000; 
				width: 80%; 
				max-width: 600px; 
				top:0px;
				margin: 0px auto ;
				text-align: center;
			}

		@media only screen and (max-width: 600px) {
			#infoDiv{
				width: 100%;
			}
		}         
	/* 
	.overlaynav .closebtn {
		position: absolute;
		top: 20px;
		right: 45px;
		font-size: 60px;
	}

	@media only screen and (max-width: 600px) {
		.overlaynav .closebtn{
			top: 10px;
		right: 10px;
		font-size: 40px;
		}
	} */

	.overlaynav a {
		padding: 8px;
		text-decoration: none;
		font-size: 24px;
		color: #818181;
		display: block;
		transition: 0.3s;
		margin: auto;
		max-width: 200px;
	}




	/* FEEDBACK FORM STYLES */
	/* FEEDBACK FORM STYLES */
	/* FEEDBACK FORM STYLES */

	#form-main {
		width: 100%;
		float: left;
		padding-top: 0px;
	}

	#form-div {
		background-color: rgba(72, 72, 72, 0.4);
		padding-left: 35px;
		padding-right: 35px;
		padding-top: 35px;
		padding-bottom: 50px;
		width: 450px;
		float: left;
		left: 50%;
		position: absolute;
		margin-top: 30px;
		margin-left: -260px;
		border-radius: 7px;
		-moz-border-radius: 7px;
		-webkit-border-radius: 7px;
	}
	
	.feedback-input {
		color: #3c3c3c;
		font-family: Helvetica, Arial, sans-serif;
		font-weight: 500;
		font-size: 18px;
		border-radius: 0;
		line-height: 22px;
		background-color: #fbfbfb;
		padding: 13px 13px 13px 54px;
		margin-bottom: 10px;
		width: 100%;
		-webkit-box-sizing: border-box;
		-moz-box-sizing: border-box;
		-ms-box-sizing: border-box;
		box-sizing: border-box;
		border: 3px solid rgba(0, 0, 0, 0);
	}

	.feedback-input:focus {
		background: #fff;
		box-shadow: 0;
		border: 3px solid #3498db;
		color: #3498db;
		outline: none;
		padding: 13px 13px 13px 54px;
	}
	
	.focused {
		color: #30aed6;
		border: #30aed6 solid 3px;
	}

	/* Icons ---------------------------------- */
	

	textarea {
		width: 100%;
		height: 150px;
		line-height: 150%;
		resize: vertical;
	}

	input:hover,
	textarea:hover,
	input:focus,
	textarea:focus {
		background-color: white;
	}

	#button-blue {
		font-family: 'Montserrat', Arial, Helvetica, sans-serif;
		float: left;
		width: 100%;
		border: #fbfbfb solid 4px;
		cursor: pointer;
		background-color: #3498db;
		color: white;
		font-size: 24px;
		padding-top: 22px;
		padding-bottom: 22px;
		-webkit-transition: all 0.3s;
		-moz-transition: all 0.3s;
		transition: all 0.3s;
		margin-top: -4px;
		font-weight: 700;
	}

	#button-blue:hover {
		background-color: rgba(0, 0, 0, 0);
		color: #0493bd;
	}

	.submit:hover {
		color: #3498db;
	}

	.ease {
		width: 0px;
		height: 74px;
		background-color: #fbfbfb;
		-webkit-transition: .3s ease;
		-moz-transition: .3s ease;
		-o-transition: .3s ease;
		-ms-transition: .3s ease;
		transition: .3s ease;
	}

	.submit:hover .ease {
		width: 100%;
		background-color: white;
	}


		
		/*END Feedback Form STYLES */
		/*END Feedback Form STYLES */
		/*END Feedback Form STYLES */
</style>
</head>
<body>
	
@include('components.rad-mainmenu')

@include('components.rad-loader')
<div id="infoDivContainer" class="w3-center ">
		<div id="infoDiv" class="w3-black w3-padding " style=" font-size: {{$fontSize}}; ">
			Viewing First Floor Map of University Hospital
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

		<button id="clearPathBtn" class="menuBtn" style="position: relative; margin-top: 35px; " title="Open Menu">
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
	



</script>

<script src="{{ secure_asset('js/radmap.js') }}"></script>	

</body>
</html>