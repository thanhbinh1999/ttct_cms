<?php
 namespace Kuroneko\Ttct\Http\Controllers;
 use Illuminate\Http\Request; 
 use Illuminate\Routing\Controller;
 use GuzzleHttp\Client;
 use Illuminate\Support\Facades\Http;
 use GuzzleHttp\Exception\ClientException;
 use Illuminate\Support\Facades\File;
 use Kuroneko\Core\Traits\CurlTrait;
  /**
   * authorController
   * @author binh le
  */
  class authorController extends Controller{
	  private $client;

    public function __construct(){
        $this->client = new \GuzzleHttp\Client();
    }
    /**
    * @return json
    */
	  public function index(){
      $url  = [
        'api' => route('ttct.author.api'),
        'api-profile' => ENV('API_BASE_URL').'/author/author-profile',
        'update' => route('ttct.author.update'),
        'list-article-by-author' => route('ttct.author.list_article_by_author')
      ];
      return view('ttct::articles.index-author',compact('url'));
	  }

   /**
     * @param Request
     * @return json , array
   */

    public  function call_api(Request $request){
        try {
              $response = $this->client->request('POST',ENV('API_BASE_URL')."/author/author-lists",
                ['form_params'=> $request->all()]);
            if($response->getStatuscode() == 200){
                $data = $response->getBody();
                 return $data;
            }
          }catch (ClientException $exception) {
            return [
               'error' => 'lõi hệ thống vui lòng thử lại',
            ];
            
        }
    }
    /**
     * @param Request
     * @return array
   */

    public function update(Request $request){
      $file =  isset($request->thumbnail)?$request->thumbnail:[];
      $data = [
        [
          'name' => 'id',
          'contents' => $request->id
        ],
        [
          'name' => 'email',
          'contents' => $request->email
        ],
        [ 
          'name' => 'description',
          'contents' => $request->description
        ],
        [
           'name' => 'full_name',
           'contents' => $request->full_name
        ]
      ];
      if(!empty($file)){
         $data[]=[
           'name' => 'thumbnail',
           'contents' => file_get_contents($file->getRealPath()),
           'filename' =>  $file->getClientOriginalName(),
        ];
      }
      try {
       $response = $this->client->request('POST',ENV('API_BASE_URL')."/author/update/".$request->id,[
         'multipart' => $data
       ]);
        if($response->getStatuscode() == 200){
          $result = $response->getBody();
          return $result;
        }else{
          return[
            'error' => 'có lỗi vui lòng thử lại'
          ];
        }
      }catch (ClientException $exception) {
        return[
            'error' => $exception->getMessage()
        ];
      }

    }

      /**
       * @param Request
       * @return array
     */

      public function delete(Request $request){
         try {
             $response = $this->client->request("POST",ENV('API_BASE_URL')."/author/delete/".$request->id."/".$request->page);
             if($response->getStatuscode() == 200){
              $result = $response->getBody();
               return $result;
             }else{
                return[
                   'error' => 'có lõi '
                ];
             }
         } catch (ClientException $exception) {
              return[
                 'error' => 'lỗi hệ thống'
              ];
         }
      }


      /**
      * @param  $request ['id','page','perpage','startData','endDate','field','sort','query','articleId']
      * @return  json
      * @description  function call api article  of author
      */

      public function getListArticleByAuthor(Request $request){
          try {
            $dataRequest = $request->all();
            $data  = [];
            if(isset($dataRequest['pagination'])){
               if(!empty($dataRequest['pagination']['page'])){
                  $data['page']  =  $dataRequest['pagination']['page'];
                }
                if(!empty($dataRequest['pagination']['perpage'])){
                  $data['perpage'] = $dataRequest['pagination']['perpage'];
                }
            }
            if(isset($dataRequest['sort'])){
              if(!empty($dataRequest['sort']['sort'])){
                $data['sort'] = $dataRequest['sort']['sort'];
              }
              if(!empty($dataRequest['sort']['field']) && $dataRequest['sort']['field'] != 'thumbnail'){
                $data['field'] =  $dataRequest['sort']['field'];
              }
            }
            if(isset($dataRequest['query']['articleName'])){
              $data['searchTitle'] = $dataRequest['query']['articleName'];
            }
            if(!empty($dataRequest['startDate'])){
              $data['startDate'] = $dataRequest['startDate'];
            }
            if(!empty($dataRequest['endDate'])){
              $data['endDate'] = $dataRequest['endDate'];
            }
            if(isset($dataRequest['articleId']) && !empty($dataRequest['articleId'])){
              $data['articleId'] = $dataRequest['articleId'];
            }
            if(isset($dataRequest['id']) && !empty($dataRequest['id'])){
              $data['id'] = $dataRequest['id'];
            }

            $response = $this->client->request("POST",ENV('API_BASE_URL')."/author/get-list-article-by-author/".$data['id'],["form_params" => $data]);
              if($response->getStatuscode()== 200){
               return $response->getBody();
              }
          }catch (Exception $e) {
            return [
              'error' => 'Lỗi '
            ];
        }
      }
   
  }
	  	
  	
 ?>