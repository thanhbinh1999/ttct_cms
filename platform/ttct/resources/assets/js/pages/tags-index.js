import axios from 'axios';
import {removeError, showError, checkPermissions, showBlock, hideBlock} from './helper'

/**
 * @author        Giang Nguyen
 * @description Class TagsIndex
 */
class TagsIndex {
    constructor() {
        this.$tagTable = $('#tag-table');
        this.$searchKey = $('#search-key');
        this.$searchStatus = $('#search-status');
        this.datatable = null;

        // create
        this.$modalCreateTag = $('#modal-create-tag');
        this.$formCreateTag = $('#form-create-tag');
        this.$createName = $('#create-name');
        this.$createDescription = $('#create-description');

        //update
        this.$modalEditTag = $('#modal-edit-tag');
        this.$formUpdateTag = $('#form-update-tag');
        this.$updateName = $('#update-name');
        this.$updateDescription = $('#update-description');
        this.editTag = null;

        this.acl = null;

        this.init();
    }

    init() {
        this.initGetAcl();
        this.initModal();
        this.initUpdate();
        this.initCreate();
        this.initDelete();
        this.initRestore();
    }

    /**
     * @description get permissions of user
     */
    initGetAcl() {
        axios.get($('body').data('acl')).then(
            res => {
                this.acl = res.data;
                this.initDatatable();
            }
        )
    }

    /**
     * @description init datatable
     */
    initDatatable() {
        this.datatable = this.$tagTable.KTDatatable({
            data: {
                type: 'remote',
                source: {
                    read: {
                        url: this.$tagTable.data('url'),
                        headers: {'X-CSRF-TOKEN': $('meta[name=csrf-token]').attr('content')},
                        params: {
                            query: {
                                status: () => this.$searchStatus.val(),
                                ['search-key']: () => this.$searchKey.val(),
                                type: 1
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
                    field: 'id',
                    title: 'ID',
                    width: 100,
                    type: 'string',
                    selector: false,
                    autoHide: false,
                    textAlign: 'left',
                    template: row => {
                        return `<strong>${row.id}</strong>`;
                    }
                },
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
                    field: 'slug',
                    title: 'SLUG',
                    width: 300,
                    type: 'string',
                    selector: false,
                    sortable: false,
                    textAlign: 'left',
                    template: row => {
                        return `<strong>${row.slug}</strong>`;
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
                                text = '<strong class="kt-badge  kt-badge--success kt-badge--inline kt-badge--pill" style="margin-top: 10px;margin-bottom: 10px">Kích hoạt</strong>';
                                break;
                            }
                            case 4: {
                                text = '<strong class="kt-badge  kt-badge--danger kt-badge--inline kt-badge--pill">Xóa</strong>';
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
                    template: row => `<p style="color: black">${row.created_at}</p>`
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
                            let permissions = checkPermissions(['tag-update', 'tag-delete', 'tag-restore'], this.acl.permissions);

                            let res = parseInt(row.status) === 4 && permissions['tag-restore'] ? `<a class="dropdown-item restore font-weight-bold" href="#" data-id="${row.id}"  data-restore="${row.url_restore}"><i class="la la-undo"></i> Khôi phục</a>` : '';

                            let del = parseInt(row.status) === 10 && permissions['tag-delete'] ? `<a class="dropdown-item delete font-weight-bold" href="#" data-delete="${row.url_delete}"><i class="la la-trash"></i> Xóa</a>` : '';

                            let edit = permissions['tag-update'] ? `<a class="dropdown-item font-weight-bold" href="#" data-edit="${row.url_get_data_edit}" data-toggle="modal" data-target="#modal-edit-tag"><i class="la la-edit"></i> Cập nhật</a>` : '';


                            return (edit + del + res).length > 0 ? `<div class="dropdown">
                                        <a href="javascript:;" class="btn btn-sm btn-clean btn-icon btn-icon-sm" style="cursor: pointer" data-toggle="dropdown">
                                            <i class="flaticon2-console"></i>
                                        </a>
                                        <div class="dropdown-menu dropdown-menu-right">
                                            ${edit}
                                            ${del}
                                            ${res}
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

    /**
     * @description init modal event
     */
    initModal() {
        this.$modalEditTag.on('show.bs.modal', event => {
            let url = $(event.relatedTarget).data('edit');
            axios.get(url).then(
                ({data}) => {
                    this.editTag = data;
                    this.$updateName.val(data.name);
                    this.$updateDescription.val(data.description);
                },
                err => {
                    toastr.error(err.response.data.message);
                }
            )
        }).on('hide.bs.modal', () => {
            removeError([this.$updateName]);
            this.$formUpdateTag.trigger('reset');
        });


        this.$modalCreateTag.on('hide.bs.modal', () => {
            removeError([this.$createName]);
            this.$formCreateTag.trigger('reset');
        })
    }

    /**
     * @description init update tag
     */
    initUpdate() {
        this.$formUpdateTag.submit(event => {
            event.preventDefault();
            if (this.editTag) {
                showBlock();
                let url = this.editTag.url_update;
                axios.post(url, new FormData(event.target)).then(
                    res => {
                        toastr.success(res.data.message);
                        this.datatable.reload();
                        hideBlock();
                        this.$modalEditTag.modal('hide');
                    },
                    err => {
                        hideBlock();
                        let status = err.response.status;
                        if (status === 422) {
                            showError('update-', err.response.data.errors)
                        } else {
                            toastr.error(err.response.data.message);
                        }
                    }
                )
            }
        })
    }

    /**
     * @description init create tag
     */
    initCreate() {
        this.$formCreateTag.submit(event => {
            event.preventDefault();
            showBlock();
            let url = $(event.target).attr('action');
            axios.post(url, new FormData(event.target)).then(
                res => {
                    toastr.success(res.data.message);
                    this.datatable.reload();
                    hideBlock();
                    this.$modalCreateTag.modal('hide')
                },
                err => {
                    hideBlock();
                    let status = err.response.status;
                    if (status === 422) {
                        showError('create-', err.response.data.errors);
                    } else {
                        toastr.error(err.response.data.message);
                    }
                }
            )
        });
    }

    /**
     * @description init delete tag
     */
    initDelete() {
        $(document).on('click', '.delete', event => {
            event.preventDefault();
            let url = $(event.currentTarget).data('delete');
            swal.fire({
                title: 'Xác nhận xóa?',
                html: "<p style='font-size: 15px;color: black'>Bạn muốn xóa từ khóa này</p>",
                type: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Xóa',
                cancelButtonText: 'Hủy',
                reverseButtons: true
            }).then(result => {
                if (result.value) {
                    showBlock();
                    axios.delete(url).then(
                        res => {
                            hideBlock();
                            toastr.success(res.data.message);
                            this.datatable.load();
                        },
                        err => {
                            hideBlock();
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

    /**
     * @description init restore tag
     */
    initRestore() {
        $(document).on('click', '.restore', event => {
            event.preventDefault();
            showBlock();
            let url = $(event.currentTarget).data('restore');
            axios.post(url).then(
                res => {
                    hideBlock();
                    toastr.success(res.data.message);
                    this.datatable.load();
                },
                err => {
                    hideBlock();
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
    new TagsIndex();
});
