<?php

namespace App\Models;

use App\Models\Galery;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Photo extends Model
{
    use HasFactory;

    public $timestamps = false;
    public $fillable = [
        'src',
        'name',
        'order',
        'galeryId',
        'favourite'
    ];

    public function galery()
    {
        return $this->belongsTo(Galery::class);
    }

    public function favourites()
    {
        return Photo::where('favourite', true)->get();
    }
}
