<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

/*Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});*/
Route::post('/courses/recommander', 'RecommandeController@store');
Route::get('/userslist', 'userController@index');

Route::post('/courses/ajouter', 'coursesController@add');


Route::post('/login', 'userController@login');
Route::post('/register', 'userController@register');
Route::post('/password/email', 'ForgotPasswordController@sendResetLinkEmail');
Route::post('/password/reset', 'ResetPasswordController@reset');


/*Route::delete("/courses/removeToken",'coursesController@removeToken');*/


Route::group(['middleware' => 'auth:api'], function(){
    Route::get('/courses', 'coursesController@index');
    Route::delete('/courses/{id}/delete', 'coursesController@delete');
    Route::get('/user/info', 'ProfileController@info');

});


