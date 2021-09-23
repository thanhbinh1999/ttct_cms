<?php


namespace Kuroneko\Ttct\Classes\Processors;


use GuzzleHttp\Exception\ClientException;
use Kuroneko\Core\Processors\Abstracts\BaseProcessorAbstracts;
use Kuroneko\Core\Traits\CurlTrait;

/**
 * Class ArticleProcessor
 * @package Kuroneko\Ttct\Classes\Processors
 * @author Giang Nguyen - 黒猫
 */
class ArticleProcessor extends BaseProcessorAbstracts
{
    use CurlTrait;

    /**
     * ArticleProcessor constructor.
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
            $url = $this->getBaseUrl() . '/be/articles/store';
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
            $url = $this->getBaseUrl() . '/be/articles/update/' . $id;
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
    public function updateAndPublish($id, $data)
    {
        try {
            $url = $this->getBaseUrl() . '/be/articles/update-and-publish/' . $id;
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
            $url = $this->getBaseUrl() . '/be/articles/update-status/' . $id;
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
    public function updateArticleEditor($id, $data)
    {
        try {
            $url = $this->getBaseUrl() . '/be/articles/update-article-editor/' . $id;
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
    public function updatePriorityOne($id, $data)
    {
        try {
            $url = $this->getBaseUrl() . '/be/articles/update-priority-one/' . $id;
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
     * @param  $id
     * @param  $data:array
     * @return json
     */

    public function  updateArticleCategoryPublished($id, $data)
    {
        try {
            $url =  $this->getBaseUrl() . '/be/articles/update-article-category-published/' . $id;
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
     * @param  id|int , data['themes']|arrray 
     * @return json
     */

    public function  updateArticleThemePublished($id, $data)
    {
        try {
            $url = $this->getBaseUrl() . '/be/articles/update-article-theme-published/' . $id;
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
