<?php

namespace App\Http\Controllers;
use Validator;
use App\Location;
use Illuminate\Http\Request;

class RadMapController extends Controller
{
    public $demo = true;
    public $color = 'black';
    public $fontSize = '15px';
    public $centerCoords = '53.520742, -113.523993';
    public $centerZoom = 18;

    public function test(Request $request)
    {
        //dd($request);
        if ($request->cookie('color')) {
            $color = $request->cookie('color');
        } else {
            $color = $this->color;
        }
        if ($request->cookie('fontSize')) {
            $fontSize = $request->cookie('fontSize');
        } else {
            $fontSize = $this->fontSize;
        }
        if ($request->cookie('centerCoords')) {
            $centerCoords = $request->cookie('centerCoords');
        } else {
            $centerCoords = $this->centerCoords;
        }
        if ($request->cookie('centerZoom')) {
            $centerZoom = $request->cookie('centerZoom');
        } else {
            $centerZoom = $this->centerZoom;
        }
        return view('radmaptest', ['demo' => $this->demo, 'color' => $color, 'fontSize' => $fontSize, 'centerCoords' => $centerCoords, 'centerZoom' => $centerZoom]);
    }
    public function main(Request $request)
    {
        //dd($request);
        if ($request->cookie('color')) {
            $color = $request->cookie('color');
        } else {
            $color = $this->color;
        }
        if ($request->cookie('fontSize')) {
            $fontSize = $request->cookie('fontSize');
        } else {
            $fontSize = $this->fontSize;
        }
        if ($request->cookie('centerCoords')) {
            $centerCoords = $request->cookie('centerCoords');
        } else {
            $centerCoords = $this->centerCoords;
        }
        if ($request->cookie('centerZoom')) {
            $centerZoom = $request->cookie('centerZoom');
        } else {
            $centerZoom = $this->centerZoom;
        }
        return view('radmap', ['demo' => $this->demo, 'color' => $color, 'fontSize' => $fontSize, 'centerCoords' => $centerCoords, 'centerZoom' => $centerZoom]);
    }


    public function about() {
        return view('about');
    }


    public function store(Request $request){
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'description' => 'required|min:10',
            'latlng' => 'required',
            'lat' => 'required',
            'lng' => 'required',
            ])->validate();
            
            $location = new Location();
            $location->name = request()->name;
            $location->description = request()->description;
            $location->latlng = request()->latlng;
            $location->lat = request()->lat;
            $location->lng = request()->lng;
            if(request()->firstFloor == '0'){
                $location->firstFloor = false;
            } else {$location->firstFloor = true;}
            $location->save();
            $request->session()->flash('message', 'Location successfully submitted!');
            return redirect('/addlocation');
    }
}
