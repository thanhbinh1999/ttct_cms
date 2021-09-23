/**
 * @author       Giang Nguyen
 * @description class CommentReportMostCommentPublished
 */
class CommentReportMostCommentPublished {
    constructor() {
        this.$commentReportMostCommentPublishedTable = $('#comment-report-most-comment-published-table');
        this.datatable = null;

        this.$searchBtn = $('#search');
        this.$searchFrom = $('#search-from');
        this.$searchTo = $('#search-to');
        this.$searchCategory = $('#search-category');

        this.init();
    }

    init() {
        this.initSelect2();
        this.initPickDate();
        this.initDatatable();
    }

    initDatatable() {
        this.datatable = this.datatable = this.$commentReportMostCommentPublishedTable.KTDatatable({
            data: {
                type: 'remote',
                source: {
                    read: {
                        url: this.$commentReportMostCommentPublishedTable.data('url'),
                        headers: {'X-CSRF-TOKEN': $('meta[name=csrf-token]').attr('content')},
                        params: {
                            query: {
                                sort: 'published',
                                status_get: () => JSON.stringify(['published']),
                                from: () => this.$searchFrom.val(),
                                to: () => this.$searchTo.val(),
                                category: () => this.$searchCategory.select2('data').length > 0 ? this.$searchCategory.select2('data')[0].id : null,
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
                    width: 600,
                    type: 'string',
                    selector: false,
                    autoHide: false,
                    sortable: false,
                    textAlign: 'left',
                    template: row => `<strong>${row.article_link && row.article_link !== '' ? `<a href="${row.article_link}" target="_blank">${row.article_title}</a>` : row.article_title}</strong>`
                },
                {
                    field: 'total',
                    title: 'TỔNG BÌNH LUẬN',
                    width: 100,
                    type: 'string',
                    sort: 'desc',
                    selector: false,
                    sortable: false,
                    textAlign: 'center',
                    template: row => `<strong>${row.published}</strong>`
                },
            ]
        });
        this.$searchBtn.click(event => {
            event.preventDefault();
            this.datatable.search();
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
    new CommentReportMostCommentPublished();
});
