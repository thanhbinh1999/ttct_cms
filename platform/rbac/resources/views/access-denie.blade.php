@extends('base::layouts.base')
@section('page')
    <div class="kt-grid kt-grid--ver kt-grid--root">
        <div class="kt-grid__item kt-grid__item--fluid kt-grid  kt-error-v5"
             style="background-image: url({{ asset('assets/media/error/bg5.jpg') }});">
            <div class="kt-error_container">
					<span class="kt-error_title">
						<h1>Oops!</h1>
					</span>
                <p class="kt-error_subtitle">
                    Có lỗi xảy ra.
                </p>
                <p class="kt-error_description">
                    Bạn không có quyền truy cập chức năng này<br>
                    <a href="{{ route('ttct.dashboard') }}" class="mt-5 btn btn-success btn-elevate btn-pill btn-elevate-air"><strong>Quay về dashboard</strong></a><br>
                </p>
            </div>
        </div>
    </div>
@stop

@push('page-css')
    <link href="{{ asset('assets/app/custom/error/error-v5.default.css') }}" rel="stylesheet" type="text/css" />
@endpush
