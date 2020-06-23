/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./resources/js/geojson.js":
/*!*********************************!*\
  !*** ./resources/js/geojson.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _require = __webpack_require__(/*! ./radmap */ "./resources/js/radmap.js"),
    controls = _require.controls;

var refObj = {
  'secondFloorParking': 'Point 26',
  'kayeEdmontonClinic': 'Point 27',
  'radiologyUAH': 'Point 28',
  '2J2': 'Point 29',
  'firstFloor': 'firstFloor',
  'secondFloor': 'secondFloor',
  'secondFloorMarkersObject': 'secondFloorMarkersObject'
};
var pathGroup = L.layerGroup().addTo(mapOverlay);
var startRefPointMarker = L.marker([53.51993090722499, -113.52201819419861], {
  draggable: true
}).bindPopup('Drag To Start Location').addTo(mapOverlay);
var endRefPointMarker = L.marker([53.52060200173207, -113.52428197860719], {
  draggable: true
}).bindPopup('Drag To End Location').addTo(mapOverlay);
map.on('baselayerchange', function () {
  mapOverlay.clearLayers();
  pathGroup.clearLayers();
  startRefPointMarker.addTo(mapOverlay);
  endRefPointMarker.addTo(mapOverlay);
  pathGroup.addTo(mapOverlay);
});
var secondFloorMarkerGroup = L.layerGroup().addTo(secondFloorMapOverlay);
var firstFloorMarkerGroup = L.layerGroup().addTo(firstFloorMapOverlay);
mapOverlay.addTo(map);
var firstRefPoint = null;
var endRefPoint = null;
var distancesToClosestRefPointArray = [];
var geojsonMarkerOptions = {
  radius: 8,
  fillColor: "grey",
  color: "#000",
  weight: 1,
  opacity: 1,
  fillOpacity: 0.8
};
var minDistanceLine = null;
var firstFloorMarkersObject = {};
var firstFloorMarkersArray = [];
var secondFloorMarkersObject = {};
var secondFloorMarkersArray = [];
var start = "Point 14";
var end = "Point 5";

var ajaxGetGeoJsonSecondFloor = function ajaxGetGeoJsonSecondFloor() {
  $.ajax({
    dataType: "json",
    url: '/data.json',
    success: function success(data) {
      L.geoJSON(data, {
        onEachFeature: popupOnEachFeature,
        pointToLayer: function pointToLayer(feature, latlng) {
          return L.circleMarker(latlng, geojsonMarkerOptions);
        },
        style: function style(feature) {
          switch (feature.properties.location) {
            case 'final':
              return {
                color: "black",
                fillColor: "grey"
              };
          }

          switch (feature.properties.floor) {
            case 'second':
              return {
                color: "#0000ff",
                fillColor: "lightblue",
                radius: 5
              };
          }
        }
      }).addTo(secondFloorMarkerGroup);
    },
    error: function error(xhr) {
      console.log('Error - probably with parsing JSON data');
      console.log(xhr);
    }
  });
};

ajaxGetGeoJsonSecondFloor();

var ajaxGetGeoJsonFirstFloor = function ajaxGetGeoJsonFirstFloor() {
  $.ajax({
    dataType: "json",
    url: '/firstFloorData.json',
    success: function success(data) {
      console.log('get first floor data');
      L.geoJSON(data, {
        filter: function filter(feature) {
          return !feature.properties.secondFloor;
        },
        onEachFeature: popupOnEachFeature,
        pointToLayer: function pointToLayer(feature, latlng) {
          return L.circleMarker(latlng, geojsonMarkerOptions);
        },
        style: function style(feature) {
          switch (feature.properties.floor) {
            case 'first':
              return {
                color: "green",
                fillColor: "lightgreen"
              };
          }
        }
      }).addTo(firstFloorMarkerGroup);
    },
    error: function error(xhr) {
      console.log('Error - probably with parsing JSON data');
      console.log(xhr);
    }
  });
};
/* $(controls.getContainer()).mouseenter(function(){
  }); */


setTimeout(function () {
  ajaxGetGeoJsonFirstFloor();
}, 3000);

