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
    </style>
    <div class="kt-grid__item kt-grid__item--fluid kt-grid kt-grid--hor">
        <div class="kt-subheader kt-grid__item" id="kt_subheader">
            <div class="kt-subheader__main">
                <span class="kt-subheader__separator kt-hidden"></span>
                <div class="kt-subheader__breadcrumbs">
                    <a href="#" class="kt-subheader__breadcrumbs-home">
                        <i class="flaticon2-shelter"></i>
                    </a>
                    <span class="kt-subheader__breadcrumbs-separator"></span>
                    <a href="{{ route('ttct.topical.show_topical') }}" class="kt-subheader__breadcrumbs-link">Chuyên
                        đề</a>
                    <span class="kt-subheader__breadcrumbs-separator"></span>
                    <a class="kt-subheader__breadcrumbs-link">Biên tập chuyên đề</a>
                </div>
            </div>
        </div>
        <div class="kt-content kt-grid__item kt-grid__item--fluid" id="kt_content">
            <div class="row">
                <div class="col-12">
                    <div class="kt-portlet kt-portlet--mobile">
                        <div class="kt-portlet__head kt-portlet__head--lg">
                            <div class="kt-portlet__head-label">
                                <h3 class="kt-portlet__head-title text-uppercase">Biên tập chuyên đề</h3>
                            </div>
                            <div class="kt-portlet__head-label">
                                <div class="text-right">
                                    <button class="btn btn-primary" id="topical-preview" data-topical="{{ $id }}"
                                            data-url="{{ route('ttct.topical.preview',1) }}"><i class="fa fa-eye"></i>
                                        Xem trước
                                    </button>
                                    <button class="btn btn-success" id="save-topical"
                                            data-get-data="{{ $listUrl['get-data'] }}"
                                            data-topical="{{ $id }}"
                                            data-update="{{ $listUrl['update-topical'] }}"><i class="fa fa-save"></i>
                                        Lưu
                                    </button>
                                    <button class="btn btn-success" id="publish-topical"
                                            style="display:none"
                                            data-topical="{{ $id }}"
                                            data-publish="{{ $listUrl['publish-topical'] }}"><i
                                            class="fa fa-upload"></i> Xuất bản
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div class="kt-portlet__body">
                            <div class="kt-form kt-form--label-right kt-margin-t-20 kt-margin-b-10">
                                <form class="row" id="form-update-category" enctype="multipart/form-data">
                                    @csrf
                                    <div class="col-md-6 kt-margin-b-20-tablet-and-mobile">
                                        <div class="form-group">
                                            <label for="update-name"
                                                   class="form-control-label">{{ __('ttct::category.name') }}</label>
                                            <input type="text" class="form-control" id="update-name" name="name">
                                        </div>
                                        <div class="form-group">
                                            <label for="update-slug"
                                                   class="form-control-label">{{ __('ttct::category.slug') }}</label>
                                            <input type="text" class="form-control" id="update-slug" name="slug">
                                        </div>
                                        <div class="form-group row">
                                            <div class="col-1">
                                            <span class="kt-switch kt-switch--icon kt-switch--sm">
                                                <label>
                                                    <input type="checkbox" id="update-auto-generate-slug">
                                                    <span></span>
                                                </label>
                                            </span>
                                            </div>
                                            <label class="col-3 col-form-label">Tự động tạo slug từ tên</label>
                                        </div>
                                        <div class="row">
                                            <div class="col-4">
                                                <div class="form-group row">
                                                    <div class="col-1" style="margin-right: 25px">
                                                        <span class="kt-switch kt-switch--sm kt-switch--icon">
                                                            <label>
                                                                <input type="checkbox" id="off_name" name="off_name">
                                                                <span></span>
                                                            </label>
                                                        </span>
                                                    </div>
                                                    <label class="col-6 col-form-label">Tắt tên</label>
                                                </div>
                                            </div>
                                            <div class="col-4">
                                                <div class="form-group row">
                                                    <div class="col-1" style="margin-right: 25px">
                                                        <span class="kt-switch kt-switch--sm kt-switch--icon">
                                                            <label>
                                                                <input type="checkbox" id="off_description"
                                                                       name="off_description">
                                                                <span></span>
                                                            </label>
                                                        </span>
                                                    </div>
                                                    <label class="col-6 col-form-label">Tắt mô tả</label>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-6 row">
                                                <label class="col-form-label col-5" for="select-topical-type">Chọn dạng
                                                    hiển thị</label>
                                                <select class="form-control col-7" id="select-topical-type">
                                                    <option value="2">Bài kế tiếp</option>
                                                    <option value="1">Trượt ngang</option>
                                                </select>
                                            </div>
                                            <div class="col-6">
                                                <button class="btn btn-primary" id="preview-demo"
                                                        data-url="{{ route('ttct.topical.demo',1) }}">Xem demo
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-6 kt-margin-b-20-tablet-and-mobile">
                                        <div class="form-group">
                                            <label for="update-description"
                                                   class="form-control-label">{{ __('ttct::category.description') }}</label>
                                            <textarea class="form-control" rows="5" id="update-description"
                                                      name="description"></textarea>
                                        </div>
                                        <div class="form-group">
                                            <label for="update-thumbnail"
                                                   class="form-control-label">{{ __('ttct::category.thumbnail') }}</label>
                                            <input class="form-control" type="file"
                                                   accept="image/png,image/jpg,image/jpeg" id="update-thumbnail"
                                                   name="thumbnail">
                                        </div>
                                        <div class="form-group col-md-4">
                                            <label for="update-publish_at" class="form-control-label">Thời gian xuất bản</label>
                                            <input class="form-control"  name="published_at" id="update-published-at">
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-xl-8">
                    <div class="kt-portlet kt-portlet--height-fluid kt-portlet--mobile ">
                        <div
                            class="kt-portlet__head kt-portlet__head--lg kt-portlet__head--noborder kt-portlet__head--break-sm">
                            <div class="kt-portlet__head-label">
                                <h3 class="kt-portlet__head-title text-uppercase">
                                    Biên tập các bài viết
                                </h3>
                            </div>
                        </div>
                        <div class="kt-portlet__body kt-portlet__body--fit">
                            <div class="kt-portlet__body">
                                <div id="sort-article" data-url-edit-article="{{ $listUrl['url-edit-article'] }}"
                                     data-get-many-article="{{ $listUrl['get-many-article'] }}">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-xl-4">
                    <div class="kt-portlet kt-portlet--height-fluid kt-portlet--mobile ">
                        <div
                            class="kt-portlet__head kt-portlet__head--lg kt-portlet__head--noborder kt-portlet__head--break-sm">
                            <div class="kt-portlet__head-label">
                                <h3 class="kt-portlet__head-title text-uppercase">
                                    Chọn bài viết
                                </h3>
                            </div>
                        </div>
                        <div class="kt-portlet__body kt-portlet__body--fit">
                            <div class="kt-portlet__body">
                                <div class="form-group">
                                    <select class="form-control" id="select-article"
                                            data-url="{{ $listUrl['select-article'] }}"></select>
                                </div>
                                <div class="form-group">
                                    <button class="btn btn-success" id="add-to-topical-article"><i
                                            class="fa fa-check"></i>Thêm
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="modal fade" id="modal-change-status" role="dialog" aria-labelledby="modal-change-status"
         data-backdrop="static" style="display: none;" aria-hidden="true">
        <div class="modal-dialog modal-md" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Thay đổi trạng thái</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    </button>
                </div>
                <div class="modal-body">
                    <input type="hidden" id="modal-change-status-article-id">
                    <div class="form-group">
                        <label for="modal-change-status-select-status" class="form-control-label">Chọn trạng
                            thái</label>
                        <select type="text" class="form-control" id="modal-change-status-select-status">
                            <option value="1">Pending</option>
                            <option value="10">Publish</option>
                        </select>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">ĐÓng</button>
                    <button type="submit" class="btn btn-primary" id="modal-change-status-btn-save"><i
                            class="fa fa-save"></i> Lưu
                    </button>
                </div>
            </div>
        </div>
    </div>
@stop
@push('plugin-css')
    <link href="{{ asset('assets/vendors/general/dropify/dist/css/dropify.css') }}" rel="stylesheet" type="text/css"/>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css">
    <link href="{{ asset('assets/vendors/general/nestable/nestable.css') }}" rel="stylesheet" type="text/css"/>
@endpush
@push('plugin-js')
    <script src="{{ asset('assets/vendors/general/dropify/dist/js/dropify.js') }}" type="text/javascript"></script>
@endpush
@push('page-js')
    <script src="{{ asset('assets/js/pages/topical-edit.js') }}" type="text/javascript"></script>
@endpush