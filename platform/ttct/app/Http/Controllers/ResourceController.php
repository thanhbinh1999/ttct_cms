<?php


namespace Kuroneko\Ttct\Http\Controllers;


use App\Http\Controllers\Controller;
use Elasticsearch\Endpoints\Cluster\Reroute;
use Illuminate\Http\Request;
use Kuroneko\Core\Traits\WriteLogTrait;
use Kuroneko\Ttct\Classes\DataProviders\Resource\ResourceDataProvider;
use Kuroneko\Ttct\Classes\Processors\ResourceProcessor;
use Request as GlobalRequest;

/**
 * Class ResourceController
 * @package Kuroneko\Ttct\Http\Controllers
 * @author Giang Nguyen - 黒猫
 */
class ResourceController extends Controller
{
    use WriteLogTrait;
    /**
     * @var ResourceDataProvider
     */
    private $resourceDataProvider;

    /**
     * @var ResourceProcessor
     */
    private $resourceProcessor;

    /**
     * ResourceController constructor.
     * @throws \Illuminate\Contracts\Container\BindingResolutionException
     */
    public function __construct()
    {
        $this->resourceDataProvider = app()->make(ResourceDataProvider::class);
        $this->resourceProcessor = app()->make(ResourceProcessor::class);
    }

    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function datatable(Request $request)
    {
        $query = $request->post('query', []);
        $pagination = $request->post('pagination', []);
        $sort = $request->post('sort', []);
        try {
            $search = [];

            if (!empty($query['type'])) {
                $search['type'] = $query['type'];
            }

            if (!empty($query['name'])) {
                $search['key'] = $query['name'];
            }

            if (!empty($query['status'])) {
                $search['status'] = $query['status'];
            }

            if (!empty($sort)) {
                $search['sort'] = $sort;
            }

            if (!empty($query['from'])) {
                $search['from'] = $query['from'];
            }

            if (!empty($query['to'])) {
                $search['to'] = $query['to'];
            }

            if (!empty($query['upload_by'])) {
                $search['upload_by'] = $query['upload_by'];
            }

            $data = $this->resourceDataProvider->getListResource($pagination['page'], $pagination['perpage'], $search);
            return response()->json($data);
        } catch (\Exception $exception) {
            return response()->json([
                'meta' => [
                    'page' => $pagination['page'],
                    'pages' => 4,
                    'perpage' => $pagination['perpage'],
                    'total' => 0
                ],
                'data' => []
            ]);
        }
    }

    /**
     * @param $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function getDetail($id)
    {
        try {
            $data = $this->resourceDataProvider->getEdit($id);
            return response()->json($data);
        } catch (\Exception $exception) {
            $this->writeException($exception);
            return response()->json([
                'message' => 'Oop, có lỗi xảy ra, vui lòng thử lại sau'
            ], 500);
        }
    }

    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function storeMulti(Request $request)
    {
        try {
            $data = [
                [
                    'name' => 'creator_id',
                    'contents' => $request->get('creator_id')
                ],
                [
                    'name' => 'creator_full_name',
                    'contents' => $request->get('creator_full_name')
                ],
                [
                    'name' => 'creator_username',
                    'contents' => $request->get('creator_username')
                ]
            ];
            $descriptions = $request->get('descriptions', []);
            $names = $request->get('names', []);
            if (is_array($descriptions)) {
                foreach ($descriptions as $description) {
                    $data[] = [
                        'name' => 'descriptions[]',
                        'contents' => $description
                    ];
                }
            }

            if (is_array($names)) {
                foreach ($names as $name) {
                    $data[] = [
                        'name' => 'names[]',
                        'contents' => $name
                    ];
                }
            }

            $files = $request->all('files')['files'];

            foreach ($files as $file) {
                $data[] = [
                    'name' => 'files[]',
                    'contents' => file_get_contents($file->getRealPath()),
                    'filename' => $file->getClientOriginalName()
                ];
            }

            $res = $this->resourceProcessor->storeMulti($data);
            if ($res['code'] == 200 && !empty($thumb)) {
                foreach ($files as $file) {
                    \File::delete($file->getRealPath());
                }
            }
            return response()->json($res['res'], $res['code']);
        } catch (\Exception $exception) {
            $this->writeException($exception);
            return response()->json([
                'message' => 'Oop, có lỗi xảy ra, vui lòng thử lại sau'
            ], 500);
        }
    }


    public function updateOrAddResourceArticle(Request $request)
    {
      
        if ($request->has('data') && !empty($request->has('data'))) {
            $data = $request->all()['data'];
            $params[] = [
                'action' => $data['action']
            ]; 
            foreach ($data['data'] as $item) {
                if($params[0]['action'] ==  'insert'){
                    $params[] = [
                        'article_id' => $item['article_id'],
                        'resource_id' =>  $item['resource_id']
                    ];

                }else{

                    $params[] =[
                        'old_post_id' => $item['old_post_id'],
                        'old_resource_id' => $item['old_resource_id']
                    ];

                    $params[] = [
                        'article_id' => $item['article_id'],
                        'resource_id' =>  $item['resource_id']
                    ];
                   
                }
                
            }

            $res  = $this->resourceProcessor->updateArticleResource($params);
            return $res;
        }
    }

    /**
     * @method post
     * @param [article_id:number , resource_id:number]
     * @return json
     */

    public function deleteArticleResource(Request $request){
        $data =  $request->get('data',[]);
        if(!empty($data)){
           return $this->resourceProcessor->deleteArticleResource($data);
        }else{
            return response()->json([
                'status' => 500,
                'massage' => 'Dữ liệu không hợp lệ',
                'data' => []
            ]);
        }
    }


    /**
     * @method  post
     * @param [article_id:number, resource_id:number , content:string]
     * @return json
     */

    public function updateDescriptionResource(Request $request){
        $data =  $request->get('data',[]);
        if(!empty($data)){
            return $this->resourceProcessor->updateDescriptionResource($data);
        }else{
            return response()->json([
                'status' => 500,
                'massage' => 'Dữ liệu không hợp lệ',
                'data' => []
            ]); 
        }
    }


}
