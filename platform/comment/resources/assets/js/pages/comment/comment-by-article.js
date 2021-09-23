import {checkPermissions, showBlock, hideBlock} from '../../../../../../ttct/resources/assets/js/pages/helper'
import CommentViewLog from './comment-view-log';
import axios from "axios";
/**
 * @author       Giang Nguyen
 * @description class for manipulate comment by article
 */
class CommentByArticle {
    constructor() {
        this.$commentByArticleTable = $('#comment-by-article-table');
        this.$userInfo = $('#user-info');
        this.$bulkPublish = $('#bulk-publish');
        this.$bulkSendBack = $('#bulk-send-back');
        this.$bulkUpdateContentAndAuthor = $('#bulk-update-content-and-author');
        this.$bulkDelete = $('#bulk-delete');
        this.$bulkVerify = $('#bulk-verify');
        this.$bulkRestore = $('#bulk-restore');
        this.$ktSubheaderToolbar = $('.kt-subheader__toolbar');

        this.$searchKey = $('#search-key');
        this.$searchFrom = $('#search-from');
        this.$searchTo = $('#search-to');
        this.$searchCategory = $('#search-category');
        this.$searchSort = $('#search-sort');
        this.$searchUser = $('#search-user');
        this.$searchStatus = $('#search-status');
        this.$searchBtn = $('#search');
        this.selectedData = [];
        this.datatable = null;
        this.acl = null;
        this.init();
    }

