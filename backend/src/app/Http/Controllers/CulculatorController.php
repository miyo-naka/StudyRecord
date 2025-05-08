<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\StudySession;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;

class CulculatorController extends Controller
{
    public function myProgress()
    {
        $userId = Auth::id();
        $userName = User::select('name')->find($userId);

        $categories = Category::all();
        $sessions = StudySession::with('rests', 'category')
            ->where('user_id', $userId)
            ->whereNotNull('finish_time')
            ->get();

        $now = Carbon::now();
        $startOfWeek = $now->copy()->startOfWeek();
        $startOfMonth = $now->copy()->startOfMonth();

        $total = 0;
        $weekTotal = 0;
        $monthTotal = 0;
        $categoryTotals = [];
        $processedSessions = [];

        foreach ($sessions as $session) {
            $start = Carbon::parse($session->start_time);
            $finish = Carbon::parse($session->finish_time);
            $totalDurationMs = $finish->diffInMilliseconds($start);

            $restDurationMs = 0;
            foreach ($session->rests as $rest) {
                if ($rest->rest_finish_time) {
                    $restStart = Carbon::parse($rest->rest_start_time);
                    $restFinish = Carbon::parse($rest->rest_finish_time);
                    $restDurationMs += $restFinish->diffInMilliseconds($restStart);
                }
            }

            $effectiveMs = max($totalDurationMs - $restDurationMs, 0);
            $effectiveMinutes = $effectiveMs / 1000 / 60;
            // $effectiveRounded = floor($effectiveHours * 10) / 10;

            // トータル加算
            $total += $effectiveMinutes;

            // 今週
            if ($start >= $startOfWeek) {
                $weekTotal += $effectiveMinutes;
            }

            // 今月
            if ($start >= $startOfMonth) {
                $monthTotal += $effectiveMinutes;
            }

            // カテゴリー別
            $categoryId = $session->category_id;
            if (! isset($categoryTotals[$categoryId])) {
                $categoryTotals[$categoryId] = 0;
            }
            $categoryTotals[$categoryId] += $effectiveMinutes;

            // 最近の記録
            $processedSessions[] = [
                'date' => $start->format('Y-m-d'),
                'category_id' => $session->category_id,
                'content' => $session->content,
                'duration' => $effectiveMinutes,
            ];
            usort($processedSessions, fn ($a, $b) => strtotime($b['date']) <=> strtotime($a['date']));
            $recentRecords = array_slice($processedSessions, 0, 5);
        }

        return response()->json([
            'total' => $total,
            'weekTotal' => $weekTotal,
            'monthTotal' => $monthTotal,
            'categoryTotal' => $categoryTotals,
            'recentRecords' => $recentRecords,
            'categories' => $categories,
            'userName' => $userName,
        ]);
    }
}
