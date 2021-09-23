@extends('base::layouts.master')

@section('content')
<style>
    .select2-container--default .select2-selection--multiple .select2-selection__rendered .select2-selection__choice {
        /* color: #a7abc3; */
        font-weight: 400;
        color: rgb(0, 0, 0);
        background: #f7f8fa;
        border: 1px solid #ebedf2;
    }

    .select2-container--default .select2-results__option.select2-results__option--highlighted {
        background: #c1c1c1;
        font-weight: 400;
        color: rgb(0, 0, 0);
    }

    .select2-container--default .select2-results__option {
        background: #f7f8fa;
        font-weight: 400;
        color: rgb(125, 125, 125);
    }

    .select2-container--default .select2-results__option[aria-selected=true] {
        background: #7d7d7d;
        font-weight: 400;
        color: rgb(255, 255, 255);
    }

    .thumb-base {
        width: 100%;
        height: 100%;
    }

    .actions label {
        font-size: 15px;
    }

    .actions i {
        text-align: center;
        cursor: pointer;
        width: 40%;
        font-size: 17px;
        font-weight: 900;
        margin: 5px;
        position: relative;
    }

    .actions i:hover {
        color: red;
    }

    .add-resource i {
        cursor: pointer;
    }

    input[type=radio] {
        zoom: 2;
    }

    .kt-checkbox.kt-checkbox--solid>span {
        zoom: 1.2;
        background: #2F4F4F !important;
    }
    .modal-content {
        width: 100%;
    }

    #select-img-full-size {
        text-align: center;
        width: 100%;
    }

    #select-img-full-size tbody tr td {
        width: 400px;
        height: 200px;
        line-height: 200px;
    }

    #select-img-full-size tbody img {
        height: 180px;
    }

    figure {
        border : 1px solid silver ;
    }
    .caption-has-border{
        border-top :   1px solid silver;
        
    }
    
