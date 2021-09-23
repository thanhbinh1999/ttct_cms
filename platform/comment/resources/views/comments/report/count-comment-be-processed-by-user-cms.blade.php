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
        .kt-datatable__row--even{
            border-top: 1px solid #00000021!important;
            border-bottom: 1px solid #00000021!important;
        }
    </style>
    <div class="kt-grid__item kt-grid__item--fluid kt-grid kt-grid--hor">
        <div class="kt-subheader kt-grid__item" id="kt_subheader">
            <div class="kt-subheader__main">
                <span class="kt-subheader__separator kt-hidden"></span>
                <div class="kt-subheader__breadcrumbs">
                    <a href="{{ route('ttct.dashboard') }}" class="kt-subheader__breadcrumbs-home">
                        <i class="flaticon2-shelter"></i>
                    </a>
                    <span class="kt-subheader__breadcrumbs-separator"></span>
                    <a href="" class="kt-subheader__breadcrumbs-link">Thống kê bình luận được xử lý bởi người dùng</a>
                </div>
            </div>
        </div>
        <div class="kt-content kt-grid__item kt-grid__item--fluid" id="kt_content">
            <div class="kt-portlet kt-portlet--mobile">
                <div class="kt-portlet__head kt-portlet__head--lg">
                    <div class="kt-portlet__head-label">
                        <h3 class="kt-portlet__head-title text-uppercase">Thống kê bình luận được xử lý bởi người dùng</h3>
                    </div>
                </div>
                <div class="kt-portlet__body">
                    <div class="kt-form kt-form--label-right kt-margin-t-20 kt-margin-b-10">
                        <div class="row align-items-center">
                            <div class="col-11">
                                <div class="col-xl-12">
                                    <div class="row align-items-left">
                                        <div class="col-md-2 kt-margin-b-20-tablet-and-mobile">
                                            <div class="kt-form__group kt-form__group--inline">
                                                <div class="kt-form__label">
                                                    <label for="search-from">Từ</label>
                                                </div>
                                                <div class="kt-form__control">
                                                    <input class="form-control" id="search-from" value="{{ date('d/m/Y',time()) }}">
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-2 kt-margin-b-20-tablet-and-mobile">
                                            <div class="kt-form__group kt-form__group--inline">
                                                <div class="kt-form__label">
                                                    <label for="search-to">Đến</label>
                                                </div>
                                                <div class="kt-form__control">
                                                    <input class="form-control" id="search-to" value="{{ date('d/m/Y',time()) }}">
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-3 kt-margin-b-20-tablet-and-mobile">
                                            <div class="kt-form__group">
                                                <select style="width: 100%" class="form-control bootstrap-select" id="search-category" data-url="{{ $listUrl['select-category'] }}">
                                                </select>
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
                    <div class="kt-datatable" id="comment-report-comment-be-processed-by-user-cms-table" data-url="{{ route('comments.count_comment_be_processed_by_user_cms_of_list_user_by_list_status') }}"></div>
                </div>
            </div>
        </div>
    </div>
@stop
@push('page-js')
    <script src="{{ asset('assets/js/pages/comment-report-count-comment-be-processed-by-user-cms.js') }}" type="text/javascript"></script>
@endpush
