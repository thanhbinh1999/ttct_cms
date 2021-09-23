<?php


namespace Kuroneko\Ttct\Classes\Processors;


use GuzzleHttp\Exception\ClientException;
use Kuroneko\Core\Processors\Abstracts\BaseProcessorAbstracts;
use Kuroneko\Core\Traits\CurlTrait;

/**
 * Class ArticleTransferProcessor
 * @package Kuroneko\Ttct\Classes\Processors
 * @author Giang Nguyen - 黒猫
 */
class ArticleTransferProcessor extends BaseProcessorAbstracts
{
    use CurlTrait;

    public function __construct()
    {
        $this->clientInit();
    }

    /**
     * @param $id
     * @param $data
     * @return array
     */
    public function updateArticleTransferStatus($id, $data)
    {
        try {
            $url = $this->getBaseUrl() . '/be/article-transfer/update-status/' . $id;
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
     * @param $data
     * @return array
     */
    public function storeTransfer($data)
    {
        try {
            $url = $this->getBaseUrl() . '/be/article-transfer/store';
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
