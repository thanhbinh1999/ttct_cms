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
                <a href="{{ route('ttct.articles.article_publish_show') }}" class="kt-subheader__breadcrumbs-link">Bài viết</a>
                <span class="kt-subheader__breadcrumbs-separator"></span>
                <a href="" class="kt-subheader__breadcrumbs-link">Bài viết đã xuất bản</a>
            </div>
        </div>
    </div>
    <div class="kt-content kt-grid__item kt-grid__item--fluid" id="kt_content">
        <div class="kt-portlet kt-portlet--mobile">
            <div class="kt-portlet__head kt-portlet__head--lg">
                <div class="kt-portlet__head-label">
                    <h3 class="kt-portlet__head-title text-uppercase">Bài viết đã xuất bản</h3>
                </div>
                <div class="kt-portlet__head-toolbar">
                    <div class="kt-portlet__head-wrapper">
                        @can('article-create')
                        <div class="dropdown dropdown-inline">
                            <a href="{{ route('ttct.articles.create') }}" class="btn btn-brand btn-icon-sm">
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
                        <div class="col-11">
                            <div class="col-xl-12">
                                <div class="row align-items-center">
                                    <div class="col-md-5 kt-margin-b-20-tablet-and-mobile">
                                        <div class="kt-input-icon kt-input-icon--left">
                                            <input type="text" class="form-control" placeholder="Tên bài viết" id="search-key">
                                            <span class="kt-input-icon__icon kt-input-icon__icon--left"><span><i class="la la-search"></i></span></span>
                                        </div>
                                    </div>
                                    <div class="col-md-3 kt-margin-b-20-tablet-and-mobile">
                                        <div class="kt-form__group">
                                            <input type="text" class="form-control" placeholder="Tên tác giả" id="search-author">
                                        </div>
                                    </div>
                                    <div class="col-md-2 kt-margin-b-20-tablet-and-mobile">
                                        <div class="kt-form__group kt-form__group--inline">
                                            <div class="kt-form__label">
                                                <label for="search-from">Từ</label>

                                            </div>
                                            <div class="kt-form__control">
                                                <input class="form-control" id="search-from">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-2 kt-margin-b-20-tablet-and-mobile">
                                        <div class="kt-form__group kt-form__group--inline">
                                            <div class="kt-form__label">
                                                <label for="search-to">Đến</label>
                                            </div>
                                            <div class="kt-form__control">
                                                <input class="form-control" id="search-to">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-xl-12 mt-5">
                                <div class="row align-items-center">

                                    <div class="col-md-4 kt-margin-b-20-tablet-and-mobile">
                                        <div class="row">
                                            <div class="col-12">
                                                <input class="form-control" id="search-to-id" placeholder="Nhập ID">
                                            </div>

                                        </div>
                                    </div>

                                    <div class="col-md-4 kt-margin-b-20-tablet-and-mobile">
                                        <div class="row">
                                            <div class="col-12">
                                                <select class="form-control bootstrap-select" id="search-category" data-url="{{ $listUrl['select-category'] }}">
                                                </select>
                                            </div>

                                        </div>
                                    </div>
                                    <div class="col-md-4 kt-margin-b-20-tablet-and-mobile">
                                        <div class="row">
                                            <div class="col-12">
                                                <select class="form-control bootstrap-select" id="search-theme" data-url="{{ $listUrl['select-theme'] }}">
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-4 kt-margin-b-20-tablet-and-mobile" style="margin-top: 20px;">
                                        <div class="row">
                                            <div class="col-10">
                                                <select class="form-control bootstrap-select" id="search-creator" data-url="{{ route('users.select2') }}">
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-1">
                            <div class="col-md-1 kt-margin-b-20-tablet-and-mobile">
                                <div class="kt-form__group kt-form__group--inline">
                                    <button class="btn btn-brand btn-icon" id="search"><i class="fa fa-search"></i></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="kt-portlet__body kt-portlet__body--fit">
                <div class="kt-datatable" id="article-published-table" data-update-article-editor="{{ $listUrl['update-article-editor'] }}" data-update-priority="{{ $listUrl['update-priority-one'] }}" data-url="{{ $listUrl['datatable'] }}" data-edit="{{ route('ttct.articles.edit',1) }}"></div>
            </div>
        </div>
    </div>
</div>

@can('article-create')
<div class="modal fade bd-modal-theme" id="modal-update-theme" role="dialog"  tabindex="-1" aria-hidden="true" >
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Cập nhật chủ đề</h5><br>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                </button>
            </div>
            <div class='row'>
                <div class="col-md-5">
                    <div class="dd">
                        <ol class="dd-list"></ol>
                    </div>
                </div>
                <div class="col-md-5" style="margin:10px 0 0 400px;position:absolute">
                    <select style="margin-top: 40px" id="search-multiple-theme" class=" form-control " name="tags"></select>
                    <button id="add-new-theme-btn" type="submit" class="btn btn-secondary"  style="margin-left:5px;position:absolute"><i class="fa fa-save"></i>Thêm</button>
                </div>
            </div>
            <div class=" modal-footer" style="height:60px">
            <button type="submit" class="btn btn-primary" id="save-theme"  style="margin-right: 700px;position:absolute"><i class="fa fa-save"></i>Lưu</button>
        </div>
        </div>
      
    </div>
</div>
@endcan
@stop
@push('plugin-css')
<link href="{{ asset('assets/vendors/general/nestable/nestable.css') }}" rel="stylesheet" type="text/css" />
@endpush
@push('plugin-js')
<script src="{{ asset('assets/vendors/general/nestable/jquery.nestable.js')}}" type="text/javascript"></script>
@endpush
@push('page-js')
<script src="{{ asset('assets/js/pages/article-index-published.js') }}" type="text/javascript"></script>
@endpush