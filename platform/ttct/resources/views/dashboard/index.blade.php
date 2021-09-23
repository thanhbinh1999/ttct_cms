@extends('base::layouts.master')

@section('content')
    <div class="kt-grid__item kt-grid__item--fluid kt-grid kt-grid--hor">
        <div class="kt-subheader   kt-grid__item" id="kt_subheader">
            <div class="kt-subheader__main">
                <span class="kt-subheader__separator kt-hidden"></span>
                <div class="kt-subheader__breadcrumbs">
                    <a href="#" class="kt-subheader__breadcrumbs-home">
                        <i class="flaticon2-shelter"></i>
                        Bảng điều khiển
                    </a>
                </div>
            </div>
        </div>
        <div class="kt-content kt-grid__item kt-grid__item--fluid" id="kt_content"
             data-url="{{ $listUrl['get-data-analytic'] }}">
            <div class="kt-portlet">
                <div class="kt-portlet__body  kt-portlet__body--fit">
                    <div class="row row-no-padding row-col-separator-xl">
                        <div class="col-md-12 col-lg-6 col-xl-3">
                            <div class="kt-widget24">
                                <div class="kt-widget24__details">
                                    <div class="kt-widget24__info">
                                        <h4 class="kt-widget24__title">
                                            <a href="{{ route('ttct.articles.article_publish_show') }}" style="color: black;text-decoration: none">Tổng số bài viết đã xuất bản</a>
                                        </h4>
                                        <span class="kt-widget24__desc"></span>
                                    </div>
                                    <span class="kt-widget24__stats kt-font-brand" id="total_article_published">0</span>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-12 col-lg-6 col-xl-3">
                            <div class="kt-widget24">
                                <div class="kt-widget24__details">
                                    <div class="kt-widget24__info">
                                        <h4 class="kt-widget24__title">
                                            <a href="{{ route('ttct.categories.show_category') }}" style="color: black;text-decoration: none">Tổng số chuyên mục</h4>
                                        </h4>
                                        <span class="kt-widget24__desc"></span>
                                    </div>
                                    <span class="kt-widget24__stats kt-font-warning" id="total_category">0</span>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-12 col-lg-6 col-xl-3">
                            <div class="kt-widget24">
                                <div class="kt-widget24__details">
                                    <div class="kt-widget24__info">
                                        <h4 class="kt-widget24__title">
                                            <a href="{{ route('ttct.topical.show_topical') }}" style="color: black;text-decoration: none">Tổng số chuyên đề</h4>
                                        </h4>
                                        <span class="kt-widget24__desc">
														</span>
                                    </div>
                                    <span class="kt-widget24__stats kt-font-danger" id="total_topical"></span>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-12 col-lg-6 col-xl-3">
                            <div class="kt-widget24">
                                <div class="kt-widget24__details">
                                    <div class="kt-widget24__info">
                                        <h4 class="kt-widget24__title">
                                            <a href="{{ route('ttct.tags.show_theme') }}" style="color: black;text-decoration: none">Tổng số chủ đề</a>
                                        </h4>
                                        <span class="kt-widget24__desc">
														</span>
                                    </div>
                                    <span class="kt-widget24__stats kt-font-success" id="total_theme">0</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row row-no-padding row-col-separator-xl">
                <div class="col-xl-12">
                    <div class="kt-portlet kt-portlet--height-fluid">
                        <div class="kt-widget14">
                            <div class="kt-widget14__header kt-margin-b-30">
                                <h3 class="kt-widget14__title text-uppercase">
                                    Thống kê bài viết theo chuyên mục
                                </h3>
                            </div>
                            <div class="kt-widget14__chart">
                                <canvas id="chart-categories" height="100"></canvas>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row row-no-padding row-col-separator-xl">
                <div class="col-xl-12">
                    <div class="kt-portlet kt-portlet--height-fluid">
                        <div class="kt-widget14">
                            <div class="kt-widget14__header kt-margin-b-30">
                                <h3 class="kt-widget14__title text-uppercase">
                                    Thống kê bài viết theo chuyên đề
                                </h3>
                            </div>
                            <div class="kt-widget14__chart">
                                <canvas id="chart-topical" height="100"></canvas>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row row-no-padding row-col-separator-xl">
                <div class="col-xl-12">
                    <div class="kt-portlet kt-portlet--height-fluid">
                        <div class="kt-widget14">
                            <div class="kt-widget14__header kt-margin-b-30">
                                <h3 class="kt-widget14__title text-uppercase">
                                    Thống kê bài viết theo chủ đề
                                </h3>
                            </div>
                            <div class="kt-widget14__chart">
                                <canvas id="chart-themes"></canvas>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row row-no-padding row-col-separator-xl">
                <div class="col-xl-12">
                    <div class="kt-portlet kt-portlet--height-fluid">
                        <div class="kt-widget14">
                            <div class="kt-widget14__header kt-margin-b-30">
                                <h3 class="kt-widget14__title text-uppercase">
                                    Số bài viết được tạo trong 7 ngày trở lại
                                </h3>
                            </div>
                            <div class="kt-widget14__chart">
                                <canvas id="chart-article-create-last-7-days"></canvas>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-xl-6">
                    <div class="kt-portlet kt-portlet--height-fluid kt-portlet--mobile ">
                        <div
                            class="kt-portlet__head kt-portlet__head--lg kt-portlet__head--noborder kt-portlet__head--break-sm">
                            <div class="kt-portlet__head-label">
                                <h3 class="kt-portlet__head-title text-uppercase">
                                    Bài viết nháp
                                </h3>
                            </div>
                        </div>
                        <div class="kt-portlet__body kt-portlet__body--fit">
                            <div class="kt-datatable" id="dashboard-draft-table" data-show="{{ $listUrl['show'] }}"
                                 data-edit="{{ route('ttct.articles.edit',1) }}"
                                 data-url="{{ $listUrl['datatable'] }}"></div>
                        </div>
                    </div>
                </div>
                <div class="col-xl-6">
                    <div class="kt-portlet kt-portlet--height-fluid kt-portlet--mobile ">
                        <div
                            class="kt-portlet__head kt-portlet__head--lg kt-portlet__head--noborder kt-portlet__head--break-sm">
                            <div class="kt-portlet__head-label">
                                <h3 class="kt-portlet__head-title text-uppercase">
                                    Bài viết đã xuất bản gần đây
                                </h3>
                            </div>
                        </div>
                        <div class="kt-portlet__body kt-portlet__body--fit">
                            <div class="kt-datatable" id="dashboard-published-table" data-show="{{ $listUrl['show'] }}"
                                 data-edit="{{ route('ttct.articles.edit',1) }}"
                                 data-url="{{ $listUrl['datatable-publish'] }}"></div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-xl-12">
                    <div class="kt-portlet kt-portlet--height-fluid kt-portlet--mobile ">
                        <div
                            class="kt-portlet__head kt-portlet__head--lg kt-portlet__head--noborder kt-portlet__head--break-sm">
                            <div class="kt-portlet__head-label">
                                <h3 class="kt-portlet__head-title text-uppercase">
                                    Thống kê bài viết tạo bởi người dùng
                                </h3>
                            </div>
                        </div>
                        <div class="kt-portlet__body kt-portlet__body--fit">
                            <div class="kt-datatable" id="dashboard-article-by-user-table" data-users='{{ json_encode($users) }}'></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
@stop
@push('plugin-js')
    <script src="https://www.chartjs.org/dist/2.9.3/Chart.min.js" type="text/javascript"></script>
@endpush
@push('page-js')
    <script src="{{ asset('assets/js/pages/dashboard.js') }}" type="text/javascript"></script>
@endpush
