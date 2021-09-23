<?php
namespace Kuroneko\Comment\Classes\DataProviders\BlackKey\Interfaces;

/**
 * Interface BlackKeyLayerInterface
 * @package Kuroneko\Comment\Classes\DataProviders\BlackKey\Interfaces
 */
interface BlackKeyLayerInterface
{
    /**
     * @param $page
     * @param $perPage
     * @param array $search
     * @return mixed
     */
    public function getListBlackKey($page, $perPage, $search = []);

    /**
     * @return mixed
     */
    public function getListBlackKeyRaw();
}
