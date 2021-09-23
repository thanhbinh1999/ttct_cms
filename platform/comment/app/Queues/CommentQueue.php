<?php

namespace Kuroneko\Comment\Queues;

use Kuroneko\Core\Queues\Abstracts\RabbitMQAbstract;

class CommentQueue extends RabbitMQAbstract
{
    public function __construct()
    {
        parent::__construct(
            env('COMMENT_QUEUE_HOST'),
            env('COMMENT_QUEUE_PORT'),
            env('COMMENT_QUEUE_USER'),
            env('COMMENT_QUEUE_PASS'),
            env('COMMENT_QUEUE_VHOST')
        );
    }
}
