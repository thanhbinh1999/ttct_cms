import axios from 'axios';
/**
 * @author        Giang Nguyen
 * @description Class Dashboard
 */
class Dashboard {
    constructor() {
        this.$dashboardDraftTable = $('#dashboard-draft-table');
        this.$dashboardPublishedTable = $('#dashboard-published-table');
        this.$dashboardArticleByUserTable = $('#dashboard-article-by-user-table');
        this.$userInfo = $('#user-info');

        this.$chartThemes = $('#chart-themes');
        this.$chartCategories = $('#chart-categories');
        this.$chartTopical = $('#chart-topical');
        this.$chartArticleCreateLast7Days = $('#chart-article-create-last-7-days');

        this.datatableDraft = null;
        this.datatablePublished = null;
        this.datatableUser = null;
        this.init();
    }

    init() {
        this.initDatatable();
        this.initGetDataAnalytic();
    }

    randomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    randomByte() {
        return this.randomNumber(0, 255);
    }

    randomPercent() {
        return (this.randomNumber(50, 100) * 0.01).toFixed(2);
    }

    randomRgba() {
        return `rgba(${[this.randomByte(), this.randomByte(), this.randomByte(), this.randomPercent()].join(',')})`
    }


    initDatatable() {
        this.datatableDraft = this.$dashboardDraftTable.KTDatatable({
            data: {
                type: 'remote',
                source: {
                    read: {
                        url: this.$dashboardDraftTable.data('url'),
                        headers: {'X-CSRF-TOKEN': $('meta[name=csrf-token]').attr('content')},
                        params: {
                            query: {
                                status: () => 2,
                                creator: ()=>this.$userInfo.data('id'),
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
                pageNumber: 20,
                serverPaging: true,
                serverFiltering: true,
                serverSorting: true,
            },
            layout: {
                scroll: true,
                footer: false,
            },
            sortable: true,
            pagination: true,
            rows: {
                autoHide: false
            },
            columns: [
                {
                    field: 'title',
                    title: 'TIÊU ĐỀ',
                    width: 430,
                    type: 'string',
                    selector: false,
                    sortable: false,
                    autoHide: false,
                    textAlign: 'left',
                    template: row => {
                        return `<strong>${row.title}</strong>`;
                    }
                },
                {
                    field: 'published_at',
                    title: 'NGÀY TẠO',
                    sortable: false,
                    width: 100,
                    type: 'string',
                    selector: false,
                    textAlign: 'left',
                    template: row => row.created_at ? `<strong>${row.created_at}</strong>` : 'N/A'
                }
            ]
        });
        this.$dashboardDraftTable.on('kt-datatable--on-init', () => {
            $('.kt-datatable__table').height(460);
            $('.ps--active-x').height(440)
        });


        this.datatablePublished = this.$dashboardPublishedTable.KTDatatable({
            data: {
                type: 'remote',
                source: {
                    read: {
                        url: this.$dashboardPublishedTable.data('url'),
                        headers: {'X-CSRF-TOKEN': $('meta[name=csrf-token]').attr('content')},
                        params: {
                            query: {
                                status: () => 10,
                                // published_at_lt_n: 1
                            },
                            sort: {
                                field: 'published_at',
                                type: 'desc'
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
                pageNumber: 20,
                serverPaging: true,
                serverFiltering: true,
                serverSorting: true,
            },
            layout: {
                scroll: true,
                footer: false,
            },
            sortable: true,
            pagination: true,
            rows: {
                autoHide: false
            },
            columns: [
                {
                    field: 'title',
                    title: 'TIÊU ĐỀ',
                    width: 430,
                    type: 'string',
                    selector: false,
                    autoHide: false,
                    sortable: false,
                    textAlign: 'left',
                    template: row => {
                        return `<strong>${row.title}</strong>`;
                    }
                },
                {
                    field: 'creator',
                    title: 'NGƯỜI TẠO',
                    sortable: false,
                    width: 100,
                    type: 'string',
                    selector: false,
                    textAlign: 'left',
                    template: row => row.creator.username ? `<strong>${row.creator.username}</strong>` : 'N/A'
                },
            ]
        });
        this.datatablePublished.on('kt-datatable--on-init', () => {
            $('.kt-datatable__table').height(460);
            $('.ps--active-x').height(440)
        })

    }

    initGetDataAnalytic() {
        let users = this.$dashboardArticleByUserTable.data('users');
        let ids = users.map(item => item.id);
        let url = $('#kt_content').data('url');
        axios.post(url, {users: ids}).then(
            ({data}) => {
                $('#total_article_published').text(data.total_article_published);
                $('#total_category').text(data.total_category);
                $('#total_topical').text(data.total_topical);
                $('#total_theme').text(data.total_theme);

                this.renderCategoryChart(data.categories);
                this.renderTopical(data.topicals);
                this.renderTheme(data.themes);
                this.renderArticleCreateLast7Days(data.article_created_last_7_days);

                if (data.users.length > 0) {
                    users = users.map(item => {
                        for (let i = 0; i < data.users.length; i++) {
                            if (parseInt(item.id) === parseInt(data.users[i].id)) {
                                item.count = data.users[i].count;
                                break;
                            }
                        }
                        return item;
                    })
                } else {
                    users = [];
                }
                this.initTableUser(users);
            }
        )
    }

    renderCategoryChart(data) {
        let color = data.map(item => this.randomRgba());
        new Chart(this.$chartCategories[0].getContext('2d'), {
            type: 'doughnut',
            data: {
                labels: data.map(item => item.name),
                datasets: [{
                    label: 'Số lượng bài viết',
                    data: data.map(item => item.count_article),
                    backgroundColor: color,
                    borderColor: color,
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                legend: {
                    position: 'bottom',
                },
                title: {
                    display: false
                },
                animation: {
                    animateScale: true,
                    animateRotate: true
                }
            }
        });
    }

    renderTopical(data) {
        let colors = data.map(item => this.randomRgba());
        new Chart(this.$chartTopical[0].getContext('2d'), {
            type: 'bar',
            data: {
                labels: data.map(item => item.name),
                datasets: [{
                    label: 'Số lượng bài viết',
                    data: data.map(item => item.count_article),
                    backgroundColor: colors,
                    borderColor: colors,
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                },
                legend: {
                    display: false,
                    labels: {
                        fontColor: 'rgb(255, 99, 132)'
                    }
                }
            }
        });
    }

    renderTheme(data) {
        let colors = data.map(item => this.randomRgba());
        new Chart(this.$chartThemes[0].getContext('2d'), {
            type: 'bar',
            data: {
                labels: data.map(item => item.name),
                datasets: [{
                    label: 'Số lượng bài viết',
                    data: data.map(item => item.count_article),
                    backgroundColor: colors,
                    borderColor: colors,
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                },
                legend: {
                    display: false,
                    labels: {
                        fontColor: 'rgb(255, 99, 132)'
                    }
                }
            }
        });
    }

    renderArticleCreateLast7Days(data) {
        let colors = Object.keys(data).map(() => this.randomRgba());
        new Chart(this.$chartArticleCreateLast7Days[0].getContext('2d'), {
            type: 'bar',
            data: {
                labels: Object.keys(data),
                datasets: [{
                    label: 'Số lượng bài viết',
                    data: Object.values(data),
                    backgroundColor: colors,
                    borderColor: colors,
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                },
                legend: {
                    display: false,
                    labels: {
                        fontColor: 'rgb(255, 99, 132)'
                    }
                }
            }
        });
    }

    initTableUser(data) {
        this.datatableUser = this.$dashboardArticleByUserTable.KTDatatable({
            data: {
                type: 'local',
                source: data,
                pageSize: 10,
            },
            layout: {
                scroll: true,
                footer: false,
            },
            sortable: true,
            pagination: true,
            rows: {
                autoHide: false
            },
            columns: [
                {
                    field: 'full_name',
                    title: 'TÊN',
                    width: 430,
                    type: 'string',
                    selector: false,
                    sortable: false,
                    autoHide: false,
                    textAlign: 'left',
                    template: row => {
                        return `<strong>${row.first_name ? row.first_name : ''} ${row.last_name}</strong>`;
                    }
                },
                {
                    field: 'username',
                    title: 'TÊN ĐĂNG NHẬP',
                    width: 430,
                    type: 'string',
                    selector: false,
                    sortable: false,
                    autoHide: false,
                    textAlign: 'left',
                    template: row => {
                        return `<strong>${row.username}</strong>`;
                    }
                },
                {
                    field: 'count',
                    title: 'SỐ BÀI VIẾT ĐÃ TẠO',
                    width: 430,
                    type: 'string',
                    selector: false,
                    sortable: false,
                    autoHide: false,
                    textAlign: 'center',
                    template: row => {
                        return `<strong>${row.count}</strong>`;
                    }
                },
            ]
        });
    }
}

$(() => {
    new Dashboard();
});
