import axios from 'axios';
import {removeError, showError, checkPermissions,showBlock,hideBlock} from './helper'
/**
 * @author        Giang Nguyen
 * @description Class ThemeIndex
 */
class ThemeIndex {
    constructor() {
        this.$themeTable = $('#theme-table');
        this.$searchKey = $('#search-key');
        this.$searchStatus = $('#search-status');
        this.datatable = null;
        // create
        this.$modalCreateTheme = $('#modal-create-theme');
        this.$formCreateTheme = $('#form-create-theme');
        this.$createName = $('#create-name');
        this.$createDescription = $('#create-description');
        this.$createThumbnail = $('#create-thumbnail');

        // update
        this.$modalEditTheme = $('#modal-edit-theme');
        this.$formUpdateTheme = $('#form-update-theme');
        this.$updateName = $('#update-name');
        this.$updateDescription = $('#update-description');
        this.$updateThumbnail = $('#update-thumbnail');
        this.editTheme = null;

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
     * @description get user permissions
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
        this.datatable = this.$themeTable.KTDatatable({
            data: {
                type: 'remote',
                source: {
                    read: {
                        url: this.$themeTable.data('url'),
                        headers: {'X-CSRF-TOKEN': $('meta[name=csrf-token]').attr('content')},
                        params: {
                            query: {
                                status: () => this.$searchStatus.val(),
                                ['search-key']: () => this.$searchKey.val(),
                                type: 2
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
                    field: 'thumbnail',
                    title: 'ẢNH ĐẠI DIỆN',
                    width: 300,
                    type: 'string',
                    selector: false,
                    sortable: false,
                    textAlign: 'center',
                    template: row => {
                        return row.thumbnail ? `<img class="img-thumbnail" style="width: 100%" src="${row.thumbnail.base_url}/${row.thumbnail.absolute_url}">` : 'N/A';
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
                        return `<div style="color: black">${row.description ? row.description : 'N/A'}</div>`;
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
                                text = '<strong class="kt-badge  kt-badge--success kt-badge--inline kt-badge--pill" style="font-size: 14px">Kích hoạt</strong>';
                                break;
                            }
                            case 4: {
                                text = '<strong class="kt-badge  kt-badge--danger kt-badge--inline kt-badge--pill" style="font-size: 14px">Xóa</strong>';
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
                            let permissions = checkPermissions(['theme-update', 'theme-delete', 'theme-restore'], this.acl.permissions);

                            let res = parseInt(row.status) === 4 && permissions['theme-restore'] ? `<a class="dropdown-item restore font-weight-bold" href="#" data-id="${row.id}"  data-restore="${row.url_restore}"><i class="la la-undo"></i> Khôi phục</a>` : '' ;

                            let del = parseInt(row.status) === 10 && permissions['theme-delete'] ? `<a class="dropdown-item delete font-weight-bold" href="#" data-delete="${row.url_delete}"><i class="la la-trash"></i> Xóa</a>` : '';

                            let edit = permissions['theme-update'] ? `<a class="dropdown-item font-weight-bold" href="#" data-edit="${row.url_get_data_edit}" data-toggle="modal" data-target="#modal-edit-theme"><i class="la la-edit"></i> Cập nhật</a>` : '';

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
        let updateDropify = this.$updateThumbnail.dropify({
            messages: {
                'default': 'Kéo và thả tệp vào đây hoặc click',
                'replace': 'Kéo và thả hoặc click để thay thế',
                'remove': 'Xóa',
                'error': 'Ooops, có lỗi bất ngờ xảy ra.'
            }
        });
        updateDropify = updateDropify.data('dropify');
        this.$modalEditTheme.on('show.bs.modal', event => {
            showBlock();
            let url = $(event.relatedTarget).data('edit');
            axios.get(url).then(
                ({data}) => {
                    this.editTheme = data;
                    this.$updateName.val(data.name);
                    this.$updateDescription.val(data.description);
                    if(data.thumbnail){
                        updateDropify.settings.defaultFile = `${data.thumbnail.base_url}/${data.thumbnail.absolute_url}`;
                        updateDropify.destroy();
                        updateDropify.init();
                    }
                    hideBlock();
                },
                err => {
                    hideBlock();
                    toastr.error(err.response.data.message);
                }
            )
        }).on('hide.bs.modal', () => {
            removeError([this.$updateName, this.$updateThumbnail]);
            this.$formUpdateTheme.trigger('reset');
            this.editTheme = null;
        });

        this.$modalCreateTheme.on('hide.bs.modal', () => {
            removeError([this.$createName, this.$createThumbnail]);
            this.$formCreateTheme.trigger('reset');
            this.$formCreateTheme.find('.dropify-clear').click()
        })
    }

    /**
     * @description iint update theme
     */
    initUpdate() {
        this.$formUpdateTheme.submit(event => {
            event.preventDefault();
            if (this.editTheme) {
                showBlock();
                let url = this.editTheme.url_update;
                axios.post(url, new FormData(event.target)).then(
                    ({data}) => {
                        if (data.message) {
                            toastr.success(data.message);
                            this.datatable.reload();
                            hideBlock();
                            this.$modalEditTheme.modal('hide');
                        }
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
     * @description init create theme
     */
    initCreate() {
        this.$createThumbnail.dropify({
            messages: {
                'default': 'Kéo và thả tệp vào đây hoặc click',
                'replace': 'Kéo và thả hoặc click để thay thế',
                'remove': 'Xóa',
                'error': 'Ooops, có lỗi bất ngờ xảy ra.'
            }
        });
        this.$formCreateTheme.submit(event => {
            event.preventDefault();
            showBlock();
            let url = $(event.target).attr('action');
            axios.post(url, new FormData(event.target)).then(
                ({data}) => {
                    if (data.message) {
                        toastr.success(data.message);
                        this.datatable.reload();
                        hideBlock();
                        this.$modalCreateTheme.modal('hide')
                    }
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
     * @description init delete theme
     */
    initDelete() {
        $(document).on('click', '.delete', event => {
            event.preventDefault();
            let url = $(event.currentTarget).data('delete');
            swal.fire({
                title: 'Xác nhận xóa?',
                html: "<p style='color: black;font-size: 15px'>Bạn có muốn xóa chủ đề này?</p>",
                type: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Xóa',
                cancelButtonText: 'Hủy',
                reverseButtons: true
            }).then(result => {
                if (result.value) {
                    showBlock()
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
     * @description init restore
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
    new ThemeIndex();
});
