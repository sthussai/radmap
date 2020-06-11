var myLayer = null;
var states;
var urhere = L.marker([53.520419, -113.524389]).bindPopup('Ur here for Demo').addTo(secondFloorMap);
var to = urhere.getLatLng();
var distancesArray = [];
console.log(distancesArray);
function ajaxGetGeoJson() {
    $.ajax({
        dataType: "json",
        url: '/data.json',
        success: function(data) {
            console.log(data);
            myLayer = L.geoJSON(data, {
                onEachFeature: popupOnEachFeature
            }).addTo(map);
        },
        error: function (xhr) {
            console.log('Error - probably with JSON data');
            console.log(xhr);
          }
    });
}

ajaxGetGeoJson();



/* L.geoJSON(states, {
    style: function(feature) {
        switch (feature.properties.party) {
            case 'Republican': return {color: "#ff0000"};
            case 'Democrat':   return {color: "#0000ff"};
        }
    },
	onEachFeature: onEachFeature2
}).addTo(map); */




function popupOnEachFeature(feature, layer) {
    // does this feature have a property named popupContent?
    if (feature.properties && feature.properties.popupContent) {
        layer.bindPopup(feature.properties.popupContent);
    }
    var lt = feature.geometry.coordinates[1];
    var ln = feature.geometry.coordinates[0];
    var ltln=[lt, ln];
    ltln = map.distance(ltln, to);
    ltln = Math.round((ltln) * 100) / 100;
    distancesArray.push(ltln);
    console.log(distancesArray);
}

function minimumDistance(){
    if (distancesArray.length != 0){
        console.log(distancesArray);
        const min = Math.min(...distancesArray);
    console.log(min);
    }
}

$('#infoDiv').click(function(){
    console.log('min = ');
minimumDistance();
});