var popupOnEachFeature = function popupOnEachFeature(feature, layer) {
  if (feature.properties && feature.properties.popupContent) {
    layer.bindPopup(feature.properties.popupContent);
  }

  if (feature.properties.floor == "second" && feature.geometry.type == "Point") {
    secondFloorMarkersArray.push(feature);
    var name = feature.properties.name;
    var neighbour = {};
    neighbour[feature.properties.neighbour1] = parseInt(feature.properties.neighbour1Distance);

    if (feature.properties.neighbour2) {
      neighbour[feature.properties.neighbour2] = parseInt(feature.properties.neighbour2Distance);
    }

    if (feature.properties.neighbour3) {
      neighbour[feature.properties.neighbour3] = parseInt(feature.properties.neighbour3Distance);
    }

    if (feature.properties.neighbour4) {
      neighbour[feature.properties.neighbour4] = parseInt(feature.properties.neighbour4Distance);
    }

    secondFloorMarkersObject[name] = neighbour;
  }

  if (feature.properties.floor == "first" && feature.geometry.type == "Point") {
    firstFloorMarkersArray.push(feature);
    var _name = feature.properties.name;
    var _neighbour = {};
    _neighbour[feature.properties.neighbour1] = parseInt(feature.properties.neighbour1Distance);

    if (feature.properties.neighbour2) {
      _neighbour[feature.properties.neighbour2] = parseInt(feature.properties.neighbour2Distance);
    }

    if (feature.properties.neighbour3) {
      _neighbour[feature.properties.neighbour3] = parseInt(feature.properties.neighbour3Distance);
    }

    if (feature.properties.neighbour4) {
      _neighbour[feature.properties.neighbour4] = parseInt(feature.properties.neighbour4Distance);
    }

    firstFloorMarkersObject[_name] = _neighbour;
  }
};

var minDistanceLineCoords = [];

var shortestDistanceNode = function shortestDistanceNode(distances, visited) {
  // create a default value for shortest
  var shortest = null; // for each node in the distances object

  for (var node in distances) {
    // if no node has been assigned to shortest yet
    // or if the current node's distance is smaller than the current shortest
    var currentIsShortest = shortest === null || distances[node] < distances[shortest]; // and if the current node is in the unvisited set

    if (currentIsShortest && !visited.includes(node)) {
      // update shortest to be the current node
      shortest = node;
    }
  }

  return shortest;
};

var findShortestPath = function findShortestPath(graph, startNode, endNode) {
  // track distances from the start node using a hash object
  var distances = {};
  distances[endNode] = "Infinity";
  distances = Object.assign(distances, graph[startNode]); // track paths using a hash object

  console.log("Start " + start + " end " + end);
  console.log("distances");
  console.log(distances);
  var parents = {
    endNode: null
  };

  for (var child in graph[startNode]) {
    parents[child] = startNode;
  }

  console.log("parents");
  console.log(parents); // collect visited nodes

  var visited = []; // find the nearest node

  var node = shortestDistanceNode(distances, visited); //return console.log(node);
  // for that node:

  while (node) {
    // find its distance from the start node & its child nodes
    var distance = distances[node];
    var children = graph[node]; // for each of those child nodes:

    for (var _child in children) {
      // make sure each child node is not the start node
      if (String(_child) === String(startNode)) {
        continue;
      } else {
        // save the distance from the start node to the child node
        var newdistance = distance + children[_child]; // if there's no recorded distance from the start node to the child node in the distances object
        // or if the recorded distance is shorter than the previously stored distance from the start node to the child node

        if (!distances[_child] || distances[_child] > newdistance) {
          // save the distance to the object
          distances[_child] = newdistance; // record the path

          parents[_child] = node;
        }
      }
    } // move the current node to the visited set


    visited.push(node); // move to the nearest neighbor node

    node = shortestDistanceNode(distances, visited);
  } // using the stored paths from start node to end node
  // record the shortest path


  var shortestPath = [endNode];
  var parent = parents[endNode];

  while (parent) {
    shortestPath.push(parent);
    parent = parents[parent];
  } //this is the shortest path


  shortestPath.reverse();
  var results = {
    distance: distances[endNode],
    path: shortestPath
  }; // return the shortest path & the end node's distance from the start node

  console.log("results");
  console.log(results);
  getNamesInOrder(results.path);
};

