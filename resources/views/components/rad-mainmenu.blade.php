<div id="myNav1" class="overlaynav" onclick="">

    <span class="w3-hide-small">
    <br><br><br>
    </span>
    <!-- Overlay content -->
    <section id="myNav1Content" class="overlaynav-content">
    <span id="topSpan" style="position: absolute; top: 0"></span>
    <button id="topBtn" type="button" style="position: absolute; top: 45%; right: 5%" onClick="topFunction()">
        <i class="fa fa-arrow-up"></i>
        </button>
        <button id="bottomBtn" type="button" style="position: absolute; top: 55%; right: 5%" onClick="bottomFunction()">
        <i class="fa fa-arrow-down"></i>
        </button>
        <div id='menu_items' class="w3-row w3-white w3-opacity " style='font-size:1.5em;  '>
            <div class="w3-col s6">
                <button id="settingsBtn" class="w3-button  w3-block w3-hover-blue-grey  " onclick="menuTabChange('Settings')"><i
                        class="fa fa-gear w3-margin-right"></i>Settings</button>
            </div>

            <div class="w3-col  s6">
                <button href="#plans" class="w3-button w3-block w3-hover-blue-grey  "
                onclick="menuTabChange('Directions')"><i class="fa fa-map w3-margin-right"></i>Directions</button>
            </div>
        </div>
            <div class="w3-row">

                <button onclick="menuTabChange('Links')" class="w3-col s6 w3-btn w3-text-white w3-hover-opacity"><i
                        class="fa fa-bars w3-margin-right w3-large"></i>Main Menu</button>
    
                <button onclick="closeNav()" class="w3-col s6 w3-btn w3-white w3-hover-opacity"><i
                        class="fa fa-close w3-margin-right w3-large"></i>Close Menu</button>
            </div>
            
        <script>
            $("#myNav1Content").click(function(event){
  event.stopPropagation();
  console.log("The myNav1Content element was clicked.");
});

        </script>

        <div class="tabContent w3-margin-top" id="Links">
            <a href="/" onclick="closeNav()" class="w3-hover-white w3-text-white">Home</a>
            <a href="/about" onclick="closeNav()" class="w3-hover-white w3-text-white">About</a>
            <a href="/feedback" onclick="closeNav()" class="w3-hover-white w3-text-white">Feedback</a>            
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
            <div class="w3-container w3-margin-top">
                    <label class="w3-text-white w3-large">Change Font Size</label><br><br>
                    <select id="fontSizeSelect" style="max-width: 200px; margin:auto" class="w3-select" name="fontSize">
                        <option value="null" selected> </option>
                        <option value="12px">Small Font</option>
                        <option value="15px">Medium Font</option>
                        <option value="20px">Large Font</option>
                    </select>
                </div>
        </div>

        <div class="tabContent" id="Directions">

            <div class="w3-container w3-margin-top">
                <label class="w3-text-white w3-large ">Show Path to...</label><br><br>
                <select id="directionsToInput" style="max-width: 200px; margin:auto" class="w3-select"
                    name="directionsTo">
                    <option value="null" selected> </option>
                    <option value="kayeEdmontonClinic">Kaye Edmonton Clinic</option>
                    <option value="radiologyUAH">Radiology UAH</option>
                    <option value="mainCafeteria">Main Cafeteria</option>
                    <option value="2J2">Unit 2J2</option>
                </select>
                <br><br>
                <label class="w3-text-white w3-large ">From</label><br><br>
                <select id="directionsFromInput" style="max-width: 200px; margin:auto" class="w3-select"
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
            <button id="allPathsBtn" class="w3-btn w3-text-white w3-hover-opacity">Show All Paths</button>
            <br>
            <button id="demoBtn" class="w3-btn w3-text-white w3-hover-opacity">Demo Movement On</button>
        </div>

        <div class="tabContent" id="Settings">
        
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




<!--         <form class="w3-padding-large" action="/cookie/set" method="GET"> -->

                <div class="w3-container w3-margin-top">
                    <label class="w3-text-white w3-large">Location Marker Color</label><br><br>
                    <input name="color" style="max-width: 100px; margin:auto" class="w3-input w3-button w3-white"
                        type="color">
                </div>



<!--                 <div class="w3-container w3-margin-top">
                    <button class="w3-button w3-dark-grey" type="submit"><i class="fa fa-check w3-margin-right"></i>
                        Save</button>
                </div> -->
<!--             </form> -->

            <button class="w3-button w3-padding w3-white w3-margin-top" id="recenterMapBtn" 
                title="Stop Location Sharing">Recenter Map</button> <br>
            <button class="w3-button w3-padding w3-white w3-margin-top" id="refreshMapBtn" 
                title="Stop Location Sharing">Refresh Map</button>
        </div>

    </section>

</div>



<script>
    
    function topFunction() {
        document.getElementById('topSpan').scrollIntoView();
    }
    function bottomFunction() {
        document.getElementById('refreshMapBtn').scrollIntoView();
}

    var navContent = document.getElementById('myNav1');
    L.DomEvent.on(navContent, 'click dblclick scroll', function(ev) {
        L.DomEvent.stopPropagation(ev);
        L.DomEvent.disableScrollPropagation(navContent);
        console.log('stopped');
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

    document.body.style.overflowY = "hidden";
    
    function openNav() {
        document.getElementById("myNav1").style.height = "100%";
            //document.getElementById("myNav1Content").click();
            map.dragging.disable();
		}

    /* Close when someone clicks on the "x" symbol inside the overlay Nav Bar */
    function closeNav() {
        document.getElementById("myNav1").style.height = "0%";
        map.dragging.enable();
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