</style>
<div class="kt-grid__item kt-grid__item--fluid kt-grid kt-grid--hor">
    <div class="kt-subheader   kt-grid__item" id="kt_subheader">
        <div class="kt-subheader__main">
            <h3 class="kt-subheader__title">Sửa mới bài viết</h3>
            <span class="kt-subheader__separator kt-hidden"></span>
            <div class="kt-subheader__breadcrumbs">
                <a href="{{ route('ttct.dashboard') }}" class="kt-subheader__breadcrumbs-home"><i class="flaticon2-shelter"></i></a>
                <span class="kt-subheader__breadcrumbs-separator"></span>
                <a href="{{ route('ttct.articles.article_publish_show') }}" class="kt-subheader__breadcrumbs-link">Bài
                    viết</a>
                <span class="kt-subheader__breadcrumbs-separator"></span>
                <a href="" class="kt-subheader__breadcrumbs-link">Sửa bài viết</a>
            </div>
        </div>
        <div class="kt-subheader__toolbar">
            <div class="kt-subheader__wrapper">
                <button class="btn btn-danger" id="article-img-full-size" data-target=".bd-modal-show-fullsize-img" data-toggle="modal"><span>Chọn hình kích thước lớn</span></button>
                <button class="btn btn-primary" id="article-preview" data-post="{{ route('ttct.articles.post_data_preview') }}" data-preview="{{ route('ttct.article.preview') }}"><i class="fa fa-eye"></i> Xem trước</button>
                <button type="submit" class="btn btn-success btn-md" id="btn-submit" data-update="{{ $listUrl['update'] }}"><i class="fa fa-save"></i>Lưu</button>
                <button class="btn btn-info" id="article-transfer-btn" data-id="{{ $id }}" data-redirect="{{ route('ttct.articles.article_draft_show') }}" data-toggle="modal" data-target="#modal-transfer-article"><i class="la la-repeat"></i>Chuyển bài viết</button>
                @can('article-publish')
                <button type="submit" class="btn btn-success btn-md" id="btn-save-and-publish-now" data-redirect="{{ route('ttct.articles.article_publish_show') }}" data-check-time="{{ $listUrl['check-time'] }}" data-update-article-transfer-status="{{ $listUrl['update-article-transfer-status'] }}" data-url="{{ $listUrl['update-and-publish'] }}"><i class="fa fa-upload"></i>Xuất bản</button>
                <button type="submit" class="btn btn-info btn-md" data-toggle="modal" data-target="#modal-send-back" id="btn-send-back-article" data-get-transfer="{{ $listUrl['get-transfer'] }}" data-redirect="{{ $listUrl['previous-url'] }}" data-url="{{ $listUrl['update-and-publish'] }}"><i class="fa fa-reply"></i>Trả bài viết</button>
                @endcan
            </div>
        </div>
    </div>
    <div class="kt-content kt-grid__item kt-grid__item--fluid" id="kt_content" data-edit="{{ $listUrl['get-data-edit'] }} " resource_base_url={{env('RESOURCE_BASE_URL')}} update-description-resource-url={{route('ttct.resources.update_description_resource')}}>
        <form action="">
            <div class="row">
                <div class="col-xl-8">
                    <div class="row">
                        <div class="kt-portlet kt-portlet--height-fluid kt-portlet--mobile ">
                            <div class="kt-portlet__body kt-portlet__body--fit">
                                <div class="kt-portlet__body">
                                    <div class="form-group">
                                        <div id="update-content" update-article-resource="{{route('ttct.resources.update_article_resource')}}" delete-article-resource="{{route('ttct.resources.delete_article_resource')}}" urce_base_url={{env('RESOURCE_BASE_URL')}} update-description-resource-url={{route('ttct.resources.update_description_resource')}}></div>
                                        <div style="display:none" id="store-select-block"></div>
                                        <div style="margin-top:20px" class="resource">
                                            <p>
                                                <!-- <button class="btn btn-primary" type="button" data-toggle="collapse" data-target=".multi-collapse" aria-expanded="false" aria-controls="multiCollapseExample1 multiCollapseExample2">
                                                    Tài nguyên bài viết</button> -->
                                                <button class="btn btn-primary" type="button" data-toggle="collapse" data-target=".multi-collapse" aria-expanded="true" aria-controls="multiCollapseExample1 multiCollapseExample2">
                                                    Tài nguyên bài viết</button>
                                            </p>
                                            <div id="table-resource"> </div>
                                            <div class="row">
                                                <div class="col">
                                                    <div class="">
                                                        <div class=" btn btn-danger add-resource" style="margin:auto">
                                                            <i id="modal-add-resource-btn" class="fas fa-image"> &nbsp Thêm tài nguyên </i>
                                                        </div>
                                                        <!-- <span class="badge badge-pill badge-info">10 File</span> -->
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-xl-4">
                    <div class="kt-portlet kt-portlet--height-fluid kt-portlet--mobile ">
                        <div class="kt-portlet__head kt-portlet__head--lg kt-portlet__head--noborder kt-portlet__head--break-sm">
                            <div class="kt-portlet__head-label">
                                <h3 class="kt-portlet__head-title text-uppercase">
                                    Thông tin liên quan
                                </h3>
                            </div>
                        </div>
                        <div class="kt-portlet__body kt-portlet__body--fit" style="height: 700px;overflow-y: scroll">
                            <div class="kt-portlet__body">
                                <div class="form-group">
                                    <label for="update-title">Tiêu đề phụ</label>
                                    <div class="row">
                                        <div class="col-md-10">
                                            <input type="text" class="form-control " placeholder="Nhập tiểu đề phụ" id="update_sub_title" name="sub-title"></input>
                                        </div>
                                        <div class="col-md-6">
                                            <input class="simple_color" style="display:none">
                                        </div>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <div class="row">
                                        <div class="col-10">
                                            <label for="update-title">Tiêu đề</label>
                                            <input type="text" class="form-control" placeholder="Nhập tiểu đề" id="update-title" name="title">
                                        </div>
                                        <div class="col-2">
                                            <div style="cursor:pointer;margin-top:22px" class="btn btn-success btn-icon" id="bold-work-title" letter="toLowercase">a</div>
                                        </div>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="update-excerpt">Mô tả bài viết</label>
                                    <textarea rows="7" class="form-control" placeholder="Nhập mô tả bài viết" id="update-excerpt" name="excerpt"></textarea>
                                </div>
                                <div class="form-group">
                                    <div class="row">
                                        <div class="col-10">
                                            <label for="update-author">Tên tác giả</label>
                                            <input type="text" class="form-control " id="update-author" name="author">
                                        </div>
                                        <div class="col-2">
                                            <div style="cursor:pointer;margin-top:25px" class="btn btn-success btn-icon" id="bold-work-author-name" letter="toLowercase">a</div>
                                        </div>
                                    </div>

                                </div>
                                <div class="form-group">
                                    <label for="update-thumbnail">Chọn hình đại diện</label>
                                    <input type="file" class="form-control" id="update-thumbnail" name="thumbnail" data-height="150" accept="image/png,image/jpg,image/jpeg">
                                    <p class="mt-2 text-info" style="cursor:pointer;font-weight: bold;display: none" id="select-thumbnail" data-toggle="modal" data-target="#modal-select-resource">
                                        Chọn từ resource...</p>
                                </div>
                                <div class="form-group">
                                    <label for="update-categories">Chọn chuyên mục</label>
                                    <select class="form-control" id="update-categories" name="categories" data-url="{{ $listUrl['select-category'] }}"></select>
                                </div>
                                @if(can('theme-create'))
                                <div class="form-group">
                                    <label for="update-themes">Chọn chủ đề</label>
                                    <div class="row">
                                        <div class="col-10">
                                            <select class="form-control" id="update-themes" name="themes" data-url="{{ $listUrl['select-theme'] }}" multiple="multiple"></select>
                                        </div>
                                        <div class="col-2">
                                            <div style="cursor: pointer" class="btn btn-success btn-icon" data-target="#modal-create-theme" data-toggle="modal" title="Thêm chủ đề"><i class="la la-plus"></i></div>
                                        </div>
                                    </div>
                                </div>
                                @else
                                <div class="form-group">
                                    <label for="update-themes">Chọn chủ đề</label>
                                    <select class="form-control" id="update-themes" name="themes" data-url="{{ $listUrl['select-theme'] }}" multiple="multiple"></select>
                                </div>
                                @endif
                                <div class="form-group topical" style="display: none">
                                    <label for="update-topical">Hiện đang thuộc chuyên đề</label>
                                    <select class="form-control" id="update-topical" name="topical"></select>
                                </div>
                                @if(can('tag-create'))
                                <div class="form-group">
                                    <label for="update-tags">Chọn từ khóa</label>
                                    <div class="row">
                                        <div class="col-10">
                                            <select class="form-control" id="update-tags" name="tags" data-url="{{ $listUrl['select-tag'] }}"></select>
                                        </div>
                                        <div class="col-2">
                                            <div style="cursor: pointer" class="btn btn-success btn-icon" data-target="#modal-create-tag" data-toggle="modal" title="Thêm từ khóa"><i class="la la-plus"></i></div>
                                        </div>
                                    </div>
                                </div>
                                @else
                                <div class="form-group">
                                    <label for="update-tags">Chọn từ khóa</label>
                                    <select class="form-control" id="update-tags" name="tags" data-url="{{ $listUrl['select-tag'] }}"></select>
                                </div>
                                @endif
                                <div class="form-group">
                                    <label for="update-published_at">Chọn thời gian xuất bản</label>
                                    <input type="text" class="form-control" id="update-published_at" name="published_at">
                                </div>
                                <div class="form-group">
                                    <label for="update-thumbnail">Chọn hình cover cho PC</label>
                                    <input type="file" class="form-control" id="update-cover-pc" name="cover-pc" data-height="150" accept="image/png,image/jpg,image/jpeg">
                                    <p class="mt-2 text-info" style="cursor:pointer;font-weight: bold;display: none" id="select-cover-pc" data-toggle="modal" data-target="#modal-select-resource">
                                        Chọn từ resource...</p>
                                </div>
                                <div class="form-group">
                                    <label for="update-thumbnail">Chọn hình cover cho Mobile</label>
                                    <input type="file" class="form-control" id="update-cover-mobile" name="cover-mobile" data-height="150" accept="image/png,image/jpg,image/jpeg">
                                    <p class="mt-2 text-info" style="cursor:pointer;font-weight: bold;display: none" id="select-cover-mobile" data-toggle="modal" data-target="#modal-select-resource">Chọn từ resource...</p>
                                </div>
                                <div class="form-group">
                                    <label for="articles">Chọn tin bài liên quan </label>
                                    <select style="height: 200px" class="list-article form-control " data-reload="{{ $listUrl['related-select-list'] }}" multiple="multiple">
                                    </select>
                                    <!-- </div> <div class="form-group">
                                    <label for="articles">Chọn mục chuyên đề </label>
                                    <select style="height: 200px" id="list-article-categories" class="form-control " data-reload="{{$listUrl['select-article-category']}}" multiple="multiple">
                                    </select>
                                </div> -->
                                    <div class="form-group">
                                        <label for="articles">Hiển thị bài dạng </label>
                                        <select id="display-article" class="browser-default custom-select" style="color: red">
                                            <option value='2'>Nhiều cột</option>
                                            <option value='1'>Một cột</option>
                                        </select>
                                    </div>
                                    <div class="form-group">
                                        <label for="articles">Chọn nổi bật</label>
                                        <select id="set-highlights" class="browser-default custom-select">
                                            <option selected value='0'>Không chọn nổi bật</option>
                                            <option value='1'>Nổi bật 1</option>
                                            <option value='2'>Nổi bật 2</option>
                                            <option value='3'>Nổi bật 3</option>
                                            <option value='4'>Nổi bật 4</option>

                                        </select>
                                    </div>
                                    <div class="form-group row">
                                        <div class="col-1 mr-3">
                                            <span class="kt-switch kt-switch--sm kt-switch--icon">
                                                <label>
                                                    <input type="checkbox" id="off_title">
                                                    <span></span>
                                                </label>
                                            </span>
                                        </div>
                                        <label class="col-6 col-form-label">Tắt tiêu đề bài viết</label>
                                    </div>
                                    <div class="form-group row">
                                        <div class="col-1 mr-3">
                                            <span class="kt-switch kt-switch--sm kt-switch--icon">
                                                <label>
                                                    <input type="checkbox" id="off_description">
                                                    <span></span>
                                                </label>
                                            </span>
                                        </div>
                                        <label class="col-6 col-form-label">Tắt mô tả bài viết</label>
                                    </div>
                                    <div class="form-group row">
                                        <div class="col-1 mr-3">
                                            <span class="kt-switch kt-switch--sm kt-switch--icon">
                                                <label>
                                                    <input type="checkbox" id="off_thumb_pc">
                                                    <span></span>
                                                </label>
                                            </span>
                                        </div>
                                        <label class="col-6 col-form-label">Tắt thumbnail pc</label>
                                    </div>
                                    <div class="form-group row">
                                        <div class="col-1 mr-3">
                                            <span class="kt-switch kt-switch--sm kt-switch--icon">
                                                <label>
                                                    <input type="checkbox" id="off_thumb_mobile">
                                                    <span></span>
                                                </label>
                                            </span>
                                        </div>
                                        <label class="col-6 col-form-label">Tắt thumbnail mobile</label>
                                    </div>
                                </div>
                                <div class="kt-portlet__head kt-portlet__head--lg kt-portlet__head--noborder kt-portlet__head--break-sm">
                                    <div class="kt-portlet__head-label">
                                        <h3 class="kt-portlet__head-title text-uppercase">
                                            Tối ưu hóa cho Search engine
                                        </h3>
                                    </div>
                                </div>
                                <div class="kt-portlet__body">
                                    <div class="form-group">
                                        <label for="update-google-description">Mô tả cho Google</label>
                                        <input type="text" class="form-control" placeholder="Nhập mô tả cho Google" id="update-google-description" name="google-description">
                                    </div>
                                    <div class="form-group">
                                        <label for="update-google-key">Từ khóa cho Google</label>
                                        <input type="text" class="form-control" placeholder="Nhập từ khóa cho Google" id="update-google-key" name="google-key">
                                    </div>
                                    <div class="form-group">
                                        <label for="update-fb-description">Mô tả cho Facebook</label>
                                        <input type="text" class="form-control" placeholder="Nhập mô tả cho Facebook" id="update-fb-description" name="fb-description">
                                    </div>
                                    <div class="form-group">
                                        <label for="update-fb-title">Tiêu đề cho Facebook</label>
                                        <input type="text" class="form-control" placeholder="Nhập tiêu đề cho Facebook" id="update-fb-title" name="fb-title">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        </form>
    </div>
