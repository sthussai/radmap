<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Http\Requests;
use App\Http\Controllers\Controller;

class CookieController extends Controller {
   public function setCookie(Request $request) {

//    dd($request);
      $minutes = 1;
      return redirect()->action('RadMapController@test')->withCookie(cookie('color', $request->color, $minutes))
      ->withCookie(cookie('fontSize', $request->fontSize, $minutes));
   }
   public function getCookie(Request $request) {
      $value = $request->cookie('color');
      dump($value);
   }
}