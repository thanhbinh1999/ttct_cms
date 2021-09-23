import axios from 'axios';
import {checkPermissions} from './helper'
/**
 * @author        Giang Nguyen
 * @description Class ArticleIndexForMe
 */
class ArticleIndexForMe {
    constructor() {
        this.$articleTable = $('#article-table-for-me');
        this.$searchKey = $('#search-key');
        this.datatable = null;
        this.$userInfo = $('#user-info');


        this.$modalTransferArticle = $('#modal-transfer-article');
        this.$transferType = $('input[name=transfer-type]');
        this.$roleSelect = $('#role-select');
        this.$userSelect = $('#user-select');
        this.$note = $('#note');
        this.$formTransferCategory = $('#form-transfer-category');
        this.transferType = 'role';
        this.currentTrasnfer = null;

        //send back
        this.$modalSendBack = $('#modal-send-back');
        this.$formSendBack = $('#form-send-back');
        this.$sendBackUserSelect = $('#send-back-user-select');
        this.$sendBackNote = $('#send-back-note');
        this.currnenSendback = null;

        this.init();
    }

    init() {
        this.initGetAcl();
        this.initModal();
        this.initPublish();
        this.initDelete();
        this.initRoleSelect();
        this.initProcessing();
        this.initReject();
        this.initTransfer();
        this.initSendBack();
    }

    initModal() {
        this.$modalTransferArticle.on('show.bs.modal', event => {
            this.currentTrasnfer = $(event.relatedTarget).data('data');
        }).on('hide.bs.modal', () => {
            $('input[value=role]').prop('checked', true);
            $('input[value=user]').prop('checked', false);
            this.$note.val('');
            if (this.$userSelect.hasClass("select2-hidden-accessible")) {
                this.$userSelect.select2('destroy');
            }
            this.$roleSelect.parents('.form-group').hide();
            this.$roleSelect.html('');

            this.$userSelect.parents('.form-group').hide();
            this.currentTrasnfer = null;
            this.$userSelect.html('');
            this.initRoleSelect();
        });

        this.$modalSendBack.on('show.bs.modal', event => {
            this.currnenSendback = $(event.relatedTarget).data('data');
            this.initSendBackSelectUser();
        }).on('hide.bs.modal', () => {
            if (this.$sendBackUserSelect.hasClass("select2-hidden-accessible")) {
                this.$sendBackUserSelect.select2('destroy');
            }
            this.$sendBackUserSelect.html('');
            this.$sendBackNote.val('')
        })
    }

    initGetAcl() {
        axios.get($('body').data('acl')).then(
            res => {
                this.acl = res.data;
                this.initDatatable();
            }
        )
    }

