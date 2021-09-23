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
                    <a href="" class="kt-subheader__breadcrumbs-link">Bộ nhãn dán</a>
                </div>
            </div>
        </div>
        <div class="kt-content kt-grid__item kt-grid__item--fluid" id="kt_content">
            <div class="kt-portlet kt-portlet--mobile">
                <div class="kt-portlet__head kt-portlet__head--lg">
                    <div class="kt-portlet__head-label">
                        <h3 class="kt-portlet__head-title text-uppercase">Bộ nhãn dán</h3>
                    </div>
                    <div class="kt-portlet__head-toolbar">
                        <div class="kt-portlet__head-wrapper">
                            <div class="dropdown dropdown-inline">
                                @can('sticker-theme-create')
                                <a href="#" data-target="#modal-create-sticker-theme" data-toggle="modal"
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
                                                <label>{{ __('ttct::tag.status.status') }}</label>
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
                    <div class="kt-datatable" id="sticker-theme-table" data-url="{{ route('comments.sticker_themes.datatable') }}"></div>
                </div>
            </div>
        </div>
    </div>
    @can('sticker-theme-create')
    <div class="modal fade" id="modal-create-sticker-theme" role="dialog" aria-labelledby="modal-create-sticker-theme"
         data-backdrop="static" style="display: none;" aria-hidden="true">
        <div class="modal-dialog modal-xl" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Tạo mới bộ nhãn dán</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    </button>
                </div>
                <form id="form-create-sticker-theme" action="{{ route('comments.sticker_themes.store') }}" enctype="multipart/form-data">
                    <div class="modal-body font-weight-bold">
                        <div class="row">
                            <div class="col-6">
                                @csrf
                                <div class="form-group">
                                    <label for="create-sticker-theme-name" class="form-control-label">Tên</label>
                                    <input type="text" class="form-control" id="create-sticker-theme-name" name="name">
                                </div>
                                <div class="form-group">
                                    <label for="create-sticker-theme-note" class="form-control-label">Mô tả</label>
                                    <textarea rows="4" class="form-control" id="create-sticker-theme-note" name="note"></textarea>
                                </div>
                                <div class="form-group">
                                    <label for="create-sticker-theme-avatar" class="form-control-label">Hình đại diện</label>
                                    <input id="create-sticker-theme-avatar" type="file" accept="image/png,image/jpg,image/jpeg" name="avatar">
                                </div>
                            </div>
                            <div class="col-6">
                                <input type="file" style="display: none" id="create-sticker-theme-input-sticker" multiple>
                                <button class="btn btn-success" id="create-sticker-theme-btn-input-sticker"><i class="la la-plus"></i> Thêm nhãn dán</button>
                                <div id="create-sticker-theme-sticker-container" style="margin-top:10px;overflow-y: scroll;max-height: 700px">

                                </div>
                            </div>
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
    @can('sticker-theme-update')
    <div class="modal fade" id="modal-update-sticker-theme" role="dialog" aria-labelledby="modal-update-sticker-theme"
         data-backdrop="static" style="display: none;" aria-hidden="true">
        <div class="modal-dialog modal-xl" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Cập nhật bộ nhãn dán</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    </button>
                </div>
                    <form id="form-update-sticker-theme" enctype="multipart/form-data">
                    <div class="modal-body font-weight-bold">
                        <div class="row">
                            <div class="col-6">
                                @csrf
                                <div class="form-group">
                                    <label for="update-sticker-theme-name" class="form-control-label">Tên</label>
                                    <input type="text" class="form-control" id="update-sticker-theme-name" name="name">
                                </div>
                                <div class="form-group">
                                    <label for="update-sticker-theme-note" class="form-control-label">Mô tả</label>
                                    <textarea rows="4" class="form-control" id="update-sticker-theme-note" name="note"></textarea>
                                </div>
                                <div class="form-group">
                                    <label for="update-sticker-theme-avatar" class="form-control-label">Hình đại diện</label>
                                    <input id="update-sticker-theme-avatar" type="file" accept="image/png,image/jpg,image/jpeg" name="avatar">
                                </div>
                            </div>
                            <div class="col-6">
                                <input type="file" style="display: none" id="update-sticker-theme-input-sticker" multiple>
                                <button class="btn btn-success" id="update-sticker-theme-btn-input-sticker"><i class="la la-plus"></i> Thêm nhãn dán</button>
                                <div id="update-sticker-theme-sticker-container" style="margin-top:10px;overflow-y: scroll;max-height: 700px"></div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Đóng</button>
                        <button type="submit" class="btn btn-primary"><i class="fa fa-check"></i> Lưu</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    @endcan
@stop
@push('plugin-css')
    <link href="{{ asset('assets/vendors/general/dropify/dist/css/dropify.css') }}" rel="stylesheet" type="text/css" />
@endpush
@push('plugin-js')
    <script src="{{ asset('assets/vendors/general/dropify/dist/js/dropify.js') }}" type="text/javascript"></script>
@endpush
@push('page-js')
    <script src="{{ asset('assets/js/pages/sticker-theme-index.js') }}" type="text/javascript"></script>
@endpush
