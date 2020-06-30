
var myLayer = null;
var states;
var finaLocationDistanceLine;
var urhere2 = L.marker([53.51993090722499, -113.52201819419861], {draggable:true}).bindPopup('Ur here for Demo 2').addTo(secondFloorMap);
var finalLocation = L.marker([53.52060200173207, -113.52428197860719], {draggable:true}).bindPopup('Final location').addTo(secondFloorMap);
var ltlnArray = [];
var ltlnFinalLocationsArray = [];
let distancesArray = [];
var finalLocationDistancesArray = [];
var distanceToFinalLocation;
var lineToFirstRefPoint, lineFromFirstRefPoint, finalPathLine;
var geojsonMarkerOptions = {
    radius: 8,
    fillColor: "grey",
    color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8
};


function getDistanceFunction(ltln){
    ltlnDistance = map.distance(ltln, this);
    ltlnDistance = Math.round((ltlnDistance) * 100) / 100;
    distancesArray.push(ltlnDistance);
    
}

function calcDistanceToFinalLocation(){
    var finalLocationLtLn = finalLocation.getLatLng();
    var userLocationLatLng = urhere2.getLatLng();
    distanceToFinalLocation = map.distance(userLocationLatLng, finalLocationLtLn);
    var finaLocationDistanceLineCoords = [userLocationLatLng, finalLocationLtLn];
    if(finaLocationDistanceLine){
        finaLocationDistanceLine.remove();
        finalPathLine.remove();
    }
    finaLocationDistanceLine = L.polyline(finaLocationDistanceLineCoords, {color: 'grey'}).bindPopup('You are approximately ' + distanceToFinalLocation + ' meters away from your final location').addTo(map);
    }






var circleMarkerForSecondClosestPoint, circleMarkerForThirdClosestPoint;

function drawMinimumDistanceLine(){
    var userLocationLatLng = urhere2.getLatLng();
    var finalLocationLtLn = finalLocation.getLatLng();
    if (ltlnArray.length != 0){
        distancesArray=[];
    
    var indexMin = distancesArray.indexOf(min);
    var sortedDistancesArray = sort(distancesArray);
    sortedDistancesArray = sortedDistancesArray.sort(function(a, b){return a-b});
    
    var secondClosestPoint = sortedDistancesArray[1]; // gives next two closest distance after 1st reference point
    var thirdClosestPoint = sortedDistancesArray[2];
    secondClosestPoint = distancesArray.indexOf(secondClosestPoint); //we find those two distances in our first distance array
    thirdClosestPoint = distancesArray.indexOf(thirdClosestPoint);  
    
    var firstRefPointLtLn = ltlnArray[indexMin];
    var secondClosestPointLtLn = ltlnArray[secondClosestPoint];
    var thirdClosestPointLtLn = ltlnArray[thirdClosestPoint];

        if(lineToFirstRefPoint){
            lineToFirstRefPoint.remove();
            circleMarkerForSecondClosestPoint.remove();
            circleMarkerForThirdClosestPoint.remove();
        }
    

        //console.log("Indexes of two closest points" + secondClosestPoint + " " + thirdClosestPoint);                
        
        circleMarkerForSecondClosestPoint = L.circleMarker(secondClosestPointLtLn).addTo(map);
        circleMarkerForThirdClosestPoint = L.circleMarker(thirdClosestPointLtLn).addTo(map);
        
        
        //console.log('ltln Array =  '+ltlnArray);
        //console.log('Index of Min =  '+ indexMin);
        //console.log('userLocationLatLng =  '+ userLocationLatLng);
        //console.log('Min distance to first path point is ' + min + ' with coordinates of ' + firstRefPointLtLn + ' m' + 'Index of Min =  '+ indexMin);
        //console.log('Second and Third point is ' + secondClosestPoint + " " + thirdClosestPoint );        
        //console.log('Distance to final location '+ distanceToFinalLocation);
        
        var distanceFromFirstRefPointToFinalLocation = map.distance(firstRefPointLtLn,finalLocationLtLn);    
        
        //        console.log("Coords of two closest points are " + secondClosestPointLtLn + " " + thirdClosestPointLtLn);                
        secondClosestPointDistance = map.distance(firstRefPointLtLn, secondClosestPointLtLn);
        thirdClosestPointDistance = map.distance(firstRefPointLtLn, thirdClosestPointLtLn);        
        distanceFromSecondClosestPointToFinalLocation = map.distance( finalLocationLtLn, secondClosestPointLtLn);
        distanceFromThirdClosestPointToFinalLocation = map.distance( finalLocationLtLn, thirdClosestPointLtLn);        
        //        console.log('Distance point 1 ' + secondClosestPointDistance);        
        //        console.log('Distance point 2 ' + thirdClosestPointDistance);    
        
        var finalPathLineCoords = [userLocationLatLng, firstRefPointLtLn, secondClosestPointLtLn, thirdClosestPointLtLn];
        
        var firstReferencePointIsBehindUser = false;

        if(distanceToFinalLocation < distanceFromFirstRefPointToFinalLocation){
            firstReferencePointIsBehindUser= true;
        }

        lineToFirstRefPoint = L.polyline([firstRefPointLtLn, userLocationLatLng], {color: 'red'}).bindPopup('You are approximately ' + min + ' meters away from the closest reference point.').addTo(map);
        lineFromFirstRefPoint = L.polyline([firstRefPointLtLn,finalLocationLtLn], {color: 'blue'}).bindPopup('You are approximately ' + 
        distanceFromFirstRefPointToFinalLocation + ' meters away from your final location.').addTo(map);
        
        if(firstReferencePointIsBehindUser){
            if(lineToFirstRefPoint){
                lineToFirstRefPoint.remove();
                circleMarkerForSecondClosestPoint.remove();
                circleMarkerForThirdClosestPoint.remove();
            }
            console.log('distance to final location is shorter than via reference point');
            finalPathLineCoords.splice(1,1); //removes first ref point from path because is behind user
            console.log(finalPathLineCoords);
        }

    } 


    finalPathLine = L.polyline(finalPathLineCoords,{color:'black'}).addTo(map);    
}







