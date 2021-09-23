<?php


namespace Kuroneko\Ttct\Repositories;

use Kuroneko\Core\Repositories\Abstracts\EloquentRepositoryAbstract;
use Kuroneko\Ttct\Models\Article;

class ArticleRepository extends EloquentRepositoryAbstract
{
    public function __construct(Article $model)
    {
        parent::__construct($model);
    }
}
