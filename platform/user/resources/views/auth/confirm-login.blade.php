@extends('base::layouts.master-auth')

@section('content')
    <div class="kt-login__logo">
        <a href="#">
            <img src="{{ asset('assets/media/logos/logo-5.png') }}">
        </a>
    </div>
    <div class="kt-login__signin">
        <div class="kt-login__head">
            <h3 class="kt-login__title">Đăng nhập vào TTCT Admin</h3>
        </div>
        <form class="kt-form" action="{{ route('user.confirm_login') }}" method="post">
            {{ csrf_field() }}
            <div class="form-group row @error('token'){{ 'is-invalid'  }}@enderror">
                <div class="col-12">
                    <input type="text" class="form-control @error('token'){{ 'is-invalid'  }}@enderror" name="token" placeholder="Token" value="{{ old('username') }}">
                    @error('token')
                    <div class="error invalid-feedback">{{ $message }}</div>
                    @enderror
                </div>
            </div>
            <div class="kt-login__actions">
                <button id="kt_login_signin_submit" class="btn btn-brand btn-elevate kt-login__btn-primary">Đăng Nhập</button>
            </div>
        </form>
    </div>
@stop
