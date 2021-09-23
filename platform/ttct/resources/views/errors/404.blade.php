@extends('base::layouts.base')
@section('page')
    <div class="kt-grid kt-grid--ver kt-grid--root">
        <div class="kt-grid__item kt-grid__item--fluid kt-grid kt-error-v4" style="background-image: url({{ asset('assets/media/error/bg4.jpg') }});">
            <div class="kt-error_container">
                <h1 class="kt-error_number">
                    404
                </h1>
                <p class="kt-error_title">
                    ERROR
                </p>
                <p class="kt-error_description">
                    Opps, trang bạn yêu cầu không tồn tại <br>
                    <a href="{{ route('ttct.dashboard') }}" class="mt-5 btn btn-success btn-elevate btn-pill btn-elevate-air"><strong>Quay về dashboard</strong></a><br>
                </p>
            </div>
        </div>
    </div>
@stop

@push('page-css')
    <link href="{{ asset('assets/app/custom/error/error-v4.default.css') }}" rel="stylesheet" type="text/css" />
@endpush
