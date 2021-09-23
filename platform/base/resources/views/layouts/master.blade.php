@extends('base::layouts.base')

@section('body-class','kt-header--fixed kt-header-mobile--fixed kt-subheader--fixed kt-subheader--enabled kt-subheader--solid kt-aside--enabled kt-aside--fixed kt-page--loading')
@push('page-css')
    <link href="{{ asset('assets/vendors/custom/fullcalendar/fullcalendar.bundle.css') }}" rel="stylesheet" type="text/css" />
@endpush

@section('page')
    <!-- begin:: Page -->

    <!-- begin:: Header Mobile -->
    @include('base::layouts.components.header-moble')
    <!-- end:: Header Mobile -->

    <div class="kt-grid kt-grid--hor kt-grid--root">
        <div class="kt-grid__item kt-grid__item--fluid kt-grid kt-grid--ver kt-page">

            <!-- begin:: Aside -->
            @include('base::layouts.components.sidebar')
            <!-- end:: Aside -->

            <div class="kt-grid__item kt-grid__item--fluid kt-grid kt-grid--hor kt-wrapper" id="kt_wrapper">

                <!-- begin:: Header -->
                @include('base::layouts.components.header')
                <!-- end:: Header -->

                @yield('content')

                <!-- begin:: Footer -->
                @include('base::layouts.components.footer')
                <!-- end:: Footer -->
            </div>
        </div>
    </div>

    <!-- end:: Page -->
    <!-- begin::Scrolltop -->
    @include('base::layouts.components.scroll-top')
    <!-- end::Scrolltop -->
@stop
