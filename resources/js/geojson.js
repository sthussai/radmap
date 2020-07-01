const { controls } = require("./radmap");
const { halfPathsObj, greenPin, redPin, geojsonMarkerOptions, Toast, refObj } = require("./halfPathsObject");

const floorRecorder = () =>{
    if(map.hasLayer(firstFloorMap)){
        refObj.currentFloorLevel = 'firstFloor'
    } else {refObj.currentFloorLevel = 'secondFloor';}
}
floorRecorder();
map.on('baselayerchange', floorRecorder);

const switchFloorLevels = () => {
    if(refObj.currentFloorLevel == 'firstFloor'){
    map.removeLayer(firstFloorMap);
    map.addLayer(secondFloorMap);
    } else {
        map.removeLayer(secondFloorMap);
        map.addLayer(firstFloorMap);
    }
}
//function to switch floors After pressing 'S'
$(window).keydown(function(event) {
    if (event.which == 83) { //83 == Key Code for S
        switchFloorLevels(); 
        console.log('Switch Floors To');
        console.log(refObj.currentFloorLevel);
    }
});

$('#switchFloorBtn').click(function(){
switchFloorLevels();    
$('#directionsInfoDiv').addClass('w3-hide');
});

const secondFloorPopupMsg = $('<p>Elevator to go to 1st Floor Level <br> <button>1st Floor</button> </p>').click(function() {
    switchFloorLevels()
})[0];
const firstFloorPopupMsg = $('<p>Elevator to go to 2nd Floor Level <br> <button>2nd Floor</button> </p>').click(function() {
    switchFloorLevels()
})[0];


const elevator1stFloor = L.marker([53.520654628040006, -113.52435708045961])
.bindPopup(firstFloorPopupMsg).addTo(firstFloorMapOverlay);
const elevator2ndFloor = L.marker([53.520654628040006, -113.52435708045961])
.bindPopup(secondFloorPopupMsg).addTo(secondFloorMapOverlay);


const currentFloorMarkersObject = () => {
    if(refObj.currentFloorLevel == 'firstFloor'){
        return firstFloorMarkersObject
    } else {
    return secondFloorMarkersObject
    }
}
const currentFloorMarkersArray = () => {
    if(refObj.currentFloorLevel == 'firstFloor'){
        return firstFloorMarkersArray
    } else {
    return secondFloorMarkersArray
    }
}
const currentFloorOverlay = () => {
    console.log('current floor fxn called')
    if(refObj.currentFloorLevel == 'firstFloor'){
        return firstFloorMapOverlay
    } else {
    return secondFloorMapOverlay
    }
}
const otherFloorOverlay = () => {
    console.log('other floor fxn called')
    if(refObj.currentFloorLevel == 'firstFloor'){
        return secondFloorMapOverlay
    } else {
    return firstFloorMapOverlay
    }
}



const startPointMarker = L.marker([53.52061534234248, -113.52407008409502], {draggable:true, icon: greenPin}).bindPopup('Drag To Start Location');
const endPointMarker = L.marker([53.52060200173207, -113.52428197860719], {draggable:true, icon: redPin}).bindPopup('Drag To End Location');

const clearPathFxn = () =>{

    if(firstFloorMapOverlay.hasLayer(searchMakerLayer)){firstFloorMapOverlay.removeLayer(searchMakerLayer)};
    if(secondFloorMapOverlay.hasLayer(searchMakerLayer)){secondFloorMapOverlay.removeLayer(searchMakerLayer)};
    
    if(firstFloorMapOverlay.hasLayer(firstRefPoint)){firstFloorMapOverlay.removeLayer(firstRefPoint)};
    if(secondFloorMapOverlay.hasLayer(firstRefPoint)){secondFloorMapOverlay.removeLayer(firstRefPoint)};
    
    if(firstFloorMapOverlay.hasLayer(endRefPoint)){firstFloorMapOverlay.removeLayer(endRefPoint)};
    if(secondFloorMapOverlay.hasLayer(endRefPoint)){secondFloorMapOverlay.removeLayer(endRefPoint)};

    if(firstFloorMapOverlay.hasLayer(endPointMarker)) {firstFloorMapOverlay.removeLayer(endPointMarker);}
    if(secondFloorMapOverlay.hasLayer(endPointMarker)) {secondFloorMapOverlay.removeLayer(endPointMarker);}

    if(firstFloorMapOverlay.hasLayer(startPointMarker)) {firstFloorMapOverlay.removeLayer(startPointMarker);}
    if(secondFloorMapOverlay.hasLayer(startPointMarker)) {secondFloorMapOverlay.removeLayer(startPointMarker);}
    if(firstFloorMapOverlay.hasLayer(halfPathLine)) {firstFloorMapOverlay.removeLayer(halfPathLine);}
    if(secondFloorMapOverlay.hasLayer(halfPathLine)) {secondFloorMapOverlay.removeLayer(halfPathLine);}

    if(firstFloorMapOverlay.hasLayer(minDistanceLine)) {firstFloorMapOverlay.removeLayer(minDistanceLine);}
    if(secondFloorMapOverlay.hasLayer(minDistanceLine)) {secondFloorMapOverlay.removeLayer(minDistanceLine);}
    
}

