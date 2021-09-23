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
                    <a href="" class="kt-subheader__breadcrumbs-link">Quản lý chuyên đề</a>
                </div>
            </div>
        </div>
        <div class="kt-content kt-grid__item kt-grid__item--fluid" id="kt_content">
            <div class="kt-portlet kt-portlet--mobile">
                <div class="kt-portlet__head kt-portlet__head--lg">
                    <div class="kt-portlet__head-label">
                        <h3 class="kt-portlet__head-title text-uppercase">Quản lý chuyên đề</h3>
                    </div>
                    <div class="kt-portlet__head-toolbar">
                        <div class="kt-portlet__head-wrapper">
                            @can('topical-create')
                            <div class="dropdown dropdown-inline">
                                <a href="#" class="btn btn-success btn-icon-sm" data-toggle="modal" data-target="#modal-create-category">
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
                                            <input type="text" class="form-control" placeholder={{ __('ttct::category.search') }}..." id="search-key">
                                            <span class="kt-input-icon__icon kt-input-icon__icon--left"><span><i class="la la-search"></i></span></span>
                                        </div>
                                    </div>
                                    <div class="col-md-4 kt-margin-b-20-tablet-and-mobile">
                                        <div class="kt-form__group kt-form__group--inline">
                                            <div class="kt-form__label">
                                                <label FOR="search-status">{{ __('ttct::category.status.status') }}</label>
                                            </div>
                                            <div class="kt-form__control">
                                                <select class="form-control bootstrap-select" id="search-status">
                                                    <option selected value="-1">{{ __('ttct::category.status.all') }}</option>
                                                    <option  value="10">Xuất bản</option>
                                                    <option value="1">Đang chờ</option>
                                                    <option value="6">Đã gỡ</option>
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
                    <div class="kt-datatable" id="topical-table" data-url="{{ $listUrl['datatable'] }}" data-edit-topical="{{ $listUrl['edit_topical'] }}"></div>
                </div>
            </div>
        </div>
    </div>
    @can('topical-update')
    <div class="modal fade" id="modal-edit-category" role="dialog" aria-labelledby="edit-menu" data-backdrop="static" style="display: none;" aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Cập nhật chuyên để</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    </button>
                </div>
                <form id="form-update-category" enctype="multipart/form-data">
                    <div class="modal-body">
                        @csrf
                        <div class="form-group">
                            <label for="update-name" class="form-control-label">{{ __('ttct::category.name') }}</label>
                            <input type="text" class="form-control" id="update-name" name="name">
                        </div>
                        <div class="form-group">
                            <label for="update-slug" class="form-control-label">{{ __('ttct::category.slug') }}</label>
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
                            <label class="col-3 col-form-label">Tạo slug tự động từ tên</label>
                        </div>
                        <div class="row">
                            <div class="col-4">
                                <div class="form-group row">
                                    <div class="col-1" style="margin-right: 25px">
                                        <span class="kt-switch kt-switch--sm kt-switch--icon">
                                            <label>
                                                <input type="checkbox" id="update-off_name" name="off_name">
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
                                                <input type="checkbox" id="update-off_description" name="off_description">
                                                <span></span>
                                            </label>
                                        </span>
                                    </div>
                                    <label class="col-6 col-form-label">Tắt mô tả</label>
                                </div>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="update-description" class="form-control-label">{{ __('ttct::category.description') }}</label>
                            <textarea class="form-control" rows="5" id="update-description" name="description"></textarea>
                        </div>
                        <div class="form-group">
                            <label for="update-thumbnail" class="form-control-label">{{ __('ttct::category.thumbnail') }}</label>
                            <input class="form-control" type="file" accept="image/png,image/jpg,image/jpeg" id="update-thumbnail" name="thumbnail">
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Đóng</button>
                        <button type="submit" class="btn btn-success"><i class="fa fa-save"></i> Lưu</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    @endcan
    @can('topical-create')
    <div class="modal fade" id="modal-create-category" role="dialog" aria-labelledby="edit-menu" data-backdrop="static" style="display: none;" aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Tạo mới chuyên đề</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    </button>
                </div>
                <form id="form-create-category" action=" {{$listUrl['store'] }}"  enctype="multipart/form-data" method="POST">
                    <div class="modal-body">
                        @csrf
                        <div class="form-group">
                            <label for="update-name" class="form-control-label">Tên</label>
                            <input type="text" class="form-control" id="create-name" name="name">
                        </div>
                        <div class="form-group">
                            <label for="create-slug" class="form-control-label">Slug</label>
                            <input type="text" class="form-control" id="create-slug" name="slug">
                        </div>
                        <div class="form-group row">
                            <div class="col-1">
                                <span class="kt-switch kt-switch--sm kt-switch--icon">
                                    <label>
                                        <input type="checkbox" id="create-auto-generate-slug">
                                        <span></span>
                                    </label>
                                </span>
                            </div>
                            <label class="col-3 col-form-label">Tự động tạo slug từ tên</label>
                        </div>
                        <div class="form-group">
                            <label  for="crerate-time-publish" class="form-control-label">Thời gian  xuất bản</label>
                            <input class="form-control" id="create-time-publish" name="time_publish" type=  "text">
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
                                                <input type="checkbox" id="off_description" name="off_description">
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
                                <select  class="form-control col-7" id="select-topical-type" name = 'display_type'>
                                    <option value="2">Bài kế tiếp</option>
                                    <option selected value="1">Trượt ngang</option>
                                </select>
                            </div>
                           
                        </div>
                        <div class="form-group">
                            <label for="create-description" class="form-control-label" >{{ __('ttct::category.description') }}</label>
                            <textarea class="form-control" rows="5" id="create-description" name="description"></textarea>
                        </div>
                        <div class="form-group">
                            <label for="create-thumbnail" class="form-control-label">Cover</label>
                            <input class="form-control" type="file" accept="image/png,image/jpg,image/jpeg" id="create-thumbnail" name="thumbnail">
                        </div>
                       
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">{{ __('ttct::category.close') }}</button>
                        <button type="submit" class="btn btn-success"><i class="fa fa-save"></i> {{ __('ttct::category.save') }}</button>
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
    <script src="{{ asset('assets/js/pages/topical-index.js') }}" type="text/javascript"></script>
    <script src="{{ asset('assets/js/pages/change-highlight-topical.js') }}" type="text/javascript"></script>
@endpush