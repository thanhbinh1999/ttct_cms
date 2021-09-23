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
    <div class="kt-subheader   kt-grid__item" id="kt_subheader">
        <div class="kt-subheader__main">
            <span class="kt-subheader__separator kt-hidden"></span>
            <div class="kt-subheader__breadcrumbs">
                <a href="{{ route('ttct.dashboard') }}" class="kt-subheader__breadcrumbs-home">
                    <i class="flaticon2-shelter"></i>
                </a>
                <span class="kt-subheader__breadcrumbs-separator"></span>
                <a href="" class="kt-subheader__breadcrumbs-link">Biên tập bài nổi bật</a>
            </div>
        </div>
    </div>
    <div class="kt-content kt-grid__item kt-grid__item--fluid" id="kt_content">
        <div class="row">
            <div class="col-xl-8">
                <div class="kt-portlet kt-portlet--height-fluid kt-portlet--mobile ">
                    <div class="kt-portlet__head kt-portlet__head--lg kt-portlet__head--noborder kt-portlet__head--break-sm">
                        <div class="kt-portlet__head-label">
                            <h3 class="kt-portlet__head-title text-uppercase">
                                Biên tập bài nổi bật
                            </h3>
                        </div>
                    </div>
                    <div class="kt-portlet__body ">
                        <div id="sort-article-container" data-url="{{ $listUrl['prepare-data-priority'] }}"></div>
                    </div>
                    <div class="kt-portlet__body text-right">
                        <div class="form-group">
                            <button id="save" class="btn btn-success btn-md" data-url="{{ $listUrl['update-priority'] }}"><i class="fa fa-save"></i>Lưu</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-xl-4">
                <div class="kt-portlet kt-portlet--height-fluid kt-portlet--mobile ">
                    <div class="kt-portlet__head kt-portlet__head--lg kt-portlet__head--noborder kt-portlet__head--break-sm">
                        <div class="kt-portlet__head-label">
                            <h3 class="kt-portlet__head-title Biên tập bài nổi bật">
                                Chọn bài viết
                            </h3>
                        </div>
                    </div>
                    <div class="kt-portlet__body kt-portlet__body--fit">
                        <div class="kt-portlet__body">
                            <form id="form-create-menu-item" action="" class="kt-form">
                                <div class="form-group">
                                    <select class="form-control" id="select-article" data-url="{{ $listUrl['select-article'] }}"></select>
                                </div>
                                <div class="form-group">
                                    <button type="button" id="add-article" class="btn btn-success btn-md"><i class="la la-plus"></i>Thêm</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
@stop
@push('plugin-css')
<link href="{{ asset('assets/vendors/general/dropify/dist/css/dropify.css') }}" rel="stylesheet" type="text/css" />
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css">
<link href="{{ asset('assets/vendors/general/nestable/nestable.css') }}" rel="stylesheet" type="text/css" />
@endpush
@push('plugin-js')
<script src="{{ asset('assets/vendors/general/dropify/dist/js/dropify.js') }}" type="text/javascript"></script>
@endpush
@push('page-js')
<script src="{{ asset('assets/js/pages/article-index-priority.js') }}" type="text/javascript"></script>
@endpush