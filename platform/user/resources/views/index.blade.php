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
    <style>
        .dual-listbox{display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column}.dual-listbox .dual-lsitbox__container{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-direction:row;flex-direction:row}.dual-listbox .dual-listbox__search{border:1px solid #ddd;padding:10px;max-width:300px}.dual-listbox .dual-listbox__available,.dual-listbox .dual-listbox__selected{border:1px solid #ddd;height:300px;overflow-y:auto;padding:0;width:300px}.dual-listbox .dual-listbox__buttons{display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;margin:0 10px}.dual-listbox .dual-listbox__button{margin-bottom:5px;border:0;background-color:#6a8188;padding:10px;color:#fff}.dual-listbox .dual-listbox__button:hover{background-color:#ddd;color:black} .dual-listbox .dual-listbox__title{padding:15px 10px;font-size:120%;font-weight:700;border-bottom:1px solid #efefef}.dual-listbox .dual-listbox__item{display:block;padding:10px;cursor:pointer;user-select:none;-moz-user-select:none;-webkit-user-select:none;-ms-user-select:none;border-bottom:1px solid #efefef;transition:background .2s ease}.dual-listbox .dual-listbox__item.dual-listbox__item--selected{background-color:rgba(8,157,227,.7)}
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
                    <a href="" class="kt-subheader__breadcrumbs-link">Người dùng</a>
                </div>
            </div>
        </div>
        <div class="kt-content kt-grid__item kt-grid__item--fluid" id="kt_content">
            <div class="kt-portlet kt-portlet--mobile">
                <div class="kt-portlet__head kt-portlet__head--lg">
                    <div class="kt-portlet__head-label">
                        <h3 class="kt-portlet__head-title">Người dùng</h3>
                    </div>
                    <div class="kt-portlet__head-toolbar">
                        <div class="kt-portlet__head-wrapper">
                            <div class="dropdown dropdown-inline">
                                @can('user-create')
                                    <a href="{{ route('users.create') }}" class="btn btn-brand btn-icon-sm">
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
                    <div class="kt-datatable" id="users-table" data-url="{{ $listUrl['datatable'] }}"></div>
                </div>
            </div>
        </div>
    </div>
    <div class="modal fade" id="modal-assign-role-permissions" role="dialog" aria-labelledby="edit-menu" data-backdrop="static" style="display: none;" aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Phân quyền</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    </button>
                </div>
                <form id="form-update-role">
                    <div class="modal-body">
                        @csrf
                        @method('PUT')
                        <div class="form-group">
                            <label class="form-control-label">Chọn quyền</label>
                            <select id="select-permissions" multiple></select>
                        </div>
                        <div class="form-group">
                            <label class="form-control-label">Chọn vai trò</label>
                            <select id="select-role" style="width: 100%" data-url="{{ route('rbac.roles.select') }}"></select>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="submit" id="update-assign-btn" class="btn btn-primary"><i class="fa fa-save"></i>Lưu</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
@stop

@push('page-js')
    <script src="https://www.cssscript.com/demo/pure-js-dual-list-box-component/dist/dual-listbox.js"></script>
    <script src="{{ asset('assets/js/pages/users-index.js') }}" type="text/javascript"></script>
@endpush
