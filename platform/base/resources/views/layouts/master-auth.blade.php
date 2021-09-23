@extends('base::layouts.base')

@section('body-class','kt-header--fixed kt-header-mobile--fixed kt-subheader--fixed kt-subheader--enabled kt-subheader--solid kt-aside--enabled kt-aside--fixed kt-page--loading')
@push('page-css')
    <link href="{{ asset('assets/app/custom/login/login-v3.default.css') }}" rel="stylesheet" type="text/css" />
@endpush
@section('page')
    <div class="kt-grid kt-grid--ver kt-grid--root">
        <div class="kt-grid kt-grid--hor kt-grid--root  kt-login kt-login--v3 kt-login--signin" id="kt_login">
            <div class="kt-grid__item kt-grid__item--fluid kt-grid kt-grid--hor" style="background-image: url({{ asset('assets/media/bg/bg-3.jpg') }});">
                <div class="kt-grid__item kt-grid__item--fluid kt-login__wrapper">
                    <div class="kt-login__container">
                        @yield('content')
                    </div>
                </div>
            </div>
        </div>
    </div>
@stop
