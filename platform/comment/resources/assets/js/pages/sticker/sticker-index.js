import axios from 'axios';
import {
    showBlock,
    hideBlock,
    showError,
    removeError,
    checkPermissions
} from '../../../../../../ttct/resources/assets/js/pages/helper';
/**
 * @author       Giang Nguyen
 * @description class manipulate sticker
 */
class StickerIndex {
    constructor() {
        this.$stickerTable = $('#sticker-table');
        this.datatable = null;
        this.$searchStatus = $('#search-status');
        this.$searchKey = $('#search-key');
        this.$searchTheme = $('#search-theme');

        //create
        this.$modalCreateSticker = $('#modal-create-sticker');
        this.$formCreateSticker = $('#form-create-sticker');
        this.$createStickerName = $('#create-sticker-name');
        this.$createStickerNote = $('#create-sticker-note');
        this.$createStickerAvatar = $('#create-sticker-avatar');
        this.$createStickerStickerTheme = $('#create-sticker-sticker-theme');

        //update
        this.$modalUpdateSticker = $('#modal-update-sticker');
        this.$formUpdateSticker = $('#form-update-sticker');
        this.$updateStickerName = $('#update-sticker-name');
        this.$updateStickerNote = $('#update-sticker-note');
        this.$updateStickerAvatar = $('#update-sticker-avatar');
        this.dropifyUpdate = null;
        this.currentUpdate = null;

        this.acl = null;
        this.sk = [];
        this.init();
    }

    init() {
        this.initData();
        this.initDropify();
        this.initUpdate();
        this.initCreate();
        this.initDelete();
        this.initRestore();
    }

    initData() {
        let arr = [
            axios.get(this.$stickerTable.data('get-sk')),
            axios.get($('body').data('acl'))
        ];
        Promise.all(arr).then(
            value => {
                this.acl = value[1].data;
                this.sk = value[0].data.data;
                this.initDatatable();
                this.$searchTheme.html(this.sk.length > 0 ? this.sk.reduce((c, n) => c + `<option value="${n.id}">${n.name}</option>`, '<option value="all">Tất cả</option>') : '')
            }
        )
    }

