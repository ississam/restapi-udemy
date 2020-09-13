<?php

namespace App;
use App\User;

use Illuminate\Database\Eloquent\Model;

class Course extends Model
{
    protected $fillable=["courses_id","user_id"];
    public function user(){
    	return $this->belongsTo(User::class);
    }

}
