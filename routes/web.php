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

Route::get('/about', function () {
    return view('about');
});


Route::get('/feedback', 'FeedbackController@index');
Route::post('/feedback', 'FeedbackController@store');


Route::get('/radmap', 'RadMapController@main');
Route::get('/radmaptest', 'RadMapController@test');
Route::post('/addlocation', 'RadMapController@store')->middleware('auth');
Route::get('/addlocation', function () {return view('addlocation');})->middleware('auth');

Route::get('/reactradmap', function () {
    return view('reactradmap');
});

Auth::routes();

Route::get('/home', 'HomeController@index')->name('dashboard');
Route::get('/radmapstaff', 'HomeController@radmapstaff');

Route::get('/search', 'AjaxSearchController@search');
