<?php

namespace Kuroneko\Ttct\Queues;

use Kuroneko\Core\Queues\Abstracts\RabbitMQAbstract;

class TtctQueue extends RabbitMQAbstract
{
    public function __construct()
    {
        parent::__construct(
            env('TTCT_QUEUE_HOST'),
            env('TTCT_QUEUE_PORT'),
            env('TTCT_QUEUE_USER'),
            env('TTCT_QUEUE_PASS'),
            env('TTCT_QUEUE_VHOST')
        );
    }
}
