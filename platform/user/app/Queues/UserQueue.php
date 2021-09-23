<?php

namespace Kuroneko\User\Queues;

use Kuroneko\Core\Queues\Abstracts\RabbitMQAbstract;

class UserQueue extends RabbitMQAbstract
{
    public function __construct()
    {
        parent::__construct(
            env('USER_QUEUE_HOST'),
            env('USER_QUEUE_PORT'),
            env('USER_QUEUE_USER'),
            env('USER_QUEUE_PASS'),
            env('USER_QUEUE_VHOST')
        );
    }
}
