<?php

namespace Kuroneko\Ttct\Models;

use Illuminate\Database\Eloquent\Model;

class Article extends Model
{
    protected $fillable = [
        'title',
        'slug',
        'excerpt',
        'author',
        'content',
        'status',
        'priority',
        'creator_id',
        'published_at',
        'published_at_gmt',
        'created_at_gmt',
        'updated_at_gmt',
    ];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function metas()
    {
        return $this->hasMany(ArticleMeta::class, 'article_id', 'id');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function categories()
    {
        return $this->belongsToMany(Category::class, 'article_category', 'article_id', 'category_id');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function tags()
    {
        return $this->belongsToMany(Tag::class, 'article_tag', 'article_id', 'tag_id');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function resources()
    {
        return $this->belongsToMany(Resource::class, 'article_resource', 'article_id', 'resource_id');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasOne
     */
    public function thumbnail()
    {
        return $this->hasOne(Resource::class, 'id', 'thumbnail_id');
    }
}
