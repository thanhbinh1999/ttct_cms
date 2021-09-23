import axios from 'axios';
import CommentViewLog from './comment-view-log'
import {checkPermissions, hideBlock, showBlock} from "../../../../../../ttct/resources/assets/js/pages/helper";
/**
 * @author       Giang Nguyen
 * @description class for manipulate comment delete
 */
class CommentDeleted {
    constructor() {
        this.$commentDeleteTable = $('#comment-delete-table');
        this.datatable = null;
        this.$userInfo = $('#user-info');
        this.$ktSubheaderToolbar = $('.kt-subheader__toolbar');
        this.$bulkRestore = $('#bulk-restore');

        this.$searchKey = $('#search-key');
        this.$searchFrom = $('#search-from');
        this.$searchTo = $('#search-to');
        this.$searchCategory = $('#search-category');
        this.$searchSort = $('#search-sort');
        this.$searchUser = $('#search-user');
        this.$searchBtn = $('#search');

        this.selectedData = [];
        this.init();
    }

    init() {
        this.initSelect2();
        this.initPickDate();
        this.initAcl();
        this.initRestore();
    }

    initAcl() {
        axios.get($('body').data('acl')).then(
            res => {
                this.acl = res.data;
                this.initDatatable();
            }
        )
    }

    initDatatable() {
        this.datatable = this.$commentDeleteTable.KTDatatable({
            data: {
                type: 'remote',
                source: {
                    read: {
                        url: this.$commentDeleteTable.data('url'),
                        headers: {'X-CSRF-TOKEN': $('meta[name=csrf-token]').attr('content')},
                        params: {
                            query: {
                                status: 'deleted',
                                from: () => this.$searchFrom.val(),
                                to: () => this.$searchTo.val(),
                                category: () => this.$searchCategory.select2('data').length > 0 ? this.$searchCategory.select2('data')[0].id : null,
                                sort: () => this.$searchSort.val(),
                                author: () => this.$searchKey.val() !== '' ? this.$searchKey.val() : null,
                                user: () => this.$searchUser.val()
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
                    field: 'sticker',
                    selector: {class: 'kt-checkbox--solid'},
                    title: 'CHỌN',
                    width: 50,
                    type: 'string',
                    autoHide: false,
                    textAlign: 'center',
                    sortable: false
                },
                {
                    field: 'comment',
                    title: 'BÌNH LUẬN',
                    width: 600,
                    type: 'string',
                    selector: false,
                    autoHide: false,
                    sortable: false,
                    textAlign: 'left',
                    template: row => {
                        let content = row.sticker ? `
                                        <div class="row">
                                            <div class="col-4">
                                                <img class="img-thumbnail" src="${row.sticker.avatar_base_url}/${row.sticker.avatar_path}"/>
                                            </div>
                                            <div class="col-8" style="color: black; font-size: 15px">
                                                <div data-content-id="${row.id}" contenteditable style="height: 100%">
                                                ${row.content}
                                                </div>
                                            </div>
                                        </div>` : `
                                        <div class="row">
                                            <div class="col-12" style="color: black; font-size: 15px">
                                                <div data-content-id="${row.id}" contenteditable style="height: 100%">
                                                ${row.content}
                                                </div>
                                            </div>
                                        </div>`;
                        return `
                            <div data-container-id="${row.id}">
                                ${content}
                                <div class="row mt-5">
                                    <div class="col-12">
                                        <p style="color: black"><strong style="color: red" contenteditable data-author-id="${row.id}">${row.author_name}</strong> ${row.author_email}</p>
                                    </div>
                                    <div class="col-12">
                                        <p style="color: black">Bài viết: <strong style="color: blue">${row.article_link && row.article_link !== '' ? `<a href="${row.article_link}" target="_blank">${row.object_title}</a>` : row.object_title}</strong></p>
                                    </div>
                                </div>
                            </div>
                        `;
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
                    field: 'updated_at',
                    title: 'NGÀY XÓA',
                    width: 100,
                    type: 'string',
                    sort: 'desc',
                    selector: false,
                    sortable: false,
                    textAlign: 'center',
                    template: row => `<p style="color: black">${row.updated_at}</p>`
                },
                {
                    field: 'actor',
                    title: 'NGƯỜI XÓA',
                    width: 100,
                    type: 'string',
                    sort: 'desc',
                    selector: false,
                    sortable: false,
                    textAlign: 'center',
                    template: row => `<strong style="color: black">${row.actor ? row.actor : 'N/A'}</strong>`
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
                            let permissions = checkPermissions(['comment-view-log', 'comment-verify', 'comment-delete', 'comment-restore'], this.acl.permissions);
                            let restore = permissions['comment-restore'] ? `<a class="dropdown-item font-weight-bold comment-restore" href="#" data-url-restore="${row.url_restore}" data-id="${row.id}"><i class="la la-undo"></i> Khôi phục</a>` : '';
                            let log = permissions['comment-view-log'] ? `<a class="dropdown-item font-weight-bold" href="#" data-url-get-log="${row.url_get_log}" data-toggle="modal" data-target="#modal-view-log-comment"><i class="la la-eye"></i>Xem Log</a>` : '';
                            return (restore + log).length > 0 ? `<div class="dropdown">
                                        <a href="javascript:;" class="btn btn-sm btn-clean btn-icon btn-icon-sm" style="cursor: pointer" data-toggle="dropdown">
                                            <i class="flaticon2-console"></i>
                                        </a>
                                        <div class="dropdown-menu dropdown-menu-right">
                                            ${restore}
                                            ${log}
                                        </div>
                                    </div>` : '';
                        }
                    },
                }
            ]
        });
        this.datatable.on("kt-datatable--on-check kt-datatable--on-uncheck", () => {
            let data = this.datatable.rows(".kt-datatable__row--active").nodes()
                .find('[data-container-id]')
                .map((index, cell) => {
                    let content = $(cell).find('[data-content-id]');
                    let author = $(cell).find('[data-author-id]');
                    return {
                        id: content.data('content-id'),
                        author_name: author.text().trim(),
                        content: content.text().trim(),
                        user_id: this.$userInfo.data('id')
                    }
                }).toArray();
            this.selectedData = data;
            if (data.length > 0) {
                this.$ktSubheaderToolbar.slideDown();
            } else {
                this.$ktSubheaderToolbar.slideUp();
                this.selectedData = [];
            }
        });
        this.$searchBtn.click(event => {
            event.preventDefault();
            this.datatable.search();
        });
    }

    initRestore() {
        $(document).on('click', '.comment-restore', event => {
            event.preventDefault();
            let url = $(event.currentTarget).data('url-restore');
            let id = $(event.currentTarget).data('id');

            swal.fire({
                title: 'Xác nhận khôi phục',
                html: "<p style='font-size: 15px;color: black'>Bạn muốn khôi phục bình luận này?</p>",
                type: 'warning',
                showCancelButton: true,
                confirmButtonText: 'OK',
                cancelButtonText: 'Hủy',
                reverseButtons: true
            }).then(result => {
                if (result.value) {
                    showBlock();
                    let data = [{
                        id,
                        user_id: this.$userInfo.data('id')
                    }];
                    axios.post(url, {data: JSON.stringify(data)}).then(
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
        });
        this.$bulkRestore.click(event => {
            event.preventDefault();
            if (this.selectedData && this.selectedData.length > 0) {
                let url = $(event.currentTarget).data('url');
                let data = this.selectedData.map(item => {
                    return {
                        id: item.id,
                        user_id: item.user_id
                    }
                });
                swal.fire({
                    title: 'Xác nhận khôi phục',
                    html: `<p style='font-size: 15px;color: black'>Bạn muốn khôi phục ${data.length} bình luận này?</p>`,
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'OK',
                    cancelButtonText: 'Hủy',
                    reverseButtons: true
                }).then(result => {
                    if (result.value) {
                        showBlock();
                        axios.post(url, {data: JSON.stringify(data)}).then(
                            res => {
                                toastr.success(res.data.message);
                                setTimeout(() => {
                                    this.$ktSubheaderToolbar.slideUp();
                                    this.selectedData = [];
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
            } else {
                toastr.info('Có lỗi xảy ra thử lại sau')
            }
        });
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
}

$(() => {
    new CommentDeleted();
    new CommentViewLog();
});
