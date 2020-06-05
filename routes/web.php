<?php

use App\Http\Controllers\RadMapController;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Cache;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/cookie/set','CookieController@setCookie');
Route::get('/cookie/setCenterCookie','CookieController@setCenterCookie');
Route::get('/cookie/get','CookieController@getCookie');

Route::get('/', function () {
    return view('welcome');
});

Route::get('/radmap', function () {
    return view('radmap');
});

Route::get('/about', function () {
    return view('about');
});
Route::get('/feedback', function () {
    return view('feedback');
});
Route::post('/feedback', function () {
    return view('feedback');
});


Route::get('/radmaptest', 'RadMapController@test');

Route::get('/reactradmap', function () {
//    Cache::put( 'cachekey', 'I am in the cache baby!', 1 );
    //return Cache::get( 'cachekey' );
   //	return Cache::get( 'cachekey', 'The cache is empty, so here is something to keep you happy' );
    return view('reactradmap');
});

Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');