</div>
<div class="modal fade" id="modal-select-block" role="dialog" aria-labelledby="modal-select-block" data-backdrop="static" style="display: none;" aria-hidden="true">
    <div class="modal-dialog modal-xl" role="document" style="max-width: 70%;height:90%">
        <div class="modal-content" style="min-height: 90%">
            <div class="modal-header">
                <h5 class="modal-title">Thêm block cho bài viết</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                </button>
            </div>
            <div class="modal-body">
                <div class="row ml-5 mr-5">
                    <div class="col-6">
                        <div class="kt-checkbox-list" id="checkbox">
                        </div>
                    </div>
                    <div class="col-6">
                        <div id="preview-block" style="font-family: 'Noto Serif', serif;font-size: 18px;color: #333;line-height: 28px;">
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Đóng</button>
                <button type="button" id="select-block" data-dismiss="modal" class="btn btn-primary"><i class="fa fa-check"></i> Chọn</button>
            </div>
        </div>
    </div>
</div>
<div class="modal fade" id="modal-select-resource" role="dialog" aria-labelledby="modal-select-resource" data-backdrop="static" style="display: none;" aria-hidden="true">
    <div class="modal-dialog modal-xl" role="document" style="max-width: 100%;height:100%">
        <div class="modal-content" style="min-height: 95%">
            <div class="modal-header">
                <h5 class="modal-title">Resource select</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                </button>
            </div>
            <div class="modal-body">
                <div class="kt-portlet kt-portlet--tabs">
                    <div class="kt-portlet__head">
                        <div class="kt-portlet__head-toolbar">
                            <ul class="nav nav-tabs nav-tabs-line nav-tabs-line-danger nav-tabs-line-2x nav-tabs-line-right" role="tablist">
                                <li class="nav-item">
                                    <a class="nav-link active" data-toggle="tab" href="#modal-upload-tab-upload" role="tab" aria-selected="true">
                                        <i class="fa fa-calendar-check-o" aria-hidden="true"></i>Upload resource
                                    </a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link " data-toggle="tab" href="#modal-upload-tab-select-resource" role="tab" aria-selected="false">
                                        <i class="fa fa-bar-chart" aria-hidden="true"></i>Chọn từ resource
                                    </a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" data-toggle="tab" href="#modal-upload-tab-select-resource-repo" role="tab" aria-selected="false">
                                        <i class="fa fa-bar-chart" aria-hidden="true"></i>Hình chèn cho block từ kho bài
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="kt-portlet__body">
                        <div class="tab-content">
                            <div class="tab-pane active" id="modal-upload-tab-upload" role="tabpanel">
                                <button class="btn btn-info" id="modal-upload-resource-btn-select">Chọn file</button>
                                <input type="file" id="modal-upload-resource-input" style="display:none" multiple>
                                <div id="modal-upload-resource-preview-container" class="row mt-3"></div>
                                <div class="row">
                                    <div class="col-12 text-right">
                                        <button class="btn btn-success" type="submit" id="modal-upload-resource-btn-upload" style="display:none" data-url-upload-multi="{{ $listUrl['url-upload-multi'] }}" data-url-get-resource-detail="{{ $listUrl['url-get-resource-detail'] }}" data-creator-id="{{ auth()->user()->id }}" data-creator-full-name="{{ auth_full_name() }}" data-creator-username="{{ auth()->user()->username }}">Upload</button>
                                    </div>
                                </div>
                            </div>
                            <div class="tab-pane" id="modal-upload-tab-select-resource" role="tabpanel">
                                <div class="kt-form kt-form--label-right kt-margin-t-20 kt-margin-b-10">
                                    <div class="row align-items-center">
                                        <div class="col-xl-12 order-2 order-xl-1">
                                            <div class="row align-items-center">
                                                <div class="col-md-3 kt-margin-b-20-tablet-and-mobile">
                                                    <div class="kt-input-icon kt-input-icon--left">
                                                        <input type="text" class="form-control" placeholder="Nhập tên file..." id="modal-upload-datatable-input-file-name">
                                                        <span class="kt-input-icon__icon kt-input-icon__icon--left"><span><i class="la la-search"></i></span></span>
                                                    </div>
                                                </div>
                                                <div class="col-md-2 kt-margin-b-20-tablet-and-mobile">
                                                    <div class="kt-form__group kt-form__group--inline">
                                                        <div class="kt-form__label">
                                                            <label for="modal-upload-datatable-input-from">Từ</label>
                                                        </div>
                                                        <div class="kt-form__control">
                                                            <input class="form-control" id="modal-upload-datatable-input-from">
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-md-2 kt-margin-b-20-tablet-and-mobile">
                                                    <div class="kt-form__group kt-form__group--inline">
                                                        <div class="kt-form__label">
                                                            <label for="modal-upload-datatable-input-to">Đến</label>
                                                        </div>
                                                        <div class="kt-form__control">
                                                            <input class="form-control" id="modal-upload-datatable-input-to">
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-md-2 kt-margin-b-20-tablet-and-mobile">
                                                    <div class="kt-form__group kt-form__group--inline">
                                                        <div class="kt-form__label">
                                                            <label FOR="modal-upload-datatable-input-file-type">Loại</label>
                                                        </div>
                                                        <div class="kt-form__control">
                                                            <select class="form-control bootstrap-select" id="modal-upload-datatable-input-file-type">
                                                                <option selected value="1">Ảnh</option>
                                                                <option value="2">Video</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-md-2 kt-margin-b-20-tablet-and-mobile">
                                                    <div class="kt-form__group kt-form__group--inline">
                                                        <div class="kt-form__label">
                                                            <label FOR="modal-upload-datatable-input-upload-by">Tải lên
                                                                bởi</label>
                                                        </div>
                                                        <div class="kt-form__control">
                                                            <select class="form-control bootstrap-select" id="modal-upload-datatable-input-upload-by">
                                                                <option selected value="{{ auth()->user()->id }}">Tôi
                                                                </option>
                                                                <option value="all">Tất cả</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-md-1 kt-margin-b-20-tablet-and-mobile">
                                                    <div class="kt-form__group kt-form__group--inline">
                                                        <button class="btn btn-primary" id="modal-upload-datatable-input-btn-search">Lọc</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="kt-portlet__body kt-portlet__body--fit">
                                    <div class="row">
                                        <div class="col-md-8">
                                            <div class="kt-datatable" id="modal-upload-table-select-resource" data-url="{{ $listUrl['datatable-resource'] }}"></div>
                                            <div id="modal-select-img" style="display: none">
                                                <table class="table">
                                                    <thead>
                                                        <tr>
                                                            <th scope="col">Select</th>
                                                            <th scope="col">Nội dung</th>
                                                            <th scope="col">Tên</th>
                                                            <th scope="col">Link</th>
                                                            <th scope="col">Ngày tạo</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody id="select-img-form-resource"></tbody>
                                                </table>
                                            </div>
                                        </div>

                                        <div class="col-md-4">
                                            <div id="modal-upload-file-preview" style="background-color:#dfe3e8;display:none"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Đóng</button>
                <button class="btn btn-primary"><i class="fa fa-save" id="modal-upload-complete-btn"> Hoàn
                        thành</i></button>
            </div>
        </div>
    </div>
