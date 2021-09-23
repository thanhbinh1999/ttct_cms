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
        this.$categoriesTable = $('#categories-table');
        this.datatable = null;

        // create
        this.$modalCreateCategory = $('#modal-create-category');
        this.$formCreateCategory = $('#form-create-category');
        this.$createName = $('#create-name');
        this.$createSlug = $('#create-slug');
        this.$createAutoGenerateSlug = $('#create-auto-generate-slug');
        this.$createType = $('#create-type');
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
        this.editCategory = null;

        this.acl = null;

        this.init();
    }

    init() {
        this.initGetAcl();
        this.initModal();
        this.initUpdate();
        this.initDelete();
        this.initRestore();
        this.initCreate();
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
        this.datatable = this.$categoriesTable.KTDatatable({
            data: {
                type: 'remote',
                source: {
                    read: {
                        url: this.$categoriesTable.data('url'),
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
                    width: 300,
                    type: 'string',
                    selector: false,
                    textAlign: 'left',
                    template: row => {
                        return `<div title="${row.description}" style="color:black">${row.description ? (row.description.length > 50 ? (row.description.slice(0, 50) + '...') : row.description) : 'N/A'}</div>`;
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
                                text = '<strong class="kt-badge  kt-badge--success kt-badge--inline kt-badge--pill">Kích hoạt</strong>';
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
                    template: row => `<p style="color:black">${row.created_at}</p>`
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
                            let permissions = checkPermissions(['category-update', 'category-delete', 'category-restore'], this.acl.permissions);
                            let reOrDel = row.url_restore ?
                                (permissions['category-restore'] ? `<a class="dropdown-item restore font-weight-bold" href="#" data-id="${row.id}"  data-restore="${row.url_restore}"><i class="la la-undo"></i> Khôi phục</a>` : '') :
                                (permissions['category-delete'] ? `<a class="dropdown-item delete font-weight-bold" href="#" data-delete="${row.url_delete}"><i class="la la-trash"></i> Xóa</a>` : '');
                            let edit = permissions['category-update'] ? `<a class="dropdown-item font-weight-bold" href="#" data-edit="${row.url_get_data_edit}" data-toggle="modal" data-target="#modal-edit-category"><i class="la la-edit"></i> Cập nhật</a>` : '';
                            return (reOrDel + edit).length > 0 ? `<div class="dropdown">
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
            showBlock();
            let url = $(event.relatedTarget).data('edit');
            axios.get(url).then(
                ({data}) => {
                    this.editCategory = data;
                    this.$updateName.val(data.name);
                    this.$updateSlug.val(data.slug);
                    this.$updateDescription.val(data.description);
                    if (data.thumbnail) {
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
            fd.append('type', 1);

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
    new CategoriesIndex();
});
