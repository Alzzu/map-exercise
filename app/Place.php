<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Place extends Model
{
    protected $fillable = ['title', 'description', 'coordinates', 'hours'];

    public function tags() {
        return $this->belongsToMany(Tag::class, 'tag_place');
    }
}
