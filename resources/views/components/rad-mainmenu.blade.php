<div id="myNav1" class="overlaynav" onclick="">

    <!-- Button to close the overlay navigation -->
    <a href="javascript:void(0)" class="closebtn" onclick="closeNav()">×
    </a>

    <!-- Overlay content -->
    <section class="overlaynav-content">

        <div id='menu_items' class="w3-row w3-white w3-opacity " style='font-size:1.5em;'>
            <div class="w3-col s6">
                <button class="w3-button  w3-block w3-hover-blue-grey  " onclick="menuTabChange('Settings')"><i
                        class="fa fa-gear w3-margin-right"></i>Settings</button>
            </div>

            <div class="w3-col  s6">
                <button href="#plans" class="w3-button w3-block w3-hover-blue-grey  "
                    onclick="menuTabChange('Directions')"><i class="fa fa-map w3-margin-right"></i>Directions</button>
            </div>

        </div>


        <div class="tabContent w3-margin-top" id="Links">
            <a href="/" onclick="closeNav()" class="w3-hover-white">Home</a>
            <a href="/about" onclick="closeNav()" class="w3-hover-white">About</a>
            <a href="/feedback" onclick="closeNav()" class="w3-hover-white">Feedback</a>
            @auth
            <a class="dropdown-item" href="{{ route('logout') }}"
                                       onclick="event.preventDefault();
                                                     document.getElementById('logout-form').submit();">
                                        {{ __('Logout') }}
                                    </a>
            <form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
                                        @csrf
                                    </form>
            @endauth
        </div>

        <div class="tabContent" id="Directions">
            <button onclick="menuTabChange('Links')" class="w3-btn w3-text-white w3-hover-opacity"><i
                    class="fa fa-bars w3-margin-right"></i>Main Menu</button>
            <div class="w3-container w3-margin-top">
                <label class="w3-text-white w3-large ">Show Path to...</label><br><br>
                <select id="directionsToInput" style="max-width: 250px; margin:auto" class="w3-select"
                    name="directionsTo">
                    <option value="null" selected> </option>
                    <option value="kayeEdmontonClinic">Kaye Edmonton Clinic</option>
                    <option value="radiologyUAH">Radiology UAH</option>
                    <option value="mainCafeteria">Main Cafeteria</option>
                    <option value="2J2">Unit 2J2</option>
                </select>
                <br><br>
                <label class="w3-text-white w3-large ">From</label><br><br>
                <select id="directionsFromInput" style="max-width: 250px; margin:auto" class="w3-select"
                    name="directionsFrom">
                    <option value="null" selected> </option>
                    <option value="kayeEdmontonClinic">Kaye Edmonton Clinic</option>
                    <option value="radiologyUAH">Radiology UAH</option>
                    <option value="mainCafeteria">Main Cafeteria</option>
                    <option value="2J2">Unit 2J2</option>
                </select>
                <br><br>
                <button id="showPathsBtn" class="w3-button w3-dark-grey" autocomplete="off">Show Path</button>
            </div>

            <br><br>
            <button id="allPathsBtn" class="w3-btn w3-text-white w3-hover-opacity">Show All Paths</button>
        </div>

        <div class="tabContent" id="Settings">
            <button onclick="menuTabChange('Links')" class="w3-btn w3-text-white w3-hover-opacity"><i
                    class="fa fa-bars w3-margin-right"></i>Main Menu</button>

                    
                    <div class="w3-container w3-margin-top">
                        <label class="w3-text-white w3-large ">Set Map Center and Zoom</label><br><br>
                        <input value="{{$centerCoords}}" required name="centerCoords" id="centerCoordsInput" style="max-width: 200px; margin:auto"
                            class="w3-input w3-white" type="text">
                        <input value="{{$centerZoom}}" required name="centerZoom" id="centerZoomInput" style="max-width: 200px; margin:auto"
                            class="w3-input w3-white" max="20" type="number">
                    </div>
                    <div class="w3-container w3-margin-top">
                    <button id="setMapCenterBtn" class="w3-button w3-dark-grey"><i class="fa fa-check w3-margin-right"></i> Set Center</button>
                </div>




        <form class="w3-padding-large" action="/cookie/set" method="GET">

                <div class="w3-container w3-margin-top">
                    <label class="w3-text-white w3-large">Location Marker Color</label><br><br>
                    <input name="color" style="max-width: 100px; margin:auto" class="w3-input w3-button w3-white"
                        type="color">
                </div>

                <div class="w3-container w3-margin-top">
                    <label class="w3-text-white w3-large">Change Font Size</label><br><br>
                    <select style="max-width: 250px; margin:auto" class="w3-select" name="fontSize">
                        <option value="null" selected> </option>
                        <option value="10px">Small Font</option>
                        <option value="15px">Medium Font</option>
                        <option value="20px">Large Font</option>
                    </select>
                </div>

                <div class="w3-container w3-margin-top">
                    <button class="w3-button w3-dark-grey" type="submit"><i class="fa fa-check w3-margin-right"></i>
                        Save</button>
                </div>
            </form>

            <button class="w3-button w3-padding w3-white w3-large w3-margin-top" id="recenterMapBtn" 
                title="Stop Location Sharing">Recenter Map</button> <br>
            <button class="w3-button w3-padding w3-white w3-large w3-margin-top" id="refreshMapBtn" 
                title="Stop Location Sharing">Refresh Map</button>
        </div>

    </section>

</div>



<script>
    var navContent = document.getElementById('myNav1');
    L.DomEvent.on(navContent, 'click dblclick scroll', function(ev) {
        L.DomEvent.stopPropagation(ev);
        L.DomEvent.disableScrollPropagation(navContent);
        console.log('stopped event');
    });


    function menuTabChange(showTab) {
        var i, tabcontent, tablinks;
        tabcontent = document.getElementsByClassName("tabContent");
        for (i = 0; i < tabcontent.length; i++) {
            tabcontent[i].style.display = "none";
        }
        if (showTab != null) {
            document.getElementById(showTab).style.display = "block";
        }
    }

    menuTabChange('Links');


    function openNav() {
			document.getElementById("myNav1").style.height = "100%";
			document.getElementById("myNav1").click();
		}

    /* Close when someone clicks on the "x" symbol inside the overlay Nav Bar */
    function closeNav() {
        document.getElementById("myNav1").style.height = "0%";
    }

    function recenterMap() {
        console.log('Zoom = ' + map.getZoom());
        map.setView(center, 17);

    }	

        //function to close Navigation After pressing 'ESc'
    $(window).keydown(function(event) {
        if (event.which == 27) { //27 == Key Code for ESc
            closeNav();
            console.log('Closing nav');
        }
    });


    //function to open Navigation After pressing Key M

    $(window).keydown(function(event) {
        if (event.which == 77) { //77 == Key Code for M
            openNav();
            console.log('Open nav');
        }
    });


$('#recenterMapBtn').click(function(){recenterMap();closeNav();});
$('#refreshMapBtn').click(function(){location.reload();});




</script>