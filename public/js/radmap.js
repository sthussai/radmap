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
/***/ (function(module, exports) {

var pathGroup = L.layerGroup().addTo(secondFloorMap);
var myLayer = null;
var startRefPointMarker = L.marker([53.51993090722499, -113.52201819419861], {
  draggable: true
}).bindPopup('Ur here for Demo 2').addTo(secondFloorMap);
var endRefPointMarker = L.marker([53.52060200173207, -113.52428197860719], {
  draggable: true
}).bindPopup('Final location').addTo(secondFloorMap);
var firstRefPoint = null;
var endRefPoint = null;
var distancesToClosestRefPointArray = [];
var ltlnFinalLocationsArray = [];
var geojsonMarkerOptions = {
  radius: 8,
  fillColor: "grey",
  color: "#000",
  weight: 1,
  opacity: 1,
  fillOpacity: 0.8
};
var minDistanceLine = null;
var markersObject = {};
var markersArray = [];
var start = "Point 14";
var end = "Point 5";

function ajaxGetGeoJsonFinalLocations() {
  $.ajax({
    dataType: "json",
    url: '/finalLocationData.json',
    success: function success(data) {
      //    console.log(data);
      myLayer = L.geoJSON(data, {
        onEachFeature: popupOnEachFinalLocation,
        pointToLayer: function pointToLayer(feature, latlng) {
          return L.circleMarker(latlng, geojsonMarkerOptions);
        },
        style: function style(feature) {
          switch (feature.properties.floor) {
            case 'location':
              return {
                color: "black",
                fillColor: "grey"
              };
          }
        }
      }).addTo(secondFloorMap);
    },
    error: function error(xhr) {
      console.log('Error - probably with parsing JSON data');
      console.log(xhr);
    }
  });
}

ajaxGetGeoJsonFinalLocations();

function ajaxGetGeoJson() {
  $.ajax({
    dataType: "json",
    url: '/data.json',
    success: function success(data) {
      myLayer = L.geoJSON(data, {
        filter: function filter(feature) {
          return feature.properties.floor;
        },
        onEachFeature: popupOnEachFeature,
        pointToLayer: function pointToLayer(feature, latlng) {
          return L.circleMarker(latlng, geojsonMarkerOptions);
        },
        style: function style(feature) {
          switch (feature.properties.floor) {
            case 'first':
              return {
                color: "#ff0000",
                fillColor: "orange"
              };

            case 'second':
              return {
                color: "#0000ff",
                fillColor: "lightblue"
              };
          }
        }
      }).addTo(secondFloorMap);
    },
    error: function error(xhr) {
      console.log('Error - probably with parsing JSON data');
      console.log(xhr);
    }
  });
}

ajaxGetGeoJson();

function ajaxGetGeoJsonFirstFloor() {
  $.ajax({
    dataType: "json",
    url: '/firstFloorData.json',
    success: function success(data) {
      myLayer = L.geoJSON(data, {
        filter: function filter(feature) {
          return feature.properties.floor;
        },
        onEachFeature: popupOnEachFeature,
        pointToLayer: function pointToLayer(feature, latlng) {
          return L.circleMarker(latlng, geojsonMarkerOptions);
        },
        style: function style(feature) {
          switch (feature.properties.floor) {
            case 'first':
              return {
                color: "#ff0000",
                fillColor: "orange"
              };

            case 'second':
              return {
                color: "#0000ff",
                fillColor: "lightblue"
              };
          }
        }
      }).addTo(firstFloorMap);
    },
    error: function error(xhr) {
      console.log('Error - probably with parsing JSON data');
      console.log(xhr);
    }
  });
} //ajaxGetGeoJsonFirstFloor();


function popupOnEachFinalLocation(feature, layer) {
  if (feature.properties && feature.properties.popupContent) {
    layer.bindPopup(feature.properties.popupContent);
  }

  if (feature.properties && feature.geometry.type == "Point") {
    var lt = feature.geometry.coordinates[1];
    var ln = feature.geometry.coordinates[0];
    var ltln = [lt, ln];
    ltlnFinalLocationsArray.push(ltln);
  }
}

function popupOnEachFeature(feature, layer) {
  if (feature.properties && feature.properties.popupContent) {
    layer.bindPopup(feature.properties.popupContent);
  }

  if (feature.properties && feature.geometry.type == "Point") {
    markersArray.push(feature);
    var name = feature.properties.name;
    var neighbour = {};
    neighbour[feature.properties.neighbour1] = parseInt(feature.properties.neighbour1Distance);

    if (feature.properties.neighbour2) {
      neighbour[feature.properties.neighbour2] = parseInt(feature.properties.neighbour2Distance);
    }

    if (feature.properties.neighbour3) {
      neighbour[feature.properties.neighbour3] = parseInt(feature.properties.neighbour3Distance);
    }

    markersObject[name] = neighbour;
  }
}

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

  for (var i = 0; i < path.length; i++) {
    markersArray.forEach(function (feature) {
      if (feature.properties.name == path[i]) {
        var lt = feature.geometry.coordinates[1];
        var ln = feature.geometry.coordinates[0];
        var ltln = [lt, ln];
        minDistanceLineCoords.push(ltln);
      }
    });
  }

  drawLine();
};

var drawLine = function drawLine() {
  pathGroup.clearLayers();
  minDistanceLine = L.polyline(minDistanceLineCoords, {
    color: "black"
  }).bindPopup('Minimum distance path ').addTo(pathGroup);
}; // Takes ltln array and user location ltln as 'this' value, returns ltln of closest ref point


var setStartPoint = function setStartPoint() {
  getClosestPointFrom(startRefPointMarker);

  if (firstRefPoint) {
    firstRefPoint.remove();
  }

  ;
  firstRefPoint = L.circleMarker(distancesToClosestRefPointArray[0][1], {
    color: 'green'
  }).addTo(secondFloorMap);
  firstRefPoint.bindPopup('Your closest reference point is here').openPopup();
  start = distancesToClosestRefPointArray[0][2];
  findShortestPath(markersObject, start, end);
};

startRefPointMarker.on('dragend', setStartPoint);

var setEndPoint = function setEndPoint() {
  getClosestPointFrom(endRefPointMarker);

  if (endRefPoint) {
    endRefPoint.remove();
  }

  ;
  endRefPoint = L.circleMarker(distancesToClosestRefPointArray[0][1], {
    color: 'white'
  }).addTo(map);
  endRefPoint.bindPopup('Your End point is here').openPopup();
  end = distancesToClosestRefPointArray[0][2];
  setStartPoint();
};

endRefPointMarker.on('dragend', setEndPoint);

var getClosestPointFrom = function getClosestPointFrom(PointMarker) {
  distancesToClosestRefPointArray = [];
  markersArray.forEach(function (feature) {
    var lt = feature.geometry.coordinates[1];
    var ln = feature.geometry.coordinates[0];
    var ltln = [lt, ln];
    var name = feature.properties.name;
    var ltlnDistance = map.distance(ltln, PointMarker.getLatLng());
    ltlnDistance = Math.round(ltlnDistance * 100) / 100;
    ltlnDistance = [ltlnDistance, ltln, name];
    distancesToClosestRefPointArray.push(ltlnDistance);
  });
  distancesToClosestRefPointArray.sort(function (a, b) {
    return a[0] - b[0];
  });
  return distancesToClosestRefPointArray;
};

$('#infoDiv').click(function () {
  myLayer.bringToBack();
});
$('#hidebtn').click(function () {
  console.log('markersObject');
  console.log(markersObject);
  console.log('markers Array');
  console.log(markersArray);
  myLayer.bringToFront();
});
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
/*! no static exports found */
/***/ (function(module, exports) {

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
$(window).on("load", function () {
  $("#infoDiv").slideDown();
  console.log("hello");
});
$("#hidebtn").click(function () {
  $("#infoDiv").slideToggle(100);

  if (showInfo) {
    $("#hidebtn").text("Show");
  } else {
    $("#hidebtn").text("Hide");
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
});
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
  "2nd Floor": secondFloorMap
};
var overlays = {
  "Markers": markers
};
var controls = L.control.layers(baseMaps, overlays, {
  collapsed: false
}).addTo(map);
var controlsElement = controls.getContainer();
console.log(controlsElement);
ajaxGetGeoJsonFirstFloor();
var stairsMarker1stFloor = L.marker([53.520605, -113.524552]).bindPopup('Stairs to go up to 2nd Floor Level').addTo(firstFloorMap);
var stairsMarker2ndFloor = L.marker([53.520518, -113.524601]).bindPopup('Stairs to go down to 1st Floor Level').addTo(secondFloorMap); //var pixel = map.project(urhere.getLatLng(), 19);

var coordsBetweenCafeteriaAndStairs1stFloor = [[-113.523939, 53.520919], //cafeteria starting point
[-113.523937, 53.521032], //2nd point
[-113.524552, 53.52103], //3
[-113.524552, 53.520605] //Stairs btw 1st and 2nd Floor
];
var pathBetweenCafeteriaAndStairs1stFloor = L.polyline(coordsBetweenCafeteriaAndStairs1stFloor, {
  color: 'green',
  weight: 5,
  lineCap: 'butt'
}).bindPopup('Path Between UofA Hospital Cafeteria And Kaye Clinic Radiology');
var coordsBetweenStairsAndMRI1stFloor = [[53.520605, -113.524552], //Stairs btw 1st and 2nd Floor
[53.520606, -113.524306], //Point 1 to MRI
[53.520185, -113.524305], //Point 2 
[53.520186, -113.524734], //Point 3  
[53.520129, -113.524733] //Final point at MRI CLinic  
];
var pathBetweenStairsAndMRI1stFloor = L.polyline(coordsBetweenStairsAndMRI1stFloor, {
  color: 'purple',
  weight: 5,
  lineCap: 'butt'
}).bindPopup('Path to University Hospital MRI Clinic');
var coordsBetweenStairsAndKayeClinic2ndFloor = [[53.520518, -113.524601], //Stairs btw 1st and 2nd Floor
[53.520374, -113.524596], [53.52037, -113.525395], //Pedway point 1, 2nd floor UAH side
[53.520363, -113.526096], [53.519151, -113.526086], [53.519151, -113.526406], //Pedway point 4, 2nd floor KEC side
[53.519144, -113.526546], [53.518876, -113.526551] // KEC Radiology Ending point
];
var pathBetweenStairsAndKayeClinic2ndFloor = L.polyline(coordsBetweenStairsAndKayeClinic2ndFloor, {
  color: 'green',
  weight: 5,
  lineCap: 'butt'
}).bindPopup('Path Between UofA Hospital Cafeteria And Kaye Clinic Radiology');
var coordsBetweenStairsAndRadiologyUAH2ndFloor = [[53.520518, -113.524601], //Stairs btw 1st and 2nd Floor
[53.520518, -113.524294], // 2nd point between stairs and Radz UAH 2nd FLoor 
[53.520617, -113.524293], //3rd point, in front of Radz UAH 2nd FLoor
[53.520621, -113.524148] // Final point to UAH Radiology 2nd Floor
];
var pathBetweenStairsAndRadiologyUAH2ndFloor = L.polyline(coordsBetweenStairsAndRadiologyUAH2ndFloor, {
  color: 'purple',
  weight: 5,
  lineCap: 'butt'
}).bindPopup('Path UAH Radiology 2nd Floor');
var coordsBetweenRadiologyUAH2ndFloorAnd2J2 = [[53.520617, -113.524293], //Point, in front of Radz UAH 2nd FLoor
[53.521019, -113.524291], [53.521021, -113.523381], //3rd point at intersection to 2J2
[53.521027, -113.523227] // Final point to 2J2 
];
var pathBetweenRadiologyUAH2ndFloorAnd2J2 = L.polyline(coordsBetweenRadiologyUAH2ndFloorAnd2J2, {
  color: 'yellow',
  weight: 5,
  lineCap: 'butt'
}).bindPopup('Path between UAH Radiology 2nd Floor and 2J2 ');
var coordsBetweenUAH2ndFloorParkingAnd2J2 = [[53.519851, -113.522193], //Point at 2nd Floor parking
[53.520163, -113.522705], [53.520166, -113.523375], // First Main intersection between 2nd Floor parking and UAH
[53.521021, -113.523381] //3rd point at intersection to 2J2
];
var pathBetweenUAH2ndFloorParkingAnd2J2 = L.polyline(coordsBetweenUAH2ndFloorParkingAnd2J2, {
  color: 'grey',
  weight: 5,
  lineCap: 'butt'
}).bindPopup('Path between UAH 2nd Floor Parking and 2J2 ');
var coordsBetweenUAH2ndFloorParkingAndRadiologyUAH = [[53.520166, -113.523375], // First Main intersection between 2nd Floor parking and UAH 
[53.520166, -113.524297], // At intersection to Radz 2nd floor UAH
[53.520518, -113.524294] // Point between stairs and Radz UAH 2nd FLoor
];
var pathBetweenUAH2ndFloorParkingAndRadiologyUAH = L.polyline(coordsBetweenUAH2ndFloorParkingAndRadiologyUAH, {
  color: 'lightgreen',
  weight: 5,
  lineCap: 'butt'
}).bindPopup('Path between UAH Radiology 2nd Floor and Parking 2nd Floor ');
var firstFloorPaths = new L.layerGroup([pathBetweenCafeteriaAndStairs1stFloor, pathBetweenStairsAndMRI1stFloor]);
var secondFloorPaths = new L.layerGroup([pathBetweenStairsAndKayeClinic2ndFloor, pathBetweenStairsAndRadiologyUAH2ndFloor, pathBetweenRadiologyUAH2ndFloorAnd2J2, pathBetweenUAH2ndFloorParkingAnd2J2, pathBetweenUAH2ndFloorParkingAndRadiologyUAH]);
$('#allPathsBtn').click(function () {
  toggleAllPaths();
});
var showingAllPaths = false;

function toggleAllPaths() {
  showingAllPaths = !showingAllPaths;

  if (showingAllPaths) {
    document.getElementById('allPathsBtn').innerText = 'Hide All Paths';
    secondFloorPaths.addTo(secondFloorMap);
    firstFloorPaths.addTo(firstFloorMap);
    closeNav();
  }

  if (!showingAllPaths) {
    document.getElementById('allPathsBtn').innerText = 'Show All Paths';
    secondFloorPaths.remove();
    firstFloorPaths.remove();
    closeNav();
  }
}

var firstFloorRequestedPathsLayerGroup = new L.layerGroup([]);
var secondFloorRequestedPathsLayerGroup = new L.layerGroup([]);
$('#showPathsBtn').click(function () {
  showRequestedPaths();
});

function showRequestedPaths() {
  closeNav();

  if (showingAllPaths) {
    toggleAllPaths();
  }

  ;
  var directionToPath = document.getElementById("directionsToInput").value;
  var directionFromPath = document.getElementById("directionsFromInput").value;
  console.log(directionToPath);
  console.log(directionFromPath);
  firstFloorRequestedPathsLayerGroup.clearLayers();
  secondFloorRequestedPathsLayerGroup.clearLayers();

  if (directionToPath == 'kayeEdmontonClinic' && directionFromPath == 'radiologyUAH' || directionToPath == 'radiologyUAH' && directionFromPath == 'kayeEdmontonClinic') {
    var requestedPathTo = pathBetweenStairsAndKayeClinic2ndFloor.setStyle({
      color: 'black'
    });
    var requestedPathFrom = pathBetweenStairsAndRadiologyUAH2ndFloor.setStyle({
      color: 'black'
    });
    requestedPathTo.addTo(secondFloorRequestedPathsLayerGroup);
    requestedPathFrom.addTo(secondFloorRequestedPathsLayerGroup);
    secondFloorRequestedPathsLayerGroup.addTo(secondFloorMap);
  }

  if (directionToPath == 'kayeEdmontonClinic' && directionFromPath == 'mainCafeteria' || directionToPath == 'mainCafeteria' && directionFromPath == 'kayeEdmontonClinic') {
    var requestedPathTo = pathBetweenStairsAndKayeClinic2ndFloor.setStyle({
      color: 'black'
    });
    var requestedPathFrom = pathBetweenCafeteriaAndStairs1stFloor.setStyle({
      color: 'black'
    });
    requestedPathTo.addTo(secondFloorRequestedPathsLayerGroup);
    requestedPathFrom.addTo(firstFloorRequestedPathsLayerGroup);
    stairsMarker2ndFloor.remove();
    stairsMarker2ndFloor.addTo(map).openPopup();
    document.getElementById('infoDiv').innerText = 'Please use stairs or elevator to go to First Floor Level where path continues to Main Cafeteria';
    firstFloorRequestedPathsLayerGroup.addTo(firstFloorMap);
    secondFloorRequestedPathsLayerGroup.addTo(secondFloorMap);
  }

  if (directionToPath == 'kayeEdmontonClinic' && directionFromPath == '2J2') {
    var requestedPathTo = pathBetweenStairsAndKayeClinic2ndFloor.setStyle({
      color: 'black'
    });
    var requestedPathbetween = pathBetweenStairsAndRadiologyUAH2ndFloor.setStyle({
      color: 'black'
    });
    var requestedPathFrom = pathBetweenRadiologyUAH2ndFloorAnd2J2.setStyle({
      color: 'black'
    });
    requestedPathTo.addTo(secondFloorRequestedPathsLayerGroup);
    requestedPathFrom.addTo(secondFloorRequestedPathsLayerGroup);
    requestedPathbetween.addTo(secondFloorRequestedPathsLayerGroup);
    secondFloorRequestedPathsLayerGroup.addTo(secondFloorMap);
  }
}

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
var kayeClinicRadiologyGroup = new L.layerGroup([divMarkerRadPats, divMarkerRadStaff, rectRadPats, rectRadStaff]).addTo(secondFloorMap);
var rect1Bounds = [[53.520515, -113.523949], [53.520484, -113.523893]];
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
    enableHighAccuracy: true
  });
  console.log('Locating true...');
} //locateMe(map);


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
    }).bindTooltip("You are within " + radius + " meters from this point").addTo(map).openTooltip(e.latlng);
  } else {
    x.remove();
    x = L.circleMarker(e.latlng, {
      color: markerColor
    }).bindPopup("Your current approximate location").addTo(map);
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
    }).bindPopup("Your previous location").addTo(map);
  } else if (counter > 2) {
    p.remove();
    p = L.circleMarker(prevCoord, {
      radius: 7,
      color: '#848D99'
    }).bindPopup("Your previous location").addTo(map);
  }

  if (counter == 3) {
    pp = L.circleMarker(pastCoord, {
      radius: 5,
      color: '#848D99'
    }).bindPopup("Your past location").addTo(map);
  } else if (counter > 3) {
    pp.remove();
    pp = L.circleMarker(pastCoord, {
      radius: 5,
      color: '#848D99'
    }).bindPopup("Your past location").addTo(map);
  }
}

map.on('locationfound', onLocationFound);

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
  coordString = t.latlng.lat + ', ' + t.latlng.lng;
  coordString = t.latlng.lng + ', ' + t.latlng.lat;
  copyToClipboard(coordString);
  console.log("Copied the Coordinates to Clipboard: " + coordString);
}

map.on('dblclick', onMapDblClick);

function stopLocating() {
  map.stopLocate();
  console.log('Stopped Locating');
  coordPopup.setLatLng(currentCoord).addTo(map).setContent("Stopped Location Sharing").openPopup(currentCoord);
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

var baseLayerChange = false;

function changeInfoDivMessage() {
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