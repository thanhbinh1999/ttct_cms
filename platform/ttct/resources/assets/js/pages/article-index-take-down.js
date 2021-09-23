import axios from 'axios';
import {checkPermissions} from './helper'
/**
 * @author        Giang Nguyen
 * @description Class ArticleIndexPublished
 */
class ArticleIndexPublished {
    constructor() {
        this.$articleTable = $('#article-table');
        this.$searchKey = $('#search-key');
        this.$userInfo = $('#user-info');
        this.datatable = null;
        this.acl = null;

        //
        this.$modalSendBack = $('#modal-send-back');
        this.$formSendBack = $('#form-send-back');
        this.$sendBackUserSelect = $('#send-back-user-select');
        this.$sendBackNote = $('#send-back-note');
        this.currnenSendback = null;


        //transfer
        this.$modalTransferArticle = $('#modal-transfer-article');
        this.$transferType = $('input[name=transfer-type]');
        this.$roleSelect = $('#role-select');
        this.$userSelect = $('#user-select');
        this.$note = $('#note');
        this.$formTransferCategory = $('#form-transfer-category');
        this.transferType = 'role';
        this.currentTrasnferArticle = null;

        this.init();
    }

    init() {
        this.initGetAcl();
        this.initRestore();
        this.initSendBack();
        this.initRoleSelect();
        this.initTransfer();
    }

