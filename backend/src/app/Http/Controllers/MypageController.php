<?php

namespace App\Http\Controllers;

use App\Models\StudySession;
use Carbon\Carbon;

class MypageController extends Controller
{
    public function mypage()
    {
        $userId = 1;

        $sessions = StudySession::with('rests')
            ->where('user_id', $userId)
            ->whereNotNull('finish_time')
            ->get();

        $now = Carbon::now();
        $startOfWeek = $now->copy()->startOfWeek();
        $startOfMonth = $now->copy()->startOfMonth();

        $total = 0;
        $weekly = 0;
        $monthly = 0;
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

            $effectiveMs = $totalDurationMs - $restDurationMs;
            $effectiveHours = $effectiveMs / 1000 / 60 / 60;
            $effectiveRounded = floor($effectiveHours * 10) / 10;

            // トータル加算
            $total += $effectiveRounded;

            // 今週
            if ($start >= $startOfWeek) {
                $weekly += $effectiveRounded;
            }

            // 今月
            if ($start >= $startOfMonth) {
                $monthly += $effectiveRounded;
            }

            // カテゴリー別
            $categoryId = $session->category_id;
            if (! isset($categoryTotals[$categoryId])) {
                $categoryTotals[$categoryId] = 0;
            }
            $categoryTotals[$categoryId] += $effectiveRounded;

            // 最近の記録
            $processedSessions[] = [
                'date' => $start->format('Y-m-d'),
                'category_id' => $session->category_id,
                'content' => $session->content,
                'duration' => $effectiveRounded,
            ];
            usort($processedSessions, fn($a, $b) => strtotime($b['date']) <=> strtotime($a['date']));
            $recentRecords = array_slice($processedSessions, 0, 5);
        }

        return response()->json([
            'total' => $total,
            'weekly' => $weekly,
            'monthly' => $monthly,
            'byCategory' => $categoryTotals,
            'recentRecords' => $recentRecords,
        ]);
    }
}
