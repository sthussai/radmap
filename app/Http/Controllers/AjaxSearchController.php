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
                ->take(5)
                ->get();
    
                $total_row = $locations->count();
        if($total_row == 0){
            $output = '<br>No Locations Found<br>';
        }
                else {
                    foreach ($locations as $location) {
                        $output .='
                        <div style="min-width: 350px" class="w3-button " onclick="showSearchMarker('. $location->firstFloor.', '. $location->lat.', '. $location->lng . ',\''. $location->pointName. '\', \''. $location->description .'\', \''. $location->lineCoords.'\')">
                            <div style="margin-top:0px; ">
                            <h5><b>' . $location->name . '</b><h5>
                            <h6>' . $location->description . '<h6>
                            </div>
                        </div>';
                    }
              }
    
            
    
                return Response($output);
            }
    

            }
    }
}
