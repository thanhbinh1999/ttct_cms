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
                    <a href="#" class="kt-subheader__breadcrumbs-home">
                        <i class="flaticon2-shelter"></i>
                    </a>
                    <span class="kt-subheader__breadcrumbs-separator"></span>
                    <a href="" class="kt-subheader__breadcrumbs-link">Bình luận chờ xuất bản</a>
                </div>
            </div>
            <div class="kt-subheader__toolbar" style="display: none">
                <div class="kt-subheader__wrapper">
                    @can('comment-publish')<button class="btn btn-success" id="bulk-publish" data-url="{{ route('comments.publish') }}"><i class="la la-check"></i> Bulk xuất bản</button>@endcan
                    @can('comment-send-back')<button class="btn btn-info" id="bulk-send-back" data-url="{{ route('comments.send_back') }}"><i class="la la-undo"></i> Bulk trả lại</button>@endcan
                    @can('comment-delete')<button class="btn btn-warning btn-md" id="bulk-delete" data-url="{{ route('comments.delete') }}"><i class="la la-close"></i>Bulk xóa</button>@endcan
                </div>
            </div>
        </div>
        <div class="kt-content kt-grid__item kt-grid__item--fluid" id="kt_content">
            <div class="kt-portlet kt-portlet--mobile">
                <div class="kt-portlet__head kt-portlet__head--lg">
                    <div class="kt-portlet__head-label">
                        <h3 class="kt-portlet__head-title text-uppercase">Bình luận chờ xuất bản</h3>
                    </div>
                </div>
                <div class="kt-portlet__body">
                    <div class="kt-form kt-form--label-right kt-margin-t-20 kt-margin-b-10">
                        <div class="row align-items-center">
                            <div class="col-11">
                                <div class="col-xl-12">
                                    <div class="row align-items-center">
                                        <div class="col-md-3 kt-margin-b-20-tablet-and-mobile">
                                            <div class="kt-input-icon kt-input-icon--left">
                                                <input type="text" class="form-control" placeholder="Tên tác giả" id="search-key">
                                                <span class="kt-input-icon__icon kt-input-icon__icon--left"><span><i class="la la-search"></i></span></span>
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
                                        <div class="col-md-4 kt-margin-b-20-tablet-and-mobile">
                                            <div class="row">
                                                <div class="col-12">
                                                    <select class="form-control bootstrap-select" id="search-category" data-url="{{ $listUrl['select-category'] }}">
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-xl-12 mt-5">
                                    <div class="row align-items-center">
                                        <div class="col-md-3 kt-margin-b-20-tablet-and-mobile">
                                            <div class="form-group row">
                                                <label for="search-to" class="col-form-label col-3">Sắp xếp</label>
                                                <div class="col-9">
                                                    <select class="form-control" id="search-sort">
                                                        <option value="desc" selected>Mới nhất</option>
                                                        <option value="asc">Cũ nhất</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-3 kt-margin-b-20-tablet-and-mobile">
                                            <div class="form-group row">
                                                <label for="search-to" class="col-form-label col-5">Được duyệt bởi</label>
                                                <div class="col-7">
                                                    <select class="form-control" id="search-user">
                                                        <option value="{{ auth()->user()->id }}" selected>Tôi</option>
                                                        <option value="all">Tất cả</option>
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
                    <div class="kt-datatable" id="comment-publish-table" data-url="{{ route('comments.datatable') }}"></div>
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
    <script src="{{ asset('assets/js/pages/comment-publish.js') }}" type="text/javascript"></script>
@endpush
