<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Course;
use App\Token;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;

class coursesController extends Controller
{
    public function index(){
        $courses = Auth()->user()->courses;
        return response()->json($courses);
    }

    public function removeToken(){
        $token=Token::latest()->first();
        $token->delete();
        return response()->json(["message"=>"token deleted"]);
    }


    public function delete($id){
        $courses = Course::where('courses_id','=',$id);
        $courses->delete();
        return response()->json('ok');

    }

/* -------------------------------------------------------------------------*/

    public function add(Request $request){
        $course=Course::where("courses_id",$request->id)->where("user_id",Auth::id())->get();
        if(count($course)>0){
            return response()->json(["error"=>true,"message"=>"Cours déja ajouté"]);
        }
        else{
            $course = new Course;
            $course->courses_id = $request->id;
            $course->user_id =1; ///  commenté est mis 1 jusqu'a resoudre probleme tokenAuth::id();
            $course->save();
            return response()->json(["success"=>true,"message"=>"Cours ajouté avec success"]);
        }

      }
}
