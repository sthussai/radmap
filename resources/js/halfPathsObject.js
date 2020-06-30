const halfPathsObj = {
    'secondFloorParking' :[
        [53.520654628040006, -113.52435708045961], // Floor 2 Stairs point
        [53.52060906758032, -113.52429807186127],
        [53.52015986544371, -113.52429538965228],
        [53.52015505807627, -113.52305352687837],
        [53.52016242320309, -113.52270081639291],
        [53.51985505942433, -113.52220594882965], //Point 26
    ],
    'kayeEdmontonClinic' :[
    [53.520654628040006, -113.52435708045961], //Floor 2 Stairs point
    [53.52060906758032, -113.52429807186127],
    [53.52051491174373, -113.5243007540703],
    [53.520518, -113.524601],
    [53.520374, -113.524596],
    [53.52037, -113.525395],
    [53.520363, -113.526096],
    [53.519151, -113.526086],
    [53.519151, -113.526406],
    [53.51913920619323, -113.52676570415497],
    [53.518729084031214, -113.52677643299104]
    ],
    'radiologyUAH' :[
    [53.520654628040006, -113.52435708045961], //Floor 2 Stairs point
    [53.52060906758032, -113.52429807186127],
    [53.5206164628691, -113.52407142519954]],
    '2J2' :[
        [53.520654628040006, -113.52435708045961], //Floor 2 Stairs point
        [53.52071795444837, -113.52429807186127],
        [53.5210141850337, -113.52428734302521],
        [53.5210178856064, -113.5233834385872],
        [53.52104423591322, -113.5230052471161],
    ],
    'mainCafeteria' :[
        [53.520654628040006, -113.52435708045961], //Floor 1 Stairs point
        [53.52102285438584, -113.52451130747795],
    [53.52103081592075, -113.52387830615044],
    [53.52092864347813, -113.52389037609102],
    ],
    'adultEmergency' :[
            [53.520654628040006, -113.52435708045961], //Floor 1 Stairs point
        [53.52102285438584, -113.52451130747795],
    [53.52103081592075, -113.52387830615044],
    [53.52092864347813, -113.52389037609102],
    [53.52093662289389, -113.5233995318413],
    [53.52085054367954, -113.52341026067737],
    [53.52084743136733, -113.52238699793818],
    [53.52069906018151, -113.52239906787874],
    [53.52054835468738, -113.52213084697725],
    ],
    'pediatricsEmergency' :[
            [53.520654628040006, -113.52435708045961], //Floor 1 Stairs point
        [53.52102285438584, -113.52451130747795],
    [53.52103081592075, -113.52387830615044],
    [53.52092864347813, -113.52389037609102],
    [53.52093662289389, -113.5233995318413],
    [53.52085054367954, -113.52341026067737],
    [53.52084743136733, -113.52238699793818],
    [53.52069906018151, -113.52239906787874],
    ],
    'MRI':[
        [53.520654628040006, -113.52435708045961], //Floor 1 Stairs point
        [53.52059220519894, -113.52430880069733],
        [53.520185320607595, -113.52430611848834],
        [53.520184724693955, -113.52473124861717],
        [53.52010627846002, -113.52474868297578],
    ]
    }

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

    const geojsonMarkerOptions = {
        radius: 8,
        fillColor: "grey",
        color: "#000",
        weight: 1,
        opacity: 1,
        fillOpacity: 0.8
    };
    
    const Toast = Swal.mixin({
        toast: true,
        background: 'black',
        position: 'bottom',
        showConfirmButton: false,
        timer: 2500,
      });

      

const refObj = {
    'secondFloorParking' : {floorLevel:'secondFloor', pointName: 'Point 26', pointCoords: [53.51985505942433, -113.52220594882965]},
    'kayeEdmontonClinic' : {floorLevel:'secondFloor', pointName: 'Point 27', pointCoords: [53.518729084031214, -113.52677643299104]},
    'radiologyUAH' : {floorLevel:'secondFloor', pointName: 'Point 28', pointCoords: [53.5206164628691, -113.52407142519954]},
    '2J2' : {floorLevel:'secondFloor', pointName: 'Point 29', pointCoords: [53.52104423591322, -113.5230052471161]},
    'mainCafeteria' : {floorLevel: 'firstFloor', pointName: 'Point 10', pointCoords: [53.52092864347813, -113.52389037609102]},
    'adultEmergency' : {floorLevel: 'firstFloor', pointName: 'Point 18', pointCoords: [53.52054835468738, -113.52213084697725]},
    'pediatricsEmergency' : {floorLevel: 'firstFloor', pointName: 'Point 17', pointCoords: [53.52069906018151, -113.52239906787874]},
    'MRI' : {floorLevel: 'firstFloor', pointName: 'Point 26', pointCoords: [53.52010627846002, -113.52474868297578]},
    'firstFloorElevator' : {floorLevel: 'firstFloor', pointName: 'Point 25', pointCoords: [53.520654628040006, -113.52435708045961]},
    'secondFloorElevator' : {floorLevel: 'secondFloor', pointName: 'Point 30', pointCoords: [53.520654628040006, -113.52435708045961]},
    'firstFloor' : 'firstFloor',
    'secondFloor' : 'secondFloor',
    
}

    

    export {halfPathsObj, greenPin, redPin, geojsonMarkerOptions, Toast, refObj};