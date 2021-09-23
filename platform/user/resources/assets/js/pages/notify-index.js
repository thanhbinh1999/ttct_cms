class NotifyIndex {
    constructor() {
        this.$notifyTable = $('#notify-table');
        this.datatable = null;
        this.init();
    }

    init() {
        this.initDatatable();
    }

    initDatatable() {
        this.datatable = this.$notifyTable.KTDatatable({
            data: {
                type: 'remote',
                source: {
                    read: {
                        url: this.$notifyTable.data('url'),
                        headers: {'X-CSRF-TOKEN': $('meta[name=csrf-token]').attr('content')},
                        params: {
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
                    field: 'ahihi',
                    title: 'THÔNG BÁO',
                    type: 'string',
                    width: '100%',
                    selector: false,
                    autoHide: false,
                    textAlign: 'left',
                    template: row => {
                        return row;
                    }
                },
            ]
        });
    }
}

$(() => {
    new NotifyIndex();
});
