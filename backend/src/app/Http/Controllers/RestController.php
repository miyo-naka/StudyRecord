<?php

namespace App\Http\Controllers;

use App\Models\Rest;
use Illuminate\Http\Request;

class RestController extends Controller
{
    public function start(Request $request)
    {
        $rest = Rest::create([
            'study_session_id' => $request->input('study_session_id'),
            'rest_start_time' => now(),
        ]);

        return $rest;
    }

    public function finish(Request $request)
    {
        $rest = Rest::where('study_session_id', $request->input('study_session_id'))
            ->whereNull('rest_finish_time')
            ->latest()
            ->first();

        if ($rest) {
            $rest->rest_finish_time = now();
            $rest->save();
        }

        return response()->json(['message' => '休憩終了']);
    }
}
