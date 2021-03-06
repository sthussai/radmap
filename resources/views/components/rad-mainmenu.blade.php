<div id="myNav1" class="overlaynav" onclick="">

    <span class="w3-hide-small">
    <br><br><br>
    </span>
    <!-- Overlay content -->
    <section id="myNav1Content" class="overlaynav-content">

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

                <button onclick="menuTabChange('Links')" class="w3-col s6 w3-btn w3-white w3-hover-opacity"><i
                        class="fa fa-bars w3-margin-right w3-large"></i>Main Menu</button>
    
                <button onclick="closeNav()" class="w3-col s6 w3-btn w3-white w3-hover-opacity"><i
                        class="fa fa-close w3-margin-right w3-large"></i>Close Menu</button>
            </div>

            
        <div class="tabContent w3-margin-top" id="Links">
            @guest
            <a href="/" onclick="closeNav()" class="w3-hover-white w3-text-white">Home</a>
            @endguest
            <a href="/about" onclick="closeNav()" class="w3-hover-white w3-text-white">About</a>
            <a href="/feedback" onclick="closeNav()" class="w3-hover-white w3-text-white">Feedback</a>            
            @auth
            <a href="/home" onclick="closeNav()" class="w3-hover-white w3-text-white">Dashboard</a> 
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
                <label class="w3-text-white w3-large ">Show Path From...</label><br>
                <div id="directionsErrorDiv" class="w3-round w3-padding w3-red w3-hide">Please select valid and different 'To' and 'From' locations</div>
                <div id="directionsInfoDiv" class="w3-round w3-padding w3-light-blue w3-hide">Your selected 'From' location is on a different floor. <button id='switchFloorBtn'>Switch Floor Levels</button></div>
                <br>
                <select id="directionsFromInput" style="max-width: 200px; margin:auto" class="w3-select"
                    name="directionsFrom">
                    <option value="null"></option>
                    <option value="currentLocation" selected>Use my location </option>
                    <option disabled class="w3-black w3-input">Second Floor Locations</option>
                    <option value="kayeEdmontonClinic">Kaye Edmonton Clinic</option>
                    <option value="radiologyUAH">Radiology UAH</option>
                    <option value="2J2">Unit 2J2</option>
                    <option value="secondFloorParking">2nd FLoor Parking</option>
                    <option disabled class="w3-black w3-input">First Floor Locations</option>
                    <option value="mainCafeteria">Main Cafeteria</option>
                    <option value="adultEmergency">Adult Emergency</option>
                    <option value="pediatricsEmergency">Pediatrics Emergency</option>
                    <option value="MRI">MRI Clinic</option>
                </select>
                <br><br>
                <label class="w3-text-white w3-large ">To</label><br><br>                
                <select id="directionsToInput" style="max-width: 200px; margin:auto" class="w3-select"
                    name="directionsTo">
                    <option value=null selected> </option>
                    <option disabled class="w3-black w3-input">Second Floor Locations</option>
                    <option value="kayeEdmontonClinic">Kaye Edmonton Clinic</option>
                    <option value="radiologyUAH">Radiology UAH</option>
                    <option value="2J2">Unit 2J2</option>
                    <option value="secondFloorParking">2nd FLoor Parking</option>
                    <option disabled class="w3-black w3-input">First Floor Locations</option>
                    <option value="mainCafeteria">Main Cafeteria</option>
                    <option value="adultEmergency">Adult Emergency</option>
                    <option value="pediatricsEmergency">Pediatrics Emergency</option>
                    <option value="MRI">MRI Clinic</option>
                </select>
                <br><br>
                <button id="showPathsBtn" class="w3-button w3-dark-grey" autocomplete="off">Show Path</button>
            </div>
            <br>
            <button id="demoBtn" class="w3-btn w3-text-white w3-hover-opacity">Demo Movement</button>
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


                <div class="w3-container w3-margin-top">
                    <label class="w3-text-white w3-large">Location Marker Color</label><br><br>
                    <input name="color" style="max-width: 100px; margin:auto" class="w3-input w3-button w3-white"
                        type="color">
                </div>


            <button class="w3-button w3-padding w3-white w3-margin-top" id="refreshMapBtn" 
                title="Stop Location Sharing">Refresh Map</button>
        </div>

    </section>

</div>



<script>



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
        document.getElementById("myNav1").style.overflowY = "auto";
        document.getElementById("map").style.width = "0%";

        //document.getElementById("myNav1Content").click();
        //map.dragging.disable();
    }
    
    /* Close when someone clicks on the "x" symbol inside the overlay Nav Bar */
    function closeNav() {
        document.getElementById("map").style.width = "100%";
        document.getElementById("myNav1").style.height = "0%";
        //map.dragging.enable();
        $('#directionsErrorDiv').addClass('w3-hide');
        $('#directionsInfoDiv').addClass('w3-hide');
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



       //function to open menu After pressing Keys 'Tab' and 'M'
       const keyMapM = {
        9: false, //Key code fo Tab
        77: false //Key code fo m
      };
      $(document).keydown(function(e) {
        if (e.keyCode in keyMapM) {
          keyMapM[e.keyCode] = true;
          if (keyMapM[9] && keyMapM[77]) {
            openNav();
          }
        }
      }).keyup(function(e) {
        if (e.keyCode in keyMapM) {
          keyMapM[e.keyCode] = false;
        }
      });

    //function to open Directions After pressing 'Tab' and 'D'
       const keyMapD = {
        9: false, //Key code fo Tab
        68: false //Key code fo D
      };
      $(document).keydown(function(e) {
        if (e.keyCode in keyMapD) {
          keyMapD[e.keyCode] = true;
          if (keyMapD[9] && keyMapD[68]) {
            openNav();
            menuTabChange('Directions');
          }
        }
      }).keyup(function(e) {
        if (e.keyCode in keyMapD) {
          keyMapD[e.keyCode] = false;
        }
      });
    




$('#refreshMapBtn').click(function(){location.reload();});



</script>
