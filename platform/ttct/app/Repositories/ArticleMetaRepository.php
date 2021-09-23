<?php


namespace Kuroneko\Ttct\Repositories;

use Kuroneko\Core\Repositories\Abstracts\EloquentRepositoryAbstract;
use Kuroneko\Ttct\Models\ArticleMeta;

class ArticleMetaRepository extends EloquentRepositoryAbstract
{
    public function __construct(ArticleMeta $model)
    {
        parent::__construct($model);
    }
}
