const { controls } = require("./radmap");
const greenPin = L.icon({
    iconUrl: 'https://elasticbeanstalk-us-east-2-203326335658.s3.us-east-2.amazonaws.com/icon/greenPin.png',

    iconSize:     [17, 35], // size of the icon
    iconAnchor:   [10, 40], // point of the icon which will correspond to marker's location
    popupAnchor:  [-3, -46] // point from which the popup should open relative to the iconAnchor
});
const redPin = L.icon({
    iconUrl: 'https://elasticbeanstalk-us-east-2-203326335658.s3.us-east-2.amazonaws.com/icon/redPin.png',
    iconSize:     [17, 35], // size of the icon
    iconAnchor:   [10, 40], // point of the icon which will correspond to marker's location
    popupAnchor:  [-3, -46] // point from which the popup should open relative to the iconAnchor
});
const refObj = {
    'secondFloorParking' : ['secondFloor', 'Point 26', [53.51985505942433, -113.52220594882965]],
    'kayeEdmontonClinic' : ['secondFloor', 'Point 27', [53.518729084031214, -113.52677643299104]],
    'radiologyUAH' : ['secondFloor', 'Point 28', [53.5206164628691, -113.52407142519954]],
    '2J2' : ['secondFloor', 'Point 29', [53.52104423591322, -113.5230052471161]],
    'mainCafeteria' : ['firstFloor', 'Point 10', [53.52092864347813, -113.52389037609102]],
    'adultEmergency' : ['firstFloor', 'Point 18', [53.52054835468738, -113.52213084697725]],
    'pediatricsEmergency' : ['firstFloor', 'Point 17', [53.52069906018151, -113.52239906787874]],
    'firstFloorElevator' : ['firstFloor', 'Point 25', [53.520654628040006, -113.52435708045961]],
    'secondFloorElevator' : ['secondFloor', 'Point 30', [53.520654628040006, -113.52435708045961]],
    'firstFloor' : 'firstFloor',
    'secondFloor' : 'secondFloor',
    'secondFloorMarkersObject' : 'secondFloorMarkersObject',
}

const Toast = Swal.mixin({
    toast: true,
    background: 'black',
    position: 'bottom',
    showConfirmButton: false,
    timer: 2500,
  });

let pathGroup = L.layerGroup().addTo(mapOverlay);
let startPointMarker = L.marker([53.52061534234248, -113.52407008409502], {draggable:true, icon: greenPin}).bindPopup('Drag To Start Location').addTo(mapOverlay);
let endPointMarker = L.marker([53.52060200173207, -113.52428197860719], {draggable:true, icon: redPin}).bindPopup('Drag To End Location').addTo(mapOverlay);

const clearPathFxn = () =>{
    mapOverlay.clearLayers();
    pathGroup.clearLayers();
    startPointMarker.addTo(mapOverlay);
    endPointMarker.addTo(mapOverlay);
    pathGroup.addTo(mapOverlay);

}

map.on('baselayerchange', clearPathFxn);
$('#clearPathBtn').on('click', function (){
    clearPathFxn();
})

let secondFloorMarkerGroup = L.layerGroup().addTo(secondFloorMapOverlay);
let firstFloorMarkerGroup = L.layerGroup().addTo(firstFloorMapOverlay);
mapOverlay.addTo(map);
let firstRefPoint = null; 
let endRefPoint = null;
let distancesToClosestRefPointArray = [];
let geojsonMarkerOptions = {
    radius: 8,
    fillColor: "grey",
    color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8
};

let minDistanceLine = null;

let firstFloorMarkersObject = {};
let firstFloorMarkersArray = [];

let secondFloorMarkersObject = {};
let secondFloorMarkersArray = [];

let start = "Point 14";
let end = "Point 5";

const ajaxGetGeoJsonSecondFloor = () => {
    $.ajax({
        dataType: "json",
        url: '/data.json',
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
                        case 'second':   return {color: "#0000ff",  fillColor: "lightblue", radius: 5};
                    }
                },

            }).addTo(secondFloorMarkerGroup);
        },
        error: function (xhr) {
            console.log('Error - probably with parsing JSON data');
            console.log(xhr);
          }
    });
}

ajaxGetGeoJsonSecondFloor();

const ajaxGetGeoJsonFirstFloor = () => {
    $.ajax({
        dataType: "json",
        url: '/firstFloorData.json',
        success: function(data) {
            console.log('get first floor data')
            L.geoJSON(data, {
                filter: function(feature) {
                    return !feature.properties.secondFloor;
                },
                onEachFeature: popupOnEachFeature,
                pointToLayer: function (feature, latlng) {
                    return L.circleMarker(latlng, geojsonMarkerOptions);
                },
                style: function(feature) {
                    switch (feature.properties.floor) {
                        case 'first': return {color: "green", fillColor: "lightgreen", radius: 5};    
                    }
                },

            }).addTo(firstFloorMarkerGroup);
        },
        error: function (xhr) {
            console.log('Error - probably with parsing JSON data');
            console.log(xhr);
          }
    });
}


/* $(controls.getContainer()).mouseenter(function(){
  }); */

setTimeout(() => {
    ajaxGetGeoJsonFirstFloor();    
}, 3000);

