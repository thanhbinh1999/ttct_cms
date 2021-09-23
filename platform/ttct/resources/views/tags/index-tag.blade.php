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
                    <a href="" class="kt-subheader__breadcrumbs-link">{{ __('ttct::tag.tags') }}</a>
                </div>
            </div>
        </div>
        <div class="kt-content kt-grid__item kt-grid__item--fluid" id="kt_content">
            <div class="kt-portlet kt-portlet--mobile">
                <div class="kt-portlet__head kt-portlet__head--lg">
                    <div class="kt-portlet__head-label">
                        <h3 class="kt-portlet__head-title text-uppercase">{{ __('ttct::tag.tags') }}</h3>
                    </div>
                    <div class="kt-portlet__head-toolbar">
                        <div class="kt-portlet__head-wrapper">
                            @can('tag-create')
                            <div class="dropdown dropdown-inline">
                                <a href="#" class="btn btn-success btn-icon-sm" data-toggle="modal" data-target="#modal-create-tag">
                                    <i class="flaticon2-plus"></i> {{ __('ttct::tag.create') }}
                                </a>
                            </div>
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
                                            <input type="text" class="form-control" placeholder="{{ __('ttct::tag.search') }}" id="search-key">
                                            <span class="kt-input-icon__icon kt-input-icon__icon--left"><span><i class="la la-search"></i></span></span>
                                        </div>
                                    </div>
                                    <div class="col-md-4 kt-margin-b-20-tablet-and-mobile">
                                        <div class="kt-form__group kt-form__group--inline">
                                            <div class="kt-form__label">
                                                <label>{{ __('ttct::tag.status.status') }}</label>
                                            </div>
                                            <div class="kt-form__control">
                                                <select class="form-control bootstrap-select" id="search-status">
                                                    <option value="-1">{{ __('ttct::tag.status.all') }}</option>
                                                    <option selected value="{{ \Kuroneko\Ttct\Classes\Constants\TagConstant::TAG_STATUS_ACTIVE }}">{{ __('ttct::tag.status.active') }}</option>
                                                    <option value="{{ \Kuroneko\Ttct\Classes\Constants\TagConstant::TAG_STATUS_DELETE }}">{{ __('ttct::tag.status.delete') }}</option>
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
                    <div class="kt-datatable" id="tag-table" data-url="{{ $listUrl['datatable'] }}"></div>
                </div>
            </div>
        </div>
    </div>
    @can('tag-update')
    <div class="modal fade" id="modal-edit-tag" role="dialog" aria-labelledby="edit-menu" data-backdrop="static" style="display: none;" aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">{{ __('ttct::tag.tag-update') }}</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    </button>
                </div>
                <form id="form-update-tag" method="post">
                    <div class="modal-body">
                        @csrf
                        <div class="form-group">
                            <label for="update-name" class="form-control-label">{{ __('ttct::tag.name') }}</label>
                            <input type="text" class="form-control" id="update-name" name="name">
                        </div>
                        <div class="form-group">
                            <label for="update-description" class="form-control-label">{{ __('ttct::tag.description') }}</label>
                            <textarea class="form-control" rows="4" id="update-description" name="description"></textarea>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">{{ __('ttct::tag.close') }}</button>
                        <button type="submit" class="btn btn-success"><i class="fa fa-save"></i>{{ __('ttct::tag.save') }}</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    @endcan
    @can('tag-create')
    <div class="modal fade" id="modal-create-tag" role="dialog" aria-labelledby="edit-menu" data-backdrop="static" style="display: none;" aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">{{ __('ttct::tag.tag-create') }}</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    </button>
                </div>
                <form id="form-create-tag" action="{{ $listUrl['store'] }}" method="post">
                    <div class="modal-body">
                        @csrf
                        <div class="form-group">
                            <label for="create-name" class="form-control-label">{{ __('ttct::tag.name') }}</label>
                            <input type="text" class="form-control" id="create-name" name="name">
                        </div>
                        <div class="form-group">
                            <label for="create-description" class="form-control-label">{{ __('ttct::tag.description') }}</label>
                            <textarea class="form-control" rows="4" id="create-description" name="description"></textarea>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">{{ __('ttct::tag.close') }}</button>
                        <button type="submit" class="btn btn-success"><i class="fa fa-save"></i>{{ __('ttct::tag.save') }}</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    @endcan
@stop

@push('page-js')
    <script src="{{ asset('assets/js/pages/tags-index.js') }}" type="text/javascript"></script>
@endpush