function onLocationFound(e) {
    //			delete arrObject['Point1'];
                if (counter==0){
                    arrObject = {};
                    console.log('Located, counter is ' + counter);
                    console.log('arrObject is.. ' );
                    console.log(arrObject);
                    document.getElementById('findBtn').style.display = 'none';
                    document.getElementById('stopBtn').style.display = 'block';
                    counter ++;
                }
                radius = e.accuracy / 2;
                console.log('Located, counter is ' + counter);
            
                if (counter==1){
                    //pushes first e.latlng into object
                    arrObject['Point1'] = e.latlng;
                    console.log('e.latlng is..');
                    console.log(e.latlng);
                    console.log('Arr obj point 1 is..');
                    console.log(arrObject);
                    //adds first e.latlng to map
                    x = L.circleMarker(arrObject['Point1'], {
                        color: markerColor
                    })
                    .bindTooltip("You are within " + radius + " meters from this point")
                    .addTo(map).openTooltip(arrObject['Point1']);
                } 
                return
    
    /* 			if (demo) {
                    var rand = Math.random() / 5000;
                    e.latlng.lat = e.latlng.lat + rand;
                    e.latlng.lng = e.latlng.lng + rand;
                } */			
    if(counter == 2){
    
        var rand = Math.random() / 5000;
        e.latlng.lat = e.latlng.lat + rand;
        e.latlng.lng = e.latlng.lng + rand;
    
        if(JSON.stringify(arrObject['Point1']) === JSON.stringify(e.latlng)){
            console.log('Coords already in object')
            console.log(e.latlng);
            console.log(arrObject['Point1']);
            counter = 1;
            console.log('Setting counter back to ' + counter);
        }else {
            console.log('Coords NOT in object')
            console.log(e.latlng);
            console.log(arrObject['Point1']);
            console.log('so pushing to object...')
            arrObject['Point2'] = arrObject['Point1'];
            console.log('Set Point 2 equal to Point 1...')
            arrObject['Point1'] = e.latlng;
            console.log('Set Point 1 equal to new latlng...')
            console.log(arrObject['Point1']);
            console.log('ArrObject should now have two point objects...')
            console.log(arrObject);
            x.remove();
            x = L.circleMarker(arrObject['Point1'], {
                color: markerColor
            })
            .bindTooltip("You are within " + radius + " meters from this point")
            .addTo(map).openTooltip(arrObject['Point1']);
    
            p = L.circleMarker(arrObject['Point2'], {
                color: 'grey',
                radius: 3
            })
            .bindTooltip("You are within " + radius + " meters from this point")
            .addTo(map);
    
        }			
        
    
    }
    
    
    if(counter == 3){
    
        var rand = Math.random() / 5000;
        e.latlng.lat = e.latlng.lat + rand;
        e.latlng.lng = e.latlng.lng + rand;
        
        if(JSON.stringify(arrObject['Point1']) === JSON.stringify(e.latlng)){
            console.log('Coords already in object')
            console.log(e.latlng);
            console.log(arrObject['Point1']);
            counter = 2;
            console.log('Setting counter back to ' + counter);
            console.log('Will keep looping back the counter to 2 until new 3rd latltn found ');
        }else {
            console.log('3rd New Latlng NOT in object')
            console.log('3rd latlng is ..');
            console.log(e.latlng);
            console.log('ArrObject is ..');
            console.log(arrObject);
            console.log('so pushing to object...')
            arrObject['Point3'] = arrObject['Point2'];
            console.log('Set NEW Point 3 equal to Point 2...')
            arrObject['Point2'] = arrObject['Point1'];
            console.log('Set Point 2 equal to Point 1...')
            arrObject['Point1'] = e.latlng;
            console.log('Set Point 1 equal to new latlng...')
            console.log(arrObject['Point1']);
            console.log('ArrObject should now have THREE point objects...')
            console.log(arrObject);
            x.remove();
            p.remove();
            x = L.circleMarker(arrObject['Point1'], {
                color: markerColor
            })
            .bindTooltip("You are within " + radius + " meters from this point")
            .addTo(map).openTooltip(arrObject['Point1']);
    
            p = L.circleMarker(arrObject['Point2'], {
                color: 'grey',
                radius: 3
            })
            .bindTooltip("You are within " + radius + " meters from this point")
            .addTo(map);
    
            pp = L.circleMarker(arrObject['Point3'], {
                color: 'red',
                radius: 2
            })
            .bindTooltip("You are within " + radius + " meters from this point")
            .addTo(map);
    
        }			
        
    
    }
    
    
    if(counter > 3){
    
        if(JSON.stringify(arrObject['Point1']) === JSON.stringify(e.latlng)){
            console.log('Coords already in object... latlng equal arrObject point 1')
            console.log('latlng' + e.latlng);
            console.log(arrObject);
        }else {
            console.log('New Latlng NOT in object')
            arrObject['Point3'] = arrObject['Point2'];
            console.log('Set NEW Point 3 equal to Point 2...')
            arrObject['Point2'] = arrObject['Point1'];
            console.log('Set Point 2 equal to Point 1...')
            arrObject['Point1'] = e.latlng;
            console.log('Set Point 1 equal to new latlng...')
            console.log(arrObject['Point1']);
            x.remove();
            p.remove();
            pp.remove();
            x = L.circleMarker(arrObject['Point1'], {
                color: markerColor
            })
            .bindTooltip("You are within " + radius + " meters from this point")
            .addTo(map).openTooltip(arrObject['Point1']);
    
            p = L.circleMarker(arrObject['Point2'], {
                color: 'grey',
                radius: 3
            })
            .bindTooltip("previous")
            .addTo(map);
    
            pp = L.circleMarker(arrObject['Point3'], {
                color: 'red',
                radius: 2
            })
            .bindTooltip("past")
            .addTo(map);
    
        }
    
    }
    
    
    // if counter is 4 or more 
    // AND if next latlat is not equal to point 1, then set point 3 == point 2, point 2 == 1 and point 1 == latlng
    
    counter ++;			
                
            }






            var coordsBetweenCafeteriaAndStairs1stFloor = [
                [53.520919, -113.523939], //cafeteria starting point
                [53.521032, -113.523937], //2nd point
                [53.52103, -113.524552], //3
                [53.520605, -113.524552], //Stairs btw 1st and 2nd Floor
                
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