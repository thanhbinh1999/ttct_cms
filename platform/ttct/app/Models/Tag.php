<?php


namespace Kuroneko\Ttct\Models;


use Illuminate\Database\Eloquent\Model;

class Tag extends Model
{
    protected $fillable = [
        'name',
        'slug',
        'parent_id',
        'frequency',
        'description',
        'status'
    ];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function articles()
    {
        return $this->belongsToMany(Article::class, 'article_tag', 'article_id', 'tag_id');
    }
}
