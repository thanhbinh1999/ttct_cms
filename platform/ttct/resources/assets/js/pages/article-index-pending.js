import axios from 'axios';
import {checkPermissions} from './helper'
/**
 * @author        Giang Nguyen
 * @description Class ArticleIndexPending
 */
class ArticleIndexPending {
    constructor() {
        this.$articleTable = $('#article-table-pending');
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
        this.currentTrasnferArticle = null;
        this.init();
    }

    init() {
        this.initGetAcl();
        this.initModal();
        this.initPublish();
        this.initDelete();
        this.initRoleSelect();
        this.initTransfer();
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

            axios.post(url, fd).then(
                ({data}) => {
                    if (data.message) {
                        toastr.success(data.message);
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

    initModal() {
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

    initDatatable() {
        let creator = null;
        let columns = [
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
            }, {
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
                field: 'published_at',
                title: 'NGÀY XUẤT BẢN DỰ KIẾN',
                width: 100,
                type: 'string',
                sort: 'desc',
                selector: false,
                textAlign: 'center',
                template: row => row.published_at ? row.published_at : 'N/A'
            },
            {
                field: 'created_at',
                title: 'NGÀY TẠO',
                width: 100,
                type: 'string',
                sort: 'desc',
                selector: false,
                textAlign: 'center',
                template: row => row.created_at ? row.created_at : 'N/A'
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
                        let permissions = checkPermissions(['article-publish'], this.acl.permissions);
                        let pub = permissions['article-publish'] ? `<a class="dropdown-item pub-now font-weight-bold" href="#" data-status-public="${row.status_pub}" data-public="${row.url_pub}"><i class="la la-file-text"></i> Xuất bản ngay</a>` : ``;
                        return pub.length > 0 ? `<div class="dropdown">
                                        <a href="javascript:;" class="btn btn-sm btn-clean btn-icon btn-icon-sm" style="cursor: pointer" data-toggle="dropdown">
                                            <i class="flaticon2-console"></i>
                                        </a>
                                        <div class="dropdown-menu dropdown-menu-right">
                                            ${pub}
                                        </div>
                                    </div>` : '';
                    }
                    return '';
                },
            }

        ];

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
                                ['search-key']: () => this.$searchKey.val(),
                                published_at_gt_n: 1
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
            columns
        });
    }

    initPublish() {
        $(document).on('click', '.pub-now', event => {
            event.preventDefault();
            let url = $(event.currentTarget).data('public');
            let status = $(event.currentTarget).data('status-public');
            swal.fire({
                title: 'Xác nhận xuất bản',
                html: "<p class='font-weight-bold'>Xuất bản bài viết này ngay lập tức?</p>",
                type: 'warning',
                showCancelButton: true,
                confirmButtonText: 'OK',
                cancelButtonText: 'Hủy',
                reverseButtons: true
            }).then(result => {
                if (result.value) {
                    axios.post(url, {
                        status,
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
                        except: () => `[1,${this.$userInfo.data('role-id')}]`
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
                        role_of_user: () => this.$userInfo.data('role-id')
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
    new ArticleIndexPending()
});