    initTransfer() {
        this.$transferType.change(event => {
            if ($(event.target).val() === 'role') {
                this.transferType = 'role';
                this.$userSelect.parents('.form-group').hide();
                this.initRoleSelect();
            } else {
                this.transferType = 'user';
                this.$roleSelect.parents('.form-group').hide();
                this.initSelectUser();
            }
        });

        this.$formTransferCategory.submit(event => {
            event.preventDefault();
            if (this.transferType === 'role') {
                if (this.$roleSelect.select2('data').length === 0) {
                    toastr.error('Chưa chọn vai trò');
                    return false;
                }
            } else {
                if (this.$userSelect.select2('data').length === 0) {
                    toastr.error('Chưa chọn người dùng');
                    return false;
                }
            }
            let url = $(event.target).attr('action');
            let urlMaskProcessed = this.currentTrasnfer.url_mask_processed;
            let status = this.currentTrasnfer.mask_processed_status;
            let fd = new FormData(event.target);
            fd.append('type', this.transferType);
            fd.append('article_id', this.currentTrasnfer.article.id);
            fd.append('from_user', this.$userInfo.data('id'));
            fd.append('from_user_full_name', this.$userInfo.data('full-name'));
            fd.append('from_user_username', this.$userInfo.data('username'));
            fd.append('note', this.$note.val());
            fd.append('sb_or_fw', 1);
            fd.append('prev_transfer', this.currentTrasnfer.id);

            let listUser = this.currentTrasnfer.list_user;

            if (this.transferType === 'role') {
                fd.append('to_user', this.$roleSelect.select2('data')[0].id);
                fd.append('to_user_full_name', this.$roleSelect.select2('data')[0].name);
                fd.append('to_user_username', this.$roleSelect.select2('data')[0].name);
            } else {
                fd.append('to_user', this.$userSelect.select2('data')[0].id);
                fd.append('to_user_full_name', this.$userSelect.select2('data')[0].full_name);
                fd.append('to_user_username', this.$userSelect.select2('data')[0].username);
                listUser.push({
                    id: this.$userSelect.select2('data')[0].id,
                    full_name: this.$userSelect.select2('data')[0].full_name,
                    username: this.$userSelect.select2('data')[0].username
                })
            }
            fd.append('list_user', JSON.stringify(listUser));

            let arr = [
                axios.post(url, fd),
                axios.post(urlMaskProcessed, {status})
            ];

            Promise.all(arr).then(
                value => {
                    if (value[1].data.message) {
                        toastr.success(value[1].data.message);
                        this.$modalTransferArticle.modal('hide');
                        this.datatable.reload();
                    }
                },
                err => {
                    toastr.error(err.response.data.message)
                }
            )
        });
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
                                ['search-key']: () => this.$searchKey.val(),
                                to_user: () => this.$userInfo.data('id'),
                                type: 2,
                                status: [2, 6],
                                sb_or_fw: 1
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
                    field: 'title',
                    title: 'BÀI VIẾT',
                    width: 350,
                    type: 'string',
                    selector: false,
                    autoHide: false,
                    textAlign: 'left',
                    template: row => {
                        let title = '';
                        if (parseInt(row.status) === 2) {
                            title = row.article.title;
                        } else {
                            let permissions = checkPermissions(['article-delete', 'article-publish', 'article-update', 'article-transfer', 'article-update-own', 'article-send-back'], this.acl.permissions);
                            let editUrl = this.$articleTable.data('edit');
                            editUrl = editUrl.slice(0, editUrl.lastIndexOf('/') + 1) + row.article.id + '?tran_id=' + row.id;
                            if (permissions['article-update-own'] && (parseInt(this.$userInfo.data('id')) === parseInt(row.article.creator.id)) || permissions['article-update']) {
                                title = `<a href="${editUrl}">${row.article.title}</a>`;
                            }
                        }
                        return `<strong>${title}</strong>`;
                    }
                },
                {
                    field: 'status',
                    title: 'TRẠNG THÁI',
                    sortable: false,
                    width: 100,
                    type: 'string',
                    selector: false,
                    textAlign: 'left',
                    template: row => {
                        let text = '';
                        switch (parseInt(row.status)) {
                            case 2: {
                                text = '<span class="kt-badge  kt-badge--primary kt-badge--inline kt-badge--pill" style="font-size: 12px"><strong>Chờ xử lý</strong></span>';
                                break;
                            }
                            case 10: {
                                text = '<span class="kt-badge  kt-badge--success kt-badge--inline kt-badge--pill" style="font-size: 12px"><strong>Đã xử lý</strong></span>';
                                break;
                            }
                            case 6: {
                                text = '<span class="kt-badge  kt-badge--warning kt-badge--inline kt-badge--pill" style="font-size: 12px"><strong>Đang xử lý</strong></span>';
                                break;
                            }
                            case 4: {
                                text = '<span class="kt-badge  kt-badge--danger kt-badge--inline kt-badge--pill" style="font-size: 12px"><strong>Đã hủy</strong></span>';
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
                    field: 'note',
                    title: 'GHI CHÚ',
                    sortable: false,
                    width: 250,
                    type: 'string',
                    selector: false,
                    textAlign: 'left',
                    template: row => row.note ? `<p style="font-size: 15px;color: black">${row.note}</p>` : 'N/A'
                },
                {
                    field: 'creator',
                    title: 'NGƯỜI GỬI',
                    sortable: false,
                    width: 100,
                    type: 'string',
                    selector: false,
                    textAlign: 'left',
                    template: row => `<strong>${row.from_user.username}</strong>`
                },
                {
                    field: 'created_at',
                    title: 'NGÀY GỬI',
                    width: 100,
                    type: 'string',
                    sort: 'desc',
                    selector: false,
                    textAlign: 'center',
                    template: row => `<p style="font-size: 14px;color: black">${row.created_at ? row.created_at : 'N/A'}</p>`
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
                            let html = '';
                            if (parseInt(row.status) === 2) {
                                let markAsProcessing = `<a class="dropdown-item mask-processing font-weight-bold" href="#" data-mask-processing="${row.url_mask_processing}" data-status="${row.mask_processing_status}"><i class="la la-check"></i> Đánh dấu đang xử lý</a>`;
                                let rejectProcess = `<a class="dropdown-item reject-process font-weight-bold" href="#" data-reject-process="${row.url_reject_process}" data-status="${row.reject_process_status}"><i class="la la-close"></i> Từ chối xử lý</a>`;
                                html = markAsProcessing + rejectProcess;
                            } else {
                                let permissions = checkPermissions(['article-delete', 'article-publish', 'article-update', 'article-transfer', 'article-update-own', 'article-send-back'], this.acl.permissions);
                                let editUrl = this.$articleTable.data('edit');
                                editUrl = editUrl.slice(0, editUrl.lastIndexOf('/') + 1) + row.article.id + '?tran_id=' + row.id;
                                let pub = permissions['article-publish'] ? `<a class="dropdown-item pub font-weight-bold" href="#" data-status-public="${row.public_status}" data-public="${row.url_public}" data-mask-processed="${row.url_mask_processed}" data-status-processed="${row.mask_processed_status}"><i class="la la-file-text"></i> Xuất bản ngay & đánh dấu đã xử lý</a>` : ``;
                                let edit = '';

                                if (permissions['article-update-own'] && (parseInt(this.$userInfo.data('id')) === parseInt(row.article.creator.id)) || permissions['article-update']) {
                                    edit = `<a class="dropdown-item edit font-weight-bold" href="${editUrl}"><i class="la la-edit"></i> Cập nhật</a>`;
                                }

                                let transfer = permissions['article-transfer'] ? `<a class="dropdown-item transfer font-weight-bold" href="#" data-toggle="modal" data-target="#modal-transfer-article" data-data='${JSON.stringify(row)}'><i class="la la-edit"></i> Chuyển bài viết</a>` : '';

                                let sendBack = (parseInt(row.to_user.id) === parseInt(this.$userInfo.data('id')) && permissions['article-send-back']) ? `<a class="dropdown-item send-back font-weight-bold" data-data='${JSON.stringify(row)}' href="#" data-toggle="modal" data-target="#modal-send-back"><i class="la la-mail-reply"></i> Trả lại & đánh dấu đã xử lý</a>` : '';

                                html = pub + transfer + sendBack + edit;
                            }
                            return html.length > 0 ? `<div class="dropdown">
                                        <a href="javascript:;" class="btn btn-sm btn-clean btn-icon btn-icon-sm" style="cursor: pointer" data-toggle="dropdown">
                                            <i class="flaticon2-console"></i>
                                        </a>
                                        <div class="dropdown-menu dropdown-menu-right">
                                            ${html}
                                        </div>
                                    </div>` : '';
                        }
                        return '';
                    },
                }
            ]
        });
    }

    initPublish() {
        $(document).on('click', '.pub', event => {
            event.preventDefault();
            let urlPublic = $(event.currentTarget).data('public');
            let publicStatus = $(event.currentTarget).data('status-public');
            let urlMaskProcessed = $(event.currentTarget).data('mask-processed');
            let statusProcessed = $(event.currentTarget).data('status-processed');
            swal.fire({
                title: 'Xác nhận xuất bản',
                html: "<p style='font-size: 14px;color: black'>Xuất bản bài viết này<br> đồng thời dánh dấu đã xử lý?</p>",
                type: 'warning',
                showCancelButton: true,
                confirmButtonText: 'OK',
                cancelButtonText: 'Hủy',
                reverseButtons: true
            }).then(result => {
                if (result.value) {
                    let arr = [
                        axios.post(urlPublic, {
                            status: publicStatus,
                            from_user: this.$userInfo.data('id'),
                            from_user_full_name: this.$userInfo.data('full-name'),
                            from_user_username: this.$userInfo.data('username')
                        }),
                        axios.post(urlMaskProcessed, {status: statusProcessed})
                    ];
                    Promise.all(arr).then(
                        value => {
                            toastr.success(value[1].data.message);
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
        });
    }

    initDelete() {
        $(document).on('click', '.delete', event => {
            event.preventDefault();
            let url = $(event.currentTarget).data('delete') + `?from_user=${this.$userInfo.data('id')}&from_user_full_name=${this.$userInfo.data('full-name')}&from_user_username=${this.$userInfo.data('username')}`;
            swal.fire({
                title: 'Xác nhận xóa?',
                html: "<p class='kt-font-bold' style='font-size: 15px'>Bạn thật sự muốn xóa bài viết này!</p>",
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
        });
    }

    initRoleSelect() {
        if (this.$roleSelect.hasClass("select2-hidden-accessible")) {
            this.$roleSelect.select2('destroy');
        }
        this.$roleSelect.html('');
        this.$roleSelect.parents('.form-group').show();
        this.$roleSelect.select2({
            placeholder: 'Chọn vai trò',
            ajax: {
                url: this.$roleSelect.data('url'),
                dataType: 'json',
                delay: 250,
                method: 'POST',
                headers: {'X-CSRF-TOKEN': $('meta[name=csrf-token]').attr('content')},
                data: params => {
                    return {
                        term: params.term,
                        page: params.page,
                        except: JSON.stringify([1]),
                        role_of_user: () => {
                            return this.currentTrasnfer ? `[${this.currentTrasnfer.from_user.id},${this.$userInfo.data('id')}]` : `[]`;
                        }
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

    initSelectUser() {
        if (this.$userSelect.hasClass("select2-hidden-accessible")) {
            this.$userSelect.select2('destroy');
        }
        this.$userSelect.html('');
        this.$userSelect.parents('.form-group').show();
        this.$userSelect.select2({
            placeholder: 'Chọn người dùng',
            ajax: {
                url: this.$userSelect.data('url'),
                dataType: 'json',
                delay: 250,
                method: 'POST',
                headers: {'X-CSRF-TOKEN': $('meta[name=csrf-token]').attr('content')},
                data: params => {
                    return {
                        term: params.term,
                        page: params.page,
                        except: () => JSON.stringify(this.currentTrasnfer ? this.currentTrasnfer.list_user.map(item => item.id) : []),
                        roles: () => JSON.stringify(this.$userInfo.data('role-name') === 'btv' ? [this.$userInfo.data('role-id'), 2] : [])
                    };
                },
                processResults: data => {
                    return {
                        results: $.map(data.data, function (item) {
                            return {
                                text: `${item.username} | ${item.roles[0].name}`,
                                id: item.id,
                                title: `${item.username}`,
                                full_name: `${item.first_name} ${item.last_name}`,
                                username: item.username
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

    initSendBackSelectUser() {
        let listUser = this.currnenSendback.list_user.filter(item => parseInt(item.id) !== parseInt(this.$userInfo.data('id')));
        let html = `<option value="${listUser[0].id}" data-username="${listUser[0].username}" data-full_name="${listUser[0].full_name}">${listUser[0].username}</option>`;
        // let html = listUser.reduce((c, n) => {
        //     return c + `<option value="${n.id}" data-username="${n.username}" data-full_name="${n.full_name}">${n.username}</option>`;
        // }, '');
        this.$sendBackUserSelect.html(html);
        this.$sendBackUserSelect.select2();
    }

    initProcessing() {
        $(document).on('click', '.mask-processing', event => {
            event.preventDefault();
            let url = $(event.currentTarget).data('mask-processing');
            let status = $(event.currentTarget).data('status');

            axios.post(url, {status}).then(
                ({data}) => {
                    if (data.message) {
                        toastr.success(data.message);
                        this.datatable.reload();
                    }
                },
                err => {
                    toastr.error(err.response.data.message)
                }
            );
        })
    }

    initReject() {
        $(document).on('click', '.reject-process', event => {
            event.preventDefault();
            let url = $(event.currentTarget).data('reject-process');
            let status = $(event.currentTarget).data('status');
            swal.fire({
                title: 'Xác nhận từ chối xử lý',
                html: `<p class='kt-font-bold' style='font-size: 15px'>Bạn thật sự muốn từ chối xử lý viết này?</p>
                       <div class="form-group mt-3">
                           <label for="">Nhập lý do từ chối</label>
                           <textarea id="feed_back" class='form-control'></textarea>
                       </div>`,
                type: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Xác nhận',
                cancelButtonText: 'Hủy',
                reverseButtons: true
            }).then(result => {
                if (result.value) {
                    let feedBack = $('#feed_back').val();
                    if (feedBack === '') {
                        swal.fire('Bạn chưa nhập lý cho từ chối!');
                    } else {
                        axios.post(url, {status, feed_back: feedBack}).then(
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
                }
            });
        });
    }

    initSendBack() {
        this.$formSendBack.submit(event => {
            event.preventDefault();
            let urlMaskProcessed = this.currnenSendback.url_mask_processed;
            let status = this.currnenSendback.mask_processed_status;

            let url = $(event.target).attr('action');
            let urlSendNotification = this.$articleTable.data('send-notification');
            let fd = new FormData(event.target);
            fd.append('type', 'user');
            fd.append('article_id', this.currnenSendback.article.id);
            fd.append('from_user', this.$userInfo.data('id'));
            fd.append('from_user_full_name', this.$userInfo.data('full-name'));
            fd.append('from_user_username', this.$userInfo.data('username'));
            fd.append('status', 9);

            fd.append('note', this.$sendBackNote.val());
            fd.append('sb_or_fw', 2);

            fd.append('to_user', this.$sendBackUserSelect.select2('data')[0].id);
            fd.append('to_user_full_name', $(this.$sendBackUserSelect.select2('data')[0].element).data('full_name'));
            fd.append('to_user_username', $(this.$sendBackUserSelect.select2('data')[0].element).data('username'));
            let listUser = [];
            let length = this.currnenSendback.list_user.length;
            if (parseInt(this.currnenSendback.list_user[length - 1].id) === parseInt(this.$userInfo.data('id'))) {
                listUser = this.currnenSendback.list_user;
            } else {
                listUser = [{
                    id: this.$userInfo.data('id'),
                    full_name: this.$userInfo.data('full-name'),
                    username: this.$userInfo.data('username')
                }, {
                    id: this.$sendBackUserSelect.select2('data')[0].id,
                    full_name: $(this.$sendBackUserSelect.select2('data')[0].element).data('full_name'),
                    username: $(this.$sendBackUserSelect.select2('data')[0].element).data('username')
                }];
            }

            fd.append('list_user', JSON.stringify(listUser));

            let arr = [
                axios.post(url, fd),
                axios.post(urlMaskProcessed, {status}),
                axios.post(urlSendNotification,{
                    from_user: this.$userInfo.data('id'),
                    from_user_full_name: this.$userInfo.data('full-name'),
                    from_user_username: this.$userInfo.data('username'),
                    note: this.$note.val(),
                    article: this.currnenSendback.article.title,
                    sb_or_fw: 2,
                    to_user: this.$sendBackUserSelect.select2('data')[0].id,
                    to_user_full_name: $(this.$sendBackUserSelect.select2('data')[0].element).data('full_name'),
                    to_user_username: $(this.$sendBackUserSelect.select2('data')[0].element).data('username'),
                    type: 'user'
                })
            ];

            Promise.all(arr).then(
                value => {
                    if (value[1].data.message) {
                        toastr.success(value[1].data.message);
                        this.$modalSendBack.modal('hide');
                        this.datatable.reload();
                    }
                },
                err => {
                    toastr.error(err.response.data.message)
                }
            )
        })
    }
}

$(() => {
    new ArticleIndexForMe()
});
