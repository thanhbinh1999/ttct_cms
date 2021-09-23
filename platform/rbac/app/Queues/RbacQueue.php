<?php

namespace Kuroneko\Rbac\Queues;

use Kuroneko\Core\Queues\Abstracts\RabbitMQAbstract;

class RbacQueue extends RabbitMQAbstract
{
    public function __construct()
    {
        parent::__construct(
            env('RBAC_QUEUE_HOST'),
            env('RBAC_QUEUE_PORT'),
            env('RBAC_QUEUE_USER'),
            env('RBAC_QUEUE_PASS'),
            env('RBAC_QUEUE_VHOST')
        );
    }
}
