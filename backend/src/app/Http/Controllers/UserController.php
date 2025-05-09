<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function update(Request $request){
        $userId = Auth::id();

        $updateData = [
            'name' => $request->name,
            'email' => $request->email,
        ];

        if(!empty($request->password)){
            $updateData['password'] = Hash::make($request->password);
        }

        User::where('id', $userId)->update($updateData);
        return response()->json([
            'message' => 'Updated successfully',
        ], 200);
    }
}
