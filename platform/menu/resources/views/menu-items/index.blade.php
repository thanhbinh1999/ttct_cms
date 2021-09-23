@extends('base::layouts.master')

@section('content')
    <style>
        .select2-container--default .select2-selection--multiple .select2-selection__rendered .select2-selection__choice {
            /* color: #a7abc3; */
            font-weight: 400;
            color: rgb(0,0,0);
            background: #f7f8fa;
            border: 1px solid #ebedf2;
        }
        .select2-container--default .select2-results__option.select2-results__option--highlighted {
            background: #c1c1c1;
            font-weight: 400;
            color: rgb(0,0,0);
        }
        .select2-container--default .select2-results__option {
            background: #f7f8fa;
            font-weight: 400;
            color: rgb(125, 125, 125);
        }
        .select2-container--default .select2-results__option[aria-selected=true] {
            background: #7d7d7d;
            font-weight: 400;
            color: rgb(255, 255, 255);
        }
    </style>
    <div class="kt-grid__item kt-grid__item--fluid kt-grid kt-grid--hor">
        <div class="kt-subheader   kt-grid__item" id="kt_subheader">
            <div class="kt-subheader__main">
                <span class="kt-subheader__separator kt-hidden"></span>
                <div class="kt-subheader__breadcrumbs">
                    <a href="#" class="kt-subheader__breadcrumbs-home">
                        <i class="flaticon2-shelter"></i>
                    </a>
                    <span class="kt-subheader__breadcrumbs-separator"></span>
                    <a href="" class="kt-subheader__breadcrumbs-link">Menu</a>
                    <span class="kt-subheader__breadcrumbs-separator"></span>
                    <a href="" class="kt-subheader__breadcrumbs-link">{{__('menu::menu-item.build-menu')}}</a>
                </div>
            </div>
            <div class="kt-subheader__toolbar">
                <div class="kt-subheader__wrapper">
                    <button id="submit-order" class="btn btn-success btn-md"><i class="fa fa-save"></i>{{__('menu::menu-item.save')}}</button>
                </div>
            </div>
        </div>
        <div class="kt-content kt-grid__item kt-grid__item--fluid" id="kt_content">
            <div class="row">
                <div class="col-xl-8">
                    <div class="kt-portlet kt-portlet--height-fluid kt-portlet--mobile ">
                        <div class="kt-portlet__head kt-portlet__head--lg kt-portlet__head--noborder kt-portlet__head--break-sm">
                            <div class="kt-portlet__head-label">
                                <h3 class="kt-portlet__head-title">
                                    {{__('menu::menu-item.build-menu')}}
                                </h3>
                            </div>
                        </div>
                        <div class="kt-portlet__body kt-portlet__body--fit">
                            <div class="kt-portlet__body" id="test" data-url="{{ $listUrl['prepare_data_build'] }}">
                                <div style="display:flex;justify-content: center;min-height:490px">
                                    <div class="dd" id="menu-nestable" style="width:100%"
                                         data-edit="{{ $listUrl['menuitems_edit'] }}"
                                         data-update="{{ $listUrl['menuitems_update_order'] }}"
                                         data-delete="{{ $listUrl['menuitems_delete'] }}"
                                         data-remove-cache="{{ route('menus.remove_cache') }}"
                                         data-restore="{{ $listUrl['menuitems_restore'] }}">
                                        <ol class="dd-list">
                                        </ol>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-xl-4">
                    <div class="kt-portlet kt-portlet--height-fluid kt-portlet--mobile ">
                        <div class="kt-portlet__head kt-portlet__head--lg kt-portlet__head--noborder kt-portlet__head--break-sm">
                            <div class="kt-portlet__head-label">
                                <h3 class="kt-portlet__head-title">
                                    {{__('menu::menu-item.menu-item-create')}}
                                </h3>
                            </div>
                        </div>
                        <div class="kt-portlet__body kt-portlet__body--fit">
                            <div class="kt-portlet__body">
                                <form id="form-create-menu-item" action="{{ $listUrl['menuitems_store'] }}" class="kt-form">
                                    <div class="form-group">
                                        <label for="create-name">{{__('menu::menu-item.name')}}</label>
                                        <input type="text" class="form-control" id="create-name" name="name">
                                    </div>
                                    <div class="form-group">
                                        <label for="create-description">{{__('menu::menu-item.description')}}</label>
                                        <input type="text" class="form-control" id="create-description" name="description">
                                    </div>
                                    <div class="form-group">
                                        <label for="create-icon">{{__('menu::menu-item.icon')}}</label>
                                        <input type="text" class="form-control" id="create-icon" name="icon">
                                    </div>
                                    <div class="form-group">
                                        <label for="create-url">{{__('menu::menu-item.url')}}</label>
                                        <input type="text" class="form-control" id="create-url" name="url">
                                    </div>
                                    <div class="form-group">
                                        <label for="create-route-name">{{__('menu::menu-item.route-name')}}</label>
                                        <select class="form-control" id="create-route-name" name="route-name" data-url="{{ $listUrl['menuitems_select_route'] }}"></select>
                                    </div>
                                    <input type="hidden" value="{{ $menu['id'] }}" name="menu_id">
                                    <div class="form-group">
                                        <label for="create-target">{{__('menu::menu-item.target')}}</label>
                                        <select type="text" class="form-control" id="create-target" name="target">
                                            <option value="_self">Self</option>
                                            <option value="_else">Else</option>
                                        </select>
                                    </div>
                                    <div class="form-group">
                                        <button type="submit" class="btn btn-success btn-md"><i class="fa fa-save"></i>{{__('menu::menu-item.save')}}</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="modal fade" id="model-edit-menu-item" role="dialog" aria-labelledby="create-menu"
         data-backdrop="static" style="display: none;" aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">{{ __('menu::menu-item.menu-item-update') }}</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    </button>
                </div>
                <form id="form-update-menu-item"  class="kt-form kt-form--fit">
                    <div class="modal-body">
                        @csrf
                        @method('POST')
                        <div class="form-group">
                            <label for="create-name">{{ __('menu::menu-item.name') }}</label>
                            <input type="text" class="form-control" id="update-name" name="name">
                        </div>
                        <div class="form-group">
                            <label for="update-description">{{ __('menu::menu-item.description') }}</label>
                            <input type="text" class="form-control" id="update-description" name="description">
                        </div>
                        <div class="form-group">
                            <label for="update-icon">{{ __('menu::menu-item.icon') }}</label>
                            <input type="text" class="form-control" id="update-icon" name="icon">
                        </div>
                        <div class="form-group">
                            <label for="update-url">{{ __('menu::menu-item.url') }}</label>
                            <input type="text" class="form-control" id="update-url" name="url">
                        </div>
                        <div class="form-group">
                            <label for="update-route-name">{{ __('menu::menu-item.route-name') }}</label>
                            <select type="text" style="width:100%" class="form-control" id="update-route-name" name="route-name" data-url="{{ $listUrl['menuitems_select_route'] }}"></select>
                        </div>

                        <div class="form-group">
                            <label for="update-permissions">Chọn quyền</label>
                            <select type="text" style="width:100%" class="form-control" id="update-permissions" name="permissions" data-url="{{ route('rbac.permissions.select2') }}"></select>
                        </div>

                        <div class="form-group">
                            <label for="create-target">{{ __('menu::menu-item.target') }}</label>
                            <select type="text" class="form-control" id="update-target" name="target">
                                <option value="_self">Self</option>
                                <option value="_else">Else</option>
                            </select>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">{{ __('menu::menu-item.close') }}</button>
                        <button type="submit" class="btn btn-primary"><i class="fa fa-save"></i> {{ __('menu::menu-item.save') }}</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
@stop
@push('plugin-css')
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css">
    <link href="{{ asset('assets/vendors/general/nestable/nestable.css') }}" rel="stylesheet" type="text/css" />
@endpush
@push('plugin-js')
    <script src="{{ asset('assets/vendors/general/nestable/jquery.nestable.js') }}" type="text/javascript"></script>
@endpush
@push('page-js')
    <script src="{{ asset('assets/js/pages/menu-item-index.js') }}" type="text/javascript"></script>
@endpush
