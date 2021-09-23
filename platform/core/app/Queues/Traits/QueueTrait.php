<?php
namespace Kuroneko\Core\Queues\Traits;

/**
 * Trait QueueTrait
 * @package Kuroneko\Core\Queues\Traits
 * @author Giang Nguyen
 */
trait QueueTrait
{
    /**
     * @param $msg
     */
    public function processDone($msg)
    {
        $msg->delivery_info['channel']->basic_ack($msg->delivery_info['delivery_tag']);
        $this->line("<fg=green>[m] Reported message done to Rabbitmq.</>\n");
    }
}
