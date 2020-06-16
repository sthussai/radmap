let pathGroup = L.layerGroup().addTo(secondFloorMap);
let myLayer = null;
let startRefPointMarker = L.marker([53.51993090722499, -113.52201819419861], {draggable:true}).bindPopup('Ur here for Demo 2').addTo(secondFloorMap);
let endRefPointMarker = L.marker([53.52060200173207, -113.52428197860719], {draggable:true}).bindPopup('Final location').addTo(secondFloorMap);
let firstRefPoint = null;
let endRefPoint = null;
let distancesToClosestRefPointArray = [];
let ltlnFinalLocationsArray = [];
let geojsonMarkerOptions = {
    radius: 8,
    fillColor: "grey",
    color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8
};

let minDistanceLine = null;

let markersObject = {};

let markersArray = [];

let start = "Point 14";
let end = "Point 5";

function ajaxGetGeoJsonFinalLocations() {
    $.ajax({
        dataType: "json",
        url: '/finalLocationData.json',
        success: function(data) {
        //    console.log(data);
            myLayer = L.geoJSON(data, {
                onEachFeature: popupOnEachFinalLocation,
                pointToLayer: function (feature, latlng) {
                    return L.circleMarker(latlng, geojsonMarkerOptions);
                },
                style: function(feature) {
                    switch (feature.properties.floor) {
                        case 'location':   return {color: "black",     fillColor: "grey",};
                    }
                },

            }).addTo(secondFloorMap);
        },
        error: function (xhr) {
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
        success: function(data) {
            myLayer = L.geoJSON(data, {
                filter: function(feature) {
                    return feature.properties.floor;
                },
                onEachFeature: popupOnEachFeature,
                pointToLayer: function (feature, latlng) {
                    return L.circleMarker(latlng, geojsonMarkerOptions);
                },
                style: function(feature) {
                    switch (feature.properties.floor) {
                        case 'first': return {color: "#ff0000", fillColor: "orange",};
                        case 'second':   return {color: "#0000ff",  fillColor: "lightblue",};
                    }
                },

            }).addTo(secondFloorMap);
        },
        error: function (xhr) {
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
        success: function(data) {
            myLayer = L.geoJSON(data, {
                filter: function(feature) {
                    return feature.properties.floor;
                },
                onEachFeature: popupOnEachFeature,
                pointToLayer: function (feature, latlng) {
                    return L.circleMarker(latlng, geojsonMarkerOptions);
                },
                style: function(feature) {
                    switch (feature.properties.floor) {
                        case 'first': return {color: "#ff0000", fillColor: "orange",};
                        case 'second':   return {color: "#0000ff",  fillColor: "lightblue",};
                    }
                },

            }).addTo(firstFloorMap);
        },
        error: function (xhr) {
            console.log('Error - probably with parsing JSON data');
            console.log(xhr);
          }
    });
}


//ajaxGetGeoJsonFirstFloor();



function popupOnEachFinalLocation(feature, layer) {

    if (feature.properties && feature.properties.popupContent) {
        layer.bindPopup(feature.properties.popupContent);
    }
    if (feature.properties && feature.geometry.type == "Point"){
        var lt = feature.geometry.coordinates[1];
        var ln = feature.geometry.coordinates[0];
        var ltln=[lt, ln];        
        ltlnFinalLocationsArray.push(ltln);
    }
}
function popupOnEachFeature(feature, layer) {

    if (feature.properties && feature.properties.popupContent) {
        layer.bindPopup(feature.properties.popupContent);
    }
    if (feature.properties && feature.geometry.type == "Point"){
        markersArray.push(feature);
        let name = feature.properties.name;
        let neighbour = {};
        neighbour[feature.properties.neighbour1] = parseInt(feature.properties.neighbour1Distance);
        if(feature.properties.neighbour2){
            neighbour[feature.properties.neighbour2] = parseInt(feature.properties.neighbour2Distance);  
        }
        if(feature.properties.neighbour3){
            neighbour[feature.properties.neighbour3] = parseInt(feature.properties.neighbour3Distance);  
        }
        markersObject[name] = neighbour; 

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
    
    getNamesInOrder(results.path);
    
   };

    const getNamesInOrder = (path) => {
        minDistanceLineCoords =[];
        for ( var i = 0; i<path.length; i++){
        markersArray.forEach(function (feature){
                if(feature.properties.name == path[i]){
                      let lt = feature.geometry.coordinates[1];
                      let ln = feature.geometry.coordinates[0];
                      let ltln = [lt, ln];
                      minDistanceLineCoords.push(ltln);  
                    }                   
              });
        }
        drawLine();    
    }   

   const drawLine = () => {
    pathGroup.clearLayers();
    minDistanceLine = L.polyline(minDistanceLineCoords, {color:"black"})
    .bindPopup('Minimum distance path ')                
    .addTo(pathGroup);
}

// Takes ltln array and user location ltln as 'this' value, returns ltln of closest ref point
const setStartPoint = () => {
    
    getClosestPointFrom(startRefPointMarker);
    if (firstRefPoint) {firstRefPoint.remove()};
    firstRefPoint = L.circleMarker(distancesToClosestRefPointArray[0][1], {color: 'green'}).addTo(secondFloorMap);
    firstRefPoint.bindPopup('Your closest reference point is here').openPopup();
    start = distancesToClosestRefPointArray[0][2];
    findShortestPath(markersObject, start, end);
}

startRefPointMarker.on('dragend', setStartPoint);

const setEndPoint = () => {
   
    getClosestPointFrom(endRefPointMarker);
    if (endRefPoint) {endRefPoint.remove()};
    endRefPoint = L.circleMarker(distancesToClosestRefPointArray[0][1], {color: 'white'}).addTo(map);
    endRefPoint.bindPopup('Your End point is here').openPopup();
    end = distancesToClosestRefPointArray[0][2];
    setStartPoint();
}

endRefPointMarker.on('dragend', setEndPoint);

const getClosestPointFrom = (PointMarker) => {
    distancesToClosestRefPointArray = [];

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

    distancesToClosestRefPointArray.sort(function(a, b){return a[0] - b[0]});

    return distancesToClosestRefPointArray;
}










$('#infoDiv').click(function(){
myLayer.bringToBack();
});


$('#hidebtn').click(function(){
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