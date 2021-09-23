<?php
 namespace Kuroneko\Ttct\Http\Controllers;
 use Illuminate\Http\Request; 
 use Illuminate\Routing\Controller;
 use GuzzleHttp\Client;
 use Illuminate\Support\Facades\Http;
 use GuzzleHttp\Exception\ClientException;
  /**
   *Atexcontroller 
   * @author binh le 
  */
  class  AtexController extends Controller{
  	private $client;
    private $id;
  	public function __construct(){
        $this->client = new \GuzzleHttp\Client();
    }
    public function index(){
    	 if(can('ttct.kho_bao_giay_show')){
    	   set_page_title('Opps, bạn không có quyền truy cập trang này');
           abort(403);
    	 } 
    	 return view('ttct::articles.atex'); 
    }

    /**
     * @param Request 
     * @return json
    */

    public function data(Request $request){
         try {
             $reponse  = $this->client->request("POST",ENV('API_BASE_URL')."/atex/CallApi",
              ['form_params'=> $request->all()]);
             if($reponse->getStatusCode() == 200){
                 $data = $reponse->getBody();
                   return $data;
             }else{
               return response()->json(['error' => 'Lỗi hệ thống vui lòng thử lại']);
             }
          
         } catch (ClientException $exception) {
              return response()->json([
                 'error' => 'Lỗi hệ thống vui lòng thử lại'
              ]);
         }
    }

     /**
     * @param Request 
     * @return json
    */

    public function transferDraft(Request $request){
        try {
             $reponse  = $this->client->request("POST",ENV('API_BASE_URL')."/atex/transfer-draft",
              ['form_params' => $request->all()]
            );
             if($reponse->getStatusCode() == 200){
                 $data = $reponse->getBody();
                   return $data;
             }else{
               return response()->json(['error' => 'Lỗi hệ thống vui lòng thử lại']);
             }
          
         } catch (ClientException $exception) {
              return response()->json([
                 'error' => 'Lỗi hệ thống vui lòng thử lại'
              ]);
         }
    }

     /**
     * @param Request 
     * @return json
    */

    public function search(Request $request){
       try {
             $reponse  = $this->client->request("POST",ENV('API_BASE_URL')."/atex/search",['form_params'=> $request->all()]);
             if($reponse->getStatusCode() == 200){
                 $data = $reponse->getBody();
                   return $data;
             }else{
               return response()->json(['error' => 'Lỗi hệ thống vui lòng thử lại']);
             }
          
         } catch (ClientException $exception) {
              return response()->json([
                 'error' => 'Lỗi hệ thống vui lòng thử lại'
              ]);
         }
         
    }
  } 
 ?>
