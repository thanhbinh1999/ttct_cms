import {
    checkPermissions,
    showError,
    removeError,
    showBlock,
    hideBlock
} from "../../../../../../ttct/resources/assets/js/pages/helper";
import uuid from 'uuid/v1';
import axios from 'axios';
import Sortable from "sortablejs";
/**
 * @author       Giang Nguyen
 * @description class manipulate sticker theme
 */
class StickerThemeIndex {
    constructor() {
        this.$stickerThemeTable = $('#sticker-theme-table');
        this.$searchStatus = $('#search-status');
        this.$searchKey = $('#search-key');
        this.$datatable = null;

        // create
        this.$modalCreateStickerTheme = $('#modal-create-sticker-theme');
        this.$createStickerThemeName = $('#create-sticker-theme-name');
        this.$createstickerthemenote = $('#create-sticker-theme-note');
        this.$createStickerThemeAvatar = $('#create-sticker-theme-avatar');
        this.$createStickerThemeInputSticker = $('#create-sticker-theme-input-sticker');
        this.$createStickerThemeBtnInputSticker = $('#create-sticker-theme-btn-input-sticker');
        this.$createStickerThemeStickerContainer = $('#create-sticker-theme-sticker-container');
        this.$formCreateStickerTheme = $('#form-create-sticker-theme');

        //update
        this.$modalUpdateStickerTheme = $('#modal-update-sticker-theme');
        this.$formUpdateStickerTheme = $('#form-update-sticker-theme');
        this.$updateStickerThemeName = $('#update-sticker-theme-name');
        this.$updateStickerThemeNote = $('#update-sticker-theme-note');
        this.$updateStickerThemeAvatar = $('#update-sticker-theme-avatar');
        this.$updateStickerThemeInputSticker = $('#update-sticker-theme-input-sticker');
        this.$updateStickerThemeBtnInputSticker = $('#update-sticker-theme-btn-input-sticker');
        this.$updateStickerThemeStickerContainer = $('#update-sticker-theme-sticker-container');
        this.dropifyUpdate = null;
        this.currentUpdate = null;

        this.files = [];

        this.acl = null;

        this.init();
    }

