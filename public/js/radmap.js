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

var _require2 = __webpack_require__(/*! ./halfPathsObject */ "./resources/js/halfPathsObject.js"),
    halfPathsObj = _require2.halfPathsObj,
    greenPin = _require2.greenPin,
    redPin = _require2.redPin,
    geojsonMarkerOptions = _require2.geojsonMarkerOptions,
    Toast = _require2.Toast,
    refObj = _require2.refObj;

var floorRecorder = function floorRecorder() {
  if (map.hasLayer(firstFloorMap)) {
    refObj.currentFloorLevel = 'firstFloor';
  } else {
    refObj.currentFloorLevel = 'secondFloor';
  }
};

floorRecorder();
map.on('baselayerchange', floorRecorder);

var switchFloorLevels = function switchFloorLevels() {
  if (refObj.currentFloorLevel == 'firstFloor') {
    map.removeLayer(firstFloorMap);
    map.addLayer(secondFloorMap);
  } else {
    map.removeLayer(secondFloorMap);
    map.addLayer(firstFloorMap);
  }
}; //function to open search After pressing Keys 'Tab' and 'S'


var keymap = {
  9: false,
  //Key code fo Tab
  83: false //Key code fo s

};
$(document).keydown(function (e) {
  if (e.keyCode in keymap) {
    keymap[e.keyCode] = true;

    if (keymap[9] && keymap[83]) {
      switchFloorLevels();
    }
  }
}).keyup(function (e) {
  if (e.keyCode in keymap) {
    keymap[e.keyCode] = false;
  }
});
$('#switchFloorBtn').click(function () {
  switchFloorLevels();
  $('#directionsInfoDiv').addClass('w3-hide');
});
var secondFloorPopupMsg = $('<p>Elevator to go to 1st Floor Level <br> <button>1st Floor</button> </p>').click(function () {
  switchFloorLevels();
})[0];
var firstFloorPopupMsg = $('<p>Elevator to go to 2nd Floor Level <br> <button>2nd Floor</button> </p>').click(function () {
  switchFloorLevels();
})[0];
var elevator1stFloor = L.marker([53.520654628040006, -113.52435708045961]).bindPopup(firstFloorPopupMsg).addTo(firstFloorMapOverlay);
var elevator2ndFloor = L.marker([53.520654628040006, -113.52435708045961]).bindPopup(secondFloorPopupMsg).addTo(secondFloorMapOverlay);

var currentFloorMarkersObject = function currentFloorMarkersObject() {
  if (refObj.currentFloorLevel == 'firstFloor') {
    return firstFloorMarkersObject;
  } else {
    return secondFloorMarkersObject;
  }
};

var currentFloorMarkersArray = function currentFloorMarkersArray() {
  if (refObj.currentFloorLevel == 'firstFloor') {
    return firstFloorMarkersArray;
  } else {
    return secondFloorMarkersArray;
  }
};

var currentFloorOverlay = function currentFloorOverlay() {
  console.log('current floor fxn called');

  if (refObj.currentFloorLevel == 'firstFloor') {
    return firstFloorMapOverlay;
  } else {
    return secondFloorMapOverlay;
  }
};

var otherFloorOverlay = function otherFloorOverlay() {
  console.log('other floor fxn called');

  if (refObj.currentFloorLevel == 'firstFloor') {
    return secondFloorMapOverlay;
  } else {
    return firstFloorMapOverlay;
  }
};

var changeInfoDivMessage = function changeInfoDivMessage() {
  if (map.hasLayer(firstFloorMap)) {
    document.getElementById('infoDiv').innerText = 'Viewing First Floor Map';
  } else {
    document.getElementById('infoDiv').innerText = 'Viewing Second Floor Map';
  }
};

map.on('baselayerchange', changeInfoDivMessage);
var startPointMarker = L.marker([53.52061534234248, -113.52407008409502], {
  draggable: true,
  icon: greenPin
}).bindPopup('Drag To Start Location');
var endPointMarker = L.marker([53.52060200173207, -113.52428197860719], {
  draggable: true,
  icon: redPin
}).bindPopup('Drag To End Location');

