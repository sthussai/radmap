<?php

namespace App\Http\Controllers;

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
}
