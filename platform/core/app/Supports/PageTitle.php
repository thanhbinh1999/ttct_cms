<?php


namespace Kuroneko\Core\Supports;

/**
 * Class PageTitle
 * @package Kuroneko\Core\Supports
 * @author Giang Nguyen
 */
class PageTitle
{
    /**
     * @var string
     */
    private $title;

    public function __construct()
    {
        $this->title = '';
    }

    /**
     * @param $title
     */
    public function setTitle($title)
    {
        $this->title = $title;
    }

    /**
     * @param bool $full
     * @return string
     */
    public function getTitle($full = true)
    {
        if ($full) {
            $postfix = config('base.app-title-postfix');
            $postfix = !empty($postfix) ? ' | ' . $postfix : '';
            return $this->title . $postfix;
        }
        return $this->title;
    }
}
