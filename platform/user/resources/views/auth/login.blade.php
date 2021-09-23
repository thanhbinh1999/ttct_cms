@extends('base::layouts.master-auth')

@section('content')
    <div class="kt-login__logo">
        <a href="#">
            <img src="{{ asset('assets/img/logo.png') }}" style="height: 100px">
        </a>
    </div>
    <div class="kt-login__signin">
        <div class="kt-login__head">
            <h3 class="kt-login__title">Đăng nhập</h3>
        </div>
        <form class="kt-form" action="{{ route('user.login') }}" method="post">
            {{ csrf_field() }}
            <div class="form-group row @error('username'){{ 'is-invalid'  }}@enderror">
                <div class="col-12">
                    <input type="text" class="form-control @error('username'){{ 'is-invalid'  }}@enderror" name="username" placeholder="Tên đăng nhập" value="{{ old('username') }}">
                    @error('username')
                    <div id="email-error" class="error invalid-feedback">{{ $message }}</div>
                    @enderror
                </div>
            </div>
            <div class="form-group row @error('password'){{ 'is-invalid'  }}@enderror">
                <div class="col-12">
                    <input type="password" class="form-control @error('password'){{ 'is-invalid'  }}@enderror" name="password" placeholder="Mật khẩu">
                    @error('password')
                    <div id="email-error" class="error invalid-feedback">{{ $message }}</div>
                    @enderror
                </div>
            </div>
            <div class="row kt-login__extra">
                <div class="col">
                    <label class="kt-checkbox">
                        <input type="checkbox" name="remember"> Nhớ đăng nhập
                        <span></span>
                    </label>
                </div>
                <div class="col kt-align-right">
                    <a href="javascript:;" id="kt_login_forgot" class="kt-login__link">Quên mật khẩu?</a>
                </div>
            </div>
            <div class="kt-login__actions">
                <button id="kt_login_signin_submit" class="btn btn-brand btn-elevate kt-login__btn-primary">Đăng Nhập</button>
            </div>
        </form>
    </div>
@stop
