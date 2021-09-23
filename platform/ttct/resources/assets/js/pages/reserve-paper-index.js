import {showBlock, hideBlock, showError, removeError, checkPermissions} from './helper';
import axios from 'axios';

/**
 * @author        Giang Nguyen
 * @description Class ReservePaperIndex
 */
class ReservePaperIndex {
    constructor() {
        this.$reservePaperTable = $('#reserve-paper-table');
        this.$searchKey = $('#search-key');

        this.init();
    }

    init() {
        this.initGetAcl();
        this.initPublish();
        this.initTakeDown();
        this.initDelete();
        this.initRestore();
    }

    initGetAcl() {
        axios.get($('body').data('acl')).then(
            res => {
                this.acl = res.data;
                this.initDatatable();
            }
        )
    }

    initDatatable() {
        this.datatable = this.$reservePaperTable.KTDatatable({
            data: {
                type: 'remote',
                source: {
                    read: {
                        url: this.$reservePaperTable.data('url'),
                        headers: {'X-CSRF-TOKEN': $('meta[name=csrf-token]').attr('content')},
                        params: {
                            query: {
                                ['search-key']: () => this.$searchKey.val(),
                            }
                        },
                        map: function (raw) {
                            let dataSet = raw;
                            if (typeof raw.data !== 'undefined') {
                                dataSet = raw.data;
                            }
                            return dataSet;
                        },
                    },
                },
                pageSize: 10,
                serverPaging: true,
                serverFiltering: true,
                serverSorting: true,
            },
            layout: {
                scroll: true,
                footer: true,
            },
            sortable: true,

            pagination: true,

            search: {
                input: this.$searchKey,
            },
            rows: {
                autoHide: true
            },
            columns: [
                {
                    field: 'title',
                    title: 'TÊN',
                    width: 350,
                    type: 'string',
                    selector: false,
                    autoHide: false,
                    textAlign: 'left',
                    template: row => {
                        return `<strong>${row.title}</strong>`;
                    }
                },
                {
                    field: 'cover',
                    title: 'BÌA',
                    sortable: false,
                    width: 250,
                    type: 'string',
                    selector: false,
                    textAlign: 'center',
                    template: row => `<img style="width: 150px" class="img-thumbnail" src="${row.thumbnail.base_url}/${row.thumbnail.absolute_url}">`
                },
                {
                    field: 'status',
                    title: 'TRẠNG THÁI',
                    sortable: false,
                    width: 100,
                    type: 'string',
                    selector: false,
                    textAlign: 'left',
                    template: row => {
                        let text = '';
                        switch (parseInt(row.status)) {
                            case 4: {
                                text = '<span class="kt-badge  kt-badge--danger kt-badge--inline kt-badge--pill" style="font-size: 12px"><strong>xóa</strong></span>';
                                break;
                            }
                            case 6: {
                                text = '<span class="kt-badge  kt-badge--warning kt-badge--inline kt-badge--pill" style="font-size: 12px"><strong>Đã gỡ</strong></span>';
                                break;
                            }
                            case 1: {
                                text = '<span class="kt-badge  kt-badge--primary kt-badge--inline kt-badge--pill" style="font-size: 12px"><strong>Đang chờ</strong></span>';
                                break;
                            }
                            case 10: {
                                text = '<span class="kt-badge  kt-badge--success kt-badge--inline kt-badge--pill" style="font-size: 12px"><strong>Kích hoạt</strong></span>';
                                break;
                            }
                            default: {
                                text = 'N/A';
                            }
                        }
                        return text;
                    }
                },
                {
                    field: 'created_at',
                    title: 'NGÀY TẠO',
                    width: 100,
                    type: 'string',
                    sort: 'desc',
                    selector: false,
                    textAlign: 'center',
                    template: row => `<p style="font-size: 14px;color: black">${row.created_at ? row.created_at : 'N/A'}</p>`
                },
                {
                    field: 'actions',
                    title: '!!!',
                    sortable: false,
                    width: 50,
                    textAlign: 'center',
                    overflow: 'visible',
                    template: row => {
                        if (this.acl) {
                            let html = '';
                            let permissions = checkPermissions(['reserve-paper-delete', 'reserve-paper-update', 'reserve-paper-restore', 'reserve-paper-publish', 'reserve-paper-take-down'], this.acl.permissions);
                            let urlEdit = this.$reservePaperTable.data('edit');
                            urlEdit = urlEdit.slice(0, urlEdit.lastIndexOf('/') + 1) + row.id;
                            let edit = permissions['reserve-paper-update'] ? `<a class="dropdown-item edit font-weight-bold" href="${urlEdit}"><i class="la la-edit"></i> Cập nhật</a>` : '';

                            let pub = permissions['reserve-paper-publish'] && row.url_publish ? `<a class="dropdown-item publish font-weight-bold" href="#" data-url="${row.url_publish}" data-status="${row.status_publish}"><i class="la la-upload"></i> Xuất bản</a>` : '';

                            let del = permissions['reserve-paper-delete'] && row.url_delete ? `<a class="dropdown-item delete font-weight-bold" href="#" data-url="${row.url_delete}" data-status="${row.status_delete}"><i class="la la-close"></i> Xóa</a>` : '';

                            let tkd = permissions['reserve-paper-take-down'] && row.url_take_down ? `<a class="dropdown-item take-down font-weight-bold" href="#" data-url="${row.url_take_down}" data-status="${row.status_take_down}"><i class="la la-arrow-down"></i> Gỡ xuống</a>` : '';

                            let restore = permissions['reserve-paper-restore'] && row.url_restore ? `<a class="dropdown-item restore font-weight-bold" href="#" data-url="${row.url_restore}" data-status="${row.status_restore}"><i class="la la-undo"></i> Khôi phục</a>` : '';
                            html = edit + pub + del + restore + tkd;

                            return html.length > 0 ? `<div class="dropdown">
                                        <a href="javascript:;" class="btn btn-sm btn-clean btn-icon btn-icon-sm" style="cursor: pointer" data-toggle="dropdown">
                                            <i class="flaticon2-console"></i>
                                        </a>
                                        <div class="dropdown-menu dropdown-menu-right">
                                            ${html}
                                        </div>
                                    </div>` : '';
                        }
                        return '';
                    },
                }
            ]
        });
    }

