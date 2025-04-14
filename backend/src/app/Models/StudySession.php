<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StudySession extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'category_id',
        'content',
        'start_time',
        'finish_time',
    ];

    protected $casts = [
        'start_time' => 'datetime:Y-m-d\TH:i:sP',
        'finish_time' => 'datetime:Y-m-d\TH:i:sP',
    ];

    public function category(){
        return $this->belongsTo(Category::class);
    }

    public function rests(){
        return $this->hasMany(Rest::class);
    }
}
