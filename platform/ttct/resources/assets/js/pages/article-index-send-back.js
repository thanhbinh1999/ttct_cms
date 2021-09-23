import axios from 'axios';
import {checkPermissions} from './helper'
/**
 * @author        Giang Nguyen
 * @description Class ArticleIndexSendBack
 */
class ArticleIndexSendBack {
    constructor() {
        this.$articleTableSendBack = $('#article-table-send-back');
        this.$searchKey = $('#search-key');
        this.datatable = null;
        this.$userInfo = $('#user-info');

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
        this.maskReceivedInit();
        this.initSendBack();
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
        this.datatable = this.$articleTableSendBack.KTDatatable({
            data: {
                type: 'remote',
                source: {
                    read: {
                        url: this.$articleTableSendBack.data('url'),
                        headers: {'X-CSRF-TOKEN': $('meta[name=csrf-token]').attr('content')},
                        params: {
                            query: {
                                ['search-key']: () => this.$searchKey.val(),
                                to_user: () => this.$userInfo.data('id'),
                                sb_or_fw: 2
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
                    title: 'TIÊU ĐỀ',
                    width: 350,
                    type: 'string',
                    selector: false,
                    autoHide: false,
                    textAlign: 'left',
                    template: row => {
                        return `<strong>${row.article.title}</strong>`;
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
                    title: 'NGƯỜI TRẢ',
                    sortable: false,
                    width: 100,
                    type: 'string',
                    selector: false,
                    textAlign: 'left',
                    template: row => `<strong>${row.from_user.username}</strong>`
                },
                {
                    field: 'to_user',
                    title: 'NGƯỜI TIẾP NHẬN',
                    sortable: false,
                    width: 100,
                    type: 'string',
                    selector: false,
                    textAlign: 'left',
                    template: row => `<strong>${row.to_user.username ? row.to_user.username : 'N/A'}</strong>`
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
                        if (this.acl) {
                            let permissions = checkPermissions(['article-delete', 'article-publish', 'article-update', 'article-transfer', 'article-update-own', 'article-send-back'], this.acl.permissions);
                            let html = '';
                            if (parseInt(row.type) === 2 || parseInt(row.type) === 1) {
                                if ((parseInt(row.status) === 2 && row.list_user.length === 2) || (parseInt(row.status) === 2 && this.$userInfo.data('role-name') === 'btv') || (parseInt(row.status) === 2 && this.$userInfo.data('role-name') === 'pv')) {
                                    html = `<a class="dropdown-item mask-received font-weight-bold" href="#" data-data='${JSON.stringify(row)}' data-mask-processing="${row.url_mask_received}" data-status="${row.mask_received_status}"><i class="la la-check"></i> Đánh dấu đã nhận</a>`;
                                } else if (parseInt(row.status) === 2 && row.list_user.length > 2) {
                                    let pos = 0;
                                    for (let i = pos; i < row.list_user.length - 1; i++) {
                                        if (parseInt(row.list_user[i].id) === parseInt(this.$userInfo.data('id'))) {
                                            pos = i;
                                            break;
                                        }
                                    }
                                    if (pos > 0 && pos < row.list_user.length - 1)
                                        html = permissions['article-send-back'] ? `<a class="dropdown-item send-back font-weight-bold" data-data='${JSON.stringify(row)}' href="#" data-toggle="modal" data-target="#modal-send-back"><i class="la la-mail-reply"></i> Trả lại & đánh dấu đã xử lý</a>` : '';
                                } else if (parseInt(row.status) === 2 && parseInt(row.article.status) === 6) {
                                    html = `<a class="dropdown-item mask-received font-weight-bold" href="#" data-data='${JSON.stringify(row)}' data-mask-processing="${row.url_mask_received}" data-status="${row.mask_received_status}"><i class="la la-check"></i> Đánh dấu đã nhận</a>`;
                                }
                            } else {
                                html = `<a class="dropdown-item mask-received font-weight-bold" href="#" data-mask-processing="${row.url_mask_received}" data-status="${row.mask_received_status}"><i class="la la-check"></i> Đánh dấu đã nhận</a>`;
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

    maskReceivedInit() {
        $(document).on('click', '.mask-received', event => {
            event.preventDefault();
            let url = $(event.currentTarget).data('mask-processing');
            let status = $(event.currentTarget).data('status');
            let data = $(event.currentTarget).data('data');
            if (data && parseInt(data.article.status) === 6) {
                let urlUpdateEditor = this.$articleTableSendBack.data('update-article-editor') + data.article.id;

                let arr = [
                    axios.post(url, {status}),
                    axios.post(urlUpdateEditor, {
                        user_id: this.$userInfo.data('id'),
                        user_full_name: this.$userInfo.data('full-name'),
                        username: this.$userInfo.data('username')
                    })
                ];

                Promise.all(arr).then(
                    value => {
                        toastr.success(value[0].data.message);
                        this.datatable.load();
                    },
                    err => {
                        let status = err.response.status;
                        if (status === 404 || status === 500) {
                            toastr.error(err.response.data.message);
                        }
                    }
                )
            } else {
                axios.post(url, {status}).then(
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


        })
    }

    initSendBack() {
        this.$formSendBack.submit(event => {
            event.preventDefault();
            let urlMaskProcessed = this.currnenSendback.url_mask_processed;
            let status = this.currnenSendback.mask_processed_status;

            let url = $(event.target).attr('action');
            let fd = new FormData(event.target);
            fd.append('type', 'user');
            fd.append('article_id', this.currnenSendback.article.id);
            fd.append('from_user', this.$userInfo.data('id'));
            fd.append('from_user_full_name', this.$userInfo.data('full-name'));
            fd.append('from_user_username', this.$userInfo.data('username'));

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
                axios.post(urlMaskProcessed, {status})
            ];

            Promise.all(arr).then(
                value => {
                    console.log(value);
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
        let pos = 0;
        for (let i = pos; i < this.currnenSendback.list_user.length - 1; i++) {
            if (parseInt(this.currnenSendback.list_user[i].id) === parseInt(this.$userInfo.data('id'))) {
                pos = i;
                break;
            }
        }
        let listUser = [];
        for (let i = (pos - 1); i >= 0; i--) {
            listUser.push(this.currnenSendback.list_user[i])
        }
        let html = listUser.reduce((c, n) => {
            return c + `<option value="${n.id}" data-username="${n.username}" data-full_name="${n.full_name}">${n.username}</option>`;
        }, '');
        this.$sendBackUserSelect.html(html);
        this.$sendBackUserSelect.select2();
    }
}

$(() => {
    new ArticleIndexSendBack()
});
