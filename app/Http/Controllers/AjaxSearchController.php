<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use DB;

class AjaxSearchController extends Controller
{

    public function search(Request $request)
    {
        if ($request->ajax()) {
            if($request->search != ""){ //if search query is not empty string, fire the search.
                $output = '';
                $locations = DB::table('locations')
                ->where('name', 'LIKE', '%' . $request->search . '%')
                ->orWhere('description', 'LIKE', '%' . $request->search . '%')
                ->get();
    
                $total_row = $locations->count();
        if($total_row == 0){
            $output = '<br>No Locations Found<br>';
        }
                else {
                    foreach ($locations as $location) {
                        $output .='
                        <div class="w3-button w3-center w3-white  " onclick="showMarker('. $location->firstFloor.', '. $location->lat.', '. $location->lng . ', \''. $location->description .'\')">
                            <div style="margin-top:0px; solid 2px red;">
                            <h5><b>' . $location->name . '</b><h5>
                            <h5>' . $location->description . '<h5>
                            </div>
                        </div>';
                    }
              }
    
            
    
                return Response($output);
            }
    

            }
    }
}