    initTransfer() {
        this.$modalTransferArticle.on('show.bs.modal', event => {
            this.currentTrasnferArticle = $(event.relatedTarget).data('id');
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
            this.$userSelect.html('');
            this.initRoleSelect();
        });

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
            let urlUpdateArticleEditor = this.$articleTable.data('update-article-editor') + this.currentTrasnferArticle;

            let fd = new FormData(event.target);


            fd.append('type', this.transferType);
            fd.append('article_id', this.currentTrasnferArticle);
            fd.append('from_user', this.$userInfo.data('id'));
            fd.append('from_user_full_name', this.$userInfo.data('full-name'));
            fd.append('from_user_username', this.$userInfo.data('username'));
            fd.append('note', this.$note.val());
            fd.append('sb_or_fw', 1);

            let listUser = [{
                id: this.$userInfo.data('id'),
                full_name: this.$userInfo.data('full-name'),
                username: this.$userInfo.data('username')
            }];

            if (this.transferType === 'role') {
                fd.append('to_user', this.$roleSelect.select2('data')[0].id);
                fd.append('to_user_full_name', this.$roleSelect.select2('data')[0].title);
                fd.append('to_user_username', this.$roleSelect.select2('data')[0].title);
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
                axios.post(urlUpdateArticleEditor, {})
            ];

            Promise.all(arr).then(
                value => {
                    if (value[0].data.message) {
                        toastr.success(value[0].data.message);
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
                                status: () => 6,
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
                    field: 'title',
                    title: 'TIÊU ĐỀ',
                    width: 430,
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
                    field: 'author',
                    title: 'TÁC GIẢ',
                    sortable: false,
                    width: 100,
                    type: 'string',
                    selector: false,
                    textAlign: 'left',
                    template: row => row.author ? `<strong>${row.author}</strong>` : 'N/A'
                },
                {
                    field: 'creator',
                    title: 'NGƯỜI TẠO',
                    sortable: false,
                    width: 100,
                    type: 'string',
                    selector: false,
                    textAlign: 'left',
                    template: row => row.creator ? `<strong>${row.creator.username}</strong>` : 'N/A'
                },
                {
                    field: 'published_at',
                    title: 'XUẤT BẢN',
                    width: 100,
                    type: 'string',
                    sort: 'desc',
                    selector: false,
                    textAlign: 'center',
                    template: row => row.published_at ? row.published_at : 'N/A'
                },
                {
                    field: 'action',
                    title: '!!!',
                    sortable: false,
                    width: 50,
                    textAlign: 'center',
                    overflow: 'visible',
                    template: row => {
                        delete row.content;
                        if (this.acl) {
                            let permissions = checkPermissions(['article-update', 'article-publish', 'article-restore', 'article-send-back'], this.acl.permissions);
                            let editUrl = this.$articleTable.data('edit');
                            editUrl = editUrl.slice(0, editUrl.lastIndexOf('/') + 1) + row.id;
                            let re = '';
                            let edit = '';
                            let trans = '';
                            let sendBack = '';

                            //tkts
                            if (this.$userInfo.data('role-name') === 'tkts') {
                                edit = `<a class="dropdown-item edit font-weight-bold" href="${editUrl}"><i class="la la-edit"></i> Cập nhật</a>`;
                                if (parseInt(this.$userInfo.data('id')) === parseInt(row.creator.id)) {
                                    re = permissions['article-restore'] ? `<a class="dropdown-item restore font-weight-bold" href="#" data-id="${row.id}"  data-restore="${row.url_restore}"><i class="la la-undo"></i> Khôi phục</a>` : '';
                                } else if(!row.editor.id){
                                    sendBack = `<a class="dropdown-item send-back font-weight-bold" data-data='${JSON.stringify(row)}' href="#" data-toggle="modal" data-target="#modal-send-back"><i class="la la-mail-reply"></i> Trả lại</a>`
                                }
                            } else {
                                if(row.editor && parseInt(row.editor.id) === parseInt(row.creator.id)){
                                    edit = `<a class="dropdown-item edit font-weight-bold" href="${editUrl}"><i class="la la-edit"></i> Cập nhật</a>`;
                                    trans = `<a class="dropdown-item font-weight-bold" href="#" data-toggle="modal" data-target="#modal-transfer-article" data-id="${row.id}"><i class="la la-edit"></i> Chuyển bài viết</a>`;
                                }
                            }

                            return (edit + trans +re + sendBack).length > 0 ? `<div class="dropdown">
                                        <a href="javascript:;" class="btn btn-sm btn-clean btn-icon btn-icon-sm" style="cursor: pointer" data-toggle="dropdown">
                                            <i class="flaticon2-console"></i>
                                        </a>
                                        <div class="dropdown-menu dropdown-menu-right">
                                            ${edit}
                                            ${re}
                                            ${sendBack}
                                            ${trans}
                                        </div>
                                    </div>` : '';
                        }
                    },
                }
            ]
        });
    }

    initRestore() {
        $(document).on('click', '.restore', event => {
            event.preventDefault();
            let url = $(event.currentTarget).data('restore');
            swal.fire({
                title: 'Xác nhận khôi phục',
                html: "<p class='kt-font-bold' style='font-size: 15px'>Khôi phục bài viết bày ?</p>",
                type: 'warning',
                showCancelButton: true,
                confirmButtonText: 'OK',
                cancelButtonText: 'Hủy',
                reverseButtons: true
            }).then(result => {
                if (result.value) {
                    axios.post(url, {
                        status: 10,
                        from_user: this.$userInfo.data('id'),
                        from_user_full_name: this.$userInfo.data('full-name'),
                        from_user_username: this.$userInfo.data('username')
                    }).then(
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

    initSendBackSelectUser() {
        let html = `<option value="${this.currnenSendback.creator.id}" data-username="${this.currnenSendback.creator.username}" data-full_name="${this.currnenSendback.creator.full_name}">${this.currnenSendback.creator.username}</option>`;
        this.$sendBackUserSelect.html(html);
        this.$sendBackUserSelect.select2();
    }

    initSendBack() {
        this.$modalSendBack.on('show.bs.modal', event => {
            this.currnenSendback = $(event.relatedTarget).data('data');
            this.initSendBackSelectUser();
        }).on('hide.bs.modal', () => {
            if (this.$sendBackUserSelect.hasClass("select2-hidden-accessible")) {
                this.$sendBackUserSelect.select2('destroy');
            }
            this.$sendBackUserSelect.html('');
            this.$sendBackNote.val('')
        });

        this.$formSendBack.submit(event => {
            event.preventDefault();
            let urlMaskProcessed = this.currnenSendback.url_mask_processed;
            let status = this.currnenSendback.mask_processed_status;

            let url = $(event.target).attr('action');
            let fd = new FormData(event.target);
            fd.append('type', 'user');
            fd.append('article_id', this.currnenSendback.id);
            fd.append('from_user', this.$userInfo.data('id'));
            fd.append('from_user_full_name', this.$userInfo.data('full-name'));
            fd.append('from_user_username', this.$userInfo.data('username'));

            fd.append('note', this.$sendBackNote.val());
            fd.append('sb_or_fw', 2);

            fd.append('to_user', this.$sendBackUserSelect.select2('data')[0].id);
            fd.append('to_user_full_name', $(this.$sendBackUserSelect.select2('data')[0].element).data('full_name'));
            fd.append('to_user_username', $(this.$sendBackUserSelect.select2('data')[0].element).data('username'));

            let listUser = [{
                id: this.$userInfo.data('id'),
                full_name: this.$userInfo.data('full-name'),
                username: this.$userInfo.data('username')
            }, {
                id: this.$sendBackUserSelect.select2('data')[0].id,
                full_name: $(this.$sendBackUserSelect.select2('data')[0].element).data('full_name'),
                username: $(this.$sendBackUserSelect.select2('data')[0].element).data('username')
            }];

            fd.append('list_user', JSON.stringify(listUser));

            axios.post(url, fd).then(
                ({data}) => {
                    if (data.message) {
                        toastr.success(data.message);
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
                        except: () => {
                            if (this.$userInfo.data('role-name') === 'btv')
                                return `[1,${this.$userInfo.data('role-id')},2]`;
                            else
                                return `[1,${this.$userInfo.data('role-id')}]`;
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
                        roles: () => {
                            if (this.$userInfo.data('role-name') === 'btv')
                                return `[1,${this.$userInfo.data('role-id')},2]`;
                            else
                                return `[1,${this.$userInfo.data('role-id')}]`;
                        }
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
}

$(() => {
    new ArticleIndexPublished()
});
