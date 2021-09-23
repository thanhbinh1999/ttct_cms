import axios from 'axios';

class UsersIndex {
    constructor() {
        this.$usersTable = $('#users-table');
        this.$searchKey = $('#search-key');
        this.datatable = null;

        this.$modalAssignRolePermissions = $('#modal-assign-role-permissions');
        this.$selectPermissions = $('#select-permissions');
        this.$selectRole = $('#select-role');
        this.$updateAssignBtn = $('#update-assign-btn');
        this.currentAssign = null;
        this.init();
    }

    init() {
        this.initDatatable();
        this.initSelect2();
        this.initModal();
        this.initUpdateAssign();
    }

    initDatatable() {
        this.datatable = this.$usersTable.KTDatatable({
            data: {
                type: 'remote',
                source: {
                    read: {
                        url: this.$usersTable.data('url'),
                        headers: {'X-CSRF-TOKEN': $('meta[name=csrf-token]').attr('content')},
                        params: {
                            query: {
                                ['search-key']: () => this.$searchKey.val(),
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
                    field: 'id',
                    title: 'ID',
                    width: 100,
                    type: 'string',
                    selector: false,
                    autoHide: false,
                    textAlign: 'center',
                    template: row => {
                        return `<strong>${row.id}</strong>`;
                    }
                },
                {
                    field: 'username',
                    title: 'TÊN ĐĂNG NHẬP',
                    width: 200,
                    type: 'string',
                    selector: false,
                    autoHide: false,
                    textAlign: 'left',
                    template: row => {
                        return `<strong>${row.username}</strong>`;
                    }
                },
                {
                    field: 'full_name',
                    title: 'HỌ TÊN',
                    width: 200,
                    type: 'string',
                    selector: false,
                    sortable: false,
                    textAlign: 'left',
                    template: row => {
                        return `<strong>${row.first_name ? row.first_name : ''} ${row.last_name ? row.last_name : ''}</strong>`;
                    }
                },
                {
                    field: 'role',
                    title: 'VAI TRÒ',
                    sortable: false,
                    width: 200,
                    type: 'string',
                    selector: false,
                    textAlign: 'left',
                    template: row => `<strong>${row.role ? row.role.name : 'N/A'}</strong>`
                },{
                    field: 'login_at',
                    title: 'ĐĂNG NHẬP GẦN NHẤT',
                    width: 200,
                    type: 'string',
                    selector: false,
                    autoHide: false,
                    textAlign: 'center',
                    template: row => {
                        return `<p style="color: black">${row.login_at ? row.login_at : 'N/A'}</p>`;
                    }
                },
                {
                    field: 'action',
                    title: '!!!',
                    sortable: false,
                    width: 50,
                    overflow: 'visible',
                    textAlign: 'center',
                    template: row => {

                        return row.url_prepare_assign ? `<div class="dropdown">
                                        <a href="javascript:;" class="btn btn-sm btn-clean btn-icon btn-icon-sm" style="cursor: pointer" data-toggle="dropdown">
                                            <i class="flaticon2-console"></i>
                                        </a>
                                        <div class="dropdown-menu dropdown-menu-right">
                                            <a class="dropdown-item" href="#" data-url="${row.url_prepare_assign}" data-toggle="modal" data-target="#modal-assign-role-permissions"><i class="la la-edit"></i> Phân vai trò / quyền</a>
                                        </div>
                                    </div>` : '';
                    },
                }
            ]
        });
    }

    initSelect2() {
        this.$selectRole.select2({
            placeholder: 'Chọn vai trò',
            ajax: {
                url: this.$selectRole.data('url'),
                dataType: 'json',
                delay: 250,
                method: 'POST',
                headers: {'X-CSRF-TOKEN': $('meta[name=csrf-token]').attr('content')},
                data: function (params) {
                    return {
                        term: params.term,
                        page: params.page,
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

    initModal() {
        this.$modalAssignRolePermissions.on('show.bs.modal', event => {
            let url = $(event.relatedTarget).data('url');
            axios.get(url).then(
                ({data}) => {
                    this.currentAssign = data;
                    let html = data.permissions.reduce((c, n) => {
                        return c + `<option value="${n.id}" ${n.check ? 'selected' : ''}>${n.name}</option>`;
                    }, '');
                    this.$selectPermissions.html(html);
                    if (this.listDualBox) {
                        this.listDualBox.redraw();
                    } else {
                        this.listDualBox = new DualListbox(this.$selectPermissions[0]);
                    }

                    if (data.role) {
                        let option = new Option(data.role.name, data.role.id);
                        this.$selectRole.append(option).val(data.role.id).trigger('change');
                    }
                },
                err => {

                }
            )
        });
    }

    initUpdateAssign() {
        this.$updateAssignBtn.click(event => {
            event.preventDefault();
            let role = this.$selectRole.select2('data').length > 0 ? this.$selectRole.select2('data')[0].id : null;
            let url = this.currentAssign.url_update;
            let permissions = this.$selectPermissions.val();
            let data = {
                role,
                permissions
            };

            axios.post(url, data).then(
                ({data}) => {
                    if (data.message) {
                        toastr.success(data.message);
                        this.datatable.reload();
                        this.$modalAssignRolePermissions.modal('hide')
                    }
                },
                err => {

                }
            )

        });
    }
}

$(() => {
    new UsersIndex();
});
