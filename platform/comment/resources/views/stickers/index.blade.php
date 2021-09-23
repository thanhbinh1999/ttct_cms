@extends('base::layouts.master')

@section('content')
    <div class="kt-grid__item kt-grid__item--fluid kt-grid kt-grid--hor">
        <div class="kt-subheader kt-grid__item" id="kt_subheader">
            <div class="kt-subheader__main">
                <span class="kt-subheader__separator kt-hidden"></span>
                <div class="kt-subheader__breadcrumbs">
                    <a href="#" class="kt-subheader__breadcrumbs-home">
                        <i class="flaticon2-shelter"></i>
                    </a>
                    <span class="kt-subheader__breadcrumbs-separator"></span>
                    <a href="" class="kt-subheader__breadcrumbs-link">Nhãn dán</a>
                </div>
            </div>
        </div>
        <div class="kt-content kt-grid__item kt-grid__item--fluid" id="kt_content">
            <div class="kt-portlet kt-portlet--mobile">
                <div class="kt-portlet__head kt-portlet__head--lg">
                    <div class="kt-portlet__head-label">
                        <h3 class="kt-portlet__head-title text-uppercase">Nhãn dán</h3>
                    </div>
                    <div class="kt-portlet__head-toolbar">
                        <div class="kt-portlet__head-wrapper">
                            <div class="dropdown dropdown-inline">
                                @can('sticker-create')
                                    <a href="#" data-target="#modal-create-sticker" data-toggle="modal"
                                       class="btn btn-brand btn-icon-sm">
                                        <i class="flaticon2-plus"></i> Tạo mới
                                    </a>
                                @endcan
                            </div>
                        </div>
                    </div>
                </div>
                <div class="kt-portlet__body">
                    <div class="kt-form kt-form--label-right kt-margin-t-20 kt-margin-b-10">
                        <div class="row align-items-center">
                            <div class="col-xl-8 order-2 order-xl-1">
                                <div class="row align-items-center">
                                    <div class="col-md-4 kt-margin-b-20-tablet-and-mobile">
                                        <div class="kt-input-icon kt-input-icon--left">
                                            <input type="text" class="form-control" placeholder="{{ __('ttct::tag.search') }}" id="search-key">
                                            <span class="kt-input-icon__icon kt-input-icon__icon--left"><span><i class="la la-search"></i></span></span>
                                        </div>
                                    </div>
                                    <div class="col-md-4 kt-margin-b-20-tablet-and-mobile">
                                        <div class="kt-form__group kt-form__group--inline">
                                            <div class="kt-form__label">
                                                <label>Theme</label>
                                            </div>
                                            <div class="kt-form__control">
                                                <select class="form-control bootstrap-select" id="search-theme"></select>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-4 kt-margin-b-20-tablet-and-mobile">
                                        <div class="kt-form__group kt-form__group--inline">
                                            <div class="kt-form__label">
                                                <label>Trạng thái</label>
                                            </div>
                                            <div class="kt-form__control">
                                                <select class="form-control bootstrap-select" id="search-status">
                                                    <option value="all">Tất cả</option>
                                                    <option selected value="active">Kích hoạt</option>
                                                    <option value="delete">Xóa</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="kt-portlet__body kt-portlet__body--fit">
                    <div class="kt-datatable" id="sticker-table" data-get-sk="{{ route('comments.sticker_themes.get_list_sticker_theme') }}" data-url="{{ route('comments.stickers.datatable') }}"></div>
                </div>
            </div>
        </div>
    </div>
    @can('sticker-create')
    <div class="modal fade" id="modal-create-sticker" role="dialog" aria-labelledby="modal-create-sticker"
         data-backdrop="static" style="display: none;" aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Tạo mới nhãn dán</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    </button>
                </div>
                <form id="form-create-sticker" action="{{ route('comments.stickers.store') }}" enctype="multipart/form-data">
                    <div class="modal-body font-weight-bold">
                        @csrf
                        <div class="form-group">
                            <label for="create-sticker-name" class="form-control-label">Tên</label>
                            <input type="text" class="form-control" id="create-sticker-name" name="name">
                        </div>
                        <div class="form-group">
                            <label for="create-sticker-note" class="form-control-label">Mô tả</label>
                            <textarea rows="4" class="form-control" id="create-sticker-note"
                                      name="note"></textarea>
                        </div>
                        <div class="form-group">
                            <label for="create-sticker-sticker-theme">Bộ nhãn dán</label>
                            <select class="form-control" id="create-sticker-sticker-theme" name="sticker-theme">
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="create-sticker-avatar" class="form-control-label">Nhãn dán</label>
                            <input id="create-sticker-avatar" type="file"
                                   accept="image/png,image/jpg,image/jpeg" name="avatar">
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
    @endcan
    @can('sticker-update')
        <div class="modal fade" id="modal-update-sticker" role="dialog" aria-labelledby="modal-update-sticker-theme"
             data-backdrop="static" style="display: none;" aria-hidden="true">
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Cập nhật nhãn dán</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        </button>
                    </div>
                    <form id="form-update-sticker" enctype="multipart/form-data">
                        <div class="modal-body font-weight-bold">
                            @csrf
                            <div class="form-group">
                                <label for="update-sticker-name" class="form-control-label">Tên</label>
                                <input type="text" class="form-control" id="update-sticker-name" name="name">
                            </div>
                            <div class="form-group">
                                <label for="update-sticker-note" class="form-control-label">Mô tả</label>
                                <textarea rows="4" class="form-control" id="update-sticker-note"
                                          name="note"></textarea>
                            </div>
                            <div class="form-group">
                                <label for="update-sticker-avatar" class="form-control-label">Nhãn dán</label>
                                <input id="update-sticker-avatar" type="file"
                                       accept="image/png,image/jpg,image/jpeg" name="new_avatar">
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
    @endcan
@stop
@push('plugin-css')
    <link href="{{ asset('assets/vendors/general/dropify/dist/css/dropify.css') }}" rel="stylesheet" type="text/css"/>
@endpush
@push('plugin-js')
    <script src="{{ asset('assets/vendors/general/dropify/dist/js/dropify.js') }}" type="text/javascript"></script>
@endpush
@push('page-js')
    <script src="{{ asset('assets/js/pages/sticker-index.js') }}" type="text/javascript"></script>
@endpush
