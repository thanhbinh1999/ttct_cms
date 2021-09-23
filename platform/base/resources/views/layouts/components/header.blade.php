<div id="kt_header" class="kt-header kt-grid__item  kt-header--fixed ">

    <!-- begin:: Header Menu -->
    <button class="kt-header-menu-wrapper-close" id="kt_header_menu_mobile_close_btn"><i class="la la-close"></i>
    </button>
    <div class="kt-header-menu-wrapper" id="kt_header_menu_wrapper">
        <div id="kt_header_menu" class="kt-header-menu kt-header-menu-mobile  kt-header-menu--layout-default ">
            <ul class="kt-menu__nav ">

            </ul>
        </div>
    </div>
    <!-- end:: Header Menu -->

    <!-- begin:: Header Topbar -->
    <div class="kt-header__topbar">
        <div class="kt-header__topbar-item dropdown">
            <div class="kt-header__topbar-wrapper" data-toggle="dropdown" data-offset="30px,0px" aria-expanded="false">
									<span class="kt-header__topbar-icon kt-pulse kt-pulse--brand">
                                        <i class="flaticon-alert kt-font-info"></i>
                                        <span
                                            class="kt-badge kt-badge--rounded kt-badge--brand">{{ \Kuroneko\User\Classes\Helpers\UserHelper::countNotify() }}</span><span
                                            class="kt-pulse__ring"></span>
									</span>

            </div>
            <div
                class="dropdown-menu dropdown-menu-fit dropdown-menu-right dropdown-menu-anim dropdown-menu-top-unround dropdown-menu-lg"
                x-placement="bottom-end"
                style="position: absolute; will-change: transform; top: 0px; left: 0px; transform: translate3d(-246px, 64px, 0px);">
                <div class="kt-head kt-head--skin-dark kt-head--fit-x kt-head--fit-b"
                     style="background-image: url({{ asset('assets/media/misc/bg-1.jpg') }})">
                    <h3 class="kt-head__title">
                        Thông báo mới
                        &nbsp;
                        <span
                            class="btn btn-success btn-sm btn-bold btn-font-md">{{ \Kuroneko\User\Classes\Helpers\UserHelper::countNotify() }}</span>
                    </h3>
                    <ul class="nav nav-tabs nav-tabs-line nav-tabs-bold nav-tabs-line-3x nav-tabs-line-success kt-notification-item-padding-x"
                        role="tablist">
                    </ul>
                </div>
                <div class="tab-content">
                    <div class="tab-pane show active" id="topbar_notifications_notifications" role="tabpanel">
                        <div class="kt-notification kt-margin-t-10 kt-margin-b-10 kt-scroll ps ps--active-y"
                             data-scroll="true" data-height="300" data-mobile-height="200"
                             style="height: 300px; overflow: hidden;">
                            {!! \Kuroneko\User\Classes\Helpers\UserHelper::renderNotify() !!}

                            @if(\Kuroneko\User\Classes\Helpers\UserHelper::countNotify() > 0)
                            <a href="{{ route('users.show_notify') }}"  class="font-weight-bold" style="text-align: center!important; justify-content: center;align-items: center">
                                <p>Xem tất cả</p>
                            </a>
                            @endif
                            <div class="ps__rail-x" style="left: 0px; bottom: -10px;">
                                <div class="ps__thumb-x" tabindex="0" style="left: 0px; width: 0px;"></div>
                            </div>
                            <div class="ps__rail-y" style="top: 10px; right: 0px; height: 300px;">
                                <div class="ps__thumb-y" tabindex="0" style="top: 3px; height: 108px;"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="kt-header__topbar-item kt-header__topbar-item--quick-panel" data-toggle="kt-tooltip" title=""
             data-placement="right" data-original-title="Xem trang web">
            <span class="kt-header__topbar-icon" id="kt_quick_panel_toggler_btn">
                <a href="{{ env('WEB_BASE_URL') }}" target="_blank"><i class="la la-internet-explorer kt-font-info"></i></a>
            </span>
        </div>
        <div class="kt-header__topbar-item kt-header__topbar-item--user">
            <div class="kt-header__topbar-wrapper" data-toggle="dropdown" data-offset="0px,0px">
                <div class="kt-header__topbar-user">
                    <span class="kt-header__topbar-welcome kt-hidden-mobile">Hi,</span>
                    <span class="kt-header__topbar-username kt-hidden-mobile">{{ auth_full_name() }}</span>
                    <img alt="Pic" src="{{ auth_avatar() }}"/>
                </div>
            </div>
            <div
                class="dropdown-menu dropdown-menu-fit dropdown-menu-right dropdown-menu-anim dropdown-menu-top-unround dropdown-menu-xl">
                <div class="kt-user-card kt-user-card--skin-dark kt-notification-item-padding-x"
                     style="background-image: url({{ asset('assets/media/misc/bg-1.jpg') }})">
                    <div class="kt-user-card__avatar">
                        <img alt="Pic" src="{{ auth_avatar() }}"/>
                    </div>
                    <div class="kt-user-card__name" id="user-info" data-role-id="{{ auth_role()->id }}"
                         data-role-name="{{ auth_role()->name }}" data-id="{{ auth()->user()->id }}"
                         data-full-name="{{ auth_full_name() }}" data-username="{{ auth()->user()->username }}">
                        {{ auth_full_name() }}
                        <br>
                        {{ auth_role()->description }}
                    </div>
                </div>

                <!--end: Head -->

                <!--begin: Navigation -->
                <div class="kt-notification">
                    <a href="{{ route('users.profile') }}" class="kt-notification__item">
                        <div class="kt-notification__item-icon">
                            <i class="flaticon2-calendar-3 kt-font-success"></i>
                        </div>
                        <div class="kt-notification__item-details">
                            <div class="kt-notification__item-title kt-font-bold">
                                Cập nhật profile
                            </div>
                            <div class="kt-notification__item-time">
                                Cập nhật profile
                            </div>
                        </div>
                    </a>
                    <a href="#" class="kt-notification__item">
                        <div class="kt-notification__item-icon">
                            <i class="flaticon2-settings kt-font-warning"></i>
                        </div>
                        <div class="kt-notification__item-details">
                            <div class="kt-notification__item-title kt-font-bold">
                                Đổi mật khẩu
                            </div>
                            <div class="kt-notification__item-time">
                                Đổi mật khẩu
                            </div>
                        </div>
                    </a>
                    <div class="kt-notification__custom">
                        <form action="{{ route('user.logout') }}" method="post">
                            {{ csrf_field() }}
                            <a id="auth-logout" href="#" class="btn btn-label-brand btn-sm btn-bold">Đăng xuất</a>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
