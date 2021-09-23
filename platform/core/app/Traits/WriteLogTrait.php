<?php

namespace Kuroneko\Core\Traits;

/**
 * Trait WriteLogTrait
 * @package Kuroneko\Core\Traits
 * @author Giang Nguyen
 */
trait WriteLogTrait
{
    /**
     * @param $message
     */
    public function writeLog($message)
    {
        if (is_bool($message)) {
            $message = $message ? 'true' : 'false';
        }
        if (is_null($message)) {
            $message = 'null';
        }
        \Log::info('[' . date('d/m/Y H:i:s', time()) . '] [m] Class ' . get_called_class() . ' - Message: ' . strval($message));;
    }

    /**
     * @param \Exception $exception
     */
    public function writeException(\Exception $exception)
    {
        $message = "[" . date('d/m/Y H:i:s', time()) . "] [Exception] Class " . get_called_class() . " - Message:" . $exception->getMessage() . " - Line: " . $exception->getLine() . " - File: " . $exception->getFile() . "\n";
        $message = $message . "\nStack trace: {$exception->getTraceAsString()}";
        \Log::error($message);
    }
}
