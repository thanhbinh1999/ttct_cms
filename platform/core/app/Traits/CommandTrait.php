<?php

namespace Kuroneko\Core\Traits;

use Illuminate\Console\Command;

/**
 * Trait CommandTrait
 * @package Kuroneko\Core\Traits
 * @mixin Command
 * @author Giang Nguyen
 */
trait CommandTrait
{
    /**
     * @param $color
     * @param $message
     */
    public function printMessage($color = 'white', $message = '')
    {
        if (empty($message))
            $this->line("");
        else
            $this->line("<fg=$color>[m] $message.</>\n");
    }

    /**
     * @param $message
     */
    public function printError($message)
    {
        $this->line("<fg=red>[m] $message.</>\n");
    }

    /**
     * @param $message
     * @param bool $full
     */
    public function printLog($message, $full = true)
    {
        if (is_bool($message)) $message = $message == true ? 'true' : 'false';

        if ($full) {
            $this->line(date('d/m/Y H:i:s') . ' - [log] Class: ' . get_called_class() . ' - Message: ' . $message);
        } else {
            $this->line('Message: ' . $message);
        }
    }

    /**
     * @param \Exception $exception
     * @param bool $full
     */
    public function printException(\Exception $exception, $full = true)
    {
        if ($full) {
            $this->line(date('d/m/Y H:i:s') . ' - [Exception] Class: ' . get_called_class() . ' - Message: ' . $exception->getMessage() . ' - Line: ' . $exception->getLine() . ' - File: ' . $exception->getFile() . ' - Trace: ' . $exception->getTraceAsString());
        } else {
            $this->line('Exception: ' . $exception->getMessage());
        }
    }
}