var clearPathFxn = function clearPathFxn() {
  if (firstFloorMapOverlay.hasLayer(searchMakerLayer)) {
    firstFloorMapOverlay.removeLayer(searchMakerLayer);
  }

  ;

  if (secondFloorMapOverlay.hasLayer(searchMakerLayer)) {
    secondFloorMapOverlay.removeLayer(searchMakerLayer);
  }

  ;

  if (firstFloorMapOverlay.hasLayer(firstRefPoint)) {
    firstFloorMapOverlay.removeLayer(firstRefPoint);
  }

  ;

  if (secondFloorMapOverlay.hasLayer(firstRefPoint)) {
    secondFloorMapOverlay.removeLayer(firstRefPoint);
  }

  ;

  if (firstFloorMapOverlay.hasLayer(endRefPoint)) {
    firstFloorMapOverlay.removeLayer(endRefPoint);
  }

  ;

  if (secondFloorMapOverlay.hasLayer(endRefPoint)) {
    secondFloorMapOverlay.removeLayer(endRefPoint);
  }

  ;

  if (firstFloorMapOverlay.hasLayer(endPointMarker)) {
    firstFloorMapOverlay.removeLayer(endPointMarker);
  }

  if (secondFloorMapOverlay.hasLayer(endPointMarker)) {
    secondFloorMapOverlay.removeLayer(endPointMarker);
  }

  if (firstFloorMapOverlay.hasLayer(startPointMarker)) {
    firstFloorMapOverlay.removeLayer(startPointMarker);
  }

  if (secondFloorMapOverlay.hasLayer(startPointMarker)) {
    secondFloorMapOverlay.removeLayer(startPointMarker);
  }

  if (firstFloorMapOverlay.hasLayer(halfPathLine)) {
    firstFloorMapOverlay.removeLayer(halfPathLine);
  }

  if (secondFloorMapOverlay.hasLayer(halfPathLine)) {
    secondFloorMapOverlay.removeLayer(halfPathLine);
  }

  if (firstFloorMapOverlay.hasLayer(minDistanceLine)) {
    firstFloorMapOverlay.removeLayer(minDistanceLine);
  }

  if (secondFloorMapOverlay.hasLayer(minDistanceLine)) {
    secondFloorMapOverlay.removeLayer(minDistanceLine);
  }
};

$('#clearPathBtn').on('click', function () {
  clearPathFxn();
});
var secondFloorMarkerGroup = L.layerGroup().addTo(secondFloorMapOverlay);
var firstFloorMarkerGroup = L.layerGroup().addTo(firstFloorMapOverlay);
var firstFloorMarkersObject = {};
var firstFloorMarkersArray = [];
var secondFloorMarkersObject = {};
var secondFloorMarkersArray = [];
var firstRefPoint = null;
var endRefPoint = null;
var distancesToClosestRefPointArray = [];
var minDistanceLine = null;
var halfPathLine = null;
var end = null;

var ajaxGetGeoJson = function ajaxGetGeoJson(url, floor, markerGroup) {
  $.ajax({
    dataType: "json",
    url: url,
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
            case floor:
              return {
                color: "#0000ff",
                fillColor: "lightblue",
                radius: 5
              };
          }
        }
      }).addTo(markerGroup);
    },
    error: function error(xhr) {
      console.log('Error - probably with parsing JSON data');
      console.log(xhr);
    }
  });
};

