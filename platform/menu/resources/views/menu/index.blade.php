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
                    <a href="" class="kt-subheader__breadcrumbs-link">{{ __('menu::menu.menu') }}</a>
                </div>
            </div>
        </div>
        <div class="kt-content kt-grid__item kt-grid__item--fluid" id="kt_content">
            <div class="kt-portlet kt-portlet--mobile">
                <div class="kt-portlet__head kt-portlet__head--lg">
                    <div class="kt-portlet__head-label">
                        <h3 class="kt-portlet__head-title">{{ __('menu::menu.menu') }}</h3>
                    </div>
                    <div class="kt-portlet__head-toolbar">
                        <div class="kt-portlet__head-wrapper">
                            @can('menu-create')
{{--                            <div class="dropdown dropdown-inline">--}}
{{--                                <button type="button" class="btn btn-brand btn-icon-sm" data-toggle="modal" data-target="#model-create-menu">--}}
{{--                                    <i class="flaticon2-plus"></i> {{ __('menu::menu.create') }}--}}
{{--                                </button>--}}
{{--                            </div>--}}
                            @endcan
                        </div>
                    </div>
                </div>
                <div class="kt-portlet__body">
                    <div class="kt-form kt-form--label-right kt-margin-t-20 kt-margin-b-10">
                        <div class="row align-items-center">
                            <div class="col-xl-8 order-2 order-xl-1">
                                <div class="row align-items-center">
                                    <div class="col-md-4 kt-margin-b-20-tablet-and-mobile">
                                        <div class="kt-input-icon kt-input-icon--left">
                                            <input type="text" class="form-control" placeholder="{{ __('menu::menu.search') }}..." id="search-key">
                                            <span class="kt-input-icon__icon kt-input-icon__icon--left"><span><i class="la la-search"></i></span></span>
                                        </div>
                                    </div>
                                    <div class="col-md-4 kt-margin-b-20-tablet-and-mobile">
                                        <div class="kt-form__group kt-form__group--inline">
                                            <div class="kt-form__label">
                                                <label>{{ __('menu::menu.status.status') }}</label>
                                            </div>
                                            <div class="kt-form__control">
                                                <select class="form-control bootstrap-select" id="search-status">
                                                    <option value="-1">{{ __('menu::menu.status.all') }}</option>
                                                    <option selected value="{{ \Kuroneko\Menu\Classes\Constants\MenuConstant::MENU_STATUS_ACTIVE }}">{{ __('menu::menu.status.active') }}</option>
                                                    <option value="{{ \Kuroneko\Menu\Classes\Constants\MenuConstant::MENU_STATUS_DELETE }}">{{ __('menu::menu.status.delete') }}</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="kt-portlet__body kt-portlet__body--fit">
                    <div class="kt-datatable" id="menu-table" data-url="{{ $listUrl['datatable'] }}" data-build="{{ $listUrl['build'] }}"></div>
                </div>
            </div>
        </div>
    </div>
    @can('menu-update')
    <div class="modal fade" id="model-edit-menu" role="dialog" aria-labelledby="edit-menu" data-backdrop="static" style="display: none;" aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">{{ __('menu::menu.menu-update') }}</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    </button>
                </div>
                <form id="form-update-menu">
                    <div class="modal-body">
                        @csrf
                        <div class="form-group">
                            <label for="recipient-name" class="form-control-label">{{ __('menu::menu.name') }}</label>
                            <input type="text" class="form-control" id="update-name" name="name">
                        </div>
                        <div class="form-group">
                            <label for="message-text" class="form-control-label">{{ __('menu::menu.description') }}</label>
                            <textarea class="form-control" id="update-description" name="description"></textarea>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">{{__('menu::menu.close')}}</button>
                        <button type="submit" class="btn btn-primary"><i class="fa fa-save"></i> {{ __('menu::menu.save') }}</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    @endcan
    @can('menu-create')
    <div class="modal fade" id="model-create-menu" role="dialog" aria-labelledby="create-menu"
         data-backdrop="static" style="display: none;" aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">{{ __('menu::menu.menu-create') }}</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    </button>
                </div>
                <form id="form-create-menu" action="{{ $listUrl['store'] }}" class="kt-form kt-form--fit">
                    <div class="modal-body">
                        @csrf
                        @method('POST')
                        <div class="form-group">
                            <label for="recipient-name" class="form-control-label">{{ __('menu::menu.name') }}</label>
                            <input type="text" class="form-control" id="create-name" name="name">
                        </div>
                        <div class="form-group">
                            <label for="message-text" class="form-control-label">{{ __('menu::menu.description') }}</label>
                            <textarea class="form-control" id="create-description" name="description"></textarea>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">{{ __('menu::menu.close') }}</button>
                        <button type="submit" class="btn btn-primary"><i class="fa fa-save"></i>{{ __('menu::menu.save') }}</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    @endcan
@stop
@push('page-js')
    <script src="{{ asset('assets/js/pages/menu-index.js') }}" type="text/javascript"></script>
@endpush
