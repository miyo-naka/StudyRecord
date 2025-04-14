<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Rest extends Model
{
    use HasFactory;

    protected $fillable = [
        'study_session_id',
        'rest_start_time',
        'rest_finish_time',
    ];

    public function study_session()
    {
        return $this->belongsTo(StudySession::class);
    }
}