    initDatatable() {
        this.datatable = this.$stickerTable.KTDatatable({
            data: {
                type: 'remote',
                source: {
                    read: {
                        url: this.$stickerTable.data('url'),
                        headers: {'X-CSRF-TOKEN': $('meta[name=csrf-token]').attr('content')},
                        params: {
                            query: {
                                status: () => this.$searchStatus.val(),
                                theme: () => this.$searchTheme.val(),
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
                    title: 'TÊN',
                    width: 250,
                    type: 'string',
                    autoHide: false,
                    textAlign: 'center',
                    template: row => `<strong>${row.name}</strong>`
                },
                {
                    field: 'description',
                    title: 'MÔ TẢ',
                    width: 150,
                    type: 'string',
                    autoHide: false,
                    textAlign: 'center',
                    template: row => `<strong>${row.description}</strong>`
                },
                {
                    field: 'sticker',
                    title: 'NHÃN DÁN',
                    width: 200,
                    type: 'string',
                    selector: false,
                    autoHide: false,
                    sortable: false,
                    textAlign: 'center',
                    template: row => `<img style="width: 80px" src="${row.avatar_base_url}/${row.avatar_path}"></div>`
                },
                {
                    field: 'sticker-theme',
                    title: 'THUỘC BỘ NHÃN DÁN',
                    width: 200,
                    type: 'string',
                    selector: false,
                    autoHide: false,
                    sortable: false,
                    textAlign: 'center',
                    template: row => `<strong>${row.sk.name}</strong>`
                },
                {
                    field: 'status',
                    title: 'TRẠNG THÁI',
                    width: 100,
                    type: 'string',
                    selector: false,
                    autoHide: false,
                    sortable: false,
                    textAlign: 'center',
                    template: row => {
                        let text = '';
                        switch (parseInt(row.status)) {
                            case 2: {
                                text = '<strong class="kt-badge  kt-badge--success kt-badge--inline kt-badge--pill" style="margin-top: 10px;margin-bottom: 10px">Kích hoạt</strong>';
                                break;
                            }
                            case 3: {
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
                    sortable: false,
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
                            let permissions = checkPermissions(['sticker-update', 'sticker-delete', 'sticker-restore'], this.acl.permissions);
                            let edit = permissions['sticker-update'] ? `<a class="dropdown-item font-weight-bold" href="#" data-toggle="modal" data-target="#modal-update-sticker" data-url-edit="${row.url_edit}"><i class="la la-edit"></i> Cập nhật</a>` : '';
                            let del = permissions['sticker-delete'] && row.url_delete ? `<a class="dropdown-item font-weight-bold delete-sticker" href="#" data-data='${JSON.stringify(row)}' data-url-delete="${row.url_delete}"><i class="la la-close"></i> Xóa</a>` : '';
                            let restore = permissions['sticker-restore'] && row.url_restore ? `<a class="dropdown-item font-weight-bold restore-sticker" href="#" data-data='${JSON.stringify(row)}' data-url-restore="${row.url_restore}"><i class="la la-undo"></i> Khôi phục</a>` : '';
                            return (edit + del + restore).length > 0 ? `<div class="dropdown">
                                        <a href="javascript:;" class="btn btn-sm btn-clean btn-icon btn-icon-sm" style="cursor: pointer" data-toggle="dropdown">
                                            <i class="flaticon2-console"></i>
                                        </a>
                                        <div class="dropdown-menu dropdown-menu-right">
                                            ${edit}
                                            ${del}
                                            ${restore}
                                        </div>
                                    </div>` : '';
                        }
                    },
                }
            ]
        });
        this.$searchStatus.change(() => {
            this.datatable.search();
        });
        this.$searchTheme.change(() => {
            this.datatable.search();
        });
    }

    initDropify() {
        this.dropifyUpdate = this.$updateStickerAvatar.dropify({
            messages: {
                'default': 'Kéo và thả tệp vào đây hoặc click',
                'replace': 'Kéo và thả hoặc click để thay thế',
                'remove': 'Xóa',
                'error': 'Ooops, có lỗi bất ngờ xảy ra.'
            }
        });
        this.$createStickerAvatar.dropify({
            messages: {
                'default': 'Kéo và thả tệp vào đây hoặc click',
                'replace': 'Kéo và thả hoặc click để thay thế',
                'remove': 'Xóa',
                'error': 'Ooops, có lỗi bất ngờ xảy ra.'
            }
        });
    }

    initUpdate() {
        this.$modalUpdateSticker.on('show.bs.modal', event => {
            let url = $(event.relatedTarget).data('url-edit');
            axios.get(url).then(
                ({data}) => {
                    this.currentUpdate = data;
                    this.$updateStickerName.val(data.name);
                    this.$updateStickerNote.val(data.description);
                    let updateDropify = this.dropifyUpdate.data('dropify');
                    updateDropify.settings.defaultFile = `${data.avatar_base_url}/${data.avatar_path}`;
                    updateDropify.destroy();
                    updateDropify.init();
                },
                err => {
                    toastr.error(err.response.data.message)
                }
            )
        }).on('hide.bs.modal', () => {
            this.$formUpdateSticker.trigger('reset');
            this.$formUpdateSticker.find('dropify-clear').click();
            removeError([
                this.$updateStickerName
            ])
        });

        this.$formUpdateSticker.submit(event => {
            event.preventDefault();
            showBlock();
            let urlUpdate = this.currentUpdate.url_update;
            let fd = new FormData(event.target);
            fd.append('old_avatar_base_url', this.currentUpdate.avatar_base_url);
            fd.append('old_avatar_path', this.currentUpdate.avatar_path);

            axios.post(urlUpdate, fd).then(
                ({data}) => {
                    toastr.success(data.message);
                    setTimeout(() => {
                        hideBlock();
                        this.datatable.reload();
                        this.$modalUpdateSticker.modal('hide');
                    }, 1000);
                },
                err => {
                    let status = err.response.status;
                    if (status === 422) {
                        showError('update-sticker-', err.response.data.errors);
                    } else {
                        toastr.error(err.response.data.message)
                    }
                }
            )
        })
    }

    initCreate() {

        this.$modalCreateSticker.on('hide.bs.modal', () => {
            this.$formCreateSticker.trigger('reset');
            removeError([
                this.$createStickerName
            ]);
            this.$formCreateSticker.find('.dropify-clear').click()
        }).on('show.bs.modal', () => {
            this.$createStickerStickerTheme.html(this.sk.length > 0 ? this.sk.reduce((c, n) => c + `<option value="${n.id}">Tên: ${n.name} | ${n.number_sk} nhãn dán | Trạng thái: ${parseInt(n.status) === 2 ? 'Kích hoạt' : 'Xóa'}</option>`, '') : '')
        });

        this.$formCreateSticker.submit(event => {
            event.preventDefault();
            showBlock();
            let url = $(event.target).attr('action');
            let fd = new FormData(event.target);
            axios.post(url, fd).then(
                ({data}) => {
                    toastr.success(data.message);
                    setTimeout(() => {
                        hideBlock();
                        this.datatable.reload();
                        this.$modalCreateSticker.modal('hide');
                    }, 1000);
                },
                err => {
                    hideBlock();
                    let status = err.response.status;
                    if (status === 422) {
                        toastr.info(Object.values(err.response.data.errors).reduce((c, n) => c + n[0] + '<br>', ''));
                        showError('create-sticker-', err.response.data.errors);
                    } else {
                        toastr.error(err.response.data.message);
                    }
                }
            )
        });
    }

    initDelete() {
        $(document).on('click', '.delete-sticker', event => {
            event.preventDefault();
            let data = $(event.currentTarget).data('data');
            let url = $(event.currentTarget).data('url-delete');
            swal.fire({
                title: 'Xác nhận xóa',
                html: "<strong>Xóa nhãn dán này?</strong>",
                type: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Xóa',
                cancelButtonText: 'Hủy',
                reverseButtons: true
            }).then(result => {
                if (result.value) {
                    showBlock();
                    axios.post(url, {data}).then(
                        res => {
                            toastr.success(res.data.message);
                            setTimeout(() => {
                                hideBlock();
                                this.datatable.load();
                            }, 1000);
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

    initRestore() {
        $(document).on('click', '.restore-sticker', event => {
            event.preventDefault();
            let url = $(event.currentTarget).data('url-restore');
            let data = $(event.currentTarget).data('data');
            swal.fire({
                title: 'Xác nhận khôi phục',
                html: "<strong>Khôi phục nhãn dán này?</strong>",
                type: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Khôi phục',
                cancelButtonText: 'Hủy',
                reverseButtons: true
            }).then(result => {
                if (result.value) {
                    showBlock();
                    axios.post(url, {data}).then(
                        res => {
                            toastr.success(res.data.message);
                            setTimeout(() => {
                                hideBlock();
                                this.datatable.load();
                            }, 1000);
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
}

$(() => {
    new StickerIndex();
});
