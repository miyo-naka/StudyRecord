<?php

namespace App\Http\Controllers;

use App\Models\StudySession;
use Illuminate\Http\Request;

class StudySessionController extends Controller
{
    /**
     * Display a listing of the resource.
     * 学習記録一覧取得
     */
    public function index()
    {
        $sessions = StudySession::with(['user', 'category', 'rests'])->paginate(10);

        return response()->json([
            'data' => $sessions,
        ], 200);
    }

    /**
     * Store a newly created resource in storage.
     * 学習開始
     */
    public function store(Request $request)
    {
        $study_session = StudySession::create([
            'user_id' => $request->user_id,
            'category_id' => $request->category_id,
            'content' => $request->content,
            'start_time' => now(),
        ]);

        return response()->json($study_session, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(StudySession $studySession)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, StudySession $studySession)
    {
        $update = [
            'category_id' => $request->category_id,
            'content' => $request->content,
            'start_time' => $request->start_time,
            'finish_time' => $request->finish_time,
        ];
        $session = StudySession::where('id', $studySession->id)->update($update);
        if ($session) {
            return response()->json([
                'message' => 'Updated successfully',
            ], 200);
        } else {
            return response()->json([
                'message' => 'Not found',
            ], 404);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(StudySession $studySession)
    {
        $session = StudySession::where('id', $studySession->id)->delete();
        if ($session) {
            return response()->json([
                'message' => 'Deleted successfully',
            ], 200);
        } else {
            return response()->json([
                'message' => 'Not found',
            ], 404);
        }
    }

    // 学習終了
    public function finish($id)
    {
        $session = StudySession::findOrFail($id);
        $session->finish_time = now();
        $session->save();

        return response()->json(['message' => '学習終了しました']);
    }

    // 現在の状態を取得
    public function status($userId)
    {
        $learningSession = StudySession::where('user_id', $userId)
            ->whereNull('finish_time')
            ->latest('start_time')
            ->first();

        if (! $learningSession) {
            return response()->json([
                'status' => 'idle',
            ]);
        }

        $latestRest = $learningSession->rests()
            ->whereNull('rest_finish_time')
            ->latest('rest_start_time')
            ->first();

        if ($latestRest) {
            return response()->json([
                'status' => 'break',
                'session_id' => $learningSession->id,
            ]);
        }

        return response()->json([
            'status' => 'learning',
            'session_id' => $learningSession->id,
        ]);
    }
}
