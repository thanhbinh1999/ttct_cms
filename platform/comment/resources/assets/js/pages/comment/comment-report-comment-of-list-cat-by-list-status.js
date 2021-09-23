/**
 * @author       Giang Nguyen
 * @description class CommentReportCommentOfListCatByListStatus
 */
class CommentReportCommentOfListCatByListStatus {
    constructor() {
        this.$commentReportCommentOfListTermByListStatusTable = $('#comment-report-comment-of-list-term-by-list-status-table');
        this.datatable = null;

        this.$searchFrom = $('#search-from');
        this.$searchTo = $('#search-to');
        this.$searchBtn = $('#search');

        this.init();
    }

    init() {
        this.initPickDate();
        this.initDatatable();
    }

    initDatatable() {
        this.datatable = this.$commentReportCommentOfListTermByListStatusTable.KTDatatable({
            data: {
                type: 'remote',
                source: {
                    read: {
                        url: this.$commentReportCommentOfListTermByListStatusTable.data('url'),
                        headers: {'X-CSRF-TOKEN': $('meta[name=csrf-token]').attr('content')},
                        params: {
                            query: {
                                from: () => this.$searchFrom.val(),
                                to: () => this.$searchTo.val(),
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
                    field: 'category',
                    title: 'CHUYÊN MỤC',
                    width: 600,
                    type: 'string',
                    selector: false,
                    autoHide: false,
                    sortable: false,
                    textAlign: 'left',
                    template: row => `<strong>${row.name}</strong>`
                },
                {
                    field: 'publised',
                    title: 'ĐẪ XUẤT BẢN',
                    width: 100,
                    type: 'string',
                    sort: 'desc',
                    selector: false,
                    sortable: false,
                    textAlign: 'center',
                    template: row => `<strong>${row.count.published}</strong>`
                },
                {
                    field: 'publish',
                    title: 'ĐÃ DUYỆT',
                    width: 100,
                    type: 'string',
                    sort: 'desc',
                    selector: false,
                    sortable: false,
                    textAlign: 'center',
                    template: row => `<strong>${row.count.verified}</strong>`
                },
                {
                    field: 'deleted',
                    title: 'ĐÃ XÓA',
                    width: 100,
                    type: 'string',
                    sort: 'desc',
                    selector: false,
                    sortable: false,
                    textAlign: 'center',
                    template: row => `<strong>${row.count.deleted}</strong>`
                },
                {
                    field: 'total',
                    title: 'TỔNG',
                    width: 100,
                    type: 'string',
                    sort: 'desc',
                    selector: false,
                    sortable: false,
                    textAlign: 'center',
                    template: row => `<strong>${parseInt(row.total)}</strong>`
                },
            ]
        });
        this.$searchBtn.click(event => {
            event.preventDefault();
            this.datatable.search();
        })
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
    new CommentReportCommentOfListCatByListStatus();
});