    init() {
        this.initGetAcl();
        this.initDropify();
        this.initCreate();
        this.initUpdate();
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
        this.datatable = this.$stickerThemeTable.KTDatatable({
            data: {
                type: 'remote',
                source: {
                    read: {
                        url: this.$stickerThemeTable.data('url'),
                        headers: {'X-CSRF-TOKEN': $('meta[name=csrf-token]').attr('content')},
                        params: {
                            query: {
                                get_sticker: 1,
                                status: () => this.$searchStatus.val(),
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
                    width: 150,
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
                    width: 900,
                    type: 'string',
                    selector: false,
                    autoHide: false,
                    sortable: false,
                    textAlign: 'center',
                    template: row => {
                        let stickers = row.stickers;
                        let html = stickers.reduce((c, n) => {
                            return c + `<div class="col-2 mt-2 mb-2"><img style="width: 80px" src="${n.avatar_base_url}/${n.avatar_path}"></div>`;
                        }, '<div class="row">');
                        html += '</div>';
                        return html;
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
                            let permissions = checkPermissions(['sticker-theme-update', 'sticker-theme-delete', 'sticker-theme-restore'], this.acl.permissions);
                            let edit = permissions['sticker-theme-update'] ? `<a class="dropdown-item font-weight-bold" href="#" data-toggle="modal" data-target="#modal-update-sticker-theme" data-url-edit="${row.url_edit}"><i class="la la-edit"></i> Cập nhật</a>` : '';
                            let del = permissions['sticker-theme-delete'] && row.url_delete ? `<a class="dropdown-item font-weight-bold delete-sticker-theme" href="#" data-data='${JSON.stringify(row)}' data-url-delete="${row.url_delete}"><i class="la la-close"></i>Xóa</a>` : '';
                            let restore = permissions['sticker-theme-restore'] && row.url_restore ? `<a class="dropdown-item font-weight-bold restore-sticker-theme" href="#" data-url-restore="${row.url_restore}"><i class="la la-undo"></i>Khôi phục</a>` : '';
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
        })
    }

    initDropify() {
        this.$createStickerThemeAvatar.dropify({
            messages: {
                'default': 'Kéo và thả tệp vào đây hoặc click',
                'replace': 'Kéo và thả hoặc click để thay thế',
                'remove': 'Xóa',
                'error': 'Ooops, có lỗi bất ngờ xảy ra.'
            }
        });
        this.dropifyUpdate = this.$updateStickerThemeAvatar.dropify({
            messages: {
                'default': 'Kéo và thả tệp vào đây hoặc click',
                'replace': 'Kéo và thả hoặc click để thay thế',
                'remove': 'Xóa',
                'error': 'Ooops, có lỗi bất ngờ xảy ra.'
            }
        });
    }

    initCreate() {
        this.$createStickerThemeBtnInputSticker.click(event => {
            event.preventDefault();
            this.$createStickerThemeInputSticker.click();
        });

        this.$createStickerThemeInputSticker.change(event => {
            if ($(event.target)[0].files) {
                let tmpFiles = this.toArray($(event.target)[0].files);
                for (let i = 0; i < tmpFiles.length; i++) {
                    this.files.push({
                        file: tmpFiles[i],
                        id: uuid()
                    });
                }
                this.renderImagePreview('create', this.$createStickerThemeStickerContainer);
                this.$createStickerThemeInputSticker.val(null);
            }
        });

        $(document).on('click', '.create-sticker-theme-btn-remove-image', event => {
            event.preventDefault();
            let id = $(event.currentTarget).data('id');
            if (id) {
                this.files = this.files.filter(file => file.id !== id);
                this.renderImagePreview('create', this.$createStickerThemeStickerContainer);
            }
        });

        this.$formCreateStickerTheme.submit(event => {
            event.preventDefault();
            if (this.files.length === 0) {
                toastr.info('Chưa chọn nhãn dán nào');
                return false;
            }
            if (this.$createStickerThemeAvatar.prop('files').length === 0) {
                toastr.info('Chưa chọn hình đại diện');
                return false;
            }

            if (this.$createStickerThemeAvatar.prop('files').length > 10) {
                toastr.info('Chỉ cho phép tối da 10 hình mỗi lần');
                return false;
            }
            showBlock();
            let url = $(event.target).attr('action');
            let fd = new FormData(event.target);

            this.files.forEach(file => {
                fd.append('files[]', file.file);
                fd.append('descriptions[]', $(`textarea[data-id=${file.id}]`).val());
                fd.append('names[]', $(`input[data-id=${file.id}]`).val());
            });
            axios.post(url, fd).then(
                ({data}) => {
                    toastr.success(data.message);
                    setTimeout(() => {
                        hideBlock();
                        this.datatable.reload();
                        this.$modalCreateStickerTheme.modal('hide');
                    }, 3000);
                },
                err => {
                    hideBlock();
                    let status = err.response.status;
                    if (status === 422) {
                        showError('create-sticker-theme-', err.response.data.errors)
                    } else {
                        toastr.error(err.response.data.message);
                    }
                }
            )
        });

        this.$modalCreateStickerTheme.on('hide.bs.modal', event => {
            this.$formCreateStickerTheme.trigger('reset');
            removeError([this.$createStickerThemeName]);
            this.files = [];
            this.$createStickerThemeStickerContainer.html('');
            this.$formCreateStickerTheme.find('.dropify-clear').click();
        });
    }

    initUpdate() {
        this.$updateStickerThemeBtnInputSticker.click(event => {
            event.preventDefault();
            this.$updateStickerThemeInputSticker.click();
        });

        this.$updateStickerThemeInputSticker.change(event => {
            if ($(event.target)[0].files) {
                let tmpFiles = this.toArray($(event.target)[0].files);
                for (let i = 0; i < tmpFiles.length; i++) {
                    this.files.push({
                        file: tmpFiles[i],
                        id: uuid()
                    });
                }
                this.renderImagePreview('update', this.$updateStickerThemeStickerContainer);
                this.$updateStickerThemeInputSticker.val(null);
            }
        });

        this.$modalUpdateStickerTheme.on('show.bs.modal', event => {
            let url = $(event.relatedTarget).data('url-edit');
            axios.get(url).then(
                ({data}) => {
                    this.currentUpdate = data;
                    this.$updateStickerThemeName.val(data.name);
                    this.$updateStickerThemeNote.val(data.description);
                    let updateDropify = this.dropifyUpdate.data('dropify');
                    updateDropify.settings.defaultFile = `${data.avatar_base_url}/${data.avatar_path}`;
                    updateDropify.destroy();
                    updateDropify.init();

                    let stickers = data.stickers;
                    this.files = stickers.map(item => {
                        return {
                            type: 'data',
                            id: item.id,
                            avatar_path: item.avatar_path,
                            avatar_base_url: item.avatar_base_url,
                            name: item.name,
                            description: item.description
                        };
                    });
                    this.renderImagePreview('update', this.$updateStickerThemeStickerContainer)
                },
                err => {
                    toastr.error(err.response.data.message)
                }
            )
        }).on('hide.bs.modal', event => {
            this.$formUpdateStickerTheme.trigger('reset');
            removeError([this.$updateStickerThemeName]);
            this.files = [];
            this.currentUpdate = null;
            this.$updateStickerThemeStickerContainer.html('');
            this.$formUpdateStickerTheme.find('.dropify-clear').click();
        });

        $(document).on('click', '.update-sticker-theme-btn-remove-image', event => {
            event.preventDefault();
            let id = $(event.currentTarget).data('id');
            if (id) {
                this.files = this.files.filter(file => {
                    if (!file.type) {
                        return file.id !== id
                    }
                    return parseInt(file.id) !== parseInt(id)
                });
                this.renderImagePreview('update', this.$updateStickerThemeStickerContainer);
            }
        });

        this.$formUpdateStickerTheme.submit(event => {
            event.preventDefault();
            if (this.currentUpdate) {
                showBlock();
                let url = this.currentUpdate.url_update;
                let fd = new FormData(event.target);
                fd.append('old_avatar_base_url', this.currentUpdate.avatar_base_url);
                fd.append('old_avatar_path', this.currentUpdate.avatar_path);
                if (this.$updateStickerThemeAvatar.prop('files').length > 0) {
                    fd.append('new_avatar', this.$updateStickerThemeAvatar.prop('files')[0])
                }

                let nameOrder = [];

                this.files.forEach(item => {
                    let $name = $(`input[data-id=${item.id}]`);
                    let $description = $(`textarea[data-id=${item.id}]`);
                    nameOrder.push($name.val());
                    if (!item.type) {
                        fd.append('new_stickers[]', item.file);
                        fd.append('new_descriptions[]', $description.val());
                        fd.append('new_names[]', $name.val());
                    } else {
                        fd.append('old_stickers[]', item.id);
                        fd.append('old_descriptions[]', $description.val());
                        fd.append('old_sticker_avatar_base_urls[]', $name.data('avatar-base-url'));
                        fd.append('old_sticker_avatar_paths[]', $name.data('avatar-path'));
                        fd.append('old_names[]', $name.val());
                    }
                });

                fd.append('order', JSON.stringify(nameOrder));


                axios.post(url, fd).then(
                    ({data}) => {
                        toastr.success(data.message);
                        setTimeout(() => {
                            hideBlock();
                            this.datatable.reload();
                            this.$modalUpdateStickerTheme.modal('hide');
                        }, 1500);
                    },
                    err => {
                        hideBlock();
                        let status = err.response.status;
                        if (status === 422) {
                            showError('update-sticker-theme-', err.response.data.errors)
                        } else {
                            toastr.error(err.response.data.message);
                        }
                    }
                )
            }
        });
    }

    toArray(data) {
        let result = [];
        Object.keys(data).forEach(key => {
            result.push(data[key])
        });
        return result;
    }

    renderImagePreview(cOrU, $container) {
        $container.html('');
        let count = 0;
        let totalFile = this.files.reduce((c, n) => {
            return c + (!n.type ? 1 : 0)
        }, 0);

        for (let i = 0; i < this.files.length; i++) {
            if (!this.files[i].type) {
                let name = this.files[i].file.name;
                name = name.slice(0, name.lastIndexOf('.'));
                let reader = new FileReader();
                reader.onload = e => {
                    count++;
                    $container.append(`
                        <div class="col-md-12 mt-2 mb-2 one-file" style="display: flex;justify-content: center;align-items: center" data-id="${this.files[i].id}">
                            <div class="row" style="width: 100%;">
                                <div class="col-md-3">
                                    <img src="${e.target.result}" class="img-thumbnail" style="width:100%">
                                </div>
                                <div class="col-md-7">
                                    <div class="form-group">
                                        <input class="form-control" placeholder="Tên" data-id="${this.files[i].id}" value="${name}">
                                    </div>
                                    <div class="form-group">
                                        <textarea rows="2" class="form-control" placeholder="Mô tả" data-id="${this.files[i].id}" ></textarea>
                                    </div>
                                </div>
                                <div class="col-md-2" style="display: flex;justify-content: center;align-items: center">
                                    <div data-id="${this.files[i].id}" class="btn btn-danger btn-icon ${cOrU}-sticker-theme-btn-remove-image"><i class="la la-trash"></i></div>
                                </div>
                            </div>
                        </div>
                `);
                    if (count === totalFile) {
                        this.sortable = Sortable.create($container[0], {
                            onSort: () => {
                                let data = this.sortable.toArray();
                                let tmp = [];
                                data.forEach(item => {
                                    for (let i = 0; i < this.files.length; i++) {
                                        if (this.files[i].id === item) {
                                            tmp.push(this.files[i]);
                                            break;
                                        }
                                    }
                                });
                                this.files = tmp;
                            }
                        });
                    }
                };
                reader.readAsDataURL(this.files[i].file);
            } else {
                $container.append(`
                        <div class="col-md-12 mt-2 mb-2 one-file" style="display: flex;justify-content: center;align-items: center" data-id="${this.files[i].id}">
                            <div class="row" style="width: 100%;">
                                <div class="col-md-3">
                                    <img src="${this.files[i].avatar_base_url}/${this.files[i].avatar_path}" class="img-thumbnail" style="width:100%">
                                </div>
                                <div class="col-md-7">
                                    <div class="form-group">
                                        <input class="form-control" placeholder="Tên" data-avatar-base-url="${this.files[i].avatar_base_url}" data-avatar-path="${this.files[i].avatar_path}" data-id="${this.files[i].id}" value="${this.files[i].name}">
                                    </div>
                                    <div class="form-group">
                                        <textarea rows="2" class="form-control" placeholder="Mô tả" data-id="${this.files[i].id}" >${this.files[i].description}</textarea>
                                    </div>
                                </div>
                                <div class="col-md-2" style="display: flex;justify-content: center;align-items: center">
                                    <div data-id="${this.files[i].id}" class="btn btn-danger btn-icon ${cOrU}-sticker-theme-btn-remove-image"><i class="la la-trash"></i></div>
                                </div>
                            </div>
                        </div>
                `);
                this.sortable = Sortable.create($container[0], {
                    onSort: () => {
                        let data = this.sortable.toArray();
                        let tmp = [];
                        data.forEach(item => {
                            for (let i = 0; i < this.files.length; i++) {
                                if ((!this.files[i].type && this.files[i].id === item) || (parseInt(this.files[i].id) === parseInt(item))) {
                                    tmp.push(this.files[i]);
                                    break;
                                }
                            }
                        });
                        this.files = tmp;
                    }
                });
            }
        }
    }

    initDelete() {
        $(document).on('click', '.delete-sticker-theme', event => {
            event.preventDefault();
            let data = $(event.currentTarget).data('data');
            let url = $(event.currentTarget).data('url-delete');
            swal.fire({
                title: 'Xác nhận xóa',
                html: "<strong>Xóa bộ nhãn dán này?</strong>",
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
                            setTimeout(()=>{
                                hideBlock();
                                this.datatable.load();
                            },1000)
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
        $(document).on('click', '.restore-sticker-theme', event => {
            event.preventDefault();
            let url = $(event.currentTarget).data('url-restore');
            swal.fire({
                title: 'Xác nhận khôi phục',
                html: "<strong>Khôi phục sticker theme này?</strong>",
                type: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Khôi phục',
                cancelButtonText: 'Hủy',
                reverseButtons: true
            }).then(result => {
                if (result.value) {
                    showBlock();
                    axios.post(url).then(
                        res => {
                            toastr.success(res.data.message);
                            setTimeout(()=>{
                                hideBlock();
                                this.datatable.load();
                            },1000)
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
}

$(() => {
    new StickerThemeIndex()
});