</div>
<div class="modal fade" id="modal-transfer-article" role="dialog" aria-labelledby="modal-transfer-article" data-backdrop="static" style="display: none;" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Chuyển bài viết</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                </button>
            </div>
            <form id="form-transfer-category" action="{{ $listUrl['store-transfer'] }}">
                <div class="modal-body font-weight-bold">
                    @csrf
                    <div class="form-group">
                        <label>Chọn loại chuyển</label>
                        <div class="kt-radio-inline">
                            <label class="kt-radio">
                                <input type="radio" name="transfer-type" checked value="role"> Theo vai trò
                                <span></span>
                            </label>
                            <label class="kt-radio">
                                <input type="radio" name="transfer-type" value="user"> Theo người dùng
                                <span></span>
                            </label>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="role-select" class="form-control-label">Chọn vai trò</label>
                        <select class="form-control" id="role-select" style="width:100%" data-url="{{ route('rbac.roles.select') }}"></select>
                    </div>
                    <div class="form-group" style="display: none">
                        <label for="user-select" class="form-control-label">Chọn người dùng</label>
                        <select class="form-control" id="user-select" style="width:100%" data-url="{{ route('users.select2') }}"></select>
                    </div>
                    <div class="form-group">
                        <label for="note" class="form-control-label">Ghi chú cho người nhận</label>
                        <textarea rows="6" class="form-control" id="note"></textarea>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Đóng</button>
                    <button type="submit" class="btn btn-primary"><i class="fa fa-check"></i> Gửi</button>
                </div>
            </form>
        </div>
    </div>
