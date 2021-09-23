import axios from 'axios';
import {checkPermissions} from './helper'
/**
 * @author        Giang Nguyen
 * @description Class ArticleIndexHistory
 */
class ArticleIndexHistory {
    constructor() {
        this.$articleTable = $('#article-table-history');
        this.$searchKey = $('#search-key');
        this.datatable = null;
        this.$userInfo = $('#user-info');

        this.init();
    }

    init() {
        this.initGetAcl();
        this.cancelInit();
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
                                ['search-key']: () => this.$searchKey.val(),
                                from_user: () => this.$userInfo.data('id'),
                                // type: 2,
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
                    field: 'feed_back',
                    title: 'PHẢN HỒI',
                    sortable: false,
                    width: 250,
                    type: 'string',
                    selector: false,
                    textAlign: 'left',
                    template: row => row.feed_back ? `<p style="font-size: 15px;color: black">${row.feed_back}</p>` : 'N/A'
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
                            // let cancel = (parseInt(row.status) === 2 && row.url_cancel) ? `<a class="dropdown-item cancel font-weight-bold" href="#" data-cancel="${row.url_cancel}"><i class="la la-edit"></i> Hủy ${parseInt(row.sb_or_fw) === 1 ? 'chuyển' : 'trả'} bài</a>` : '';
                            let cancel = (parseInt(row.status) === 2 && row.url_cancel && parseInt(row.sb_or_fw) === 1) ? `<a class="dropdown-item cancel font-weight-bold" href="#" data-prev-transfer="${row.prev_transfer}" data-cancel="${row.url_cancel}"><i class="la la-edit"></i> Hủy chuyển bài</a>` : '';
                            return cancel.length > 0 ? `<div class="dropdown">
                                        <a href="javascript:;" class="btn btn-sm btn-clean btn-icon btn-icon-sm" style="cursor: pointer" data-toggle="dropdown">
                                            <i class="flaticon2-console"></i>
                                        </a>
                                        <div class="dropdown-menu dropdown-menu-right">
                                            ${cancel}
                                        </div>
                                    </div>` : '';
                        }
                        return '';
                    },
                }
            ]
        });
    }

    cancelInit() {
        $(document).on('click', '.cancel', event => {
            event.preventDefault();
            let url = $(event.currentTarget).data('cancel');
            let prevTransfer = $(event.currentTarget).data('prev-transfer');
            swal.fire({
                title: 'Xác nhận hủy',
                html: "<p style='color: black;font-size: 15px'>Bạn có muốn hủy lần chuyển bài này?</p>",
                type: 'warning',
                showCancelButton: true,
                confirmButtonText: 'OK',
                cancelButtonText: 'Hủy',
                reverseButtons: true
            }).then(result => {
                if (result.value) {
                    axios.post(url, {prev_transfer: prevTransfer}).then(
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
}

$(() => {
    new ArticleIndexHistory()
});