var getNamesInOrder = function getNamesInOrder(path) {
  minDistanceLineCoords = [];

  if (map.hasLayer(firstFloorMap)) {
    for (var i = 0; i < path.length; i++) {
      firstFloorMarkersArray.forEach(function (feature) {
        if (feature.properties.name == path[i]) {
          var lt = feature.geometry.coordinates[1];
          var ln = feature.geometry.coordinates[0];
          var ltln = [lt, ln];
          minDistanceLineCoords.push(ltln);
        }
      });
    }
  } else {
    for (var i = 0; i < path.length; i++) {
      secondFloorMarkersArray.forEach(function (feature) {
        if (feature.properties.name == path[i]) {
          var lt = feature.geometry.coordinates[1];
          var ln = feature.geometry.coordinates[0];
          var ltln = [lt, ln];
          minDistanceLineCoords.push(ltln);
        }
      });
    }
  }

  drawLine();
};

var drawLine = function drawLine() {
  pathGroup.clearLayers();
  minDistanceLine = L.polyline(minDistanceLineCoords, {
    color: "black"
  }).bindPopup('Minimum distance path ').addTo(pathGroup);
};

var locateOnce = false;
var userLatLng = null;

var locateMe = function locateMe() {
  locateOnce = true;
  map.locate({
    setView: false
  });
  console.log('Locating once...');
};

$('#showPathsBtn').click(function () {
  showRequestedPaths();
}); //this function is called from the App's UI when the user requests directions by supplying 'To' and 'From' locations

function showRequestedPaths() {
  var directionToPath = document.getElementById("directionsToInput").value;
  var directionFromPath = document.getElementById("directionsFromInput").value;
  document.getElementById('directionsErrorDiv').innerText = '';

  if (directionFromPath == "null" || directionToPath == "null" || directionFromPath == directionToPath) {
    document.getElementById('directionsErrorDiv').innerText = "Please select valid and different 'To' and 'From' locations";
    console.log('Invalid locations');
    return;
  }

  closeNav();

  if (directionFromPath == 'currentLocation') {
    locateMe();
    end = refObj[directionToPath];
    return;
  } else {
    start = refObj[directionFromPath];
    end = refObj[directionToPath];
    findShortestPath(secondFloorMarkersObject, start, end);
  }
} //Supplies user's location to setStartPoint function
//called from the showRequestedPaths function if user requests directions from "Current Location"


var onLocationFoundOnce = function onLocationFoundOnce(e) {
  if (locateOnce) {
    console.log('One time fxn');
    var userCoords = [53.52100017444731, -113.52254390716554];
    userLatLng = L.circleMarker(userCoords, {
      color: 'red'
    }).bindPopup('Your Approximate Location').addTo(secondFloorMap);
    setStartPoint();
  }

  locateOnce = false;
};

map.on('locationfound', onLocationFoundOnce); //sets the closest reference point as the START point using User's location or the given START point marker
//uses the getClosestPointFrom function which returns a sorted array based on minimum distance and..
//includes the reference point's coordinates and name 
//Calls the minimum path finding algorithm 

var setStartPoint = function setStartPoint() {
  if (userLatLng) {
    console.log('using user latlng');
    getClosestPointFrom(userLatLng);
  } else {
    console.log('using ref point marker');
    getClosestPointFrom(startRefPointMarker);
  }

  if (firstRefPoint) {
    firstRefPoint.remove();
  }

  ;
  firstRefPoint = L.circleMarker(distancesToClosestRefPointArray[0][1], {
    color: 'green'
  }).addTo(mapOverlay);
  firstRefPoint.bindPopup('Your closest reference point is here').openPopup();
  start = distancesToClosestRefPointArray[0][2];

  if (map.hasLayer(firstFloorMap)) {
    findShortestPath(firstFloorMarkersObject, start, end);
  } else {
    findShortestPath(secondFloorMarkersObject, start, end);
  }
};

startRefPointMarker.on('dragend', setStartPoint); //sets the closest reference point as the END point using the given end point marker
//uses the getClosestPointFrom function which returns a sorted array based on minimum distance and..
//includes the reference point's coordinates and name 

