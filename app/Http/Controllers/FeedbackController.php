<?php

namespace App\Http\Controllers;

use App\Feedback;
use Illuminate\Http\Request;
use Validator;
use Illuminate\Validation\Rule;

class FeedbackController extends Controller
{
    public function index() {
        
        return view('feedback');
    }
 
 
    public function store(Request $request){
        $validator = Validator::make($request->all(), [
            'name' => 'nullable',
            'email' => 'required|email',
            'message' => 'required|min:10',
            ])->validate();
            
            $feedback = new Feedback();
            $feedback->name = request()->name;
            $feedback->email = request()->email;
            $feedback->message = request()->message;
            $feedback->save();
            $request->session()->flash('message', 'Your comments were successfully submitted!');
            return redirect('/feedback');
    }
}