$('#clearPathBtn').on('click', function (){
    clearPathFxn();
})

const secondFloorMarkerGroup = L.layerGroup().addTo(secondFloorMapOverlay);
const firstFloorMarkerGroup = L.layerGroup().addTo(firstFloorMapOverlay);
const firstFloorMarkersObject = {};
const firstFloorMarkersArray = [];
const secondFloorMarkersObject = {};
const secondFloorMarkersArray = [];

let firstRefPoint = null; 
let endRefPoint = null;
let distancesToClosestRefPointArray = [];
let minDistanceLine = null;
let halfPathLine = null;
let end = null;


const ajaxGetGeoJson = (url, floor, markerGroup) => {
    $.ajax({
        dataType: "json",
        url: url,
        success: function(data) {
            L.geoJSON(data, {
                onEachFeature: popupOnEachFeature,
                pointToLayer: function (feature, latlng) {
                    return L.circleMarker(latlng, geojsonMarkerOptions);
                },
                style: function(feature) {
                    switch (feature.properties.location) {
                        case 'final': return {color: "black", fillColor: "grey",};

                    }
                    switch (feature.properties.floor) {
                        case floor:   return {color: "#0000ff",  fillColor: "lightblue", radius: 5};
                    }
                },

            }).addTo(markerGroup);
        },
        error: function (xhr) {
            console.log('Error - probably with parsing JSON data');
            console.log(xhr);
          }
    });
}

ajaxGetGeoJson('/firstFloorData.json', 'first', firstFloorMarkerGroup);
ajaxGetGeoJson('/data.json', 'second', secondFloorMarkerGroup);  


setTimeout(() => {
    console.log('second floor data')
}, 3000);

const popupOnEachFeature = (feature, layer) => {

    if (feature.properties && feature.properties.popupContent) {
        layer.bindPopup(feature.properties.popupContent);
    }
    if (feature.properties.floor == "second" && feature.geometry.type == "Point"){
        secondFloorMarkersArray.push(feature);
        let name = feature.properties.name;
        let neighbour = {};
        neighbour[feature.properties.neighbour1] = parseInt(feature.properties.neighbour1Distance);
        if(feature.properties.neighbour2){
            neighbour[feature.properties.neighbour2] = parseInt(feature.properties.neighbour2Distance);  
        }
        if(feature.properties.neighbour3){
            neighbour[feature.properties.neighbour3] = parseInt(feature.properties.neighbour3Distance);  
        }
        if(feature.properties.neighbour4){
            neighbour[feature.properties.neighbour4] = parseInt(feature.properties.neighbour4Distance);  
        }
        secondFloorMarkersObject[name] = neighbour; 

    }
    if (feature.properties.floor == "first" && feature.geometry.type == "Point"){
        firstFloorMarkersArray.push(feature);
        let name = feature.properties.name;
        let neighbour = {};
        neighbour[feature.properties.neighbour1] = parseInt(feature.properties.neighbour1Distance);
        if(feature.properties.neighbour2){
            neighbour[feature.properties.neighbour2] = parseInt(feature.properties.neighbour2Distance);  
        }
        if(feature.properties.neighbour3){
            neighbour[feature.properties.neighbour3] = parseInt(feature.properties.neighbour3Distance);  
        }
        if(feature.properties.neighbour4){
            neighbour[feature.properties.neighbour4] = parseInt(feature.properties.neighbour4Distance);  
        }
        firstFloorMarkersObject[name] = neighbour; 

    }

}




