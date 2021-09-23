<?php

namespace Kuroneko\User\Repositories;

use Kuroneko\Core\Repositories\Abstracts\EloquentRepositoryAbstract;
use Kuroneko\User\Models\User;

class UserRepository extends EloquentRepositoryAbstract
{
    public function __construct(User $model)
    {
        parent::__construct($model);
    }
}