let popupOnEachFeature = (feature, layer) => {

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

var minDistanceLineCoords = [];


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
      console.log("Start " + start + " end " + end);
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
    
    console.log("distancesToClosestRefPointArray");   
    console.log(distancesToClosestRefPointArray);   
    
    getNamesInOrder(results.path);
    
   };

    const getNamesInOrder = (path) => {
        minDistanceLineCoords =[];
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
        drawLine();    
    }   
    
   const drawLine = () => {
       pathGroup.clearLayers();
    minDistanceLine = L.polyline(minDistanceLineCoords, {color:"black"})
    .bindPopup('Minimum distance path ')                
    .addTo(pathGroup);
}

let locateOnce = false;
let userLatLng = null;
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

$('#showPathsBtn').click(function(){
    showRequestedPaths();
});


//this function is called from the App's UI when the user requests directions by supplying 'To' and 'From' locations
function showRequestedPaths(){
    var directionToPath = document.getElementById("directionsToInput").value;
    var directionFromPath = document.getElementById("directionsFromInput").value;
    document.getElementById('directionsErrorDiv').innerText = '';
    if (directionFromPath =="null" || directionToPath =="null" || directionFromPath == directionToPath ){
        document.getElementById('directionsErrorDiv').innerText="Please select valid and different 'To' and 'From' locations"
        console.log('Invalid locations'); 
        return;}
    closeNav();
    if(directionFromPath == 'currentLocation'){
        locateMe();
        endPointMarker.setLatLng(refObj[directionToPath][2]).bindPopup('Your End Location').openPopup();
        end = refObj[directionToPath][1];
    } else {
        console.log(refObj[directionFromPath][0]);
        console.log(refObj[directionToPath][0]);
        if(refObj[directionFromPath][0] != refObj[directionToPath][0]){
            console.log('heading to a different Floor From ' + [directionFromPath][0] + ' to ' + [directionToPath][0]);
            endPointMarker.setLatLng(refObj['firstFloorElevator'][2]).bindPopup('Your End Location').openPopup();
            end = refObj['firstFloorElevator'][1];
            return
        }
        start = refObj[directionFromPath][1];
        end = refObj[directionToPath][1];
        endPointMarker.setLatLng(refObj[directionToPath][2]).bindPopup('Your End Location').openPopup();
        startPointMarker.setLatLng(refObj[directionFromPath][2]).bindPopup('Your Start Location').openPopup();
        if(map.hasLayer(firstFloorMap)){    
            findShortestPath(firstFloorMarkersObject, start, end);
        } else {
            findShortestPath(secondFloorMarkersObject, start, end);
        }
    }

}

//Supplies user's location to setStartPoint function
//called from the showRequestedPaths function if user requests directions from "Current Location"
const onLocationFoundOnce = (e) => {
if (locateOnce) {
    let userCoords = [ 53.52100017444731, -113.52254390716554];
    startPointMarker.setLatLng(userCoords).bindPopup('Your Approximate Location').openPopup();
    setStartPoint();
}
locateOnce = false
}

map.on('locationfound', onLocationFoundOnce);    

//sets the closest reference point as the START point using User's location or the given START point marker
//uses the getClosestPointFrom function which returns a sorted array based on minimum distance and..
//includes the reference point's coordinates and name 
//Calls the minimum path finding function 
const setStartPoint = () => {
    getClosestPointFrom(startPointMarker);
    if (firstRefPoint) {firstRefPoint.remove()};
    firstRefPoint = L.circleMarker(distancesToClosestRefPointArray[0][1], {color: 'green'}).addTo(mapOverlay);
    firstRefPoint.bindPopup('Your closest reference point is here').openPopup();
    start = distancesToClosestRefPointArray[0][2];
    if(map.hasLayer(firstFloorMap)){    
        findShortestPath(firstFloorMarkersObject, start, end);
    } else {
        findShortestPath(secondFloorMarkersObject, start, end);
    }
}

startPointMarker.on('dragend', setStartPoint);


//sets the closest reference point as the END point using the given end point marker
//uses the getClosestPointFrom function which returns a sorted array based on minimum distance and..
//includes the reference point's coordinates and name 
const setEndPoint = () => {
    
    getClosestPointFrom(endPointMarker);
    if (endRefPoint) {endRefPoint.remove()};
    endRefPoint = L.circleMarker(distancesToClosestRefPointArray[0][1], {color: 'red'}).addTo(mapOverlay);
    endRefPoint.bindPopup('Your End point is here').openPopup();
    end = distancesToClosestRefPointArray[0][2]; // passing in Point name ie. 'Point 1'
    setStartPoint();
}

endPointMarker.on('dragend', setEndPoint);

//Takes a given UserLocation/Start/End marker and finds the closest reference point 
//by subtracting the given point's latlng from each point in first floor OR second floor markers array 
//returns a sorted array of distances with the lowest distance first (ie. closest ref point) 
const getClosestPointFrom = (PointMarker) => {
    distancesToClosestRefPointArray = [];
    if(map.hasLayer(firstFloorMap)){        
        firstFloorMarkersArray.forEach(function (feature){
            let lt = feature.geometry.coordinates[1];
            let ln = feature.geometry.coordinates[0];
            let ltln = [lt, ln];
            let name = feature.properties.name;
            let ltlnDistance = map.distance(ltln, PointMarker.getLatLng());
            ltlnDistance = Math.round((ltlnDistance) * 100) / 100;
            ltlnDistance = [ltlnDistance, ltln, name];
            distancesToClosestRefPointArray.push(ltlnDistance);
         });
    } else {
        secondFloorMarkersArray.forEach(function (feature){
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
     
     distancesToClosestRefPointArray.sort(function(a, b){return a[0] - b[0]});

     return distancesToClosestRefPointArray;
    }
    

    
    
    
    
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