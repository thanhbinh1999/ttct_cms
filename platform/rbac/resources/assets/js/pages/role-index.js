import axios from 'axios';
import {removeError, showError, checkPermissions} from '../../../../../ttct/resources/assets/js/pages/helper'

/**
 * @author       Giang Nguyen
 * @description class manipulate role
 */
class RoleIndex {
    constructor() {
        this.$roleTable = $('#role-table');
        this.$searchKey = $('#search-key');
        this.datatable = null;
        //create
        this.$modalCreateRole = $('#modal-create-role');
        this.$formCreateRole = $('#form-create-role');
        this.$createName = $('#create-name');
        this.$createDescription = $('#create-description');

        //edit
        this.$modalEditRole = $('#modal-edit-role');
        this.$formUpdateRole = $('#form-update-role');
        this.$updateName = $('#update-name');
        this.$updateDescription = $('#update-description');
        this.editRole = null;
        //
        this.$modalAssignPermissions = $('#modal-assign-permissions');
        this.$selectPermissions = $('#select-permissions');
        this.$updateAssignBtn = $('#update-assign-btn');
        this.assignRole = null;
        this.listDualBox = null;

        this.acl = null;

        this.init();
    }

    init() {
        this.initGetAcl();
        this.initModal();
        this.initCreate();
        this.initUpdate();
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
        this.datatable = this.$roleTable.KTDatatable({
            data: {
                type: 'remote',
                source: {
                    read: {
                        url: this.$roleTable.data('url'),
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
                                text = '<strong class="kt-badge  kt-badge--success kt-badge--inline kt-badge--pill" style="font-size:14px">active</strong>';
                                break;
                            }
                            case 4: {
                                text = '<strong class="kt-badge  kt-badge--danger kt-badge--inline kt-badge--pill" style="font-size:14px">delete</strong>';
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
                            let permissions = checkPermissions(['assign-permissions-to-role', 'role-update', 'role-delete', 'role-restore'], this.acl.permissions);
                            let reOrDel = row.url_restore ?
                                (permissions['role-restore'] ? `<a class="dropdown-item restore" href="#" data-id="${row.id}"  data-restore="${row.url_restore}"><i class="la la-undo"></i> Khôi phục</a>` : '') :
                                (permissions['role-delete'] ? `<a class="dropdown-item delete" href="#" data-delete="${row.url_delete}"><i class="la la-trash"></i> Xóa</a>` : '');
                            let edit = permissions['role-update'] ? `<a class="dropdown-item" href="#" data-edit="${row.url_get_data_edit}" data-toggle="modal" data-target="#modal-edit-role"><i class="la la-edit"></i> Cập nhật</a>` : '';
                            let assign = permissions['assign-permissions-to-role'] ? `<a class="dropdown-item" href="#" data-url="${row.url_prepare_assign_permission}" data-toggle="modal" data-target="#modal-assign-permissions"><i class="la la-edit"></i> Phân quyền</a>` : '';
                            return (edit + reOrDel + assign).length > 0 ? `<div class="dropdown">
                                        <a href="javascript:;" class="btn btn-sm btn-clean btn-icon btn-icon-sm" style="cursor: pointer" data-toggle="dropdown">
                                            <i class="flaticon2-console"></i>
                                        </a>
                                        <div class="dropdown-menu dropdown-menu-right">
                                            ${edit}
                                            ${assign}
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
        this.$modalCreateRole.on('hide.bs.modal', () => {
            removeError([this.$createName]);
            this.$formCreateRole.trigger('reset');
        });

        this.$modalEditRole.on('show.bs.modal', event => {
            let url = $(event.relatedTarget).data('edit');
            axios.get(url).then(
                ({data}) => {
                    this.editRole = data;
                    this.$updateName.val(data.name);
                    this.$updateDescription.val(data.description)
                },
                err => {
                    toastr.error(err.response.data.message);
                }
            )
        }).on('hide.bs.modal', () => {
            removeError([this.$updateName]);
            this.$formUpdateRole.trigger('reset');
        });

        this.$modalAssignPermissions.on('show.bs.modal', event => {
            let url = $(event.relatedTarget).data('url');
            axios.get(url).then(
                ({data}) => {
                    this.assignRole = data;
                    let html = data.permissions.reduce((c, n) => {
                        return c + `<option ${n.check ? 'selected' : ''} value="${n.id}">${n.name}</option>`;
                    }, '');
                    this.$selectPermissions.html(html);
                    if (this.listDualBox) {
                        this.listDualBox.redraw();
                    } else {
                        this.listDualBox = new DualListbox('#select-permissions');
                    }
                },
                err => {
                    this.$updateAssignBtn.prop('disabled', true);
                    let status = err.response.status;
                    if (status === 500) {
                        toastr.error(err.response.data.message)
                    }
                }
            )
        });

        this.$updateAssignBtn.click(event => {
            event.preventDefault();
            let permissions = this.$selectPermissions.val();
            axios.post(this.assignRole.update_url, {permissions}).then(
                ({data}) => {
                    if (data.message) {
                        toastr.success(data.message);
                        this.$modalAssignPermissions.modal('hide');
                        setTimeout(() => {
                            window.location.reload()
                        }, 1000);
                    }
                },
                err => {
                    let status = err.response.status;
                    if (status === 500) {
                        toastr.error(err.response.data.message)
                    }
                }
            )
        });
    }


    initCreate() {
        this.$formCreateRole.submit(event => {
            event.preventDefault();
            let url = $(event.target).attr('action');
            axios.post(url, new FormData(event.target)).then(
                res => {
                    toastr.success(res.data.message);
                    this.datatable.reload();
                    this.$modalCreateRole.modal('hide');

                },
                err => {
                    let status = err.response.status;
                    if (status === 422) {
                        showError('create-', err.response.data.errors);
                    } else {
                        toastr.error(err.response.data.message);
                    }
                }
            );
        });
    }

    initUpdate() {
        this.$formUpdateRole.submit(event => {
            event.preventDefault();
            if (this.editRole) {
                let url = this.editRole.url_update;
                axios.post(url, new FormData(event.target)).then(
                    ({data}) => {
                        if (data.message) {
                            toastr.success(data.message);
                            this.datatable.reload();
                            this.$modalEditRole.modal('hide');
                        }
                    },
                    err => {
                        let status = err.response.status;
                        if (status === 422) {
                            showError('update-', err.response.data.errors);
                        } else {
                            toastr.error(err.response.data.message);
                        }
                    }
                )
            }
        });
    }
}

$(() => {
    new RoleIndex();

});
