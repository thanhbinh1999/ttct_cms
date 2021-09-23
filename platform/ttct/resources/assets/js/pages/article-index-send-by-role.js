import axios from 'axios';
import {checkPermissions} from './helper'
/**
 * @author        Giang Nguyen
 * @description Class ArticleIndexSendByRole
 */
class ArticleIndexSendByRole {
    constructor() {
        this.$articleTableSendByRole = $('#article-table-send-by-role');
        this.$searchKey = $('#search-key');
        this.datatable = null;
        this.$userInfo = $('#user-info');

        //send back
        this.$modalSendBack = $('#modal-send-back');
        this.$formSendBack = $('#form-send-back');
        this.$sendBackUserSelect = $('#send-back-user-select');
        this.$sendBackNote = $('#send-back-note');
        this.currnenSendback = null;

        //
        this.$modalTransferArticle = $('#modal-transfer-article');
        this.$roleSelect = $('#role-select');
        this.$note = $('#note');
        this.$formTransferCategory = $('#form-transfer-category');
        this.transferType = 'role';
        this.currentTrasnfer = null;


        this.init();
    }

    init() {
        this.initGetAcl();
        this.maskProcessingInit();
        this.initSendBack();
        this.initPublic();
        this.initTransfer();
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
        this.datatable = this.$articleTableSendByRole.KTDatatable({
            data: {
                type: 'remote',
                source: {
                    read: {
                        url: this.$articleTableSendByRole.data('url'),
                        headers: {'X-CSRF-TOKEN': $('meta[name=csrf-token]').attr('content')},
                        params: {
                            query: {
                                ['search-key']: () => this.$searchKey.val(),
                                type: 1,
                                to_user: () => this.$userInfo.data('role-id'),
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
                    field: 'article.title',
                    title: 'TIÊU ĐỀ',
                    width: 350,
                    type: 'string',
                    selector: false,
                    autoHide: false,
                    textAlign: 'left',
                    template: row => {
                        let title = row.article.title;
                        if (parseInt(row.status) === 2 || parseInt(row.status) === 10) {
                            title = row.article.title;
                        } else if (parseInt(row.status) === 6 && parseInt(row.article.editor.id) === parseInt(this.$userInfo.data('id'))) {
                            let permissions = checkPermissions(['article-delete', 'article-publish', 'article-update', 'article-transfer', 'article-send-back'], this.acl.permissions);
                            let editUrl = this.$articleTableSendByRole.data('edit');
                            editUrl = editUrl.slice(0, editUrl.lastIndexOf('/') + 1) + row.article.id + '?tran_id=' + row.id;

                            if ((permissions['article-update-own'] && parseInt(row.creator.id) === parseInt(this.$userInfo.data('id'))) || (permissions['article-update'])) {
                                title = `<a href="${editUrl}">${row.article.title}</a>`;
                            }
                        }
                        return `<strong>${title}</strong>`;
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
                    field: 'from_user',
                    title: 'NGƯỜI GỬI',
                    sortable: false,
                    width: 100,
                    type: 'string',
                    selector: false,
                    textAlign: 'left',
                    template: row => `<strong>${row.from_user.username}</strong>`
                },
                {
                    field: 'editor',
                    title: 'NGƯỜI ĐANG XỬ LÝ',
                    sortable: false,
                    width: 100,
                    type: 'string',
                    selector: false,
                    textAlign: 'left',
                    template: row => `<strong>${row.article.editor && row.article.editor.username ? row.article.editor.username : 'N/A'}</strong>`,
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
                            case 8: {
                                text = '<span class="kt-badge  kt-badge--dark kt-badge--inline kt-badge--pill" style="font-size: 12px"><strong>Đã từ chối</strong></span>';
                                break;
                            }
                            case 9: {
                                text = '<span class="kt-badge  kt-badge--success kt-badge--inline kt-badge--pill" style="font-size: 12px"><strong>Đã nhận</strong></span>';
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
                    textAlign: 'center',
                    width: 50,
                    overflow: 'visible',
                    template: row => {
                        delete row.article.content;
                        if (this.acl) {
                            let html = '';
                            if (parseInt(row.status) === 2) {
                                html = `<a class="dropdown-item mask-processing font-weight-bold" href="#"
                                            data-url-update-editor="${row.url_update_editor}"
                                            data-mask-processing="${row.url_mask_processing}"
                                            data-status="${row.mask_processing_status}"><i class="la la-check"></i> Đánh dấu đang xử lý</a>`;

                            } else if (parseInt(row.status) === 6 && parseInt(row.article.editor.id) === parseInt(this.$userInfo.data('id'))) {
                                let permissions = checkPermissions(['article-delete', 'article-publish', 'article-update', 'article-transfer', 'article-send-back'], this.acl.permissions);

                                let editUrl = this.$articleTableSendByRole.data('edit');
                                editUrl = editUrl.slice(0, editUrl.lastIndexOf('/') + 1) + row.article.id + '?tran_id=' + row.id;

                                let sendBack = permissions['article-send-back'] ? `<a class="dropdown-item send-back font-weight-bold" data-data='${JSON.stringify(row)}' href="#" data-toggle="modal" data-target="#modal-send-back"><i class="la la-mail-reply"></i> Trả lại & đánh dấu đã xử lý</a>` : '';

                                let edit = '';
                                if ((permissions['article-update-own'] && parseInt(row.creator.id) === parseInt(this.$userInfo.data('id'))) || (permissions['article-update'])) {
                                    edit = `<a class="dropdown-item edit font-weight-bold" href="${editUrl}"><i class="la la-edit"></i> Cập nhật</a>`;
                                }
                                let pub = permissions['article-publish'] ? `<a class="dropdown-item public font-weight-bold" href="#"
                                                                                data-url-public="${row.url_public}"
                                                                                data-public-status="${row.public_status}"
                                                                                data-url-mask-processed="${row.url_mask_processed}"
                                                                                data-mask-processed-status="${row.mask_processed_status}"><i class="la la-file-text"></i> Xuất bản ngay & đánh dấu đã xử lý</a>` : ``;


                                let transfer = row.to_user.full_name === 'btv' ? `<a class="dropdown-item transfer font-weight-bold" href="#" data-toggle="modal" data-target="#modal-transfer-article" data-data='${JSON.stringify(row)}'><i class="la la-edit"></i> Chuyển bài viết</a>` : '';
                                html = sendBack + pub + edit + transfer;
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

    initPublic() {
        $(document).on('click', '.public', event => {
            event.preventDefault();
            let urlPublic = $(event.currentTarget).data('url-public');
            let publicStatus = $(event.currentTarget).data('public-status');
            let maskProcessedStatus = $(event.currentTarget).data('mask-processed-status');
            let urlMaskProcessed = $(event.currentTarget).data('url-mask-processed');
            swal.fire({
                title: 'Xác nhận xuất bản',
                html: "<p class='font-weight-bold'>Xuất bản bài viết này<br> đồng thời đánh dấu đã xử lý?</p>",
                type: 'warning',
                showCancelButton: true,
                confirmButtonText: 'OK',
                cancelButtonText: 'Hủy',
                reverseButtons: true
            }).then(result => {
                if (result.value) {
                    let arr = [
                        axios.post(urlPublic, {status: publicStatus}),
                        axios.post(urlMaskProcessed, {status: maskProcessedStatus})
                    ];
                    Promise.all(arr).then(
                        value => {
                            toastr.success(value[0].data.message);
                            this.datatable.load();
                        },
                        err => {
                        }
                    )
                }
            });
        })
    }

    maskProcessingInit() {
        $(document).on('click', '.mask-processing', event => {
            event.preventDefault();
            let urlMaskProcessing = $(event.currentTarget).data('mask-processing');
            let urlUpdateEditor = $(event.currentTarget).data('url-update-editor');
            let statusMaskProcessing = $(event.currentTarget).data('status');

            let arr = [
                axios.post(urlMaskProcessing, {status: statusMaskProcessing}),
                axios.post(urlUpdateEditor, {
                    user_id: this.$userInfo.data('id'),
                    user_full_name: this.$userInfo.data('full-name'),
                    username: this.$userInfo.data('username')
                })
            ];

            Promise.all(arr).then(value => {
                toastr.success(value[1].data.message);
                this.datatable.load();
            }).catch(err => {

            });
        })
    }

    initSendBack() {
        this.$formSendBack.submit(event => {
            event.preventDefault();
            let urlMaskProcessed = this.currnenSendback.url_mask_processed;
            let status = this.currnenSendback.mask_processed_status;

            let url = $(event.target).attr('action');
            let urlSendNotification = this.$articleTableSendByRole.data('send-notification');
            let fd = new FormData(event.target);
            fd.append('type', 'role');
            fd.append('article_id', this.currnenSendback.article.id);
            fd.append('from_user', this.$userInfo.data('role-id'));
            fd.append('from_user_full_name', this.$userInfo.data('role-name'));
            fd.append('from_user_username', this.$userInfo.data('role-name'));

            fd.append('note', this.$sendBackNote.val());
            fd.append('sb_or_fw', 2);

            fd.append('to_user', this.$sendBackUserSelect.select2('data')[0].id);
            fd.append('to_user_full_name', $(this.$sendBackUserSelect.select2('data')[0].element).data('full_name'));
            fd.append('to_user_username', $(this.$sendBackUserSelect.select2('data')[0].element).data('username'));
            let listUser = [{
                id: this.$userInfo.data('id'),
                full_name: this.$userInfo.data('full-name'),
                username: this.$userInfo.data('username')
            }];

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

    initSendBackSelectUser() {
        let listUser = this.currnenSendback.list_user;
        let html = `<option value="${listUser[0].id}" data-username="${listUser[0].username}" data-full_name="${listUser[0].full_name}">${listUser[0].username}</option>`;
        // let html = listUser.reduce((c, n) => {
        //     return c + `<option value="${n.id}" data-username="${n.username}" data-full_name="${n.full_name}">${n.username}</option>`;
        // }, '');
        this.$sendBackUserSelect.html(html);
        this.$sendBackUserSelect.select2();
    }

    initTransfer() {
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
                        except: () => `[1,${this.$userInfo.data('role-id')}]`,
                        role_of_user: () => this.currentTrasnfer ? `[${this.currentTrasnfer.from_user.id}]` : `[]`
                    };
                },
                processResults: data => {
                    return {
                        results: $.map(data.data, function (item) {
                            return {
                                text: `${item.name}`,
                                id: item.id,
                                title: `${item.name}`,
                                name: item.name
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

        this.$modalTransferArticle.on('show.bs.modal', event => {
            this.currentTrasnfer = $(event.relatedTarget).data('data');
        }).on('hide.bs.modal', () => {
            this.$roleSelect.val(null).trigger('change');
            this.currentTrasnfer = null;
        });

        this.$formTransferCategory.submit(event => {
            event.preventDefault();

            if (this.$roleSelect.select2('data').length === 0) {
                toastr.info('Chưa chọn vai trò');
                return false;
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
            listUser.push({
                id: this.$userInfo.data('id'),
                full_name: this.$userInfo.data('id'),
                username: this.$userInfo.data('username')
            });
            if (this.transferType === 'role') {
                fd.append('to_user', this.$roleSelect.select2('data')[0].id);
                fd.append('to_user_full_name', this.$roleSelect.select2('data')[0].name);
                fd.append('to_user_username', this.$roleSelect.select2('data')[0].name);
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
}

$(() => {
    new ArticleIndexSendByRole()
});
