<?php

namespace App\Http\Controllers;

use App\Models\StudySession;
use Illuminate\Http\Request;

class StudySessionController extends Controller
{
    public function index()
    {
        $items = StudySession::all();

        return response()->json([
            'data' => $items,
        ], 200);
    }

    public function store(Request $request)
    {
        $study_session = StudySession::create([
            'user_id' => auth()->id(),
            'category_id' => $request->category_id,
            'title' => $request->title,
            'start_time' => now(),
        ]);

        response()->json($study_session, 201);
    }

    public function end($id)
    {
        $session = StudySession::findOrFail($id);
        $session->end_time = now();
        $session->save();

        return response()->json(['message' => '学習終了しました']);
    }
}