var setEndPoint = function setEndPoint() {
  getClosestPointFrom(endRefPointMarker);

  if (endRefPoint) {
    endRefPoint.remove();
  }

  ;
  endRefPoint = L.circleMarker(distancesToClosestRefPointArray[0][1], {
    color: 'white'
  }).addTo(mapOverlay);
  endRefPoint.bindPopup('Your End point is here').openPopup();
  end = distancesToClosestRefPointArray[0][2]; // passing in Point name ie. 'Point 1'

  setStartPoint();
};

endRefPointMarker.on('dragend', setEndPoint); //Takes a given UserLocation/Start/End marker and finds the closest reference point 
//by subtracting the given point's latlng from each point in first floor OR second floor markers array 
//returns a sorted array of distances with the lowest distance first (ie. closest ref point) 

var getClosestPointFrom = function getClosestPointFrom(PointMarker) {
  distancesToClosestRefPointArray = [];

  if (map.hasLayer(firstFloorMap)) {
    firstFloorMarkersArray.forEach(function (feature) {
      var lt = feature.geometry.coordinates[1];
      var ln = feature.geometry.coordinates[0];
      var ltln = [lt, ln];
      var name = feature.properties.name;
      var ltlnDistance = map.distance(ltln, PointMarker.getLatLng());
      ltlnDistance = Math.round(ltlnDistance * 100) / 100;
      ltlnDistance = [ltlnDistance, ltln, name];
      distancesToClosestRefPointArray.push(ltlnDistance);
    });
  } else {
    secondFloorMarkersArray.forEach(function (feature) {
      var lt = feature.geometry.coordinates[1];
      var ln = feature.geometry.coordinates[0];
      var ltln = [lt, ln];
      var name = feature.properties.name;
      var ltlnDistance = map.distance(ltln, PointMarker.getLatLng());
      ltlnDistance = Math.round(ltlnDistance * 100) / 100;
      ltlnDistance = [ltlnDistance, ltln, name];
      distancesToClosestRefPointArray.push(ltlnDistance);
    });
  }

  distancesToClosestRefPointArray.sort(function (a, b) {
    return a[0] - b[0];
  });
  return distancesToClosestRefPointArray;
};
/* let graph = {
"Point 14": { "Point 13": 1},
"Point 13": { "Point 14": 1, "Point 10": 1, "Point 17": 2 },
"Point 10": { "Point 8": 2, "Point 3": 3, "Point 13": 1 },
"Point 17": { "Point 3": 1, "Point 13": 1 },
"Point 8": { "Point 7": 2, "Point 10": 2 },
"Point 7": { "Point 5": 1 , "Point 8": 2},
"Point 3": { "Point 5": 1, "Point 17": 1, "Point 10": 3  },
"Point 5": {"Point 3": 1, "Point 7": 1 },
}; */

/***/ }),

/***/ "./resources/js/radmap.js":
/*!********************************!*\
  !*** ./resources/js/radmap.js ***!
  \********************************/
/*! exports provided: controls */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "controls", function() { return controls; });
var arr = [0, 0, 0];
var currentCoord = '';
var prevCoord = '';
var pastCoord = '';
var counter = 0;
var x; //current location

var p; //previous location

var pp; //past location

var coordPopup = L.popup();
var pedwaylatlngs = [[53.52037, -113.525395], [53.520363, -113.526096], [53.519151, -113.526086], [53.519151, -113.526406]];
var pedway = L.polyline(pedwaylatlngs, {
  color: '#50C7E9',
  weight: 8,
  lineCap: 'butt'
}).bindPopup('Second Floor Pedway Between UofA Hospital and Kaye Edmonton Clinic');
pedway.addTo(secondFloorMapOverlay);
$('#fontSizeSelect').change(function () {
  console.log($('#fontSizeSelect').val());
  document.getElementById("infoDiv").style.fontSize = $('#fontSizeSelect').val();
  document.getElementById("findBtn").style.fontSize = $('#fontSizeSelect').val();
  document.getElementById("stopBtn").style.fontSize = $('#fontSizeSelect').val();
  closeNav();
});
var showInfo = true;
document.getElementById("map").style.marginTop = document.getElementById("infoDivContainer").offsetHeight;
$("#hideBtn").hide();
$(window).on("load", function () {
  $("#hideBtn").slideDown();
});
$("#hideBtn").click(function () {
  $("#infoDiv").slideToggle(100);

  if (showInfo) {
    $("#hideBtn").html("<i class='fa fa-arrow-down w3-margin-right'></i><b>Show</b>");
    document.getElementById("map").style.marginTop = 0;
  } else {
    $("#hideBtn").html("<i class='fa fa-arrow-up w3-margin-right'></i><b>Hide</b>");
    document.getElementById("map").style.marginTop = document.getElementById("infoDiv").offsetHeight;
  }

  showInfo = !showInfo;
});
$('#findBtn').click(function () {
  locateMe();
});
$('#stopBtn').click(function () {
  stopLocating();
});
$('#menuBtn').click(function () {
  openNav();
}); //demo default is false

