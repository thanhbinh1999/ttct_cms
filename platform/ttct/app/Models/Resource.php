<?php


namespace Kuroneko\Ttct\Models;


use Illuminate\Database\Eloquent\Model;

class Resource extends Model
{
    protected $fillable = [
        'id',
        'base_url',
        'absolute_url',
        'type',
        'description',
        'status'
    ];
}
