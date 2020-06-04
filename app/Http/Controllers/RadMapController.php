<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class RadMapController extends Controller
{
    public $demo = true;
    public $color = 'black';
    public $fontSize = '15px';

    
    public function test(Request $request){
        //dd($request);
        $colorCookie = $request->cookie('color');
        $fontSizeCookie = $request->cookie('fontSize');
        if($colorCookie) {$color = $colorCookie; } else {$color = $this->color;}
        if($fontSizeCookie) {$fontSize = $fontSizeCookie; } else {$fontSize = $this->fontSize;}
        return view('radmaptest', ['demo'=>$this->demo, 'color'=>$color,'fontSize'=> $fontSize ]);
    }
}
