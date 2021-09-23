<?php


namespace Kuroneko\Ttct\Classes\Processors;


use GuzzleHttp\Exception\ClientException;
use Kuroneko\Core\Processors\Abstracts\BaseProcessorAbstracts;
use Kuroneko\Core\Traits\CurlTrait;

/**
 * Class ResourceProcessor
 * @package Kuroneko\Ttct\Classes\Processors
 * @author Giang Nguyen - 黒猫
 */
class ResourceProcessor extends BaseProcessorAbstracts
{
    use CurlTrait;

    /**
     * ResourceProcessor constructor.
     */
    public function __construct()
    {
        $this->clientInit();
    }

    /**
     * @param $data
     * @return array
     */
    public function storeMulti($data)
    {
        try {
            $url = $this->getBaseUrl() . '/be/resources/store-multi';
            return $this->execPostFile($url, $data);
        } catch (ClientException $exception) {
            $this->writeException($exception);
            return [
                'res' => $this->getErrorRes($exception),
                'code' => $exception->getCode()
            ];
        }
    }

    public function updateArticleResource($data){
        try {
            $url = $this->getBaseUrl() . '/be/resources/update-resource-article';
            return $this->setParamExecPost('json',$url, [ "data" => json_encode($data)]);
        } catch (ClientException $exception) {
            $this->writeException($exception);
            return [
                'res' => $this->getErrorRes($exception),
                'code' => $exception->getCode()
            ];
        }
    }

    /**
     * @param $data['article_id':number , 'resource_id':number],
     * @return json
     */

    public function deleteArticleResource($data){
       try{
           $url = $this->getBaseUrl().'/be/resources/delete-article-resource';
           return $this->setParamExecPost('json',$url, ['data' => $data]);
       }catch(ClientException $except){
           return response()->json([
               'status' => 500,
               'message' => 'Không tìm thấy máy chủ',
               'data' => []
           ]) ;
       }
    }

  /**
   * @param [article_id:number,resource_id:number,content:string]
   * @return json
  */

    public function updateDescriptionResource($data){
       
        try{
            $url = $this->getBaseUrl().'/be/resources/update-description-resource';
            return $this->setParamExecPost('json',$url, ['data' => $data]);
        }catch(ClientException $except){
            return response()->json([
                'status' => 500,
                'message' => 'Không tìm thấy máy chủ',
                'data' => []
            ]) ;
        }
    }
}
