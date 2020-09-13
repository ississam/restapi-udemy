<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ProfileController extends Controller
{
    
    public $successStatus = 200;

    public function info()
    {
        $user = Auth::user();
        return response()->json($user);
    }
}
