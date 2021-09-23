import axios from 'axios';
import {showError, removeError, checkPermissions, showBlock, hideBlock} from './helper'
import slug from 'slug';

/**
 * @author        Giang Nguyen
 * @description Class CategoriesIndex
 */
class CategoriesIndex {
    constructor() {
        this.$searchKey = $('#search-key');
        this.$searchStatus = $('#search-status');
        this.$topicalTable = $('#topical-table');
        this.datatable = null;

        // create
        this.$modalCreateCategory = $('#modal-create-category');
        this.$formCreateCategory = $('#form-create-category');
        this.$createName = $('#create-name');
        this.$createSlug = $('#create-slug');
        this.$createAutoGenerateSlug = $('#create-auto-generate-slug');
        this.$createDescription = $('#create-description');
        this.$createThumbnail = $('#create-thumbnail');

        // update
        this.$modalEditCategory = $('#modal-edit-category');
        this.$formUpdateCategory = $('#form-update-category');
        this.$updateName = $('#update-name');
        this.$updateDescription = $('#update-description');
        this.$updateAutoGenerateSlug = $('#update-auto-generate-slug');
        this.$updateThumbnail = $('#update-thumbnail');
        this.$updateSlug = $('#update-slug');
        this.$updateOffName = $('#update-off_name');
        this.$updateOffDescription = $('#update-off_description');
        this.editCategory = null;

        this.init();
    }

