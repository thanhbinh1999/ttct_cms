<?php


namespace Kuroneko\Core\Queues\Abstracts;

use PhpAmqpLib\Connection\AMQPStreamConnection;
use PhpAmqpLib\Message\AMQPMessage;

/**
 * Class RabbitMQAbstract
 * @package Kuroneko\Core\Queues\Abstracts
 * @author Giang Nguyen
 */
abstract class RabbitMQAbstract
{
    /**
     * @var boolean
     */
    private $enable;

    /**
     * @var array
     */
    private $server = [
        'host' => '127.0.0.1',
        'port' => 5672,
        'user' => 'guest',
        'pass' => 'guest',
        'vhost' => '/'
    ];

    /**
     * @var AMQPStreamConnection
     */
    private $currentConnection;

    /**
     * @var bool
     */
    private $isConnected;

    /**
     * RabbitMQAbstract constructor.
     * @param $host
     * @param $port
     * @param $user
     * @param $pass
     * @param $vhost
     */
    public function __construct($host, $port, $user, $pass, $vhost)
    {
        $this->server['host'] = $host;
        $this->server['port'] = $port;
        $this->server['user'] = $user;
        $this->server['pass'] = $pass;
        $this->server['vhost'] = $vhost;
        $this->currentConnection = null;
        $this->isConnected = false;
    }

    /**
     * @return AMQPStreamConnection
     */
    private function init()
    {
        if (is_null($this->currentConnection)) {
            $this->initConnection();
        }
        $this->isConnected = true;
        return $this->currentConnection;
    }

    /**
     * Init connection
     */
    private function initConnection()
    {
        try {
            $this->currentConnection = new AMQPStreamConnection(
                $this->server['host'],
                $this->server['port'],
                $this->server['user'],
                $this->server['pass'],
                $this->server['vhost']
            );
        } catch (\Exception $exception) {
            echo "Connection fail, please check your connection information \n";
            echo $exception->getMessage() . "\n\n";
        }
    }

    /**
     * @param $message
     * @param $exchange
     * @param string $key
     * @param bool $print
     * @throws \Exception
     */
    public function publish($message, $exchange, $key = 'all', $print = true)
    {
        $connection = $this->init();

        $channel = $connection->channel();

        $msg = new AMQPMessage($message, ['delivery_mode' => 2]);

        /*
            declare exchange
            name: $exchange
            type: topic
            passive: false
            durable: true // the exchange will survive server restarts
            auto_delete: false //the exchange won't be deleted once the channel is closed.
        */
        $channel->basic_publish($msg, $exchange, $key);

        if ($print) {
            echo "[m] " . date('d-m-Y, H:i:s') . " publish to RabbitMQ\n";
            echo "[m] Sent " . $key . ": " . $message . "\n";
        }

        $channel->close();
        $connection->close();
    }

    /**
     * @param $exchange
     * @param string $key
     * @param null $callable
     */
    public function consume($exchange, $key = 'all', $callable = null)
    {
        $connection = $this->init();

        $channel = $connection->channel();

        /*
            declare exchange
            name: $exchange
            type: topic
            passive: false
            durable: true // the exchange will survive server restarts
            auto_delete: false //the exchange won't be deleted once the channel is closed.
        */
        $channel->exchange_declare($exchange, 'topic', false, true, false);

        $queueName = 'Queue.for.' . $key;
        $channel->queue_declare($queueName, false, true, false, false);

        $channel->queue_bind($queueName, $exchange, $key);

        echo "[m] " . date('d/m/Y H:i') . "\n";
        echo "[m] Waiting for processing. Press Ctrl + C to exit\n";

        if ($callable === null) {
            $callable = function ($msg) {
                echo "[m] " . $msg->delivery_info['routing_key'] . ": " . $msg->body . "\n";
                echo "[m] Done\n\n";
                $msg->delivery_info['channel']->basic_ack($msg->delivery_info['delivery_tag']);
            };
        }

        /*
            queue_name:
            consumer_tag: Consumer identifier
            no_local: Don't receive messages published by this consumer.
            no_ack: Tells the server if the consumer will acknowledge the messages.
            exclusive: Request exclusive consumer access, meaning only this consumer can access the queue
            nowait:
            callback: A PHP Callback
        */


        $channel->basic_qos(null, 1, null);

        /*
        Message acknowledgments are turned off by default.
        It's time to turn them on by setting the fourth parameter to basic_consume to false (true means no ack)
        and send a proper acknowledgment from the worker,
        once we're done with a task.
        */

        $channel->basic_consume($queueName, '', false, false, false, false, $callable);

        while (count($channel->callbacks)) {
            $channel->wait();
        }

        $channel->close();
        $connection->close();
    }
}
