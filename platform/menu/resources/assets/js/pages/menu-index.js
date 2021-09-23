import axios from 'axios';
import {
    showError,
    removeError,
    checkPermissions,
    showBlock,
    hideBlock
} from '../../../../../ttct/resources/assets/js/pages/helper'

/**
 * @author       Giang Nguyen
 * @description class manipulate menu
 */
class MenuIndex {
    constructor() {
        this.$menuTable = $('#menu-table');
        this.datatable = null;

        this.$searchKey = $('#search-key');
        this.$searchStatus = $('#search-status');

        //
        this.$modelCreateMenu = $('#model-create-menu');
        this.$formCreateMenu = $('#form-create-menu');
        this.$createName = $('#create-name');
        this.$createDescription = $('#create-description');

        //
        this.editMenu = null;
        this.$modelEditMenu = $('#model-edit-menu');
        this.$updateName = $('#update-name');
        this.$updateDescription = $('#update-description');
        this.$formUpdateMenu = $('#form-update-menu');


        this.acl = null;

        this.init();
    }

    init() {
        this.initGetAcl();
        this.initCreate();
        this.initUpdate();
        this.initModal();
        this.initDelete();
        this.initRestore();
    }

    initGetAcl() {
        axios.get($('body').data('acl')).then(
            res => {
                this.acl = res.data;
                this.initMenuTable();
            }
        )
    }

    initMenuTable() {
        this.datatable = this.$menuTable.KTDatatable({
            data: {
                type: 'remote',
                source: {
                    read: {
                        url: this.$menuTable.data('url'),
                        headers: {'X-CSRF-TOKEN': $('meta[name=csrf-token]').attr('content')},
                        params: {
                            query: {
                                status: () => this.$searchStatus.val(),
                                ['search-key']: () => this.$searchKey.val()
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
                    title: 'Name',
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
                    field: 'created_at',
                    title: 'Created at',
                    width: 300,
                    type: 'string',
                    sort: 'desc',
                    selector: false,
                    textAlign: 'center',
                },
                {
                    field: 'Actions',
                    title: 'Actions',
                    sortable: false,
                    width: 110,
                    overflow: 'visible',
                    template: row => {
                        if (this.acl) {
                            let permissions = checkPermissions(['menu-restore', 'menu-delete', 'menu-update', 'menu-item-build'], this.acl.permissions);
                            let html = '';
                            let reOrDel = row.url_restore ?
                                (permissions['menu-restore'] ? `<a class="dropdown-item restore" href="#" data-id="${row.id}"  data-restore="${row.url_restore}"><i class="la la-undo"></i> Restore</a>` : '') :
                                (permissions['menu-delete'] ? `<a class="dropdown-item delete" href="#" data-delete="${row.url_delete}"><i class="la la-trash"></i> Delete</a>` : '');

                            let edit = permissions['menu-update'] ? `<a class="dropdown-item" href="#" data-edit="${row.url_get_data_edit}" data-toggle="modal" data-target="#model-edit-menu"><i class="la la-edit"></i> Edit</a>` : '';

                            let url = this.$menuTable.data('build');
                            url = url.slice(0, url.lastIndexOf('/') + 1) + row.id;

                            let build = permissions['menu-item-build'] ? `<a class="dropdown-item" href="${url}"><i class="la la-wrench"></i> Build</a>` : '';

                            html = edit + reOrDel + build;

                            return html.length > 0 ? `<div class="dropdown">
                                        <a href="javascript:;" class="btn btn-sm btn-clean btn-icon btn-icon-sm" style="cursor: pointer" data-toggle="dropdown">
                                            <i class="flaticon2-console"></i>
                                        </a>
                                        <div class="dropdown-menu dropdown-menu-right">
                                           ${html}
                                        </div>
                                    </div>` : '';
                        }
                    },
                }
            ]
        });
        this.$searchStatus.change(event => {
            this.datatable.search($(event.target).val(), 'status')
        });
    }

    initCreate() {
        this.$formCreateMenu.submit(event => {
            event.preventDefault();
            showBlock();
            let url = $(event.target).attr('action');
            axios.post(url, new FormData(event.target)).then(
                res => {
                    toastr.success(res.data.message);
                    this.datatable.reload();
                    hideBlock();
                    this.$modelCreateMenu.modal('hide');
                },
                err => {
                    hideBlock();
                    let status = err.response.status;
                    if (status === 422) {
                        showError('create-', err.response.data.errors);
                    } else {
                        toastr.error(err.response.data.message)
                    }
                }
            )
        })
    }

    initUpdate() {
        this.$formUpdateMenu.submit(event => {
            event.preventDefault();
            if (this.editMenu) {
                showBlock();
                axios.post(this.editMenu.url_update, new FormData(event.target)).then(
                    res => {
                        toastr.success(res.data.message);
                        this.datatable.reload();
                        hideBlock();
                        this.$modelEditMenu.modal('hide');
                    },
                    err => {
                        hideBlock();
                        let status = err.response.status;
                        if (status === 422) {
                            showError('update-', err.response.data.errors);
                        } else {
                            toastr.error(err.response.data.message)
                        }
                    }
                )
            } else {
                toastr.error('Oop, có lỗi xảy ra, vui lòng thử lại sau')
            }
        })
    }

    initModal() {
        this.$modelCreateMenu.on('hide.bs.modal', () => {
            this.resetInput([
                this.$createName,
                this.$createDescription
            ]);
            removeError([
                this.$createName,
                this.$createDescription
            ])
        });

        this.$modelEditMenu.on('show.bs.modal', event => {
            let url = $(event.relatedTarget).data('edit');
            axios.get(url).then(
                ({data}) => {
                    this.editMenu = data;
                    this.$updateDescription.val(data.description);
                    this.$updateName.val(data.name);
                },
                err => {
                    toastr.error(err.response.data.message)
                }
            )
        }).on('hide.bs.modal', () => {
            this.editMenu = null;
            this.resetInput([
                this.$updateName,
                this.$updateDescription
            ]);

            removeError([
                this.$updateName,
                this.$updateDescription
            ]);
        });
    }

    resetInput(inputs) {
        inputs.forEach(input => {
            input.val('')
        })
    }

    initDelete() {
        $(document).on('click', '.delete', event => {
            event.preventDefault();
            let url = $(event.currentTarget).data('delete');
            swal.fire({
                title: 'Xác nhận xóa?',
                text: "Xóa menu này!",
                type: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Xóa',
                cancelButtonText: 'Hủy',
                reverseButtons: true
            }).then(result => {
                if (result.value) {
                    axios.delete(url).then(
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
            let url = $(event.currentTarget).data('restore');
            axios.post(url).then(
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
    new MenuIndex()
});
