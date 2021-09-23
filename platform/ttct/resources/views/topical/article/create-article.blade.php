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
                <span class="kt-subheader__separator kt-hidden"></span>
                <div class="kt-subheader__breadcrumbs">
                    <a href="#" class="kt-subheader__breadcrumbs-home">

                        <i class="flaticon2-shelter"></i>
                    </a>
                    <span class="kt-subheader__breadcrumbs-separator"></span>
                    <a href="{{ route('ttct.articles.index') }}" class="kt-subheader__breadcrumbs-link">Bài viết</a>
                    <span class="kt-subheader__breadcrumbs-separator"></span>
                    <a href="" class="kt-subheader__breadcrumbs-link">Tạo bài viết</a>
                </div>
            </div>
        </div>
        <div class="kt-content kt-grid__item kt-grid__item--fluid" id="kt_content">
            <form action="">
                <div class="row">
                    <div class="col-xl-8">
                        <div class="row">
                            <div class="kt-portlet kt-portlet--height-fluid kt-portlet--mobile ">
                                <div class="kt-portlet__head kt-portlet__head--lg kt-portlet__head--noborder kt-portlet__head--break-sm">
                                    <div class="kt-portlet__head-label">
                                        <h3 class="kt-portlet__head-title text-uppercase">
                                            Tạo mới bài viết
                                        </h3>
                                    </div>
                                    <div class="kt-portlet__head-label">
                                        <div class="text-right">
                                            <button class="btn btn-primary" id="article-preview" data-post="{{ route('ttct.articles.post_data_preview') }}" data-preview="{{ route('ttct.article.preview') }}"><i class="fa fa-eye"></i> Xem trước</button>
                                        </div>
                                    </div>
                                </div>
                                <div class="kt-portlet__body kt-portlet__body--fit">
                                    <div class="kt-portlet__body">
                                        <div class="form-group">
                                            <label for="create-title">Tiêu đề</label>
                                            <input type="text" class="form-control" placeholder="Nhập tiểu đề" id="create-title" name="title">
                                        </div>
                                        <div class="form-group">
                                            <label for="create-excerpt">Đoạn trích dẫn</label>
                                            <textarea rows="7" class="form-control" placeholder="Nhập đoạn trích dẫn" id="create-excerpt" name="excerpt"></textarea>
                                        </div>
                                        <div class="form-group">
                                            <label>Nội dung</label>
                                            <div id="example"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="kt-portlet kt-portlet--height-fluid kt-portlet--mobile ">
                                <div class="kt-portlet__head kt-portlet__head--lg kt-portlet__head--noborder kt-portlet__head--break-sm">
                                    <div class="kt-portlet__head-label">
                                        <h3 class="kt-portlet__head-title text-uppercase">
                                            Tối ưu hóa cho Search engine
                                        </h3>
                                    </div>
                                </div>
                                <div class="kt-portlet__body kt-portlet__body--fit">
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
                    <div class="col-xl-4">
                        <div class="kt-portlet kt-portlet--height-fluid kt-portlet--mobile ">
                            <div class="kt-portlet__head kt-portlet__head--lg kt-portlet__head--noborder kt-portlet__head--break-sm">
                                <div class="kt-portlet__head-label">
                                    <h3 class="kt-portlet__head-title text-uppercase">
                                        Thông tin liên quan
                                    </h3>
                                </div>
                            </div>
                            <div class="kt-portlet__body kt-portlet__body--fit">
                                <div class="kt-portlet__body">
                                    <div class="form-group">
                                        <label for="create-thumbnail">Chọn hình đại diện</label>
                                        <input type="file" class="form-control" id="create-thumbnail" name="thumbnail" data-height="350" accept="image/png,image/jpg,image/jpeg">
                                        <p class="mt-2 text-info" style="cursor:pointer;font-weight: bold" id="select-thumbnail" data-toggle="modal" data-target="#modal-select-resource">Chọn từ resource...</p>
                                    </div>
                                    <div class="form-group">
                                        <label for="create-categories">Chọn chủ đề</label>
                                        <select class="form-control" id="create-categories" name="categories" data-url="{{ $listUrl['get-topical-detail'] }}"></select>
                                    </div>
                                    <div class="form-group">
                                        <label for="create-tags">Chọn tag</label>
                                        <select class="form-control" id="create-tags" name="tags" data-url="{{ $listUrl['select-tag'] }}"></select>
                                    </div>
                                    <div class="form-group">
                                        <label for="create-author">Tên tác giả</label>
                                        <input type="text" class="form-control" id="create-author" name="author">
                                    </div>
                                    <div class="form-group">
                                        <label for="create"> Bài viết liên quan</label>
                                        <input type="" name="">
                                    </div>
                                    <div class="form-group">
                                        <button type="submit" class="btn btn-success btn-md" id="btn-submit" data-url="{{ $listUrl['store'] }}"><i class="fa fa-save"></i>Lưu</button>
                                        <button class="btn btn-secondary btn-md"><i class="fa fa-arrow-circle-o-up"></i>Reset</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
    <div class="modal fade" id="modal-select-template" role="dialog" aria-labelledby="edit-menu" data-backdrop="static" style="display: none;" aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Thêm block cho bài viết</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    </button>
                </div>
                <form id="form-create-category" action="" enctype="multipart/form-data">
                    <div class="modal-body">

                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">{{ __('ttct::category.close') }}</button>
                        <button type="submit" class="btn btn-primary"><i class="fa fa-save">Chọn</i></button>
                    </div>
                </form>
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
                                                                    <option value="{{ auth()->user()->id }}">Tôi</option>
                                                                    <option selected value="all">Tất cả</option>
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
                                                <div class="kt-datatable" id="modal-upload-table-select-resource" data-url="http://api.ttct.io/be/resources/datatable"></div>
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
@stop
@push('plugin-css')
    <link href="{{ asset('assets/vendors/general/dropify/dist/css/dropify.css') }}" rel="stylesheet" type="text/css" />
    <link href="{{ asset('assets/vendors/general/froala/css/froala_editor.pkgd.min.css') }}" rel="stylesheet" type="text/css" />
    <link href="{{ asset('assets/vendors/general/froala/css/plugin/colors.min.css') }}" rel="stylesheet" type="text/css" />
    <link href="{{ asset('assets/vendors/general/froala/css/froala_style.min.css') }}" rel="stylesheet" type="text/css" />
@endpush
@push('plugin-js')
    <script type="text/javascript" src="{{ asset('assets/vendors/general/dropify/dist/js/dropify.js') }}"></script>
    <script type="text/javascript" src="{{ asset('assets/vendors/general/froala/js/froala_editor.pkgd.min.js') }}"></script>
    <script type="text/javascript" src="{{ asset('assets/vendors/general/froala/js/plugin/colors.min.js') }}"></script>
    <script type="text/javascript" src="{{ asset('assets/vendors/general/froala/js/lang/vi.js') }}"></script>
@endpush
@push('page-js')
    <script src="{{ asset('assets/js/pages/topical/create-article.js') }}" type="text/javascript"></script>
@endpush