let shortestDistanceNode = (distances, visited) => {
    // create a default value for shortest
      let shortest = null;
      
        // for each node in the distances object
      for (let node in distances) {
          // if no node has been assigned to shortest yet
            // or if the current node's distance is smaller than the current shortest
            let currentIsShortest = shortest === null || distances[node] < distances[shortest];
            // and if the current node is in the unvisited set
          if (currentIsShortest && !visited.includes(node)) {
              // update shortest to be the current node
              shortest = node;
          }
      }

      return shortest;
      
  };

    let findShortestPath = (graph, startNode, endNode) => {
 
      // track distances from the start node using a hash object
      let distances = {};
      distances[endNode] = "Infinity";
      distances = Object.assign(distances, graph[startNode]);// track paths using a hash object
      console.log("distances");
      console.log(distances);
      let parents = { endNode: null };
      for (let child in graph[startNode]) {
          parents[child] = startNode;
        }
        console.log("parents");
        console.log(parents);
        
        // collect visited nodes
        let visited = [];
        // find the nearest node
        let node = shortestDistanceNode(distances, visited);
        //return console.log(node);
        
    // for that node:
    while (node) {
    // find its distance from the start node & its child nodes
     let distance = distances[node];
     let children = graph[node]; 
         
    // for each of those child nodes:
         for (let child in children) {
     
     // make sure each child node is not the start node
           if (String(child) === String(startNode)) {
             continue;
          } else {
             // save the distance from the start node to the child node
             let newdistance = distance + children[child];// if there's no recorded distance from the start node to the child node in the distances object
   // or if the recorded distance is shorter than the previously stored distance from the start node to the child node
             if (!distances[child] || distances[child] > newdistance) {
   // save the distance to the object
        distances[child] = newdistance;
   // record the path
        parents[child] = node;
       } 
            }
          }  
         // move the current node to the visited set
         visited.push(node);// move to the nearest neighbor node
         node = shortestDistanceNode(distances, visited);
       }
     
    // using the stored paths from start node to end node
    // record the shortest path
    let shortestPath = [endNode];
    let parent = parents[endNode];
    while (parent) {
     shortestPath.push(parent);
     parent = parents[parent];
    }
    //this is the shortest path
    shortestPath.reverse();

    let results = {
     distance: distances[endNode],
     path: shortestPath,
    };
    // return the shortest path & the end node's distance from the start node

    console.log("results");   
    console.log(results);   
    
    getNamesInOrder(results.path);
    
   };

    const getNamesInOrder = (path) => {
        const minDistanceLineCoords =[];
        if(map.hasLayer(firstFloorMap)){     
            for ( var i = 0; i<path.length; i++){
            firstFloorMarkersArray.forEach(function (feature){
                    if(feature.properties.name == path[i]){
                          let lt = feature.geometry.coordinates[1];
                          let ln = feature.geometry.coordinates[0];
                          let ltln = [lt, ln];
                          minDistanceLineCoords.push(ltln);  
                        }                   
                  });
            }
        } else{
            for ( var i = 0; i<path.length; i++){
                secondFloorMarkersArray.forEach(function (feature){
                        if(feature.properties.name == path[i]){
                              let lt = feature.geometry.coordinates[1];
                              let ln = feature.geometry.coordinates[0];
                              let ltln = [lt, ln];
                              minDistanceLineCoords.push(ltln);  
                            }                   
                      });
                }
        }
        drawLine(minDistanceLineCoords);    
    }   
    
   const drawLine = (minDistanceLineCoords) => {
    minDistanceLine = L.polyline(minDistanceLineCoords, {color:"black"})
    .bindPopup('Minimum distance path ');
    minDistanceLine.addTo(currentFloorOverlay());
}


$('#showPathsBtn').click(function(){
    showRequestedPaths();
});


