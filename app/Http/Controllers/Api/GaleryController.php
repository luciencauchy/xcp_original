<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\GaleryRequest;
use App\Http\Resources\GaleryResource;
use Illuminate\Http\Request;
use App\Models\Galery;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class GaleryController extends Controller
{
    public function index() : AnonymousResourceCollection
    {
        return GaleryResource::collection(Galery::all());
    }

    public function store(GaleryRequest $request) : GaleryResource
    {
        $galeryId = $request->galeryId ? $request->galeryId : false;
        $galery = Galery::create([
            'name' => $request->name,
            'order' => 1,
            'parentGaleryId' => $galeryId,
        ]);

        if($galeryId) {
            $parentGalery = Galery::find($galeryId);
            $parentGalery->update(['hasChild' => true]);
        }

        return new GaleryResource($galery);
    }

    public function show(Galery $galery) : GaleryResource
    {
        return new GaleryResource($galery);
    }

    public function update(Request $request, Galery $galery) : GaleryResource
    {
        if($request->name)
            $galery->update(['name' => $request->name]);

        if($request->order)
            $galery->update(['order' => $request->order]);

        return new GaleryResource($galery);
    }

    public function destroy(Galery $galery) : \Illuminate\Http\Response
    {
        foreach($galery->childGaleries() as $gal){
            foreach($gal->photos() as $photo){
                $photo->delete();
            }
            $gal->delete();
        }

        if($galery->wasLastChildGalery())
            $galery->parentGalery()->update(['hasChild', false]);

        $galery->delete();

        return response()->noContent();
    }
}
