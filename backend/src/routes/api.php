<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CulculatorController;
use App\Http\Controllers\RestController;
use App\Http\Controllers\StudySessionController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// 学習セッション関連
Route::apiResource('study-sessions', StudySessionController::class);
Route::post('study-sessions/{id}/finish', [StudySessionController::class, 'finish']);
Route::get('study-sessions/status/{userId}', [StudySessionController::class, 'status']);

// 休憩関連
Route::post('rests/start', [RestController::class, 'start']);
Route::post('rests/finish', [RestController::class, 'finish']);

// カテゴリー一覧取得
Route::get('categories', [CategoryController::class, 'index']);

// Mypage取得
Route::get('culculator', [CulculatorController::class, 'myProgress']);
