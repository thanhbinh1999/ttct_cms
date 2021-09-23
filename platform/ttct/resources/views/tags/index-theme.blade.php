@extends('base::layouts.master')

@section('content')
    <div class="kt-grid__item kt-grid__item--fluid kt-grid kt-grid--hor">
        <div class="kt-subheader   kt-grid__item" id="kt_subheader">
            <div class="kt-subheader__main">
                <span class="kt-subheader__separator kt-hidden"></span>
                <div class="kt-subheader__breadcrumbs">
                    <a href="#" class="kt-subheader__breadcrumbs-home">
                        <i class="flaticon2-shelter"></i>
                    </a>
                    <span class="kt-subheader__breadcrumbs-separator"></span>
                    <a href="" class="kt-subheader__breadcrumbs-link">Quản lý chủ đề</a>
                </div>
            </div>
        </div>
        <div class="kt-content kt-grid__item kt-grid__item--fluid" id="kt_content">
            <div class="kt-portlet kt-portlet--mobile">
                <div class="kt-portlet__head kt-portlet__head--lg">
                    <div class="kt-portlet__head-label">
                        <h3 class="kt-portlet__head-title text-uppercase">Quản lý chủ đề</h3>
                    </div>
                    <div class="kt-portlet__head-toolbar">
                        <div class="kt-portlet__head-wrapper">
                            @can('theme-create')
                            <div class="dropdown dropdown-inline">
                                <a href="#" class="btn btn-success btn-icon-sm" data-toggle="modal" data-target="#modal-create-theme">
                                    <i class="flaticon2-plus"></i> Tạo mới
                                </a>
                            </div>
                            @endcan
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
                                            <input type="text" class="form-control" placeholder="Tìm kiếm" id="search-key">
                                            <span class="kt-input-icon__icon kt-input-icon__icon--left"><span><i class="la la-search"></i></span></span>
                                        </div>
                                    </div>
                                    <div class="col-md-4 kt-margin-b-20-tablet-and-mobile">
                                        <div class="kt-form__group kt-form__group--inline">
                                            <div class="kt-form__label">
                                                <label>Trạng thái</label>
                                            </div>
                                            <div class="kt-form__control">
                                                <select class="form-control bootstrap-select" id="search-status">
                                                    <option value="-1">{{ __('ttct::tag.status.all') }}</option>
                                                    <option selected value="{{ \Kuroneko\Ttct\Classes\Constants\TagConstant::TAG_STATUS_ACTIVE }}">{{ __('ttct::tag.status.active') }}</option>
                                                    <option value="{{ \Kuroneko\Ttct\Classes\Constants\TagConstant::TAG_STATUS_DELETE }}">{{ __('ttct::tag.status.delete') }}</option>
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
                    <div class="kt-datatable" id="theme-table" data-url="{{ $listUrl['datatable'] }}"></div>
                </div>
            </div>
        </div>
    </div>
    @can('theme-update')
    <div class="modal fade" id="modal-edit-theme" role="dialog" aria-labelledby="edit-menu" data-backdrop="static" style="display: none;" aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Cập nhật chủ đề</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    </button>
                </div>
                <form id="form-update-theme">
                    <div class="modal-body">
                        @csrf
                        @method('POST')
                        <div class="form-group">
                            <label for="update-name" class="form-control-label">Tên</label>
                            <input type="text" class="form-control" id="update-name" name="name">
                        </div>
                        <div class="form-group">
                            <label for="update-description" class="form-control-label">Mô tả</label>
                            <textarea class="form-control" rows="5" id="update-description" name="description"></textarea>
                        </div>
                        <div class="form-group">
                            <label for="update-thumbnail" class="form-control-label">Ảnh đại diện</label>
                            <input class="form-control" type="file" accept="image/png,image/jpg,image/jpeg" id="update-thumbnail" name="thumbnail">
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Đóng</button>
                        <button type="submit" class="btn btn-success"><i class="fa fa-save"></i>Lưu</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    @endcan
    @can('theme-create')
    <div class="modal fade" id="modal-create-theme" role="dialog" aria-labelledby="edit-menu" data-backdrop="static" style="display: none;" aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Tạo mới chủ đề</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    </button>
                </div>
                <form id="form-create-theme" action="{{ $listUrl['store'] }}">
                    <div class="modal-body">
                        @csrf
                        <div class="form-group">
                            <label for="create-name" class="form-control-label">Tên</label>
                            <input type="text" class="form-control" id="create-name" name="name">
                        </div>
                        <div class="form-group">
                            <label for="create-description" class="form-control-label">Mô tả</label>
                            <textarea class="form-control" rows="5" id="create-description" name="description"></textarea>
                        </div>
                        <div class="form-group">
                            <label for="create-thumbnail" class="form-control-label">Ảnh đại diện</label>
                            <input class="form-control" type="file" accept="image/png,image/jpg,image/jpeg" id="create-thumbnail" name="thumbnail">
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Đóng</button>
                        <button type="submit" class="btn btn-success"><i class="fa fa-save"></i>Lưu</button>
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
    <script src="{{ asset('assets/js/pages/theme-index.js') }}" type="text/javascript"></script>
@endpush
