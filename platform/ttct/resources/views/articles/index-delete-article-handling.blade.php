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
                    <a href="" class="kt-subheader__breadcrumbs-link">Bài viết đang tạm giử </a>
                    <span class="kt-subheader__breadcrumbs-separator">Bài viết đang tạm giử</span>
                    <a href="" class="kt-subheader__breadcrumbs-link"> </a>
                </div>
            </div>
        </div>
        <div class="kt-content kt-grid__item kt-grid__item--fluid" id="kt_content">
            <div class="kt-portlet kt-portlet--mobile">
                <div class="kt-portlet__head kt-portlet__head--lg">
                    <div class="kt-portlet__head-label">
                        <h3 class="kt-portlet__head-title text-uppercase">Bài viết đang tạm giử</h3>
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
                                               <input type="text" class="form-control search " placeholder="Tên bài viết" id="search-key"  >
                                               <span class="kt-input-icon__icon kt-input-icon__icon--left"><span><i class="la la-search"></i></span></span>
                                           </div>
                                        </div>
                                        <div class="col-md-3 kt-margin-b-20-tablet-and-mobile">
                                          <div class="kt-form__group">
                                            <input type="text" class="form-control search" placeholder="Tên tác giả" id="search-author">
                                          </div>
                                        </div>
                                        <div class="col-md-3 kt-margin-b-20-tablet-and-mobile">
                                          <div class="kt-form__group">
                                            <input type="text" class="form-control search" placeholder="Mã trang" id="atex_page">
                                          </div>
                                        </div>
                                   </div>
                               </div>
                           </div>
                        </div>
                    </div>
                    
                </div>
                <div  class="kt_datatable">
                  
                </div>
                <div class="kt-portlet__body kt-portlet__body--fit">
                    <div class="kt-datatable" id="article-published-table" data-update-article-editor="" data-update-priority="" data-url="" data-edit=""></div>
                </div>
            </div>
        </div>
    </div>
   
@stop
@push('plugin-css')
<!-- <link href="{{asset('assets/css/pages/index-atex.css') }}" rel="stylesheet" type="text/css"/> -->
@endpush
@push('page-js')
 <!-- <script src="{{ asset('assets/js/pages/atex-index.js') }}" type="text/javascript"></script> -->
@endpush