$("#demoBtn").click(function () {
  demo = !demo;
  console.log('demo ' + demo);

  if (demo) {
    $("#demoBtn").text("Demo ON - Turn OFF?");
  } else {
    $("#demoBtn").text("Demo Movement OFF ");
  }
});
var parkingMarker = L.marker([53.51978872112979, -113.52213084697725]).bindPopup('Parking'),
    radiologyMarker = L.marker([53.52067209847866, -113.52413713932039]).bindPopup('Radiology Department'),
    helpDeskMarker = L.marker([53.521326, -113.524185]).bindPopup('Help Desk');
var markers = L.layerGroup([parkingMarker, radiologyMarker, helpDeskMarker]);
var baseMaps = {
  "1st Floor": firstFloorMap,
  "2nd Floor": secondFloorMap
};
var overlays = {
  "Markers": markers
};
var controls = L.control.layers(baseMaps).addTo(map);

var secondFloorPopupMsg = $('<p>Elevator to go to 1st Floor Level <br> <button>1st Floor</button> </p>').click(function () {
  map.removeLayer(secondFloorMap);
  map.addLayer(firstFloorMap);
})[0];
var firstFloorPopupMsg = $('<p>Elevator to go to 2nd Floor Level <br> <button>2nd Floor</button> </p>').click(function () {
  map.removeLayer(firstFloorMap);
  map.addLayer(secondFloorMap);
})[0];
var elevator1stFloor = L.marker([53.520654628040006, -113.52435708045961]).bindPopup(firstFloorPopupMsg).addTo(firstFloorMapOverlay);
var elevator2ndFloor = L.marker([53.520654628040006, -113.52435708045961]).bindPopup(secondFloorPopupMsg).addTo(secondFloorMapOverlay); //var pixel = map.project(urhere.getLatLng(), 19);

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
var rectRadPatsBounds = [[53.51862112948697, -113.52706074714662], [53.51846888301307, -113.52678984403612]];
var rectRadPats = new L.rectangle(rectRadPatsBounds).bindTooltip('Radiology Patients Area');
var rectRadStaffBounds = [[53.518619628257014, -113.52674692869188], [53.51846651102743, -113.52648943662645]];
var rectRadStaff = new L.rectangle(rectRadStaffBounds).bindTooltip('Radiology Staff Area');
var kayeClinicRadiologyGroup = new L.layerGroup([divMarkerRadPats, divMarkerRadStaff, rectRadPats, rectRadStaff]).addTo(secondFloorMapOverlay);
var rect1Bounds = [[53.520515, -113.523949], [53.520484, -113.523893]];
var rect1 = new L.rectangle(rect1Bounds).bindTooltip('2A1');
var divMarker1 = new L.Marker(center, {
  icon: new L.DivIcon({
    className: 'my-div-icon',
    html: '<span class="w3-text-white">Hallway</span>'
  })
});
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
var watchLocation = false;

function locateMe() {
  document.getElementById('btn-loader').style.display = 'block';
  document.getElementById('findBtn').style.backgroundColor = '#555';
  watchLocation = true;
  map.locate({
    setView: false,
    maxZoom: 19,
    watch: watchLocation,
    enableHighAccuracy: true
  });
  console.log('Locating with watch option ON...');
} //locateMe(map);


