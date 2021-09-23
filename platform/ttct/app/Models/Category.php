<?php


namespace Kuroneko\Ttct\Models;


use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    protected $fillable = [
        'name',
        'slug',
        'order',
        'description',
        'parent_id',
        'status',
        'type'
    ];
}
