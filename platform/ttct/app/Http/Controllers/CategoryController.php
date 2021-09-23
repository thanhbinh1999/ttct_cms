<?php


namespace Kuroneko\Ttct\Http\Controllers;

use GuzzleHttp\Client;
use GuzzleHttp\Exception\ClientException;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Kuroneko\Core\Traits\WriteLogTrait;
use Kuroneko\Ttct\Classes\DataProviders\Category\CategoryDataProvider;
use Kuroneko\Ttct\Classes\Processors\CategoryProcessor;

/**
 * Class CategoryController
 * @package Kuroneko\Ttct\Http\Controllers
 * @author Giang Nguyen
 */
class CategoryController extends Controller
{
    use WriteLogTrait;
    /**
     * @var CategoryDataProvider;
     */
    private $categoryDataProvider;

    /**
     * @var CategoryProcessor
     */
    private $categoryProcessor;

    /**
     * CategoryController constructor.
     * @throws \Illuminate\Contracts\Container\BindingResolutionException
     */
    private $client;
    public function __construct()
    {
        $this->categoryDataProvider = app()->make(CategoryDataProvider::class);
        $this->categoryProcessor = app()->make(CategoryProcessor::class);
        $this->client = new \GuzzleHttp\Client();
    }

    /**
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function showCategory()
    {
        if (!can('category-view')) {
            set_page_title('Opps, bạn không có quyền truy cập trang này');
            abort(403);
        }
        set_page_title('Quản lý Chuyên mục');
        $listUrl = [
            'datatable' => route('ttct.categories.datatable'),
            'store' => route('ttct.categories.store'),
            "edit_topical" => route('ttct.topical.edit', 1)
        ];
        return view('ttct::categories.index', compact('listUrl'));
    }

    /**
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function showTopical()
    {
        if (!can('topical-view')) {
            set_page_title('Opps, bạn không có quyền truy cập trang này');
            abort(403);
        }
        set_page_title('Quản lý chuyên đề');
        $listUrl = [
            'datatable' => route('ttct.categories.datatable'),
            'store' => route('ttct.categories.store'),
            "edit_topical" => route('ttct.topical.edit', 1)
        ];
        return view('ttct::topical.index', compact('listUrl'));
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

            if (!empty($sort)) {
                $search['sort'] = $sort;
            }

            if (!empty($query['search-key'])) {
                $search['key'] = $query['search-key'];
            }

            if (!empty($query['status'])) {
                $search['status'] = $query['status'];
            }

            $data = $this->categoryDataProvider->getListCategories(
                $pagination['page'],
                $pagination['perpage'],
                $search
            );

            foreach ($data['data'] as &$datum) {
                $datum['url_get_data_edit'] = route('ttct.categories.edit', $datum['id']);

                if (!empty($datum['url_take_down'])) {
                    $datum['url_take_down'] = route('ttct.categories.update_status_for_topical', $datum['id']);
                }

                if (!empty($datum['url_publish'])) {
                    $datum['url_publish'] = route('ttct.categories.update_status_for_topical', $datum['id']);
                }

                if (!empty($datum['url_restore'])) {
                    $datum['url_restore'] = $datum['type'] == 1 ?
                        route('ttct.categories.restore', $datum['id']) :
                        route('ttct.categories.update_status_for_topical', $datum['id']);
                }

                if (!empty($datum['url_delete'])) {
                    $datum['url_delete'] = route('ttct.categories.delete', $datum['id']);
                }
            }

            return response()->json($data);
        } catch (\Exception $exception) {
            $this->writeException($exception);
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
    public function edit($id)
    {
        try {
            $data = $this->categoryDataProvider->getForEdit($id);
            if (empty($data)) {
                return response()->json([
                    'message' => 'Oop, có lỗi xảy ra, vui lòng thử lại sau'
                ], 500);
            }
            $data['url_update'] = route('ttct.categories.update', $data['id']);
            return response()->json($data);
        } catch (\Exception $exception) {
            $this->writeException($exception);
            return response()->json([
                'message' => 'Oop, có lỗi xảy ra, vui lòng thử lại sau'
            ], 500);
        }
    }

    /**
     * @param $id
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function update($id, Request $request)
    {
        try {
            if (!can('category-update') && !can('topical-update')) {
                return response()->json([
                    'message' => 'Không thể truy cập chức năng này'
                ], 403);
            }

            $thumb = $request->file('thumbnail');

            $data = [
                [
                    'name' => 'name',
                    'contents' => $request->get('name')
                ],
                [
                    'name' => 'slug',
                    'contents' => $request->get('slug')
                ],
                [
                    'name' => 'description',
                    'contents' => $request->get('description')
                ],
                [
                     'name' => 'display_type',
                     'contents' =>  $request->get('display_type')
                ]
            ];

            if ($request->has('off_name')) {
                $data[] = [
                    'name' => 'off_name',
                    'contents' => $request->get('off_name')
                ];
            }

            if ($request->has('off_description')) {
                $data[] = [
                    'name' => 'off_description',
                    'contents' => $request->get('off_description')
                ];
            }

            if (!empty($thumb)) {
                $data[] = [
                    'name' => 'thumbnail',
                    'filename' => $thumb->getClientOriginalName()
                ];
            }

            $res = $this->categoryProcessor->update($id, $data);
            if ($res['code'] == 200 && !empty($thumb)) {
                \File::delete($thumb->getRealPath());
            }
            return response()->json($res['res'], $res['code']);
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
    public function store(Request $request)
    {
      
        try {
            if (!can('topical-create') && !can('category-create')) {
                return response()->json([
                    'message' => 'Không thể truy cập chức năng này'
                ], 403);
            }

            $thumb = $request->file('thumbnail');

            $data = [
                [
                    'name' => 'name',
                    'contents' => $request->get('name')
                ],
                [
                    'name' => 'slug',
                    'contents' => $request->get('slug')
                ],
                [
                    'name' => 'description',
                    'contents' => $request->get('description')
                ],
                [
                    'name' => 'type',
                    'contents' => $request->get('type')
                ],
                [
                     'name' => 'display_type',
                     'contents' => $request->get("display_type")
                ],
                [
                    'name' => 'time_publish',
                    'contents' =>$request->get('time_publish')
                ]
            ];
          

            if ($request->has('off_name')) {
                $data[] = [
                    'name' => 'off_name',
                    'contents' => $request->get('off_name')
                ];
            }
            
            if ($request->has('off_description')) {
                $data[] = [
                    'name' => 'off_description',
                    'contents' => $request->get('off_description')
                ];
            }


           if (!empty($thumb)) {
                $data[] = [
                    'name' => 'thumbnail',
                    'contents' => file_get_contents($thumb->getRealPath()),
                    'filename' => $thumb->getClientOriginalName()
                ];
            }


            $res = $this->categoryProcessor->store($data);
            if ($res['code'] == 200 && !empty($thumb)) {
                \File::delete($thumb->getRealPath());
            }
            return response()->json($res['res'], $res['code']);
        } catch (\Exception $exception) {
            $this->writeException($exception);
            return response()->json([
                'message' => 'Oop, có lỗi xảy ra, vui lòng thử lại sau'
            ], 500);
        }
        


    }

    /**
     * @param $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function restore($id)
    {
        try {
            if (!can('category-restore') && !can('topical-restore')) {
                return response()->json([
                    'message' => 'Không thể truy cập chức năng này'
                ], 403);
            }

            $res = $this->categoryProcessor->restore($id);
            return response()->json($res['res'], $res['code']);
        } catch (\Exception $exception) {
            $this->writeException($exception);
            return response()->json([
                'message' => 'Oop, có lỗi xảy ra, vui lòng thử lại sau'
            ], 500);
        }
    }

    /**
     * @param $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function delete($id)
    {
        try {
            if (!can('category-delete') && !can('topical-delete')) {
                return response()->json([
                    'message' => 'Không thể truy cập chức năng này'
                ], 403);
            }

            $res = $this->categoryProcessor->delete($id);
            return response()->json($res['res'], $res['code']);
        } catch (\Exception $exception) {
            $this->writeException($exception);
            return response()->json([
                'message' => 'Oop, có lỗi xảy ra, vui lòng thử lại sau'
            ], 500);
        }
    }

    /**
     * @param $id
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function editTopical($id)
    {
        if (!can('topical-update')) {
            set_page_title('Opps, bạn không có quyền truy cập trang này');
            abort(403);
        }
        $listUrl = [
            'select-article' => route('ttct.articles.select_article_for_edit_topical'),
            'url-edit-article' => route('ttct.articles.edit', 1),
            'get-many-article' => route('ttct.articles.get_many_article_for_edit_topical'),
            'update-topical' => route('ttct.categories.update_topical', $id),
            'get-data' => route('ttct.categories.get_detail', $id),
            'publish-topical' => route('ttct.categories.update_status_for_topical', $id)
        ];
        return view('ttct::topical.topical-edit', compact('listUrl', 'id'));
    }

    /**
     * @param $id
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function updateStatusForTopical($id, Request $request)
    {
        
        try {
            if (!can('topical-take-down') && !can('topical-publish') && !can('topical-restore')) {
                return response()->json([
                    'message' => 'Không thể truy cập chức năng này'
                ], 403);
            }

            if ($request->has('status')) {
                $data = [
                    'status' => $request->get('status')
                ];

                $res = $this->categoryProcessor->updateStatusForTopical($id, $data);
                return response()->json($res['res'], $res['code']);
            }
            return response()->json([
                'message' => 'Oop, có lỗi xảy ra, vui lòng thử lại sau'
            ], 500);
        } catch (\Exception $exception) {
            $this->writeException($exception);
            return response()->json([
                'message' => 'Oop, có lỗi xảy ra, vui lòng thử lại sau'
            ], 500);
        }
    }

    /**
     * @param $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function getDetail($id)
    {
        try {
            $data = $this->categoryDataProvider->getDetail($id);
            return response()->json($data);
        } catch (\Exception $exception) {
            $this->writeException($exception);
            return response()->json([
                'message' => 'Oop, có lỗi xảy ra, vui lòng thử lại sau'
            ], 500);
        }
    }

    /**
     * @param $id
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function updateTopical($id, Request $request)
    {
        try {

            if (!can('topical-update')) {
                return response()->json([
                    'message' => 'Không thể truy cập chức năng này'
                ], 403);
            }

            $thumb = $request->file('thumbnail');

            $data = [
                [
                    'name' => 'name',
                    'contents' => $request->get('name')
                ],
                [
                    'name' => 'slug',
                    'contents' => $request->get('slug')
                ],
                [
                    'name' => 'description',
                    'contents' => $request->get('description')
                ],
                [
                    'name' => 'off_name',
                    'contents' => $request->get('off_name')
                ],
                [
                    'name' => 'off_description',
                    'contents' => $request->get('off_description')
                ],
                [
                    'name' => 'display_type',
                    'contents' => $request->get('display_type')
                ],
                [
                    'name' => 'published_at',
                    'contents' => $request->get('published_at')
                ]
           ];
           

            $articles = $request->get('articles', []);
            foreach ($articles as $item) {
                $data[] = [
                    'name' => 'articles[]',
                    'contents' => $item
                ];
            }

            $deleted_articles = $request->get('deleted_articles',[]);
            foreach($deleted_articles as $item){
              $data[]  = [
                'name' => 'deleted_articles[]',
                'contents' => $item
              ];
            
            }

            if (!empty($thumb)) {
                $data[] = [
                    'name' => 'thumbnail',
                    'contents' => file_get_contents($thumb->getRealPath()),
                    'filename' => $thumb->getClientOriginalName()
                ];
            }

            $res = $this->categoryProcessor->updateTopical($id, $data);
            if ($res['code'] == 200 && !empty($thumb)) {
                \File::delete($thumb->getRealPath());
            }
            return response()->json($res['res'], $res['code']);
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
    public function selectCategory(Request $request)
    {
        try {
            $data = $this->categoryDataProvider->selectCategory($request->all());
            return response()->json($data);
        } catch (\Exception $exception) {
            $this->writeException($exception);
            return response()->json([]);
        }
    }

    /**
     *
     * Demo
     *
     */