const validateDirectionsInput =  (directionToPath, directionFromPath) => {
    $('#directionsInfoDiv, #directionsErrorDiv').addClass('w3-hide');
    if (directionFromPath =="null" || directionToPath =="null" || directionFromPath == directionToPath ){
        console.log('Locations should not be empty or same'); 
        return $('#directionsErrorDiv').removeClass('w3-hide');     
    } 
    if(directionFromPath == 'currentLocation'){
    return 'checked'
    }
    if(refObj[directionFromPath]['floorLevel'] != refObj.currentFloorLevel){
        console.log('Need to switch map floors'); 
        return $('#directionsInfoDiv').removeClass('w3-hide'); 
    }
    return 'checked'
}

let traversingFloors = false;
//this function is called from the App's UI when the user requests directions by supplying 'To' and 'From' locations
//validates users input and ensures user's 'From' location is on the same floor
const showRequestedPaths =  () => {
    const directionToPath = document.getElementById("directionsToInput").value;
    const directionFromPath = document.getElementById("directionsFromInput").value;
    const validInput = validateDirectionsInput(directionToPath, directionFromPath);
    if(validInput != 'checked'){return validInput}

    closeNav();
    clearPathFxn();
    if(refObj[directionToPath]['floorLevel'] != refObj.currentFloorLevel && directionFromPath == 'currentLocation'){
        console.log('using current location and going to different floor')
        drawOtherFloorPath(directionToPath);
        endPointMarker.setLatLng(refObj[directionToPath]['pointCoords']).bindPopup('Your End Location');
        const currentFloorLevelElevator =  refObj.currentFloorLevel+'Elevator';
        end = refObj[currentFloorLevelElevator]['pointName'];
        traversingFloors = true;
        return locateMe();
    }
    
    //else to and from locations on same floor
    else if(directionFromPath == 'currentLocation'){
        locateMe();
        endPointMarker.setLatLng(refObj[directionToPath]['pointCoords']).bindPopup('Your End Location');
        return end = refObj[directionToPath]['pointName'];        
    }   

    else if(refObj[directionToPath]['floorLevel'] != refObj.currentFloorLevel){
        drawOtherFloorPath(directionToPath);
        const currentFloorLevelElevator =  refObj.currentFloorLevel+'Elevator';
        const end = refObj[currentFloorLevelElevator]['pointName'];
        const start = refObj[directionFromPath]['pointName'];
        findShortestPath(currentFloorMarkersObject(), start, end);
        startPointMarker.setLatLng(refObj[directionFromPath]['pointCoords']).bindPopup('Your Start Location').addTo(currentFloorOverlay());
        endPointMarker.setLatLng(refObj[directionToPath]['pointCoords']).bindPopup('Your End Location').addTo(otherFloorOverlay());
        return;
    }
      
    else {
        start = refObj[directionFromPath]['pointName'];
        end = refObj[directionToPath]['pointName'];
        endPointMarker.setLatLng(refObj[directionToPath]['pointCoords']).bindPopup('Your End Location').addTo(currentFloorOverlay()).openPopup();
        startPointMarker.setLatLng(refObj[directionFromPath]['pointCoords']).bindPopup('Your Start Location').addTo(currentFloorOverlay()).openPopup();
        findShortestPath(currentFloorMarkersObject(), start, end);
    }

}



const drawOtherFloorPath = (directionToPath) => {
    console.log('heading to a different Floor: '+ refObj[directionToPath]['floorLevel']);
    const halfPathsCoords = halfPathsObj[directionToPath];
    if(refObj.currentFloorLevel == 'firstFloor'){
        elevator1stFloor.openPopup();    
    } else {
        elevator2ndFloor.openPopup();
        console.log('finding from 2nd floor start to second floor elevator')
    }
    halfPathLine = L.polyline(halfPathsCoords, {color:'black'}).bindPopup('Your path continued..').addTo(otherFloorOverlay());
}

let locateOnce = false;
const locateMe = () => {
    locateOnce = true;
    map.locate({
        setView: false
    });
    console.log('Locating once...');
    Toast.fire({
        title: '<span class="w3-text-white">Locating...</span>'
      })
}



