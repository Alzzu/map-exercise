<?php

namespace App\Http\Controllers;

use App\Place;
use Illuminate\Http\Request;

class PlaceController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Place::with('tags')->get();
    }

    /** 
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */

    public function store(Request $request)
    {

        $validated = $request->validate([
            'title' => 'required|string|min:3|max:100',
            'description' => 'required|string|min:3|max:500',
            'coordinates' => 'required|string|min:3|max:255',
            'hours' => 'required|string|min:3|max:255',
        ]);

        $place = Place::create($validated);
        $tags = $request->tags;
        $tag = $place->tags()->attach($tags);
        return response()->json($place, 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Place  $place
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $place = Place::with('tags')->findOrFail($id);

        return $place;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Place  $place
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'title' => 'required|string|min:3|max:100',
            'description' => 'required|string|min:3|max:500',
            'coordinates' => 'required|string|min:3|max:255',
            'hours' => 'required|string|min:3|max:255',
        ]);

        $place = Place::findOrFail($id);

        $place->update($validated);
        $tags = $request->tags;
        $tag = $place->tags()->sync($tags);

        return response()->json($place, 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Place  $place
     * @return \Illuminate\Http\Response
     */
    public function destroy(Place $place)
    {
        $place->delete();

        return 204;
    }
}
