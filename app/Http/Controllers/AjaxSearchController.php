<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use DB;

class AjaxSearchController extends Controller
{
    public $prevResults = null;
    public function search(Request $request)
    {
        
        if ($request->ajax()) {
            if($request->search != ""){ //if search query is not empty string, fire the search.
                $output = '';
                $locations = DB::table('locations')
                ->where('name', 'LIKE', '%' . $request->search . '%')
                ->orWhere('description', 'LIKE', '%' . $request->search . '%')
                ->take(8)
                ->get();

                $total_row = $locations->count();
                if($locations->count()>0){
                    $prevResults = $locations;
                }
                if($total_row == 0 && $prevResults == null){
                    $output = '<br>No Locations Found<br>';
                }
                else if($total_row == 0 && $prevResults != null){
                    foreach ($prevResults as $location) {
                        $output .='
                        <div style="min-width: 350px" class="w3-button " onclick="showSearchMarker('. $location->firstFloor.', '. $location->lat.', '. $location->lng . ',\''. $location->pointName. '\', \''. $location->description .'\', \''. $location->lineCoords.'\')">
                            <div style="margin-top:0px; ">
                            <h5><b>' . $location->name . '</b><h5>
                            <h6>' . $location->description . '<h6>
                            </div>
                        </div>';
                    } 

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
    public $prevResults_staff = null;
    public function search_staff(Request $request)
    {
        
        if ($request->ajax()) {
            if($request->search != ""){ //if search query is not empty string, fire the search.
                $output = '';
                $locations = DB::table('staff_locations')
                ->where('name', 'LIKE', '%' . $request->search . '%')
                ->orWhere('description', 'LIKE', '%' . $request->search . '%')
                ->take(8)
                ->get();

                $total_row = $locations->count();
                if($locations->count()>0){
                    $prevResults = $locations;
                }
                if($total_row == 0 && $prevResults == null){
                    $output = '<br>No Locations Found<br>';
                }
                else if($total_row == 0 && $prevResults != null){
                    foreach ($prevResults as $location) {
                        $output .='
                        <div style="min-width: 350px" class="w3-button " onclick="showSearchMarker('. $location->firstFloor.', '. $location->lat.', '. $location->lng . ',\''. $location->pointName. '\', \''. $location->description .'\', \''. $location->lineCoords.'\')">
                            <div style="margin-top:0px; ">
                            <h5><b>' . $location->name . '</b><h5>
                            <h6>' . $location->description . '<h6>
                            </div>
                        </div>';
                    } 

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
