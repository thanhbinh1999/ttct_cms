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
                    <a href="" class="kt-subheader__breadcrumbs-link">Thống kê bình luận</a>
                </div>
            </div>
        </div>
        <div class="kt-content kt-grid__item kt-grid__item--fluid" id="kt_content">
            <div class="kt-portlet kt-portlet--mobile">
                <div class="kt-portlet__head kt-portlet__head--lg">
                    <div class="kt-portlet__head-label">
                        <h3 class="kt-portlet__head-title text-uppercase">Thống kê bình luận</h3>
                    </div>
                </div>
                <div class="kt-portlet__body">
                    <div class="kt-form kt-form--label-right kt-margin-t-20 kt-margin-b-10">
                        <div class="row align-items-center">
                            <div class="col-11">
                                <div class="col-xl-12">
                                    <div class="row align-items-left">
                                        <div class="col-md-5 kt-margin-b-20-tablet-and-mobile">
                                            <div class="form-group row" style="margin-bottom: 0px">
                                                <label for="search-to" class="col-form-label col-3">Loại thống kê</label>
                                                <div class="col-8">
                                                    <select class="form-control" id="search-type">
                                                        <option value="total-comment" selected>Tổng lượt bình luận</option>
                                                        <option value="count-comment-be-processed-by-user-cms">Số bình luận được xử lý bởi người dùng</option>
                                                        <option value="count-comment-by-list-cat">Số bình luận theo chủ đề</option>
                                                        <option value="count-comment-by-author">Người bình luận</option>
                                                        <option value="most-comment-published">Bài viết có số bình luận được xuất bản nhiều nhất</option>
                                                        <option value="most-comment">Bài viết có số số bình luận nhiều nhất</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
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
                    <div class="kt-datatable" id="comment-report-table" data-total-comment="{{ route('comments.most_count_comment') }}"></div>
                </div>
            </div>
        </div>
    </div>
    @can('comment-view-log')
        <div class="modal fade" id="modal-view-log-comment" role="dialog" aria-labelledby="modal-view-log-comment" data-backdrop="static" style="display: none;" aria-hidden="true">
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Log comment</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        </button>
                    </div>
                    <div class="modal-body">
                        <table class="table" id="table-log-comment">
                            <thead class="thead-light">
                            <tr class="text-center">
                                <th>Người thực hiện</th>
                                <th>Hành động</th>
                                <th>Thời gian</th>
                                <th>THay đổi nội dung</th>
                                <th>Thay đổi tên tác giả</th>
                                <th>IP</th>
                            </tr>
                            </thead>
                            <tbody>

                            </tbody>
                        </table>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Đóng</button>
                    </div>
                </div>
            </div>
        </div>
    @endcan
@stop
@push('page-js')
    <script src="{{ asset('assets/js/pages/comment-report.js') }}" type="text/javascript"></script>
@endpush