</div>
<div class="modal fade" id="modal-send-back" role="dialog" aria-labelledby="modal-send-back" data-backdrop="static" style="display: none;" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Trả bài viết</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                </button>
            </div>
            <form id="form-send-back" action="{{ $listUrl['store-transfer'] }}">
                <div class="modal-body font-weight-bold">
                    @csrf
                    <div class="form-group">
                        <label for="send-back-user-select" class="form-control-label">Chọn người dùng</label>
                        <select class="form-control" id="send-back-user-select" style="width:100%"></select>
                    </div>
                    <div class="form-group">
                        <label for="send-back-note" class="form-control-label">Ghi chú cho người nhận</label>
                        <textarea rows="6" class="form-control" id="send-back-note"></textarea>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Đóng</button>
                    <button type="submit" class="btn btn-primary"><i class="fa fa-check"></i> Gửi</button>
                </div>
            </form>
        </div>
    </div>
</div>
@can('tag-create')
<div class="modal fade" id="modal-create-tag" role="dialog" aria-labelledby="edit-menu" data-backdrop="static" style="display: none;" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Tạo mới từ khóa</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                </button>
            </div>
            <form id="form-create-tag" action="{{ $listUrl['store-tag'] }}">
                <div class="modal-body">
                    @csrf
                    <div class="form-group">
                        <label for="create-name" class="form-control-label">Tên</label>
                        <input type="text" class="form-control" id="create-name" name="name">
                    </div>
                    <div class="form-group">
                        <label for="create-description" class="form-control-label">Mô tả</label>
                        <textarea class="form-control" id="create-description" name="description"></textarea>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Đóng</button>
                    <button type="submit" class="btn btn-primary"><i class="fa fa-save"></i>Lưu</button>
                </div>
            </form>
        </div>
    </div>
