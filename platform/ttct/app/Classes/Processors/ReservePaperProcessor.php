<?php


namespace Kuroneko\Ttct\Classes\Processors;


use GuzzleHttp\Exception\ClientException;
use Kuroneko\Core\Processors\Abstracts\BaseProcessorAbstracts;
use Kuroneko\Core\Traits\CurlTrait;

/**
 * Class ReservePaperProcessor
 * @package Kuroneko\Ttct\Classes\Processors
 * @author Giang Nguyen - 黒猫
 */
class ReservePaperProcessor extends BaseProcessorAbstracts
{
    use CurlTrait;

    /**
     * ReservePaperProcessor constructor.
     */
    public function __construct()
    {
        $this->clientInit();
    }

    /**
     * @param $data
     * @return array
     */
    public function store($data)
    {
        try {
            $url = $this->getBaseUrl() . '/be/reserve-papers/store';
            return $this->execPost($url, $data);
        } catch (ClientException $exception) {
            $this->writeException($exception);
            return [
                'res' => $this->getErrorRes($exception),
                'code' => $exception->getCode()
            ];
        }
    }

    /**
     * @param $id
     * @param $data
     * @return array
     */
    public function update($id, $data)
    {
        try {
            $url = $this->getBaseUrl() . '/be/reserve-papers/update/' . $id;
            return $this->execPost($url, $data);
        } catch (ClientException $exception) {
            $this->writeException($exception);
            return [
                'res' => $this->getErrorRes($exception),
                'code' => $exception->getCode()
            ];
        }
    }

    /**
     * @param $id
     * @param $data
     * @return array
     */
    public function updateStatus($id, $data)
    {
        try {
            $url = $this->getBaseUrl() . '/be/reserve-papers/update-status/' . $id;
            return $this->execPost($url, $data);
        } catch (ClientException $exception) {
            $this->writeException($exception);
            return [
                'res' => $this->getErrorRes($exception),
                'code' => $exception->getCode()
            ];
        }
    }
}
