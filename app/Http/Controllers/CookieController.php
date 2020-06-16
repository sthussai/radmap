<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Http\Requests;
use App\Http\Controllers\Controller;

class CookieController extends Controller {
   public function setCookie(Request $request) {
      
      //dd($request);
      $minutes = 10;
      return redirect()->action('RadMapController@test')->withCookie(cookie('color', $request->color, $minutes))
      ->withCookie(cookie('fontSize', $request->fontSize, $minutes));
   }

   public function setCenterCookie(Request $request) {
      $minutes = 10;
      if ($request->centerCoords) {
         return  redirect()->action('RadMapController@test')->withCookie(cookie('centerCoords', $request->centerCoords, $minutes))
         ->withCookie(cookie('centerZoom', $request->centerZoom, $minutes));
         //$response =  response($request)->withCookie(cookie('centerCoords', $request->centerCoords, $minutes));
         //dd($response);
      }
   }

   public function getCookie(Request $request) {
      $value = $request->cookie('color');
      dump($value);
   }
}