</div>
@endcan
@can('theme-create')
<div class="modal fade" id="modal-create-theme" role="dialog" aria-labelledby="modal-create-theme" data-backdrop="static" style="display: none;" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Tạo mới chủ đề</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                </button>
            </div>
            <form id="form-create-theme" action="{{ $listUrl['store-theme'] }}">
                <div class="modal-body">
                    <div class="form-group">
                        <label for="create-theme-name" class="form-control-label">Tên</label>
                        <input type="text" class="form-control" id="create-theme-name" name="name">
                    </div>
                    <div class="form-group">
                        <label for="create-theme-description" class="form-control-label">Mô tả</label>
                        <textarea class="form-control" rows="5" id="create-theme-description" name="description"></textarea>
                    </div>
                    <div class="form-group">
                        <label for="create-theme-thumbnail" class="form-control-label">Ảnh đại diện</label>
                        <input class="form-control" type="file" accept="image/png,image/jpg,image/jpeg" id="create-theme-thumbnail" name="thumbnail">
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Đóng</button>
                    <button type="submit" class="btn btn-primary"><i class="fa fa-save"></i>Lưu</button>
                </div>
            </form>
        </div>
    </div>
</div>
@endcan
<div class="modal fade  bd-modal-show-fullsize-img " id="image-full"role="dialog"  tabindex="-1" aria-hidden="true" >
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content ">
            <div class="modal-header">
                <h5 class="modal-title">Đặt ảnh kích thước lớn</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            </div>
            <table class="table" id="select-img-full-size">
                <thead>
                    <tr>
                        <th>Image</th>
                        <th>Ảnh lớn</th>
                        <th>Ảnh thông thường</th>
                    </tr>
                </thead>
                <tbody>
                </tbody>
            </table>
            <div>
            <button type="button" class="btn btn-primary close-image-full" data-dismiss="modal" >Lưu</button>
            </div>
        </div>
    </div>