    /**
     * @param $type
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function demoTopical($type)
    {
        return view('ttct::topical.demo.demo-topical-' . $type, compact('type'));
    }

    /**
     * @param $type
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function demoTopicalDetail($type)
    {
        return view('ttct::topical.demo.demo-topical-' . $type . '-detail');
    }

    /**
     * @param $type
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function previewEditTopical($type)
    {
        $listUrl = [
            'article-detail' => env('API_BASE_URL') . '/be/articles/get-article-detail-for-edit-topical/',
            'topical-detail' => env('API_BASE_URL') . '/be/categories/get-detail/',
            'preview-detail' => route('ttct.topical.preview_detail', ['type' => $type, 'id' => 1])
        ];
        return view('ttct::topical.preview.topical-' . $type, compact('listUrl'));
    }

    /**
     * @param $type
     * @param $id
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function previewEditTopicalDetail($type, $id)
    {
        $listUrl = [
            'article-detail' => env('API_BASE_URL') . '/be/articles/get-article-detail-for-edit-topical/' . $id,
            'topical-detail' => env('API_BASE_URL') . '/be/categories/get-detail/',
            'preview-detail' => route('ttct.topical.preview_detail', ['type' => $type, 'id' => 1])
        ];
        return view('ttct::topical.preview.topical-' . $type . '-detail', compact('listUrl'));
    }
    
    /** 
      * @param $type
      * @param $topical_id
      * @return json 
     */
    public function changeHighlight(Request $request){
      try {
            $response = $this->client->request('POST',ENV('API_BASE_URL')."/be/categories/change-highlight",
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

    

}
