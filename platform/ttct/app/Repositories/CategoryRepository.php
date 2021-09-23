<?php

namespace Kuroneko\Ttct\Repositories;

use Kuroneko\Core\Repositories\Abstracts\EloquentRepositoryAbstract;
use Kuroneko\Ttct\Models\Category;

class CategoryRepository extends EloquentRepositoryAbstract
{
    public function __construct(Category $model)
    {
        parent::__construct($model);
    }
}