</div>


@stop
@push('plugin-css')
<link href="{{ asset('assets/vendors/general/dropify/dist/css/dropify.css') }}" rel="stylesheet" type="text/css" />
<link href="{{ asset('assets/vendors/general/froala/css/froala_editor.pkgd.min.css') }}" rel="stylesheet" type="text/css" />
<link href="{{ asset('assets/vendors/general/froala/css/plugin/colors.min.css') }}" rel="stylesheet" type="text/css" />
<link href="{{ asset('assets/vendors/general/froala/css/froala_style.min.css') }}" rel="stylesheet" type="text/css" />
<link href="{{ asset('assets/article-preview/css/style-admin.css') }}" rel="stylesheet" type="text/css" />
<link href="{{ asset('assets/vendors/general/nestable/nestable.css') }}" rel="stylesheet" type="text/css" />
@endpush
@push('plugin-js')
<script type="text/javascript" src="{{ asset('assets/vendors/general/color-picker/jquery.simple-color.js') }}"></script>
<script type="text/javascript" src="{{ asset('assets/vendors/general/color-picker/jquery.simple-color.min.js') }}"></script>
<script type="text/javascript" src="{{ asset('assets/vendors/general/dropify/dist/js/dropify.js') }}"></script>
<script type="text/javascript" src="{{ asset('assets/vendors/general/froala/js/froala_editor.pkgd.min.js') }}"></script>
<script type="text/javascript" src="{{ asset('assets/vendors/general/froala/js/plugin/colors.min.js') }}"></script>
<script type="text/javascript" src="{{ asset('assets/vendors/general/froala/js/lang/vi.js') }}"></script>
@endpush
@push('page-js')
<script src="{{ asset('assets/js/pages/article-edit.js') }}" type="text/javascript"></script>
@endpush