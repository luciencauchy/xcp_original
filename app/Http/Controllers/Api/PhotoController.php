<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\PhotoRequest;
use App\Http\Resources\PhotoResource;
use App\Models\Photo;
use App\Models\Galery;
use Illuminate\Http\Client\Response;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class PhotoController extends Controller
{
    public function index() : AnonymousResourceCollection
    {
        return PhotoResource::collection(Photo::all());
    }

    public function store(PhotoRequest $request) : PhotoResource
    {
        $galery = Galery::find($request->header('galery-id'));
        $name = $request->file('photo')->hashName();
        $path = asset('storage/'.$galery->name.'/'.$name);

        $photo = Photo::create([
            'src' => $path,
            'name' => $name,
            'galeryId' => $request->header('galery-id'),
            'order' => 1,
            'favourite' => false
        ]);

        $request->file('photo')->storeAs('/public/'.$galery->name, $name);

        return new PhotoResource($photo);
    }

    public function show(Photo $photo) : PhotoResource
    {
        return new PhotoResource($photo);
    }

    public function update(PhotoRequest $request, Photo $photo) : PhotoResource
    {
        if($request->favourite){
            $photo->update(['favourite' => !$photo->favourite]);
        }
        if($request->order){
            $photo->update(['order' => $request->order]);
        }
        return new PhotoResource($photo);
    }

    public function destroy(Photo $photo) : Response
    {
        $photo->delete();

        return response()->noContent();
    }
}
