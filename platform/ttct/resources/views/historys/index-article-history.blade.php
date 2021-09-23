@extends('base::layouts.master')
@section('content')
<style type="text/css">
    .datepicker-days {
        margin-top: 50px;
    }

    #number-page button {
        margin-left: 5px;
    }

    #old-content {
        text-align: center;
        border-right: 4px solid silver;
    }

    #old-content img {
        width: 300px;
    }

    #new-content {
        text-align: center;
    }

    #new-content img {
        width: 300px;
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
                <a href="" class="kt-subheader__breadcrumbs-link">Lịch sử cập nhật tin bài </a>
                <span class="kt-subheader__breadcrumbs-separator"></span>
                <a href="" class="kt-subheader__breadcrumbs-link">Tin đã xử lý</a>
            </div>
        </div>
    </div>
    <div class="kt-content kt-grid__item kt-grid__item--fluid" id="kt_content">
        <div class="kt-portlet kt-portlet--mobile">
            <div class="kt-portlet__head kt-portlet__head--lg">
                <div class="kt-portlet__head-label">
                    <h3 class="kt-portlet__head-title text-uppercase">Lịch sử cập nhật tin bài </h3>
                </div>
            </div>
            <div class="kt-portlet__body">
                <div class="modal fade bd-show-list-history-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true" >
                    <div class="modal-dialog modal-lg">
                        <div class="modal-content">
                            <div class="col-md-12" style="text-align: center;">
                                <label class="col-form-label" id="title"></label>
                                <div class="">
                                    <button class="btn btn-primary" id="revertDataBtn">Revert</button>
                                </div>
                                <div class="form-control">
                                    <label class="col-form-label">Xem bản sửa thứ : </label>
                                </div>
                                <div class="form-control" style="border:0px solid white" id="number-page"></div>
                            </div>
                            <div class="row">
                                <div class="col-md-6">
                                    <label class="col-form-label">Thời gian chỉnh sửa : </label>
                                    <input readonly id="time-published" class="form-control">
                                </div>
                                <div class="col-md-6">
                                    <label class="col-form-label">Cập nhật bởi :</label>
                                    <input readonly id="editor-name" class="form-control">
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label for="recipient-name" class="col-form-label">Chủ đề cũ:</label>
                                        <select id="select-old-themes" class="form-control" multiple></select>
                                    </div>
                                    <div class="form-group">
                                        <label for="message-text" class="col-form-label">Tags cũ :</label>
                                        <select id="select-old-tags" class="form-control" multiple></select>
                                    </div>
                                    <div class="form-group">
                                        <label class="col-form-label">Nội dung cũ</label>
                                        <div class="content" id="old-content"></div>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label for="recipient-name" class="col-form-label">Chủ đề mới:</label>
                                        <select id="select-new-themes" class="form-control" multiple></select>
                                    </div>
                                    <div class="form-group">
                                        <label for="message-text" class="col-form-label">Tags mới:</label>
                                        <select id="select-new-tags" class="form-control" multiple></select>
                                    </div>
                                    <div class="form-group">
                                        <label class="col-form-label">Nội dung mới </label>
                                        <div class="content" id="new-content"></div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                <div class="kt-form kt-form--label-right kt-margin-t-20 kt-margin-b-10">
                    <div class="row align-items-center">
                        <div class="col-11">
                            <div class="col-xl-12">
                                <div class="row align-items-center">
                                    <div class="col-md-5 kt-margin-b-20-tablet-and-mobile">
                                        <div class="kt-input-icon kt-input-icon--left">
                                            <input type="text" class="form-control search " placeholder="Tên bài viết" id="search-title">
                                            <span class="kt-input-icon__icon kt-input-icon__icon--left"><span><i class="la la-search"></i></span></span>
                                        </div>
                                    </div>
                                    <div class="col-md-3 kt-margin-b-20-tablet-and-mobile">
                                        <div class="kt-form__group">
                                            <input type="text" class="form-control search" placeholder="User Name" id="search-editor">
                                        </div>
                                    </div>
                                    <div class="col-md-3 kt-margin-b-20-tablet-and-mobile">
                                        <div class="kt-form__group">
                                            <input type="text" class="form-control search" placeholder="ID" id="search-id">
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div id="article-history-table"></div>
            <div class="kt-portlet__body kt-portlet__body--fit">
                <div class="kt-datatable" id="listUrl" datatable_url="{{$listUrl['datatable']}}" revert-data-url="{{$listUrl['revertDataUrl']}}" data-update-article-editor="" data-update-priority="" data-url="" data-edit=""></div>
            </div>
        </div>
    </div>
</div>
@stop
@push('page-js')
<script src="{{ asset('assets/js/pages/article-history-index.js') }}" type="text/javascript"></script>
@endpush