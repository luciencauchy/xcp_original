<?php

namespace App\Models;

use App\Models\Photo;
use App\Models\Relation;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Galery extends Model
{
    use HasFactory;

    protected $table = 'galeries';

    public $timestamps = false;

    public $fillable = [
        'name',
        'order',
        'parentGaleryId',
        'hasChild'
    ];

    public function parentGalery()
    {
        return $this::find($this->parentGaleryId);
    }

    public function childGaleries()
    {
        return Galery::where('parentGaleryId', $this->id)->get();
    }

    public function wasLastChildGalery() : bool
    {
        $parent = $this->parentGalery();
        return $parent && $parent->childGaleries()->count() < 1;
    }

    public function photos()
    {
        return $this->hasMany(Photo::class);
    }

}
