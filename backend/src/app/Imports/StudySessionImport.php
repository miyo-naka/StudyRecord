<?php

namespace App\Imports;

use App\Models\StudySession;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;

class StudySessionImport implements ToModel, WithHeadingRow
{
    /**
     * @return \Illuminate\Database\Eloquent\Model|null
     */
    public function model(array $row)
    {
        return new StudySession([
            'user_id' => auth()->id(),
            'category_id' => $row['category_id'],
            'content' => $row['content'],
            'start_time' => $row['start_time'],
            'finish_time' => $row['finish_time'],
        ]);
    }
}
