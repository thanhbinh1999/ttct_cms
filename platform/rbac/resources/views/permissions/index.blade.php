@extends('base::layouts.master')

@section('content')
    <div class="kt-grid__item kt-grid__item--fluid kt-grid kt-grid--hor">
        <div class="kt-subheader   kt-grid__item" id="kt_subheader">
            <div class="kt-subheader__main">
                <span class="kt-subheader__separator kt-hidden"></span>
                <div class="kt-subheader__breadcrumbs">
                    <a href="{{ route('ttct.dashboard') }}" class="kt-subheader__breadcrumbs-home">
                        <i class="flaticon2-shelter"></i>
                    </a>
                    <span class="kt-subheader__breadcrumbs-separator"></span>
                    <a href="" class="kt-subheader__breadcrumbs-link">Quản lý quyền<</a>
                </div>
            </div>
        </div>
        <div class="kt-content kt-grid__item kt-grid__item--fluid" id="kt_content">
            <div class="kt-portlet kt-portlet--mobile">
                <div class="kt-portlet__head kt-portlet__head--lg">
                    <div class="kt-portlet__head-label">
                        <h3 class="kt-portlet__head-title text-uppercase">Quản lý quyền</h3>
                    </div>
                    <div class="kt-portlet__head-toolbar">
                        <div class="kt-portlet__head-wrapper">
                            @can('permission-create')
                            <div class="dropdown dropdown-inline">
                                <a href="#" class="btn btn-brand btn-icon-sm" data-toggle="modal" data-target="#modal-create-permission">
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
                                            <input type="text" class="form-control" placeholder="Search..." id="search-key">
                                            <span class="kt-input-icon__icon kt-input-icon__icon--left"><span><i class="la la-search"></i></span></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="kt-portlet__body kt-portlet__body--fit">
                    <div class="kt-datatable" id="permission-table" data-url="{{ route('rbac.permissions.datatable') }}"></div>
                </div>
            </div>
        </div>
    </div>
    @can('permission-update')
    <div class="modal fade" id="modal-edit-permission" role="dialog" aria-labelledby="edit-menu" data-backdrop="static" style="display: none;" aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Cập nhật quyền</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    </button>
                </div>
                <form id="form-update-permission">
                    <div class="modal-body">
                        @csrf
                        @method('PUT')
                        <div class="form-group">
                            <label for="update-name" class="form-control-label">Tên:</label>
                            <input type="text" class="form-control" id="update-name" name="name">
                        </div>
                        <div class="form-group">
                            <label for="update-description" class="form-control-label">Description:</label>
                            <textarea class="form-control" id="update-description" name="description"></textarea>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Đóng</button>
                        <button type="submit" class="btn btn-primary"><i class="fa fa-save"></i> Lưu</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    @endcan
    @can('permission-create')
    <div class="modal fade" id="modal-create-permission" role="dialog" aria-labelledby="edit-menu" data-backdrop="static" style="display: none;" aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Tạo mới quyền</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    </button>
                </div>
                <form id="form-create-permission" action="{{ route('rbac.permissions.store') }}">
                    <div class="modal-body">
                        @csrf
                        @method('PUT')
                        <div class="form-group">
                            <label for="create-name" class="form-control-label">Tên:</label>
                            <input type="text" class="form-control" id="create-name" name="name">
                        </div>
                        <div class="form-group">
                            <label for="create-description" class="form-control-label">Description:</label>
                            <textarea class="form-control" id="create-description" name="description"></textarea>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Đóng</button>
                        <button type="submit" class="btn btn-primary"><i class="fa fa-save"></i> Lưu</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    @endcan
@stop
@push('page-js')
    <script src="{{ asset('assets/js/pages/permission-index.js') }}" type="text/javascript"></script>
@endpush
