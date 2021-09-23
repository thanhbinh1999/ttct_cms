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
                    <a href="{{ route('users.index') }}" class="kt-subheader__breadcrumbs-link">Người dùng</a>
                    <span class="kt-subheader__breadcrumbs-separator"></span>
                    <a href="" class="kt-subheader__breadcrumbs-link">Tạo mới user CMS</a>
                </div>
            </div>
        </div>
        <div class="kt-content kt-grid__item kt-grid__item--fluid" id="kt_content">
            <div class="kt-portlet kt-portlet--mobile">
                <div class="kt-portlet__head kt-portlet__head--lg">
                    <div class="kt-portlet__head-label">
                        <h3 class="kt-portlet__head-title">Tạo mới user CMS</h3>
                    </div>
                </div>
                <div class="kt-portlet__body">
                    <form id="form-create-user" class="kt-form" action="{{ route('users.store') }}" enctype="multipart/form-data">
                        @method('PUT')
                        @csrf
                        <div class="kt-portlet__body">
                            <div class="row">
                                <div class="col-6">
                                    <div class="form-group">
                                        <label for="first_name" class="kt-font-bold">Họ & tên đệm</label>
                                        <input type="text" class="form-control" placeholder="Họ & tên đệm" id="first_name" name="first_name">
                                    </div>
                                </div>
                                <div class="col-6">
                                    <div class="form-group">
                                        <label for="last_name" class="kt-font-bold">Tên</label>
                                        <input type="text" class="form-control" placeholder="Tên" id="last_name" name="last_name">
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-6">
                                    <div class="form-group">
                                        <label for="email" class="kt-font-bold">Email</label>
                                        <input type="text" class="form-control"  placeholder="Email" id="email" name="email">
                                    </div>
                                </div>
                                <div class="col-6">
                                    <div class="form-group">
                                        <label for="username" class="kt-font-bold">Tên đăng nhập</label>
                                        <input type="text" class="form-control" placeholder="Tên đăng nhập" id="username" name="username">
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-6">
                                    <div class="form-group">
                                        <label  for="dob" class="kt-font-bold">Ngày sinh</label>
                                        <input type="text" class="form-control" id="dob" name="dob" placeholder="Enter email">
                                    </div>
                                </div>
                                <div class="col-6">
                                    <div class="form-group">
                                        <label for="phone" class="kt-font-bold">SĐT</label>
                                        <input type="text" class="form-control" name="phone" id="phone" placeholder="SĐT">
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-4">
                                    <div class="form-group">
                                        <label for="address" class="kt-font-bold">Địa chỉ</label>
                                        <input type="text" class="form-control" id="address" name="address" placeholder="Địa chỉ">
                                    </div>
                                </div>
                                <div class="col-4">
                                    <div class="form-group">
                                        <label for="gender" class="kt-font-bold">Giới tính</label>
                                        <select class="form-control" name="gender" id="gender">
                                            <option value="1">Nam</option>
                                            <option value="2">Nữ</option>
                                            <option value="10">Nửa nạc nửa mỡ</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-4">
                                    <div class="form-group">
                                        <label for="role">Vai trò</label>
                                        <select class="form-control" name="role" id="role" data-url="{{ route('rbac.roles.select') }}">
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-6">
                                    <div class="form-group">
                                        <label for="password" class="kt-font-bold">Mật khẩu</label>
                                        <input type="password" name="password"  id="password" class="form-control" placeholder="Mật khẩu">
                                    </div>
                                </div>
                                <div class="col-6">
                                    <div class="form-group">
                                        <label for="password_confirmation" class="kt-font-bold">Nhập lại mật khẩu</label>
                                        <input type="password" id="password_confirmation"  name="password_confirmation" class="form-control" placeholder="Nhập lại mật khẩu">
                                    </div>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="avatar" class="kt-font-bold">Avatar</label>
                                <input type="file" class="form-control" name="avatar" id="avatar">
                            </div>
                        </div>
                        <div class="kt-portlet__foot">
                            <div class="kt-form__actions text-right">
                                <button type="submit" class="btn btn-primary">Submit</button>
                                <button type="reset" class="btn btn-secondary">Cancel</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
@stop
@push('plugin-css')
    <link href="{{ asset('assets/vendors/general/dropify/dist/css/dropify.css') }}" rel="stylesheet" type="text/css" />
@endpush
@push('plugin-js')
    <script src="{{ asset('assets/vendors/general/dropify/dist/js/dropify.js') }}" type="text/javascript"></script>
@endpush
@push('page-js')
    <script src="{{ asset('assets/js/pages/users-create.js') }}" type="text/javascript"></script>
@endpush