    initPublish() {
        $(document).on('click', '.publish', event => {
            event.preventDefault();
            let url = $(event.currentTarget).data('url');
            let status = $(event.currentTarget).data('status');
            swal.fire({
                title: 'Xác nhận xuất bản',
                html: "<p class='font-weight-bold'>Xuất bản kỳ báo này?</p>",
                type: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Xuất bản',
                cancelButtonText: 'Hủy',
                reverseButtons: true
            }).then(result => {
                if (result.value) {
                    axios.post(url, {status}).then(
                        res => {
                            toastr.success(res.data.message);
                            this.datatable.load();
                        },
                        err => {
                            let status = err.response.status;
                            if (status === 404 || status === 500) {
                                toastr.error(err.response.data.message);
                            }
                        }
                    )
                }
            });
        })
    }

    initTakeDown() {
        $(document).on('click', '.take-down', event => {
            event.preventDefault();
            let url = $(event.currentTarget).data('url');
            let status = $(event.currentTarget).data('status');
            swal.fire({
                title: 'Xác nhận gỡ',
                html: "<p class='font-weight-bold'>Gỡ kỳ báo này?</p>",
                type: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Gỡ',
                cancelButtonText: 'Hủy',
                reverseButtons: true
            }).then(result => {
                if (result.value) {
                    axios.post(url, {status}).then(
                        res => {
                            toastr.success(res.data.message);
                            this.datatable.load();
                        },
                        err => {
                            let status = err.response.status;
                            if (status === 404 || status === 500) {
                                toastr.error(err.response.data.message);
                            }
                        }
                    )
                }
            });
        })
    }

    initDelete() {
        $(document).on('click', '.delete', event => {
            event.preventDefault();
            let url = $(event.currentTarget).data('url');
            let status = $(event.currentTarget).data('status');
            swal.fire({
                title: 'Xác nhận xóa',
                html: "<p class='font-weight-bold'>Xóa kỳ báo này?</p>",
                type: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Xóa',
                cancelButtonText: 'Hủy',
                reverseButtons: true
            }).then(result => {
                if (result.value) {
                    axios.post(url,{status}).then(
                        res => {
                            toastr.success(res.data.message);
                            this.datatable.load();
                        },
                        err => {
                            let status = err.response.status;
                            if (status === 404 || status === 500) {
                                toastr.error(err.response.data.message);
                            }
                        }
                    )
                }
            });
        })
    }

    initRestore() {
        $(document).on('click', '.restore', event => {
            event.preventDefault();
            let url = $(event.currentTarget).data('url');
            let status = $(event.currentTarget).data('status');
            axios.post(url,{status}).then(
                res => {
                    toastr.success(res.data.message);
                    this.datatable.load();
                },
                err => {
                    let status = err.response.status;
                    if (status === 404 || status === 500) {
                        toastr.error(err.response.data.message);
                    }
                }
            )
        })
    }
}


$(() => {
    new ReservePaperIndex();
});