    init() {
        this.initGetAcl();
        this.initModal();
        this.initUpdate();
        this.initDelete();
        this.initRestore();
        this.initCreate();
        this.initPublish();
        this.initTakeDown();
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
        this.datatable = this.$topicalTable.KTDatatable({
            data: {
                type: 'remote',
                source: {
                    read: {
                        url: this.$topicalTable.data('url'),
                        headers: {'X-CSRF-TOKEN': $('meta[name=csrf-token]').attr('content')},
                        params: {
                            query: {
                                status: () => this.$searchStatus.val(),
                                ['search-key']: () => this.$searchKey.val(),
                                type: () => 2
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
                    width: 50,
                    type: 'string',
                    selector: false,
                    autoHide: false,
                    textAlign: 'left',
                    template: row => `<strong>${row.id}</strong>`
                },
                {
                    field: 'slug',
                    title: 'TÊN',
                    width: 200,
                    type: 'string',
                    selector: false,
                    autoHide: false,
                    textAlign: 'left',
                    template: row => {
                        return `<strong>${row.name}</strong>`;
                    }
                },
                {
                    field: 'number_articles',
                    title: 'SỐ BÀI VIẾT',
                    width: 100,
                    type: 'string',
                    selector: false,
                    sortable: false,
                    textAlign: 'center',
                    template: row => {
                        return `<strong>${row.articles.length}</strong>`;
                    }
                },
                {
                    field: 'thumbnail',
                    title: 'THUMBNAIL',
                    width: 200,
                    type: 'string',
                    selector: false,
                    sortable: false,
                    textAlign: 'center',
                    template: row => {
                        return row.thumbnail ? `<img class="img-thumbnail" style="width:200px" src="${row.thumbnail.base_url}/${row.thumbnail.absolute_url}">` : 'N/A';
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
                        return `<div style="color: black" title="${row.description}">${row.description ? (row.description.length > 50 ? (row.description.slice(0, 50) + '...') : row.description) : 'N/A'}</div>`;
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
                            case 1: {
                                text = '<strong class="kt-badge  kt-badge--primary kt-badge--inline kt-badge--pill">Đang chờ</strong>';
                                break;
                            }
                            case 6: {
                                text = '<strong class="kt-badge  kt-badge--warning kt-badge--inline kt-badge--pill">Đã gỡ</strong>';
                                break;
                            }
                            case 10: {
                                text = '<strong class="kt-badge  kt-badge--success kt-badge--inline kt-badge--pill">Xuất bản</strong>';
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
                    template: row => `<p style="color:black">${row.created_at}</p>`
                },
                {
                    field: 'published_at',
                    title: 'NGÀY XUẤT BẢN',
                    width: 100,
                    type: 'string',
                    sort: 'desc',
                    selector: false,
                    textAlign: 'center',
                    template: row => `<p style="color:black">${row.published_at}</p>`
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
                            let permissions = checkPermissions(['topical-restore', 'topical-update', 'topical-publish', 'topical-take-down'], this.acl.permissions);
                            let url_edit = this.$topicalTable.data('edit-topical');
                            url_edit = url_edit.slice(0, url_edit.lastIndexOf('/') + 1) + row.id;
                            let restore = permissions['topical-restore'] && row.url_restore ? `<a class="dropdown-item restore font-weight-bold" href="#" data-restore="${row.url_restore}"><i class="la la-undo"></i> Khôi phục</a>` : '';
                            let takeDown = permissions['topical-take-down'] && row.url_take_down ? `<a class="dropdown-item take-down font-weight-bold" href="#" data-take-down="${row.url_take_down}"><i class="la la-arrow-down"></i> Gỡ bỏ</a>` : '';
                            let publish = row.url_publish ?
                                (permissions['topical-publish'] ? `<a class="dropdown-item font-weight-bold publish" href="#" data-id="${row.id}"  data-publish="${row.url_publish}"><i class="la la-arrow-up"></i> Xuất bản</a>` : '') :
                                '';
                            let edit = permissions['topical-update'] ? `<a class="dropdown-item font-weight-bold" href="#" data-edit="${row.url_get_data_edit}" data-toggle="modal" data-target="#modal-edit-category"><i class="la la-edit"></i> Cập nhật</a><a class="dropdown-item font-weight-bold" href="${url_edit}"><i class="la la-edit"></i> Biên tập</a>` : '';

                            return (publish + edit + restore + takeDown).length > 0 ? `<div class="dropdown">
                                        <a href="javascript:;" class="btn btn-sm btn-clean btn-icon btn-icon-sm" style="cursor: pointer" data-toggle="dropdown">
                                            <i class="flaticon2-console"></i>
                                        </a>
                                        <div class="dropdown-menu dropdown-menu-right">
                                            ${publish}
                                            ${edit}
                                            ${restore}
                                            ${takeDown}
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

        this.$modalEditCategory.on('show.bs.modal', event => {
            let url = $(event.relatedTarget).data('edit');
            axios.get(url).then(
                ({data}) => {
                    this.editCategory = data;
                    this.$updateName.val(data.name);
                    this.$updateSlug.val(data.slug);
                    this.$updateDescription.val(data.description);
                    if (data.metas && data.metas.length > 0) {
                        data.metas.forEach(item => {
                            switch (item.key) {
                                case 'off_name': {
                                    this.$updateOffName.prop('checked', parseInt(item.value) === 2);
                                    break;
                                }
                                case 'off_description': {
                                    this.$updateOffDescription.prop('checked', parseInt(item.value) === 2);
                                    break;
                                }
                                default: {
                                    break;
                                }
                            }
                        })
                    }
                    if (data.thumbnail) {
                        updateDropify.settings.defaultFile = `${data.thumbnail.base_url}/${data.thumbnail.absolute_url}`;
                        updateDropify.destroy();
                        updateDropify.init();
                    }
                }
            );
        }).on('hide.bs.modal', () => {
            this.$formUpdateCategory.trigger('reset');
            this.$formUpdateCategory.find('.dropify-clear').click();
            removeError([
                this.$updateName,
                this.$updateSlug
            ])
        });

        this.$modalCreateCategory.on('hide.bs.modal', () => {
            this.$formCreateCategory.trigger('reset');
            this.$formCreateCategory.find('.dropify-clear').click();
            removeError([
                this.$createName,
                this.$createSlug,
                this.$createThumbnail
            ])
        })
    }

    initCreate() {
        this.$createThumbnail.dropify({
            messages: {
                'default': 'Kéo và thả tệp vào đây hoặc click',
                'replace': 'Kéo và thả hoặc click để thay thế',
                'remove': 'Xóa',
                'error': 'Ooops, có lỗi bất ngờ xảy ra.'
            }
        });

        this.$formCreateCategory.submit(event => {
            event.preventDefault();
            showBlock();
            removeError([
                this.$createSlug,
                this.$createName,
                this.$createThumbnail
            ]);

            let url = $(event.target).attr('action');
            let fd = new FormData(event.target);
            if (this.$createAutoGenerateSlug.prop('checked')) {
                fd.append('slug', this.$createSlug.val())
            }
            fd.append('type', '2');
            axios.post(url, fd).then(
                res => {
                    if (res.data && res.data.message) {
                        toastr.success(res.data.message);
                        this.datatable.reload();
                        hideBlock();
                        this.$modalCreateCategory.modal('hide');
                    }
                },
                err => {
                    hideBlock();
                    let status = err.response.status;
                    if (status === 422) {
                        showError('create-', err.response.data.errors);
                        this.$createSlug.on('change', () => {
                            if (this.$createSlug.val()) {
                                removeError([this.$createSlug])
                            }
                        })
                    } else {
                        toastr.error(err.response.data.message)
                    }
                }
            )
        });

        this.$createAutoGenerateSlug.on('change', event => {
            if ($(event.target).prop('checked')) {
                this.$createSlug.val(slug(this.$createName.val(), {lower: true})).trigger('change');
                this.$createSlug.prop('disabled', true)
            } else {
                this.$createSlug.prop('disabled', false)
            }
        });

        this.$createName.on('keydown keyup', () => {
            if (this.$createAutoGenerateSlug.prop('checked')) {
                this.$createSlug.val(slug(this.$createName.val(), {lower: true})).trigger('change');
            }
        });

        this.$createSlug.on('change', event => {
            this.$createSlug.val(slug($(event.target).val(), {lower: true}))
        })
    }

    initUpdate() {
        this.$formUpdateCategory.submit(event => {
            event.preventDefault();
            if (this.editCategory) {
                showBlock();
                removeError([
                    this.$updateName,
                    this.$updateSlug,
                    this.$updateThumbnail
                ]);
                let url = this.editCategory.url_update;
                let fd = new FormData(event.target);
                fd.append('off_name', this.$updateOffName.prop('checked') ? '2' : '1');
                fd.append('off_description', this.$updateOffDescription.prop('checked') ? '2' : '1');
                if (this.$updateAutoGenerateSlug.prop('checked')) {
                    fd.append('slug', this.$updateSlug.val())
                }

                axios.post(url, fd).then(
                    res => {
                        toastr.success(res.data.message);
                        this.datatable.reload();
                        hideBlock();
                        this.$modalEditCategory.modal('hide');
                        this.editCategory = null;
                    },
                    err => {
                        hideBlock();
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
        this.$updateAutoGenerateSlug.change(event => {
            if ($(event.target).prop('checked')) {
                this.$updateSlug.prop('disabled', true);
                this.$updateSlug.val(slug(this.$updateName.val(), {lower: true}));
            } else {
                this.$updateSlug.prop('disabled', false);
            }
        });
        this.$updateName.on('keydown keyup', event => {
            if (this.$updateAutoGenerateSlug.prop('checked')) {
                this.$updateSlug.val(slug(this.$updateName.val(), {lower: true}));
            }
        });
        this.$updateSlug.on('change', event => {
            this.$updateSlug.val(slug($(event.target).val(), {lower: true}))
        });
    }

    initDelete() {
        $(document).on('click', '.delete', event => {
            event.preventDefault();
            let url = $(event.currentTarget).data('delete');
            swal.fire({
                title: 'Xác nhận xóa?',
                text: "Xóa chuyên mục/chuyên đề này!",
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
            let url = $(event.target).data('restore');
            axios.post(url, {status: 1}).then(
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

    initPublish() {
        $(document).on('click', '.publish', event => {
            event.preventDefault();
            let url = $(event.currentTarget).data('publish');
            swal.fire({
                title: 'Xác nhận xuất bản',
                html: "<p style='font-size: 15px;color: black'>Bạn có muốn xuất bản chuyên đề này?</p>",
                type: 'warning',
                showCancelButton: true,
                confirmButtonText: 'OK',
                cancelButtonText: 'Hủy',
                reverseButtons: true
            }).then(result => {
                if (result.value) {
                    axios.post(url, {status: 10}).then(
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
            let url = $(event.target).data('take-down');
            swal.fire({
                title: 'Xác nhận xóa gỡ chuyên đề',
                html: "<p style='font-size: 15px;color: black'>Bạn có thực sự muốn gỡ chuyên đề này ?</p>",
                type: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Gỡ bỏ',
                cancelButtonText: 'Hủy',
                reverseButtons: true
            }).then(result => {
                if (result.value) {
                    axios.post(url, {status: 6}).then(
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
}

$(() => {
    new CategoriesIndex();
});
