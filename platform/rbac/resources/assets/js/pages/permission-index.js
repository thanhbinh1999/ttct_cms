import axios from 'axios';
import {showError, removeError, checkPermissions} from '../../../../../ttct/resources/assets/js/pages/helper'

/**
 * @author       Giang Nguyen
 * @description class manipulate permissions
 */
class PermissionIndex {
    constructor() {
        this.$searchKey = $('#search-key');
        this.$permissionTable = $('#permission-table');
        this.datatable = null;
        // update
        this.$modalEditPermission = $('#modal-edit-permission');
        this.$updateName = $('#update-name');
        this.$updateDescription = $('#update-description');
        this.$formUpdatePermission = $('#form-update-permission');
        this.editPermisison = null;

        //create
        this.$modalCreatePermission = $('#modal-create-permission');
        this.$formCreatePermission = $('#form-create-permission');
        this.$createName = $('#create-name');
        this.$createDescription = $('#create-description');
        this.init();

        this.acl = null;
    }

    init() {
        this.initGetAcl();
        this.initModal();
        this.initCreate();
        this.initUpdate();
    }

    initDatatable() {
        this.datatable = this.$permissionTable.KTDatatable({
            data: {
                type: 'remote',
                source: {
                    read: {
                        url: this.$permissionTable.data('url'),
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
                    field: 'name',
                    title: 'TÊN',
                    width: 300,
                    type: 'string',
                    selector: false,
                    autoHide: false,
                    textAlign: 'left',
                    template: row => {
                        return `<strong>${row.name}</strong>`;
                    }
                },
                {
                    field: 'description',
                    title: 'MÔ TẢ',
                    sortable: false,
                    width: 200,
                    type: 'string',
                    selector: false,
                    textAlign: 'left',
                    template: row => {
                        return row.description ? row.description : 'N/A';
                    }
                },
                {
                    field: 'status',
                    title: 'TRẠNG THÁI',
                    width: 100,
                    sortable: false,
                    type: 'string',
                    selector: false,
                    textAlign: 'left',
                    template: row => {
                        let text = '';
                        switch (parseInt(row.status)) {
                            case 10: {
                                text = '<strong class="kt-badge  kt-badge--success kt-badge--inline kt-badge--pill">active</strong>';
                                break;
                            }
                            case 4: {
                                text = '<strong class="kt-badge  kt-badge--danger kt-badge--inline kt-badge--pill">delete</strong>';
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
                            let permissions = checkPermissions(['permission-update', 'permission-delete', 'permission-restore'], this.acl.permissions);
                            let reOrDel = row.url_restore ? (permissions['permission-restore'] ? `<a class="dropdown-item restore" href="#" data-id="${row.id}"  data-restore="${row.url_restore}"><i class="la la-undo"></i> Khôi phục</a>` : '') : (permissions['permission-delete'] ? `<a class="dropdown-item delete" href="#" data-delete="${row.url_delete}"><i class="la la-trash"></i> Xóa</a>` : '');
                            let edit = permissions['permission-update'] ? `<a class="dropdown-item" href="#" data-edit="${row.url_get_data_edit}" data-toggle="modal" data-target="#modal-edit-permission"><i class="la la-edit"></i> Cập nhật</a>` : '';
                            return (reOrDel + edit).length > 0 ?`<div class="dropdown">
                                        <a href="javascript:;" class="btn btn-sm btn-clean btn-icon btn-icon-sm" style="cursor: pointer" data-toggle="dropdown">
                                            <i class="flaticon2-console"></i>
                                        </a>
                                        <div class="dropdown-menu dropdown-menu-right">
                                            ${edit}
                                            ${reOrDel}
                                        </div>
                                    </div>` : '';
                        }
                    },
                }
            ]
        });
    }

    initModal() {
        this.$modalCreatePermission.on('hide.bs.modal', () => {
            this.$formCreatePermission.trigger('reset');
            removeError([
                this.$createName
            ])
        });

        this.$modalEditPermission.on('show.bs.modal', event => {
            let url = $(event.relatedTarget).data('edit');
            axios.get(url).then(
                ({data}) => {
                    this.editPermisison = data;
                    this.$updateName.val(data.name);
                    this.$updateDescription.val(data.description);
                },
                err => {
                    let status = err.response.status;
                    if (status === 422) {
                        showError('update-', err.response.data.errors)
                    } else {
                        toastr.error(err.response.data.message);
                    }
                }
            )
        }).on('hide.bs.modal', () => {
            this.$formUpdatePermission.trigger('reset');
            removeError([
                this.$updateName
            ])
        })
    }

    initCreate() {
        this.$formCreatePermission.submit(event => {
            event.preventDefault();
            let url = $(event.target).attr('action');
            axios.post(url, new FormData(event.target)).then(
                ({data}) => {
                    if (data && data.message) {
                        toastr.success(data.message);
                        this.datatable.reload();
                        this.$modalCreatePermission.modal('hide');
                    }
                },
                err => {
                    let status = err.response.status;
                    if (status === 422) {
                        showError('create-', err.response.data.errors)
                    } else {
                        toastr.error(err.response.data.message);
                    }
                }
            )
        });
    }

    initUpdate() {
        this.$formUpdatePermission.submit(event => {
            event.preventDefault();
            if (this.editPermisison) {
                let url = this.editPermisison.update_url;
                axios.post(url, new FormData(event.target)).then(
                    ({data}) => {
                        if (data.message) {
                            toastr.success(data.message);
                            this.datatable.reload();
                            this.$modalEditPermission.modal('hide');
                        }
                    },
                    err => {
                        let status = err.response.status;
                        if (status === 422) {
                            showError('update-', err.response.data.errors);
                        } else {
                            toastr.error(err.response.data.messgae);
                        }
                    }
                )
            }
        });
    }

    initGetAcl() {
        axios.get($('body').data('acl')).then(
            res => {
                this.acl = res.data;
                this.initDatatable();
            }
        )
    }
}

$(() => {
    new PermissionIndex();
});