ajaxGetGeoJson('/firstFloorData.json', 'first', firstFloorMarkerGroup);
ajaxGetGeoJson('/data.json', 'second', secondFloorMarkerGroup);
setTimeout(function () {
  console.log('second floor data');
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

  console.log("distances");
  console.log(distances);
  var parents = {
    endNode: null
  };

  for (var child in graph[startNode]) {
    parents[child] = startNode;
  } // collect visited nodes


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
  var minDistanceLineCoords = [];

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

  drawLine(minDistanceLineCoords);
};

var drawLine = function drawLine(minDistanceLineCoords) {
  minDistanceLine = L.polyline(minDistanceLineCoords, {
    color: "black"
  }).bindPopup('Minimum distance path ');
  minDistanceLine.addTo(currentFloorOverlay());
};

$('#showPathsBtn').click(function () {
  showRequestedPaths();
});

var validateDirectionsInput = function validateDirectionsInput(directionToPath, directionFromPath) {
  $('#directionsInfoDiv, #directionsErrorDiv').addClass('w3-hide');

  if (directionFromPath == "null" || directionToPath == "null" || directionFromPath == directionToPath) {
    console.log('Locations should not be empty or same');
    return $('#directionsErrorDiv').removeClass('w3-hide');
  }

  if (directionFromPath == 'currentLocation') {
    return 'checked';
  }

  if (refObj[directionFromPath]['floorLevel'] != refObj.currentFloorLevel) {
    console.log('Need to switch map floors');
    return $('#directionsInfoDiv').removeClass('w3-hide');
  }

  return 'checked';
};

var traversingFloors = false; //this function is called from the App's UI when the user requests directions by supplying 'To' and 'From' locations
//validates users input and ensures user's 'From' location is on the same floor

var showRequestedPaths = function showRequestedPaths() {
  var directionToPath = document.getElementById("directionsToInput").value;
  var directionFromPath = document.getElementById("directionsFromInput").value;
  var validInput = validateDirectionsInput(directionToPath, directionFromPath);

  if (validInput != 'checked') {
    return validInput;
  }

  closeNav();
  clearPathFxn();

  if (refObj[directionToPath]['floorLevel'] != refObj.currentFloorLevel && directionFromPath == 'currentLocation') {
    console.log('using current location and going to different floor');
    drawOtherFloorPath(directionToPath);
    endPointMarker.setLatLng(refObj[directionToPath]['pointCoords']).bindPopup('Your End Location');
    var currentFloorLevelElevator = refObj.currentFloorLevel + 'Elevator';
    end = refObj[currentFloorLevelElevator]['pointName'];
    traversingFloors = true;
    return locateMe();
  } //else to and from locations on same floor
  else if (directionFromPath == 'currentLocation') {
      locateMe();
      endPointMarker.setLatLng(refObj[directionToPath]['pointCoords']).bindPopup('Your End Location');
      return end = refObj[directionToPath]['pointName'];
    } else if (refObj[directionToPath]['floorLevel'] != refObj.currentFloorLevel) {
      drawOtherFloorPath(directionToPath);

      var _currentFloorLevelElevator = refObj.currentFloorLevel + 'Elevator';

      var _end = refObj[_currentFloorLevelElevator]['pointName'];
      var _start = refObj[directionFromPath]['pointName'];
      findShortestPath(currentFloorMarkersObject(), _start, _end);
      startPointMarker.setLatLng(refObj[directionFromPath]['pointCoords']).bindPopup('Your Start Location').addTo(currentFloorOverlay());
      endPointMarker.setLatLng(refObj[directionToPath]['pointCoords']).bindPopup('Your End Location').addTo(otherFloorOverlay());
      return;
    } else {
      start = refObj[directionFromPath]['pointName'];
      end = refObj[directionToPath]['pointName'];
      endPointMarker.setLatLng(refObj[directionToPath]['pointCoords']).bindPopup('Your End Location').addTo(currentFloorOverlay()).openPopup();
      startPointMarker.setLatLng(refObj[directionFromPath]['pointCoords']).bindPopup('Your Start Location').addTo(currentFloorOverlay()).openPopup();
      findShortestPath(currentFloorMarkersObject(), start, end);
    }
};

var searchBarUsed = false;
$('#infoDiv').click(function () {
  console.log('click');

  if (searchMarker['Latlng']) {
    console.log(searchMarker);
    var btnbtn = document.getElementById('searchMarkerBtn');

    btnbtn.onclick = function () {
      console.log('hello, this is' + searchMarker['pointName']);
      clearPathFxn();
      endPointMarker.setLatLng(searchMarker['Latlng']).bindPopup('Your End Location').addTo(currentFloorOverlay());
      end = searchMarker[''];
      searchBarUsed = true;
      return locateMe();
    };
  } else {
    console.log('searchMarkerLatlng is null');
  }
});

var drawOtherFloorPath = function drawOtherFloorPath(directionToPath) {
  console.log('heading to a different Floor: ' + refObj[directionToPath]['floorLevel']);
  var halfPathsCoords = halfPathsObj[directionToPath];

  if (refObj.currentFloorLevel == 'firstFloor') {
    elevator1stFloor.openPopup();
  } else {
    elevator2ndFloor.openPopup();
    console.log('finding from 2nd floor start to second floor elevator');
  }

  halfPathLine = L.polyline(halfPathsCoords, {
    color: 'black'
  }).bindPopup('Your path continued..').addTo(otherFloorOverlay());
};

var locateOnce = false;

var locateMe = function locateMe() {
  locateOnce = true;
  map.locate({
    setView: false
  });
  console.log('Locating once...');
  Toast.fire({
    title: '<span class="w3-text-white">Locating...</span>'
  });
}; //Supplies user's location to setStartPoint function
//called from the showRequestedPaths function if user requests directions from "Current Location"


var onLocationFoundOnce = function onLocationFoundOnce(e) {
  if (locateOnce) {
    Toast.fire({
      title: '<span class="w3-text-white">Location Found</span>'
    });
    var userCoords = [53.521015, -113.524421];
    startPointMarker.setLatLng(userCoords).bindPopup('Your Approximate Location', {
      autoClose: false
    }).addTo(currentFloorOverlay()).openPopup();

    if (traversingFloors) {
      console.log('traversingFloors = ' + traversingFloors);
      console.log('should add end marker to other floor');
      endPointMarker.addTo(otherFloorOverlay().openPopup());
    } else {
      endPointMarker.addTo(currentFloorOverlay()).openPopup();
      console.log('adding end marker to current floor');
    }

    if (searchBarUsed) {
      halfPathLine = L.polyline(searchMarker['lineCoords'], {
        color: 'black'
      }).bindPopup('Suggested path ').addTo(currentFloorOverlay());
      searchBarUsed = false;
    }

    setStartPoint();
  }

  locateOnce = false;
  traversingFloors = false;
};

map.on('locationfound', onLocationFoundOnce); //sets the closest reference point as the START point using User's location or the given START point marker
//uses the getClosestPointFrom function which returns a sorted array based on minimum distance and..
//includes the reference point's coordinates and name 
//Calls the minimum path finding function

var startMarkerDragged = false;

var setStartPoint = function setStartPoint() {
  if (startMarkerDragged || endMarkerDragged) {
    clearPathFxn();
    startPointMarker.addTo(currentFloorOverlay());
    endPointMarker.addTo(currentFloorOverlay());
  }

  getClosestPointFrom(startPointMarker);

  if (firstFloorMapOverlay.hasLayer(firstRefPoint)) {
    firstFloorMapOverlay.removeLayer(firstRefPoint);
  }

  ;

  if (secondFloorMapOverlay.hasLayer(firstRefPoint)) {
    secondFloorMapOverlay.removeLayer(firstRefPoint);
  }

  ;
  firstRefPoint = L.circleMarker(distancesToClosestRefPointArray[0][1], {
    color: 'green'
  }).addTo(currentFloorOverlay());
  firstRefPoint.bindPopup('Your closest reference point is here').openPopup();
  var start = distancesToClosestRefPointArray[0][2];
  findShortestPath(currentFloorMarkersObject(), start, end);
  startMarkerDragged = false;
  endMarkerDragged = false;
};

startPointMarker.on('dragend', function () {
  startMarkerDragged = true;
  setEndPoint();
}); //sets the closest reference point as the END point using the given end point marker
//uses the getClosestPointFrom function which returns a sorted array based on minimum distance and..
//includes the reference point's coordinates and name 

var endMarkerDragged = false;

var setEndPoint = function setEndPoint() {
  getClosestPointFrom(endPointMarker);

  if (firstFloorMapOverlay.hasLayer(endRefPoint)) {
    firstFloorMapOverlay.removeLayer(endRefPoint);
  }

  ;

  if (secondFloorMapOverlay.hasLayer(endRefPoint)) {
    secondFloorMapOverlay.removeLayer(endRefPoint);
  }

  ;
  endRefPoint = L.circleMarker(distancesToClosestRefPointArray[0][1], {
    color: 'red'
  }).bindPopup('Ending Reference point');
  end = distancesToClosestRefPointArray[0][2]; // passing in Point name ie. 'Point 1'

  setStartPoint();
};

endPointMarker.on('dragend', function () {
  endMarkerDragged = true;
  setEndPoint();
}); //Takes a given UserLocation/Start/End marker and finds the closest reference point 
//by subtracting the given point's latlng from each point in first floor OR second floor markers array 
//returns a sorted array of distances with the lowest distance first (ie. closest ref point) 

var getClosestPointFrom = function getClosestPointFrom(PointMarker) {
  distancesToClosestRefPointArray = [];
  calcDistancesFromEachMarker(currentFloorMarkersArray(), PointMarker);
  distancesToClosestRefPointArray.sort(function (a, b) {
    return a[0] - b[0];
  });
  return distancesToClosestRefPointArray;
};

var calcDistancesFromEachMarker = function calcDistancesFromEachMarker(markersArray, PointMarker) {
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
};

$('#hideBtn').click(function () {
  console.log('hideBtn clicked');
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

/***/ "./resources/js/halfPathsObject.js":
/*!*****************************************!*\
  !*** ./resources/js/halfPathsObject.js ***!
  \*****************************************/
/*! exports provided: halfPathsObj, greenPin, redPin, geojsonMarkerOptions, Toast, refObj */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "halfPathsObj", function() { return halfPathsObj; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "greenPin", function() { return greenPin; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "redPin", function() { return redPin; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "geojsonMarkerOptions", function() { return geojsonMarkerOptions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Toast", function() { return Toast; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "refObj", function() { return refObj; });
var halfPathsObj = {
  'secondFloorParking': [[53.520654628040006, -113.52435708045961], // Floor 2 Stairs point
  [53.52060906758032, -113.52429807186127], [53.52015986544371, -113.52429538965228], [53.52015505807627, -113.52305352687837], [53.52016242320309, -113.52270081639291], [53.51985505942433, -113.52220594882965] //Point 26
  ],
  'kayeEdmontonClinic': [[53.520654628040006, -113.52435708045961], //Floor 2 Stairs point
  [53.52060906758032, -113.52429807186127], [53.52051491174373, -113.5243007540703], [53.520518, -113.524601], [53.520374, -113.524596], [53.52037, -113.525395], [53.520363, -113.526096], [53.519151, -113.526086], [53.519151, -113.526406], [53.51913920619323, -113.52676570415497], [53.518729084031214, -113.52677643299104]],
  'radiologyUAH': [[53.520654628040006, -113.52435708045961], //Floor 2 Stairs point
  [53.52060906758032, -113.52429807186127], [53.5206164628691, -113.52407142519954]],
  '2J2': [[53.520654628040006, -113.52435708045961], //Floor 2 Stairs point
  [53.52071795444837, -113.52429807186127], [53.5210141850337, -113.52428734302521], [53.5210178856064, -113.5233834385872], [53.52104423591322, -113.5230052471161]],
  'mainCafeteria': [[53.520654628040006, -113.52435708045961], //Floor 1 Stairs point
  [53.52102285438584, -113.52451130747795], [53.52103081592075, -113.52387830615044], [53.52092864347813, -113.52389037609102]],
  'adultEmergency': [[53.520654628040006, -113.52435708045961], //Floor 1 Stairs point
  [53.52102285438584, -113.52451130747795], [53.52103081592075, -113.52387830615044], [53.52092864347813, -113.52389037609102], [53.52093662289389, -113.5233995318413], [53.52085054367954, -113.52341026067737], [53.52084743136733, -113.52238699793818], [53.52069906018151, -113.52239906787874], [53.52054835468738, -113.52213084697725]],
  'pediatricsEmergency': [[53.520654628040006, -113.52435708045961], //Floor 1 Stairs point
  [53.52102285438584, -113.52451130747795], [53.52103081592075, -113.52387830615044], [53.52092864347813, -113.52389037609102], [53.52093662289389, -113.5233995318413], [53.52085054367954, -113.52341026067737], [53.52084743136733, -113.52238699793818], [53.52069906018151, -113.52239906787874]],
  'MRI': [[53.520654628040006, -113.52435708045961], //Floor 1 Stairs point
  [53.52059220519894, -113.52430880069733], [53.520185320607595, -113.52430611848834], [53.520184724693955, -113.52473124861717], [53.52010627846002, -113.52474868297578]]
};
var greenPin = L.icon({
  iconUrl: 'https://elasticbeanstalk-us-east-2-203326335658.s3.us-east-2.amazonaws.com/icon/greenPin.png',
  iconSize: [17, 35],
  // size of the icon
  iconAnchor: [10, 40],
  // point of the icon which will correspond to marker's location
  popupAnchor: [-3, -46] // point from which the popup should open relative to the iconAnchor

});
var redPin = L.icon({
  iconUrl: 'https://elasticbeanstalk-us-east-2-203326335658.s3.us-east-2.amazonaws.com/icon/redPin.png',
  iconSize: [17, 35],
  // size of the icon
  iconAnchor: [10, 40],
  // point of the icon which will correspond to marker's location
  popupAnchor: [-3, -46] // point from which the popup should open relative to the iconAnchor

});
var geojsonMarkerOptions = {
  radius: 8,
  fillColor: "grey",
  color: "#000",
  weight: 1,
  opacity: 1,
  fillOpacity: 0.8
};
var Toast = Swal.mixin({
  toast: true,
  background: 'black',
  position: 'bottom',
  showConfirmButton: false,
  timer: 2500
});
var refObj = {
  'secondFloorParking': {
    floorLevel: 'secondFloor',
    pointName: 'Point 26',
    pointCoords: [53.51985505942433, -113.52220594882965]
  },
  'kayeEdmontonClinic': {
    floorLevel: 'secondFloor',
    pointName: 'Point 27',
    pointCoords: [53.518729084031214, -113.52677643299104]
  },
  'radiologyUAH': {
    floorLevel: 'secondFloor',
    pointName: 'Point 28',
    pointCoords: [53.5206164628691, -113.52407142519954]
  },
  '2J2': {
    floorLevel: 'secondFloor',
    pointName: 'Point 29',
    pointCoords: [53.52104423591322, -113.5230052471161]
  },
  'mainCafeteria': {
    floorLevel: 'firstFloor',
    pointName: 'Point 10',
    pointCoords: [53.52092864347813, -113.52389037609102]
  },
  'adultEmergency': {
    floorLevel: 'firstFloor',
    pointName: 'Point 18',
    pointCoords: [53.52054835468738, -113.52213084697725]
  },
  'pediatricsEmergency': {
    floorLevel: 'firstFloor',
    pointName: 'Point 17',
    pointCoords: [53.52069906018151, -113.52239906787874]
  },
  'MRI': {
    floorLevel: 'firstFloor',
    pointName: 'Point 26',
    pointCoords: [53.52010627846002, -113.52474868297578]
  },
  'firstFloorElevator': {
    floorLevel: 'firstFloor',
    pointName: 'Point 25',
    pointCoords: [53.520654628040006, -113.52435708045961]
  },
  'secondFloorElevator': {
    floorLevel: 'secondFloor',
    pointName: 'Point 30',
    pointCoords: [53.520654628040006, -113.52435708045961]
  },
  'firstFloor': 'firstFloor',
  'secondFloor': 'secondFloor'
};


/***/ }),

/***/ "./resources/js/radmap.js":
/*!********************************!*\
  !*** ./resources/js/radmap.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _require = __webpack_require__(/*! ./halfPathsObject */ "./resources/js/halfPathsObject.js"),
    Toast = _require.Toast;

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
  document.getElementById('findBtn').innerText = 'Locating..';
  document.getElementById('findBtn').classList.toggle("w3-grey");
  watchLocation = true;
  map.locate({
    setView: false,
    maxZoom: 19,
    watch: watchLocation,
    enableHighAccuracy: true
  });
  console.log('Locating with watch option ON...');

  if (watchLocation) {
    Toast.fire({
      title: '<span class="w3-text-white">Locating with live location update...</span>'
    });
  }
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
    Toast.fire({
      title: '<span class="w3-text-white">Showing live location... cancel with Stop button >>> </span>'
    });
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
    }).bindPopup("You are within " + radius + " meters from this point").addTo(locationMarkersLayerGroup);
  }

  if (counter <= 2) {
    x.openPopup();
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
  Toast.fire({
    title: '<span class="w3-text-white">Stopped Location Sharing >>> </span>'
  });
  console.log('Stopped Locating');
  counter = 0;
  document.getElementById('findBtn').style.display = 'block';
  document.getElementById('findBtn').classList.toggle("w3-grey");
  document.getElementById('findBtn').innerText = 'Locate';
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
  var coordString = t.latlng.lat + ', ' + t.latlng.lng; //coordString = t.latlng.lng + ', ' + t.latlng.lat;

  copyToClipboard(coordString);
  console.log("Copied the Coordinates to Clipboard: " + coordString);
}

map.on('dblclick', onMapDblClick);
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