var locationMarkersLayerGroup = L.layerGroup().addTo(map);

function onLocationError(e) {
  alert(e.message);
}

map.on('locationerror', onLocationError);

function onLocationFound(e) {
  if (!watchLocation) {
    console.log('watch Location not true, returning from watch fxn');
    return;
  } else {
    console.log('Located via location watch fxn');
  }

  if (counter == 0) {
    document.getElementById('findBtn').style.display = 'none';
    document.getElementById('stopBtn').style.display = 'block';
    map.setView(e.latlng, 18);
  }

  if (demo) {
    var rand = Math.random() / 5000;
    e.latlng.lat = e.latlng.lat + rand;
    e.latlng.lng = e.latlng.lng + rand;
  } //if new latlng is same as previous in array, return


  if (JSON.stringify(arr[2]) === JSON.stringify(e.latlng)) {
    console.log('new latlng is same as previous');
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
    }).bindPopup("You are within " + radius + " meters from this point").addTo(locationMarkersLayerGroup).openPopup(e.latlng);
  }

  if (counter >= 2) {
    p = L.circleMarker(prevCoord, {
      radius: 2,
      color: '#848D99'
    }).bindPopup("Your previous location").addTo(locationMarkersLayerGroup);
  }

  if (counter >= 3) {
    pp = L.circleMarker(pastCoord, {
      radius: 1,
      color: '#848D99'
    }).bindPopup("Your past location").addTo(locationMarkersLayerGroup);
  }
}

map.on('locationfound', onLocationFound);

function stopLocating() {
  watchLocation = false;
  map.stopLocate();
  console.log('Stopped Locating');
  counter = 0;
  document.getElementById('findBtn').style.display = 'block';
  document.getElementById('findBtn').style.backgroundColor = '';
  document.getElementById('btn-loader').style.display = 'none';
  document.getElementById('stopBtn').style.display = 'none';
}

var copyToClipboard = function copyToClipboard(str) {
  var el = document.createElement('textarea');
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
  coordPopup.setLatLng(t.latlng).setContent("You clicked the map at " + t.latlng.toString()).openOn(map);
  var coordString = t.latlng.lat + ', ' + t.latlng.lng;
  coordString = t.latlng.lng + ', ' + t.latlng.lat;
  copyToClipboard(coordString);
  console.log("Copied the Coordinates to Clipboard: " + coordString);
}

map.on('dblclick', onMapDblClick);
var baseLayerChange = false;

function changeInfoDivMessage() {
  console.log(map.hasLayer(firstFloorMap));
  baseLayerChange = !baseLayerChange;

  if (baseLayerChange) {
    document.getElementById('infoDiv').innerText = 'Viewing First Floor Map of University Hospital';
  } else {
    document.getElementById('infoDiv').innerText = 'Viewing Second Floor Map of University Hospital';
  }
}

map.on('baselayerchange', changeInfoDivMessage);
$('#setMapCenterBtn').click(function () {
  setMapCenter();
});

function setMapCenter() {
  var centerCoords = document.getElementById("centerCoordsInput").value;
  var centerZoom = document.getElementById("centerZoomInput").value;

  if (centerCoords != '' && centerCoords != '') {
    ajaxSetMapCenter(centerCoords, centerZoom);
    centerCoords = centerCoords.split(",");
    map.setView(centerCoords, centerZoom);
    closeNav();
  } else {
    console.log('Please Enter Valid Values ');
  }
}

function ajaxSetMapCenter(centerCoords, centerZoom) {
  $.ajax({
    type: 'get',
    url: '/cookie/setCenterCookie',
    data: {
      'centerCoords': centerCoords,
      'centerZoom': centerZoom
    },
    success: function success(data) {
      console.log(centerCoords + 'set successfully');
    }
  });
}

/***/ }),

/***/ 1:
/*!****************************************************************!*\
  !*** multi ./resources/js/geojson.js ./resources/js/radmap.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! C:\xampp\htdocs\Radmap\resources\js\geojson.js */"./resources/js/geojson.js");
module.exports = __webpack_require__(/*! C:\xampp\htdocs\Radmap\resources\js\radmap.js */"./resources/js/radmap.js");


/***/ })

/******/ });