    init() {
        this.initSelect2();
        this.initPickDate();
        this.initGetAcl();
        this.initPublish();
        this.initSendBack();
        this.initDelete();
        this.initUpdateContentAndAuthor();
        this.initRestore();
        this.initVerify();
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
        this.datatable = this.$commentByArticleTable.KTDatatable({
            data: {
                type: 'remote',
                source: {
                    read: {
                        url: this.$commentByArticleTable.data('url'),
                        headers: {'X-CSRF-TOKEN': $('meta[name=csrf-token]').attr('content')},
                        params: {
                            query: {
                                article_id: () => this.$commentByArticleTable.data('id'),
                                status: () => this.$searchStatus.val(),
                                from: () => this.$searchFrom.val(),
                                to: () => this.$searchTo.val(),
                                category: () => this.$searchCategory.select2('data').length > 0 ? this.$searchCategory.select2('data')[0].id : null,
                                sort: () => this.$searchSort.val(),
                                author: () => this.$searchKey.val() !== '' ? this.$searchKey.val() : null,
                                user: () => this.$searchStatus.val() === 'pending' ? null : this.$searchUser.val()
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
                    sortable: false,
                    textAlign: 'center'
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
                                </div>
                            </div>
                        `;
                    }
                },
                {
                    field: 'info',
                    title: 'THÔNG TIN',
                    width: 300,
                    type: 'string',
                    sort: 'desc',
                    selector: false,
                    sortable: false,
                    textAlign: 'center',
                    template: row => {
                        switch (this.$searchStatus.val()) {
                            case 'published': {
                                return `<div class="row mt-5">
                                            <div class="col-12 text-left">
                                                <p style="color: black;font-size: 14px">Người xuất bản: <strong>${row.actor}</strong></p>
                                                <p style="color: black;font-size: 14px">Ngày xuất bản: ${row.updated_at}</p>
                                            </div>
                                        </div>`;
                            }
                            case 'pending': {
                                return `N/A`;
                            }
                            case 'verified': {
                                return `<div class="row mt-5">
                                            <div class="col-12 text-left">
                                                <p style="color: black;font-size: 14px">Người duyệt: <strong>${row.actor}</strong></p>
                                                <p style="color: black;font-size: 14px">Ngày duyệt: ${row.updated_at}</p>
                                            </div>
                                        </div>`;
                                break;
                            }
                            case 'deleted': {
                                return `<div class="row mt-5">
                                            <div class="col-12 text-left">
                                                <p style="color: black;font-size: 14px">Người xóa: <strong>${row.actor}</strong></p>
                                                <p style="color: black;font-size: 14px">Ngày xóa: ${row.updated_at}</p>
                                            </div>
                                        </div>`;
                                break;
                            }
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
                    sortable: false,
                    textAlign: 'center',
                    template: row => `<p style="color: black;font-size: 15px">${row.created_at}</p>`
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
                            let text = '';
                            switch (this.$searchStatus.val()) {
                                case 'published': {
                                    let permissions = checkPermissions(['comment-view-log', 'comment-publish', 'comment-send-back', 'comment-delete', 'comment-update-content-and-author'], this.acl.permissions);
                                    let sendBack = permissions['comment-send-back'] ? `<a class="dropdown-item font-weight-bold comment-send-back" href="#" data-url-send-back="${row.url_send_back}" data-id="${row.id}"><i class="la la-undo"></i> Trả lại</a>` : '';
                                    let updateContentAndAuthor = permissions['comment-update-content-and-author'] ? `<a class="dropdown-item font-weight-bold update-content-and-author" href="#" data-url-update="${row.url_update}" data-id="${row.id}"><i class="la la-edit"></i> Cập nhật nôi dung & tác giả</a>` : '';
                                    let del = permissions['comment-delete'] ? `<a class="dropdown-item font-weight-bold comment-delete" href="#" data-url-delete="${row.url_delete}" data-id="${row.id}"><i class="la la-close"></i> Xóa</a>` : '';
                                    let log = permissions['comment-view-log'] ? `<a class="dropdown-item font-weight-bold" href="#" data-url-get-log="${row.url_get_log}" data-toggle="modal" data-target="#modal-view-log-comment"><i class="la la-eye"></i>Xem Log</a>` : '';
                                    text = sendBack + updateContentAndAuthor + del + log;
                                    break;
                                }
                                case 'pending': {
                                    let permissions = checkPermissions(['comment-view-log', 'comment-verify', 'comment-delete'], this.acl.permissions);
                                    let verify = permissions['comment-verify'] ? `<a class="dropdown-item font-weight-bold comment-verify" href="#" data-url-verify="${row.url_verify}" data-content="${row.content}" data-author="${row.author_name}" data-id="${row.id}"><i class="la la-check"></i> Duyệt</a>` : '';
                                    let del = permissions['comment-delete'] ? `<a class="dropdown-item font-weight-bold comment-delete" href="#" data-url-delete="${row.url_delete}" data-id="${row.id}"><i class="la la-close"></i> Xóa</a>` : '';
                                    let log = permissions['comment-view-log'] ? `<a class="dropdown-item font-weight-bold" href="#" data-url-get-log="${row.url_get_log}" data-toggle="modal" data-target="#modal-view-log-comment"><i class="la la-eye"></i>Xem Log</a>` : '';
                                    text = verify + del + log;
                                    break;
                                }
                                case 'verified': {
                                    let permissions = checkPermissions(['comment-view-log', 'comment-publish', 'comment-send-back', 'comment-delete'], this.acl.permissions);
                                    let publish = permissions['comment-publish'] ? `<a class="dropdown-item font-weight-bold comment-publish" href="#" data-url-publish="${row.url_publish}" data-id="${row.id}"><i class="la la-upload"></i> Xuất bản</a>` : '';
                                    let sendBack = permissions['comment-send-back'] ? `<a class="dropdown-item font-weight-bold comment-send-back" href="#" data-url-send-back="${row.url_send_back}" data-id="${row.id}"><i class="la la-undo"></i> Trả lại</a>` : '';
                                    let del = permissions['comment-delete'] ? `<a class="dropdown-item font-weight-bold comment-delete" href="#" data-url-delete="${row.url_delete}" data-id="${row.id}"><i class="la la-close"></i> Xóa</a>` : '';
                                    let log = permissions['comment-view-log'] ? `<a class="dropdown-item font-weight-bold" href="#" data-url-get-log="${row.url_get_log}" data-toggle="modal" data-target="#modal-view-log-comment"><i class="la la-eye"></i>Xem Log</a>` : '';
                                    text = publish + sendBack + del + log;
                                    break;
                                }
                                case 'deleted': {
                                    let permissions = checkPermissions(['comment-view-log', 'comment-verify', 'comment-delete', 'comment-restore'], this.acl.permissions);
                                    let restore = permissions['comment-restore'] ? `<a class="dropdown-item font-weight-bold comment-restore" href="#" data-url-restore="${row.url_restore}" data-id="${row.id}"><i class="la la-undo"></i> Khôi phục</a>` : '';
                                    let log = permissions['comment-view-log'] ? `<a class="dropdown-item font-weight-bold" href="#" data-url-get-log="${row.url_get_log}" data-toggle="modal" data-target="#modal-view-log-comment"><i class="la la-eye"></i>Xem Log</a>` : '';
                                    text = restore + log;
                                    break;
                                }
                            }

                            return text.length > 0 ? `<div class="dropdown">
                                        <a href="javascript:;" class="btn btn-sm btn-clean btn-icon btn-icon-sm" style="cursor: pointer" data-toggle="dropdown">
                                            <i class="flaticon2-console"></i>
                                        </a>
                                        <div class="dropdown-menu dropdown-menu-right">
                                            ${text}
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
                $('.kt-subheader__toolbar').hide();
                $(`[data-status=${this.$searchStatus.val()}]`).slideDown();
            } else {
                $('.kt-subheader__toolbar').slideUp();
                this.selectedData = [];
            }
        });
        this.$searchBtn.click(event => {
            event.preventDefault();
            $('.kt-subheader__toolbar').slideUp();
            this.selectedData = [];
            this.datatable.search();
        });
    }

    initUpdateContentAndAuthor() {
        $(document).on('click', '.update-content-and-author', event => {
            event.preventDefault();
            let url = $(event.currentTarget).data('url-update');
            let id = $(event.currentTarget).data('id');
            let editedContent = $(`[data-content-id=${id}]`);
            let editedAuthor = $(`[data-author-id=${id}]`);

            let author = $(event.currentTarget).data('author');
            let content = $(event.currentTarget).data('content');

            author = editedAuthor.length > 0 ? editedAuthor.text().trim() : author;
            content = editedContent.length > 0 ? editedContent.text().trim() : content;

            swal.fire({
                title: 'Xác nhận cập nhật',
                html: `<p style='font-size: 15px;color: black'>Bạn muốn cập nhật bình luận này?</p>
                        <div class="form-group mt-5">
                           <label for="comment_author_name" style="color: black">Tên tác giả</label>
                           <input type="text" id="comment_author_name" class='form-control' value="${author}">
                       </div>
                        <div class="form-group mt-1">
                           <label for="comment_content" style="color: black">Nội dung</label>
                           <textarea rows="4" id="comment_content" class='form-control'>${content}</textarea>
                       </div>`,
                type: 'warning',
                showCancelButton: true,
                confirmButtonText: 'OK',
                cancelButtonText: 'Hủy',
                reverseButtons: true
            }).then(result => {
                if (result.value) {
                    showBlock();
                    let newContent = $('#comment_content').val();
                    let newAuthor = $('#comment_author_name').val();
                    let data = {
                        id,
                        user_id: this.$userInfo.data('id')
                    };
                    if (newContent !== '') {
                        data = {...data, content: newContent}
                    }
                    if (newAuthor !== '') {
                        data = {...data, author_name: newAuthor};
                    }
                    axios.post(url, {data: JSON.stringify([data])}).then(
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
        this.$bulkUpdateContentAndAuthor.click(event => {
            event.preventDefault();
            let url = $(event.currentTarget).data('url');
            let data = this.selectedData;
            if (data.length > 0) {
                swal.fire({
                    title: 'Xác nhận cập nhật',
                    html: `<p style='font-size: 15px;color: black'>Bạn muốn cập nhật nội dung và tên tác giả của  ${data.length} bình luận này?</p>`,
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

    initVerify() {
        $(document).on('click', '.comment-verify', event => {
            event.preventDefault();
            let url = $(event.currentTarget).data('url-verify');
            let id = $(event.currentTarget).data('id');
            let editedContent = $(`[data-content-id=${id}]`);
            let editedAuthor = $(`[data-author-id=${id}]`);

            let author = $(event.currentTarget).data('author');
            let content = $(event.currentTarget).data('content');

            author = editedAuthor.length > 0 ? editedAuthor.text().trim() : author;
            content = editedContent.length > 0 ? editedContent.text().trim() : content;
            swal.fire({
                title: 'Xác nhận duyệt',
                html: `<p style='font-size: 15px;color: black'>Bạn muốn duyệt bình luận này?</p>
                        <div class="form-group mt-5">
                           <label for="comment_author_name" style="color: black">Tên tác giả</label>
                           <input type="text" id="comment_author_name" class='form-control' value="${author}">
                       </div>
                        <div class="form-group mt-1">
                           <label for="comment_content" style="color: black">Nội dung</label>
                           <textarea rows="4" id="comment_content" class='form-control'>${content}</textarea>
                       </div>
                        `,
                type: 'warning',
                showCancelButton: true,
                confirmButtonText: 'OK',
                cancelButtonText: 'Hủy',
                reverseButtons: true
            }).then(result => {
                if (result.value) {
                    showBlock();
                    let newContent = $('#comment_content').val();
                    let newAuthor = $('#comment_author_name').val();
                    let data = {
                        id,
                        user_id: this.$userInfo.data('id')
                    };
                    if (newContent !== '') {
                        data = {...data, content: newContent}
                    }
                    if (newAuthor !== '') {
                        data = {...data, author_name: newAuthor};
                    }
                    axios.post(url, {data: JSON.stringify([data])}).then(
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
        });
        $(document).on('click','#bulk-verify',event => {
            event.preventDefault();
            if (this.selectedData && this.selectedData.length > 0) {
                let url = $(event.currentTarget).data('url');
                let data = this.selectedData;
                swal.fire({
                    title: 'Xác nhận duyệt',
                    html: `<p style='font-size: 15px;color: black'>Bạn muốn duyệt ${data.length} bình luận này?</p>`,
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

    initPublish() {
        $(document).on('click', '.comment-publish', event => {
            event.preventDefault();
            let url = $(event.currentTarget).data('url-publish');
            let id = $(event.currentTarget).data('id');
            let editedContent = $(`[data-content-id=${id}]`);
            let editedAuthor = $(`[data-author-id=${id}]`);

            let author = $(event.currentTarget).data('author');
            let content = $(event.currentTarget).data('content');

            author = editedAuthor.length > 0 ? editedAuthor.text().trim() : author;
            content = editedContent.length > 0 ? editedContent.text().trim() : content;

            swal.fire({
                title: 'Xác nhận xuất bản',
                html: `<p style='font-size: 15px;color: black'>Bạn muốn xuất bản bình luận này?</p>
                        <div class="form-group mt-5">
                           <label for="comment_author_name" style="color: black">Tên tác giả</label>
                           <input type="text" id="comment_author_name" class='form-control' value="${author}">
                       </div>
                        <div class="form-group mt-1">
                           <label for="comment_content" style="color: black">Nội dung</label>
                           <textarea rows="4" id="comment_content" class='form-control'>${content}</textarea>
                       </div>`,
                type: 'warning',
                showCancelButton: true,
                confirmButtonText: 'OK',
                cancelButtonText: 'Hủy',
                reverseButtons: true
            }).then(result => {
                if (result.value) {
                    showBlock();
                    let newContent = $('#comment_content').val();
                    let newAuthor = $('#comment_author_name').val();
                    let data = {
                        id,
                        user_id: this.$userInfo.data('id')
                    };
                    if (newContent !== '') {
                        data = {...data, content: newContent}
                    }
                    if (newAuthor !== '') {
                        data = {...data, author_name: newAuthor};
                    }
                    axios.post(url, {data: JSON.stringify([data])}).then(
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
        $(document).on('click', '#bulk-publish', event => {
            event.preventDefault();
            if (this.selectedData && this.selectedData.length > 0) {
                let url = $(event.currentTarget).data('url');
                let data = this.selectedData;
                swal.fire({
                    title: 'Xác nhận xuất bản',
                    html: `<p style='font-size: 15px;color: black'>Bạn muốn xuất bản ${data.length} bình luận này?</p>`,
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

    initSendBack() {
        $(document).on('click', '.comment-send-back', event => {
            event.preventDefault();
            let url = $(event.currentTarget).data('url-send-back');
            let id = $(event.currentTarget).data('id');
            console.log(url, id);
            swal.fire({
                title: 'Xác nhận trả lại',
                html: "<p style='font-size: 15px;color: black'>Bạn muốn trả lại bình này?</p>",
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
                            let status = err.response.status;
                            if (status === 404 || status === 500) {
                                toastr.error(err.response.data.message);
                            }
                        }
                    )
                }
            });
        });
        $(document).on('click', '#bulk-send-back', event => {
            event.preventDefault();
            let url = $(event.currentTarget).data('url');
            let data = this.selectedData;
            if (data.length > 0) {
                data = data.map(item => {
                    return {
                        id: item.id,
                        user_id: item.user_id
                    }
                });
                swal.fire({
                    title: 'Xác nhận trả lại',
                    html: `<p style='font-size: 15px;color: black'>Bạn muốn trả lại ${data.length} bình luận này?</p>`,
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
        $(document).on('click', '#bulk-restore', event => {
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

    initDelete() {
        $(document).on('click', '.comment-delete', event => {
            event.preventDefault();
            let url = $(event.currentTarget).data('url-delete');
            let id = $(event.currentTarget).data('id');
            swal.fire({
                title: 'Xác nhận xóa',
                html: "<p style='font-size: 15px;color: black'>Bạn muốn xóa bình luận này?</p>",
                type: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Xóa',
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
                                this.$ktSubheaderToolbar.slideUp();
                                this.selectedData = [];
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
        });
        $(document).on('click', '#bulk-delete', event => {
            event.preventDefault();
            let url = $(event.currentTarget).data('url');
            let data = this.selectedData;
            console.log(url);
            if (data.length > 0) {
                data = data.map(item => {
                    return {
                        id: item.id,
                        user_id: item.user_id
                    }
                });
                swal.fire({
                    title: 'Xác nhận xóa',
                    html: `<p style='font-size: 15px;color: black'>Bạn muốn xóa ${data.length} bình luận này?</p>`,
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
    new CommentByArticle();
    new CommentViewLog();
});
