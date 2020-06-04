<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">

  <!-- CSRF Token -->
  <meta name="csrf-token" content="{{ csrf_token() }}">

  <title>{{ config('app.name', 'Laravel') }}</title>

  <!-- Scripts -->
  <script src="{{ asset('js/app.js') }}" defer></script>
  <!--JQuery -->
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>

  <!-- Fonts -->
  <link rel="dns-prefetch" href="//fonts.gstatic.com">
  <link href="https://fonts.googleapis.com/css?family=Nunito" rel="stylesheet">


  <!-- Styles -->
  <link href="{{ asset('css/app.css') }}" rel="stylesheet">
  <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.6.0/dist/leaflet.css"
    integrity="sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ=="
    crossorigin="" />

  <style>
    .leaflet-container {
      width: 100%;
      height: 100vh;
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
      bottom: 20px;
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
      color: black;
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
      position: fixed;
      /* Fixed/sticky position */
      top: 80px;
      /* Place the button at the bottom of the page */
      left: 11px;
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
      border-radius: 2px;
      /* Rounded corners */
      font-size: 12px;
      /* Increase font size */
      height: 30px;
      width: 30px;

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

    .overlaynav .closebtn {
      position: absolute;
      top: 20px;
      right: 45px;
      font-size: 60px;
    }

    .overlaynav a {
      padding: 8px;
      text-decoration: none;
      font-size: 36px;
      color: #818181;
      display: block;
      transition: 0.3s;
    }
  </style>

</head>

<body>
  @include('components.rad-loader')
  <div id="ReactMap">
  </div>
  







</body>

</html>