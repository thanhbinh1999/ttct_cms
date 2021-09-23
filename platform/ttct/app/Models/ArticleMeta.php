<?php


namespace Kuroneko\Ttct\Models;


use Illuminate\Database\Eloquent\Model;

class ArticleMeta extends Model
{
    protected $fillable = [
        'article_id',
        'key',
        'value'
    ];
}
