<?php


namespace Kuroneko\Ttct\Repositories;

use Kuroneko\Core\Repositories\Abstracts\EloquentRepositoryAbstract;
use Kuroneko\Ttct\Models\Tag;

class TagRepository extends EloquentRepositoryAbstract
{
    public function __construct(Tag $model)
    {
        parent::__construct($model);
    }
}
