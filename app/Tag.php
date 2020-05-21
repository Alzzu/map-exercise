<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Tag extends Model
{
    protected $fillable = ['label'];

    public function tags() {
        return $this->belongsToMany(Place::class, 'tag_place');
    }
}
