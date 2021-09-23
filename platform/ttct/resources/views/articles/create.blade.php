@extends('base::layouts.master')

@section('content')
    <style>
        .select2-container--default .select2-selection--multiple .select2-selection__rendered .select2-selection__choice {
            /* color: #a7abc3; */
            font-weight: 400;
            color: rgb(0,0,0);
            background: #f7f8fa;
            border: 1px solid #ebedf2;
        }
        .select2-container--default .select2-results__option.select2-results__option--highlighted {
            background: #c1c1c1;
            font-weight: 400;
            color: rgb(0,0,0);
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
    </style>
    <div class="kt-grid__item kt-grid__item--fluid kt-grid kt-grid--hor">
        <div class="kt-subheader   kt-grid__item" id="kt_subheader">
            <div class="kt-subheader__main">
                <h3 class="kt-subheader__title">Tạo mới bài viết</h3>
                <span class="kt-subheader__separator kt-hidden"></span>
                <div class="kt-subheader__breadcrumbs">
                    <a href="{{ route('ttct.dashboard') }}" class="kt-subheader__breadcrumbs-home"><i class="flaticon2-shelter"></i></a>
                    <span class="kt-subheader__breadcrumbs-separator"></span>
                    <a href="{{ route('ttct.articles.article_publish_show') }}" class="kt-subheader__breadcrumbs-link">Bài viết</a>
                    <span class="kt-subheader__breadcrumbs-separator"></span>
                    <a href="" class="kt-subheader__breadcrumbs-link">Tạo bài viết</a>
                </div>
            </div>
            <div class="kt-subheader__toolbar">
                <div class="kt-subheader__wrapper">
                    <button class="btn btn-primary" id="article-preview" data-post="{{ route('ttct.articles.post_data_preview') }}" data-preview="{{ route('ttct.article.preview') }}"><i class="fa fa-eye"></i> Xem trước</button>
                    <button type="submit" class="btn btn-success btn-md" id="btn-submit" data-reload={{ route('ttct.articles.article_draft_show') }}  data-url="{{ $listUrl['store'] }}"><i class="fa fa-save"></i>Lưu</button>
                </div>
            </div>
        </div>
       
        <div class="kt-content kt-grid__item kt-grid__item--fluid" id="kt_content">
            <form action="">
                <div class="row">
                    <div class="col-xl-8">
                        <div class="row">
                            <div class="kt-portlet kt-portlet--height-fluid kt-portlet--mobile ">
                                <div class="kt-portlet__body kt-portlet__body--fit">
                                    <div class="kt-portlet__body">
                                        <div class="form-group">
                                            <div id="example"></div>
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
                                        <label for="create-title">Tiêu đề</label>
                                        <input type="text" class="form-control" placeholder="Nhập tiểu đề" id="create-title" name="title">
                                    </div>
                                    <div class="form-group">
                                        <label for="create-excerpt">Mô tả bài viết</label>
                                        <textarea rows="5" class="form-control" placeholder="Nhập mô tả bài viết" id="create-excerpt" name="excerpt"></textarea>
                                    </div>
                                    <div class="form-group">
                                        <label for="create-author">Tên tác giả</label>
                                        <input type="text" class="form-control" id="create-author" name="author">
                                    </div>
                                    <div class="form-group">
                                        <label for="create-thumbnail">Chọn hình đại diện</label>
                                        <input type="file" class="form-control" id="create-thumbnail" name="thumbnail" data-height="150" accept="image/png,image/jpg,image/jpeg">
                                        <p class="mt-2 text-info" style="cursor:pointer;font-weight: bold;display:none" id="select-thumbnail" data-toggle="modal" data-target="#modal-select-resource">Chọn từ resource...</p>
                                    </div>
                                    <div class="form-group">
                                        <label for="create-categories">Chọn chuyên mục</label>
                                        <select class="form-control" id="create-categories" name="categories"
                                                @can('reserve-paper-create')
                                                    data-reserve-paper="1"
                                                    data-store="{{ $listUrl['store-reserve-papers'] }}"
                                                    data-reload="{{ $listUrl['reload-reserve-papers'] }}"
                                                @endcan
                                                data-url="{{ $listUrl['select-category'] }}">
                                        </select>
                                    </div>
                                    @if(can('theme-create'))
                                        <div class="form-group">
                                            <label for="create-themes">Chọn chủ đề</label>
                                            <div class="row">
                                                <div class="col-10">
                                                    <select class="form-control" id="create-themes" name="themes" data-url="{{ $listUrl['select-theme'] }}"></select>
                                                </div>
                                                <div class="col-2">
                                                    <div style="cursor: pointer" class="btn btn-success btn-icon" data-target="#modal-create-theme" data-toggle="modal" title="Thêm chủ đề"><i class="la la-plus"></i></div>
                                                </div>
                                            </div>
                                        </div>
                                    @else
                                        <div class="form-group">
                                            <label for="create-themes">Chọn chủ đề</label>
                                            <select class="form-control" id="create-themes" name="themes" data-url="{{ $listUrl['select-theme'] }}"></select>
                                        </div>
                                    @endif
                                    @if(can('tag-create'))
                                        <div class="form-group">
                                            <label for="create-tags">Chọn từ khóa</label>
                                            <div class="row">
                                                <div class="col-10">
                                                    <select class="form-control" id="create-tags" name="tags" data-url="{{ $listUrl['select-tag'] }}"></select>
                                                </div>
                                                <div class="col-2">
                                                    <div style="cursor: pointer" class="btn btn-success btn-icon" data-target="#modal-create-tag" data-toggle="modal" title="Thêm từ khóa"><i class="la la-plus"></i></div>
                                                </div>
                                            </div>
                                        </div>
                                    @else
                                        <div class="form-group">
                                            <label for="create-tags">Chọn từ khóa</label>
                                            <select class="form-control" id="create-tags" name="tags" data-url="{{ $listUrl['select-tag'] }}"></select>
                                        </div>
                                    @endif
                                    <div class="form-group">
                                        <label for="create-published_at">Chọn thời gian xuất bản</label>
                                        <input type="text" class="form-control" id="create-published_at" name="published_at">
                                    </div>
                                    <div class="form-group">
                                        <label for="create-cover">Chọn hình cover cho PC</label>
                                        <input type="file" class="form-control" id="create-cover-pc" name="cover-pc" data-height="150" accept="image/png,image/jpg,image/jpeg">
                                        <p class="mt-2 text-info" style="cursor:pointer;font-weight: bold;display:none" id="select-cover-pc" data-toggle="modal" data-target="#modal-select-resource">Chọn từ resource...</p>
                                    </div>
                                    <div class="form-group">
                                        <label for="create-cover">Chọn hình cover cho Mobile</label>
                                        <input type="file" class="form-control" id="create-cover-mobile" name="cover-mobile" data-height="150" accept="image/png,image/jpg,image/jpeg">
                                        <p class="mt-2 text-info" style="cursor:pointer;font-weight: bold;display:none" id="select-cover-mobile" data-toggle="modal" data-target="#modal-select-resource">Chọn từ resource...</p>
                                    </div>
                                    <div class="form-group">
                                        <label for= "articles">Chọn bài liên quan </label>
                                        <select style="height: 200px" class="list-article form-control " data-reload="{{ $listUrl['related-select-list']  }}" multiple="multiple"></select>          
                                    </div>
                                    <div class="form-group">
                                        <label for= "articles">Hiển thị bài dạng </label>
                                        <select id="display-article" class="browser-default custom-select" style="color: red">
                                            <option  value = '2'>Nhiều  cột</option>
                                            <option  value = '1' >Một cột</option>
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
                                    @can('article-feature-update')
                                    <div class="form-group">
                                        <label for="create-priority">Xét nổi bật</label>
                                        <select type="text" class="form-control" id="create-priority" name="priority">
                                            <option value="-1">Không xét</option>
                                            <option value="1">Nổi bật 1</option>
                                            <option value="2">Nổi bật 2</option>
                                            <option value="3">Nổi bật 3</option>
                                            <option value="4">Nổi bật 4</option>
                                        </select>
                                        <span class="form-text text-black-50">Bài viết sẽ được tự động đẩy lên nội dung nổi bật khi được xuất bản</span>
                                    </div>
                                    @endcan
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
                                        <label for="create-google-description">Mô tả cho Google</label>
                                        <input type="text" class="form-control" placeholder="Nhập mô tả cho Google" id="create-google-description" name="google-description">
                                    </div>
                                    <div class="form-group">
                                        <label for="create-google-key">Từ khóa cho Google</label>
                                        <input type="text" class="form-control" placeholder="Nhập từ khóa cho Google" id="create-google-key" name="google-key">
                                    </div>
                                    <div class="form-group">
                                        <label for="create-fb-description">Mô tả cho Facebook</label>
                                        <input type="text" class="form-control" placeholder="Nhập mô tả cho Facebook" id="create-fb-description" name="fb-description">
                                    </div>
                                    <div class="form-group">
                                        <label for="create-fb-title">Tiêu đề cho Facebook</label>
                                        <input type="text" class="form-control" placeholder="Nhập tiêu đề cho Facebook" id="create-fb-title" name="fb-title">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
    <div class="modal fade" id="modal-select-block" role="dialog" aria-labelledby="edit-menu" data-backdrop="static" style="display: none;" aria-hidden="true">
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
                            <div id="preview-block" style="font-family: 'Noto Serif', serif;font-size: 18px;color: #333;line-height: 28px;"></div>
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
                                        <a class="nav-link" data-toggle="tab" href="#modal-upload-tab-select-resource" role="tab" aria-selected="false">
                                            <i class="fa fa-bar-chart" aria-hidden="true"></i>Chọn từ resource
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
                                            <button class="btn btn-success"
                                                    type="submit"
                                                    id="modal-upload-resource-btn-upload"
                                                    style="display:none"
                                                    data-url-upload-multi="{{ $listUrl['url-upload-multi'] }}"
                                                    data-url-get-resource-detail="{{ $listUrl['url-get-resource-detail'] }}"
                                                    data-creator-id="{{ auth()->user()->id }}"
                                                    data-creator-full-name="{{ auth_full_name() }}"
                                                    data-creator-username="{{ auth()->user()->username }}">Upload</button>
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
                                                                <label FOR="modal-upload-datatable-input-upload-by">Tải lên bởi</label>
                                                            </div>
                                                            <div class="kt-form__control">
                                                                <select class="form-control bootstrap-select" id="modal-upload-datatable-input-upload-by">
                                                                    <option value="{{ auth()->user()->id }}" selected>Tôi</option>
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
                    <button class="btn btn-primary"><i class="fa fa-save" id="modal-upload-complete-btn"> Hoàn thành</i></button>
                </div>
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
@stop
@push('plugin-css')
    <link href="{{ asset('assets/vendors/general/dropify/dist/css/dropify.css') }}" rel="stylesheet" type="text/css" />
    <link href="{{ asset('assets/vendors/general/froala/css/froala_editor.pkgd.min.css') }}" rel="stylesheet" type="text/css" />
    <link href="{{ asset('assets/vendors/general/froala/css/plugin/colors.min.css') }}" rel="stylesheet" type="text/css" />
    <link href="{{ asset('assets/vendors/general/froala/css/froala_style.min.css') }}" rel="stylesheet" type="text/css" />
    <link href="{{ asset('assets/article-preview/css/style-admin.css') }}" rel="stylesheet" type="text/css" />
@endpush
@push('plugin-js')
    <script type="text/javascript" src="{{ asset('assets/vendors/general/dropify/dist/js/dropify.js') }}"></script>
    <script type="text/javascript" src="{{ asset('assets/vendors/general/froala/js/froala_editor.pkgd.min.js') }}"></script>
    <script type="text/javascript" src="{{ asset('assets/vendors/general/froala/js/plugin/colors.min.js') }}"></script>
    <script type="text/javascript" src="{{ asset('assets/vendors/general/froala/js/lang/vi.js') }}"></script>
@endpush
@push('page-js')
    <script src="{{ asset('assets/js/pages/article-create.js') }}" type="text/javascript"></script>
@endpush
