import axios from 'axios';
import {checkPermissions, showBlock, hideBlock} from './helper'
/**
 * @author        Giang Nguyen
 * @description Class ArticleIndexPublished
 */
class ArticleIndexPublished {
    constructor() {
        this.$userInfo = $('#user-info');
        this.$articleTable = $('#article-published-table');
        this.$searchKey = $('#search-key');
        this.$searchFrom = $('#search-from');
        this.$searchTo = $('#search-to');
        this.$searchCategory = $('#search-category');
        this.$searchTheme = $('#search-theme');
        this.$searchCreator = $('#search-creator');
        this.$searchAuthor = $('#search-author');
        this.$searchBtn = $('#search');
        this.datatable = null;
        this.acl = null;

        this.init();

    }

    init() {
        this.initGetAcl();
        this.initTakeDown();
        this.initSetPriority();
        this.initSelect2();
        this.initPickDate();
        this.initEdit();
        this.initRemoveProcessing();
        this.$searchBtn.click(event => {
            event.preventDefault();
            this.datatable.search();
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

    initDatatable() {
        this.datatable = this.$articleTable.KTDatatable({
            data: {
                type: 'remote',
                source: {
                    read: {
                        url: this.$articleTable.data('url'),
                        headers: {'X-CSRF-TOKEN': $('meta[name=csrf-token]').attr('content')},
                        params: {
                            query: {
                                status: () => 10,
                                // published_at_lt_n: 1,
                                ['search-key']: () => this.$searchKey.val(),
                                category: () => this.$searchCategory.select2('data').length > 0 ? this.$searchCategory.select2('data')[0].id : null,
                                theme: () => this.$searchTheme.select2('data').length > 0 ? this.$searchTheme.select2('data')[0].id : null,
                                creator: () => this.$searchCreator.select2('data').length > 0 ? this.$searchCreator.select2('data')[0].id : null,
                                from: () => this.$searchFrom.val(),
                                to: () => this.$searchTo.val(),
                                author: () => this.$searchAuthor.val()
                            },
                            sort: {
                                field: 'published_at',
                                type: 'desc'
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
                    field: 'slug',
                    title: 'TIÊU ĐỀ',
                    width: 330,
                    type: 'string',
                    selector: false,
                    autoHide: false,
                    textAlign: 'left',
                    template: row => {
                        return `<strong>${row.title}</strong>`;
                    }
                },
                {
                    field: 'categories',
                    title: 'CHUYÊN MỤC',
                    sortable: false,
                    width: 250,
                    type: 'string',
                    selector: false,
                    textAlign: 'left',
                    template: row => {
                        return row.categories && row.categories[0] !== undefined ? `<strong>${row.categories[0].name} </strong>` : 'N/A';
                    }
                },

                {
                    field: 'creator',
                    title: 'NGƯỜI TẠO',
                    sortable: false,
                    width: 100,
                    type: 'string',
                    selector: false,
                    textAlign: 'left',
                    template: row => row.creator.username ? `<strong>${row.creator.username}</strong>` : 'N/A'
                },
                {
                    field: 'priority',
                    title: 'NỔI BẬT',
                    sortable: true,
                    width: 150,
                    type: 'string',
                    selector: false,
                    textAlign: 'center',
                    template: row => {
                        let permissions = checkPermissions(['article-update', 'article-publish', 'article-restore', 'article-take-down', 'article-feature-update'], this.acl.permissions);
                        if (permissions['article-feature-update']) {
                            return `<select class="form-control priority-select" data-id="${row.id}">
                                ${row.priority === 0 ? `<option ${parseInt(row.priority) === 0 ? 'selected' : ''} value="0">N/A</option>` : ''}
                                <option ${parseInt(row.priority) === 1 ? 'selected' : ''} value="1">Nổi bật 1</option>
                                <option ${parseInt(row.priority) === 2 ? 'selected' : ''} value="2">Nổi bật 2</option>
                                <option ${parseInt(row.priority) === 3 ? 'selected' : ''} value="3">Nổi bật 3</option>
                                <option ${parseInt(row.priority) === 4 ? 'selected' : ''} value="4">Nổi bật 4</option>
                            </select>`;
                        } else {
                            return `<strong style="font-size: 15px" class="${parseInt(row.priority) > 0 ? 'kt-badge  kt-badge--primary kt-badge--inline kt-badge--pill' : ''}">${parseInt(row.priority) === 0 ? 'N/A' : row.priority}</strong>`;
                        }
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
                    template: row => `<p style="color: black">${row.created_at ? row.created_at : 'N/A'}</p>`
                },
                {
                    field: 'published_at',
                    title: 'XUẤT BẢN',
                    width: 100,
                    type: 'string',
                    sort: 'desc',
                    sortable: true,
                    selector: false,
                    textAlign: 'center',
                    template: row => `<p style="color: black">${row.published_at ? row.published_at : 'N/A'}</p>`
                },
                {
                    field: 'action',
                    title: '!!!',
                    sortable: false,
                    width: 50,
                    textAlign: 'center',
                    overflow: 'visible',
                    template: row => {
                        if (this.acl) {
                            let permissions = checkPermissions(['article-update', 'article-publish', 'article-restore', 'article-take-down', 'article-feature-update'], this.acl.permissions);
                            let editUrl = this.$articleTable.data('edit');
                            editUrl = editUrl.slice(0, editUrl.lastIndexOf('/') + 1) + row.id;
                            let tk = '';
                            let edit = '';
                            let removeProcessing = '';
                            if (row.editor.id) {
                                tk = (permissions['article-take-down'] && parseInt(row.editor.id) === parseInt(this.$userInfo.data('id'))) ? `<a class="dropdown-item take-down font-weight-bold" href="#" data-editor="${row.editor.id}" data-status="${row.status_tk}" data-tk="${row.url_tk}" data-id="${row.id}"><i class="la la-close"></i> Gỡ bài viết</a>` : '';
                                edit = (permissions['article-update'] && parseInt(row.editor.id) === parseInt(this.$userInfo.data('id'))) ? `<a class="dropdown-item edit font-weight-bold" href="${editUrl}" data-id="${row.id}"><i class="la la-edit"></i> Cập nhật</a>` : '';
                                removeProcessing = parseInt(row.editor.id) === parseInt(this.$userInfo.data('id')) ? `<a class="dropdown-item remove-processing font-weight-bold" href="#" data-id="${row.id}"><i class="la la-level-down"></i> Bỏ xử lý</a>` : '';
                                if ((tk + edit).length === 0) {
                                    tk = `<strong>${row.editor.username}</strong> đang xử lý`;
                                    return tk;
                                }
                            } else {
                                tk = permissions['article-take-down'] ? `<a class="dropdown-item take-down font-weight-bold" href="#" data-status="${row.status_tk}" data-tk="${row.url_tk}" data-id="${row.id}"><i class="la la-close"></i> Gỡ bài viết</a>` : '';
                                edit = permissions['article-update'] ? `<a class="dropdown-item edit font-weight-bold" href="${editUrl}" data-id="${row.id}"><i class="la la-edit"></i> Cập nhật</a>` : '';
                                // let priority = permissions['article-feature-update'] ? `<a class="dropdown-item priority font-weight-bold" data-toggle="modal" data-target="#modal-set-priority" href="#" data-article-id="${row.id}"><i class="la la-star"></i> Xét nổi bật</a>` : '';
                            }

                            return (tk + edit + removeProcessing).length > 0 ? `<div class="dropdown">
                                        <a href="javascript:;" class="btn btn-sm btn-clean btn-icon btn-icon-sm" style="cursor: pointer" data-toggle="dropdown">
                                            <i class="flaticon2-console"></i>
                                        </a>
                                        <div class="dropdown-menu dropdown-menu-right">
                                            ${edit}
                                            ${tk}
                                            ${removeProcessing}
                                        </div>
                                    </div>` : '';
                        }
                    },
                }
            ]
        });
    }

    initTakeDown() {
        $(document).on('click', '.take-down', event => {
            event.preventDefault();
            let url = $(event.currentTarget).data('tk');
            let status = $(event.currentTarget).data('status');


            let editor = $(event.currentTarget).data('editor');
            let id = $(event.currentTarget).data('id');
            let urlUpdateEditor = this.$articleTable.data('update-article-editor') + id;

            swal.fire({
                title: 'Xác nhận gỡ bài?',
                text: "Gỡ bài viết này!",
                type: 'warning',
                showCancelButton: true,
                confirmButtonText: 'OK',
                cancelButtonText: 'Hủy',
                reverseButtons: true
            }).then(result => {
                if (result.value) {
                    if (editor !== undefined) {
                        axios.post(urlUpdateEditor).then(
                            () => {
                                axios.post(url, {
                                    status,
                                    from_user: this.$userInfo.data('id'),
                                    from_user_full_name: this.$userInfo.data('full-name'),
                                    from_user_username: this.$userInfo.data('username')
                                }).then(
                                    value => {
                                        toastr.success(value.data.message);
                                        this.datatable.load();
                                    },
                                    err => {
                                        let status = err.response.status;
                                        if (status === 404 || status === 500) {
                                            toastr.error(err.response.data.message);
                                        }
                                    }
                                )
                            },
                            err => {
                                let status = err.response.status;
                                if (status === 404 || status === 500) {
                                    toastr.error(err.response.data.message);
                                }
                            }
                        )
                    } else {
                        axios.post(url, {
                            status,
                            from_user: this.$userInfo.data('id'),
                            from_user_full_name: this.$userInfo.data('full-name'),
                            from_user_username: this.$userInfo.data('username')
                        }).then(
                            ({data}) => {
                                toastr.success(data.message);
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
                }
            });
        });
    }

    initSetPriority() {
        $(document).on('change', '.priority-select', event => {
            let value = $(event.target).val();
            let id = $(event.target).data('id');
            let url = this.$articleTable.data('update-priority') + id;
            if (parseInt(value) > 0) {
                showBlock();
                axios.post(url, {priority: value}).then(
                    res => {
                        toastr.success(res.data.message);
                        this.datatable.reload();
                        hideBlock();
                    },
                    err => {
                        toastr.error(err.response.data.message);
                        hideBlock();
                    }
                )
            }

        })
    }

    initSelect2() {
        this.$searchCategory.select2({
            allowClear: true,
            placeholder: 'Chọn chuyên mục',
            ajax: {
                url: this.$searchCategory.data('url'),
                dataType: 'json',
                delay: 250,
                method: 'POST',
                headers: {'X-CSRF-TOKEN': $('meta[name=csrf-token]').attr('content')},
                data: function (params) {
                    console.log(params.term);
                    return {
                        term: params.term,
                        page: params.page,
                        type: 1
                    };
                },
                processResults: data => {
                    return {
                        results: $.map(data.data, function (item) {
                            return {
                                text: `${item.name}`,
                                id: item.id,
                                title: `${item.name}`
                            }
                        }),
                        pagination: {
                            more: data.current_page < data.total_pages
                        }
                    };
                },
                cache: true
            },
            escapeMarkup: markup => markup
        });

        this.$searchTheme.select2({
            allowClear: true,
            placeholder: 'Chọn chủ đề',
            ajax: {
                url: this.$searchTheme.data('url'),
                dataType: 'json',
                delay: 250,
                method: 'POST',
                headers: {'X-CSRF-TOKEN': $('meta[name=csrf-token]').attr('content')},
                data: function (params) {
                    return {
                        term: params.term,
                        page: params.page,
                        type: 2
                    };
                },
                processResults: data => {
                    return {
                        results: $.map(data.data, function (item) {
                            return {
                                text: `${item.name}`,
                                id: item.id,
                                title: `${item.name}`
                            }
                        }),
                        pagination: {
                            more: data.current_page < data.total_pages
                        }
                    };
                },
                cache: true
            },
            escapeMarkup: markup => markup
        });

        this.$searchCreator.select2({
            allowClear: true,
            placeholder: 'Chọn người tạo',
            ajax: {
                url: this.$searchCreator.data('url'),
                dataType: 'json',
                delay: 250,
                method: 'POST',
                headers: {'X-CSRF-TOKEN': $('meta[name=csrf-token]').attr('content')},
                data: function (params) {
                    return {
                        term: params.term,
                        page: params.page,
                        all: 1
                    };
                },
                processResults: data => {
                    return {
                        results: $.map(data.data, function (item) {
                            return {
                                text: `${item.username} | ${item.first_name} ${item.last_name}`,
                                id: item.id,
                                title: `${item.username}`
                            }
                        }),
                        pagination: {
                            more: data.current_page < data.total_pages
                        }
                    };
                },
                cache: true
            },
            escapeMarkup: markup => markup
        });
    }

    initPickDate() {
        this.$searchFrom.datepicker({
            todayHighlight: true,
            orientation: "bottom left",
            autoclose: true,
            format: 'dd/mm/yyyy',
            endDate: new Date(),
            templates: {
                leftArrow: '<i class="la la-angle-left"></i>',
                rightArrow: '<i class="la la-angle-right"></i>'
            }
        });
        this.$searchTo.datepicker({
            todayHighlight: true,
            orientation: "bottom left",
            autoclose: true,
            format: 'dd/mm/yyyy',
            endDate: new Date(),
            templates: {
                leftArrow: '<i class="la la-angle-left"></i>',
                rightArrow: '<i class="la la-angle-right"></i>'
            }
        });

        this.$searchFrom.change(event => {
            let val = $(event.target).val();
            this.$searchTo.datepicker('setStartDate', val.replace('/', '-'));
        });

        this.$searchTo.change(event => {
            let val = $(event.target).val();
            this.$searchFrom.datepicker('setEndDate', val.replace('/', '-'));
        })
    }

    initEdit() {
        $(document).on('click', '.edit', event => {
            event.preventDefault();
            let url = $(event.currentTarget).attr('href');
            let id = $(event.currentTarget).data('id');
            let urlUpdateEditor = this.$articleTable.data('update-article-editor') + id;
            axios.post(urlUpdateEditor, {
                user_id: this.$userInfo.data('id'),
                user_full_name: this.$userInfo.data('full-name'),
                username: this.$userInfo.data('username')
            }).then(
                res => {
                    window.location.href = url;
                },
                err => {
                    window.location.href = url;
                }
            )
        })
    }

    initRemoveProcessing() {
        $(document).on('click', '.remove-processing', event => {
            event.preventDefault();
            let id = $(event.currentTarget).data('id');
            let urlUpdateEditor = this.$articleTable.data('update-article-editor') + id;
            axios.post(urlUpdateEditor).then(
                ({data}) => {
                    toastr.success(data.message);
                    this.datatable.reload();
                },
                err => {
                    toastr.error(err.response.data.messgae);
                }
            )
        })
    }
}

$(() => {
    new ArticleIndexPublished()
});
