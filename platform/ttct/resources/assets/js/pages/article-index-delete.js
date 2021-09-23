import axios from 'axios';
import {checkPermissions} from './helper'
/**
 * @author        Giang Nguyen
 * @description Class ArticleIndexDelete
 */
class ArticleIndexDelete {
    constructor() {
        this.$articleTable = $('#article-table');
        this.$searchKey = $('#search-key');
        this.$userInfo = $('#user-info');
        this.datatable = null;
        this.acl = null;

        this.init();
    }

    init() {
        this.initGetAcl();
        this.initRestore();
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
                                status: () => 4,
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
                    title: 'CM/CĐ',
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
                    field: 'action',
                    title: '!!!',
                    sortable: false,
                    textAlign: 'center',
                    width: 50,
                    overflow: 'visible',
                    template: row => {
                        if (this.acl) {
                            let permissions = checkPermissions(['article-update', 'article-publish', 'article-restore', 'article-take-down'], this.acl.permissions);
                            let editUrl = this.$articleTable.data('edit');
                            editUrl = editUrl.slice(0, editUrl.lastIndexOf('/') + 1) + row.id;
                            let re = permissions['article-restore'] ? `<a class="dropdown-item restore" href="#" data-status="${row.status_restore}" data-restore="${row.url_restore}"><i class="la la-undo"></i> Khôi phục</a>` : '';
                            let edit = permissions['article-update'] ? `<a class="dropdown-item edit" href="${editUrl}"><i class="la la-edit"></i> Cập nhật</a>` : '';
                            return (edit + re).length > 0 ? `<div class="dropdown">
                                        <a href="javascript:;" class="btn btn-sm btn-clean btn-icon btn-icon-sm" style="cursor: pointer" data-toggle="dropdown">
                                            <i class="flaticon2-console"></i>
                                        </a>
                                        <div class="dropdown-menu dropdown-menu-right">
                                            ${edit}
                                            ${re}
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
            let status = $(event.currentTarget).data('status');
            swal.fire({
                title: 'Xác nhận khôi phục',
                html: "<p class='kt-font-bold' style='font-size: 15px'>Khôi phục bài viết bày ? Trạng thái sau khi khôi phục sẽ là <strong>đang chờ</strong></p>",
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
}

$(() => {
    new ArticleIndexDelete()
});