//Supplies user's location to setStartPoint function
//called from the showRequestedPaths function if user requests directions from "Current Location"
const onLocationFoundOnce = (e) => {
if (locateOnce) {
    let userCoords = [ 53.521015, -113.524421];
    startPointMarker.setLatLng(userCoords).bindPopup('Your Approximate Location', {autoClose: false}).addTo(currentFloorOverlay()).openPopup();
    if(traversingFloors) {
    console.log('traversingFloors = ' + traversingFloors)
    console.log('should add end marker to other floor')
    endPointMarker.addTo(otherFloorOverlay().openPopup());
    } 
    else {
        endPointMarker.addTo(currentFloorOverlay()).openPopup();
        console.log('adding end marker to current floor')
    }
    setStartPoint();
}
locateOnce = false;
traversingFloors = false;
}

map.on('locationfound', onLocationFoundOnce);    



//sets the closest reference point as the START point using User's location or the given START point marker
//uses the getClosestPointFrom function which returns a sorted array based on minimum distance and..
//includes the reference point's coordinates and name 
//Calls the minimum path finding function
let startMarkerDragged = false; 
const setStartPoint = () => {
    if(startMarkerDragged || endMarkerDragged){clearPathFxn();
    startPointMarker.addTo(currentFloorOverlay());
    endPointMarker.addTo(currentFloorOverlay());
    }    
    getClosestPointFrom(startPointMarker);
    if(firstFloorMapOverlay.hasLayer(firstRefPoint)){firstFloorMapOverlay.removeLayer(firstRefPoint)};
    if(secondFloorMapOverlay.hasLayer(firstRefPoint)){secondFloorMapOverlay.removeLayer(firstRefPoint)};
    firstRefPoint = L.circleMarker(distancesToClosestRefPointArray[0][1], {color: 'green'}).addTo(currentFloorOverlay());
    firstRefPoint.bindPopup('Your closest reference point is here').openPopup();
    const start = distancesToClosestRefPointArray[0][2];
    findShortestPath(currentFloorMarkersObject(), start, end );
    startMarkerDragged = false;
    endMarkerDragged = false;
}

startPointMarker.on('dragend', function(){
    startMarkerDragged = true;
    setEndPoint();   
});


//sets the closest reference point as the END point using the given end point marker
//uses the getClosestPointFrom function which returns a sorted array based on minimum distance and..
//includes the reference point's coordinates and name 
let endMarkerDragged = false; 
const setEndPoint = () => {
    getClosestPointFrom(endPointMarker);    
    if(firstFloorMapOverlay.hasLayer(endRefPoint)){firstFloorMapOverlay.removeLayer(endRefPoint)};
    if(secondFloorMapOverlay.hasLayer(endRefPoint)){secondFloorMapOverlay.removeLayer(endRefPoint)};
    endRefPoint = L.circleMarker(distancesToClosestRefPointArray[0][1], {color: 'red'}).bindPopup('Ending Reference point');
    end = distancesToClosestRefPointArray[0][2]; // passing in Point name ie. 'Point 1'
    setStartPoint();
}

endPointMarker.on('dragend', function(){
    endMarkerDragged = true;
    setEndPoint();   
});

//Takes a given UserLocation/Start/End marker and finds the closest reference point 
//by subtracting the given point's latlng from each point in first floor OR second floor markers array 
//returns a sorted array of distances with the lowest distance first (ie. closest ref point) 
const getClosestPointFrom = (PointMarker) => {
    distancesToClosestRefPointArray = [];
    calcDistancesFromEachMarker(currentFloorMarkersArray(), PointMarker);
    distancesToClosestRefPointArray.sort(function(a, b){return a[0] - b[0]});
    return distancesToClosestRefPointArray;
    }
    
const calcDistancesFromEachMarker = (markersArray, PointMarker) => {
    markersArray.forEach(function (feature){
        let lt = feature.geometry.coordinates[1];
        let ln = feature.geometry.coordinates[0];
        let ltln = [lt, ln];
        let name = feature.properties.name;
        let ltlnDistance = map.distance(ltln, PointMarker.getLatLng());
        ltlnDistance = Math.round((ltlnDistance) * 100) / 100;
        ltlnDistance = [ltlnDistance, ltln, name];
        distancesToClosestRefPointArray.push(ltlnDistance);
        });
}


    $('#hideBtn').click(function(){
        console.log('hideBtn clicked');
    })


    
    
    
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