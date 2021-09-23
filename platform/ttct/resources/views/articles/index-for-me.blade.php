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
                    <a href="{{ route('ttct.articles.article_publish_show') }}" class="kt-subheader__breadcrumbs-link">Bài viết</a>
                    <span class="kt-subheader__breadcrumbs-separator"></span>
                    <a href="" class="kt-subheader__breadcrumbs-link">Bài viết gửi cho tôi</a>
                </div>
            </div>
        </div>
        <div class="kt-content kt-grid__item kt-grid__item--fluid" id="kt_content">
            <div class="kt-portlet kt-portlet--mobile">
                <div class="kt-portlet__head kt-portlet__head--lg">
                    <div class="kt-portlet__head-label">
                        <h3 class="kt-portlet__head-title text-uppercase">Bài viết gửi cho tôi</h3>
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
                    <div class="kt-datatable" id="article-table-for-me"
                         data-send-notification="{{ route('users.send_notification') }}"
                         data-update-article-transfer-status="{{ $listUrl['update-article-transfer-status'] }}"
                         data-url="{{ $listUrl['datatable'] }}"
                         data-edit="{{ route('ttct.articles.edit',1) }}"></div>
                </div>
            </div>
        </div>
    </div>
    <div class="modal fade" id="modal-transfer-article" role="dialog" aria-labelledby="edit-menu" data-backdrop="static" style="display: none;" aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Chuyển bài viết</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    </button>
                </div>
                <form id="form-transfer-category" action="{{ $listUrl['store-transfer'] }}" enctype="multipart/form-data">
                    <div class="modal-body font-weight-bold">
                        @csrf
                        <div class="form-group">
                            <label>Chọn loại chuyển</label>
                            <div class="kt-radio-inline">
                                <label class="kt-radio">
                                    <input type="radio" name="transfer-type" checked value="role"> Theo vai trò
                                    <span></span>
                                </label>
                                <label class="kt-radio">
                                    <input type="radio" name="transfer-type" value="user"> Theo người đùng
                                    <span></span>
                                </label>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="role-select" class="form-control-label">Chọn vai trò</label>
                            <select class="form-control" id="role-select" style="width:100%" data-url="{{ route('rbac.roles.select') }}"></select>
                        </div>
                        <div class="form-group" style="display: none">
                            <label for="user-select" class="form-control-label">Chọn người dùng</label>
                            <select class="form-control" id="user-select" style="width:100%" data-url="{{ route('users.select2') }}"></select>
                        </div>
                        <div class="form-group">
                            <label for="note" class="form-control-label">Ghi chú cho người nhận</label>
                            <textarea rows="6" class="form-control" id="note"></textarea>
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

    <div class="modal fade" id="modal-send-back" role="dialog" aria-labelledby="edit-menu" data-backdrop="static" style="display: none;" aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Trả bài viết</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    </button>
                </div>
                <form id="form-send-back" action="{{ $listUrl['store-transfer'] }}" enctype="multipart/form-data">
                    <div class="modal-body font-weight-bold">
                        @csrf
                        <div class="form-group">
                            <label for="send-back-user-select" class="form-control-label">Chọn người dùng</label>
                            <select class="form-control" id="send-back-user-select" style="width:100%"></select>
                        </div>
                        <div class="form-group">
                            <label for="send-back-note" class="form-control-label">Ghi chú cho người nhận</label>
                            <textarea rows="6" class="form-control" id="send-back-note"></textarea>
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
@stop
@push('page-js')
    <script src="{{ asset('assets/js/pages/article-index-for-me.js') }}" type="text/javascript"></script>
@endpush

